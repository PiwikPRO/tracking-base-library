#!/usr/bin/env bash
#
# Validate a pull request title against the Conventional Commits format.
# Configuration is passed by action.yaml as environment variables:
#   PR_TITLE - the title to validate
#   TYPES    - pipe-separated list of allowed types
#   SCOPES   - pipe-separated list of allowed scopes, or "*" for any
set -euo pipefail

title="${PR_TITLE:-}"
types="${TYPES:?TYPES must be set}"
scopes="${SCOPES:-*}"

if [ "$scopes" = '*' ]; then
  scope='[^()]+'
  scopes_help='any scope'
else
  scope="$scopes"
  scopes_help="$scopes"
fi

pattern="^($types)(\(($scope)\))?!?: (?![A-Z]).*[^.]$"

help_text() {
  cat <<EOF
The PR title must follow the Conventional Commits format:

    type(scope)?!?: subject

Allowed types:   $types
Allowed scopes:  $scopes_help   (optional)
Rules:
  - subject must start with a lowercase letter
  - subject must not end with a period
  - "!" after type/scope marks a breaking change

Examples:
  feat: add cross-domain tracking helper
  fix(deps): bump tracking-base-library to 1.7.0
  refactor!: drop deprecated initialize signature
EOF
}

if [ -z "$title" ]; then
  echo "::error title=Empty PR title::There is no pull request title to read. This action only works on pull_request events."
  exit 1
fi

if grep -qP "$pattern" <<<"$title"; then
  echo "PR title OK: $title"
  exit 0
fi

echo "::error title=Invalid PR title::\"$title\" is not a valid Conventional Commit title"
help_text

if [ -n "${GITHUB_STEP_SUMMARY:-}" ]; then
  {
    echo "### Invalid PR title"
    echo
    echo "\`$title\` is not a valid Conventional Commit title."
    echo
    echo '```'
    help_text
    echo '```'
  } >>"$GITHUB_STEP_SUMMARY"
fi

exit 1
