// UUIDv4
const CONTAINER_ID_PATTERN =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

// Letters, digits, _, $, or -
// Examples: `dataLayer`, `my-data-layer`, `data_layer`, `$dataLayer`
const DATA_LAYER_NAME_PATTERN = /^[A-Za-z0-9_$-]+$/

// Disallowed control characters, whitespace, and quotes
// eslint-disable-next-line no-control-regex
const DISALLOWED_URL_CHARS = /[\u0000-\u001F\u007F\s'"]/

export const stripTrailingSlashes = (url: string): string => {
  let end = url.length
  while (end > 0 && url[end - 1] === '/') end--
  return end === url.length ? url : url.slice(0, end)
}

export function assertContainerId(containerId: string): string {
  if (!CONTAINER_ID_PATTERN.test(containerId)) {
    throw new Error(
      'Invalid tracking code for Piwik Pro. Expected a UUID container ID.'
    )
  }
  return containerId
}

export function assertDataLayerName(name: string): string {
  if (!DATA_LAYER_NAME_PATTERN.test(name)) {
    throw new Error(
      'Invalid data layer name for Piwik Pro. Use letters, digits, _, $, or -.'
    )
  }
  return name
}

/**
 * Validates and canonicalizes a container base URL for use as a script `src` prefix.
 * Returns origin + pathname only (https, no credentials/search/hash), with trailing
 * slashes stripped.
 */
export function assertContainerUrl(url: string): string {
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    throw new Error('Invalid tracking URL for Piwik Pro.')
  }

  if (parsed.protocol !== 'https:') {
    throw new Error(
      'Invalid tracking URL for Piwik Pro. Only https: URLs are allowed.'
    )
  }

  if (parsed.username !== '' || parsed.password !== '') {
    throw new Error(
      'Invalid tracking URL for Piwik Pro. URLs must not contain credentials.'
    )
  }

  const canonical = stripTrailingSlashes(`${parsed.origin}${parsed.pathname}`)

  let decoded: string
  try {
    // decodeURI keeps reserved URL chars (/, :, etc.); rejects malformed % sequences
    decoded = decodeURI(canonical)
  } catch {
    throw new Error('Invalid tracking URL for Piwik Pro.')
  }

  if (DISALLOWED_URL_CHARS.test(decoded)) {
    throw new Error(
      'Invalid tracking URL for Piwik Pro. URLs must not contain control characters, quotes, or whitespace.'
    )
  }

  return canonical
}

/**
 * Serializes a value as a JavaScript literal safe for embedding in a script.
 * Escapes `<` to prevent closing the script tag early.
 */
export function toJsLiteral(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}
