import { readFileSync, writeFileSync } from 'node:fs'

const README = 'README.md'

const file = readFileSync(README, 'utf-8')

const formattedOutput = file
  .split('\n')
  // remove the index page heading
  .filter((line) => !line.includes('## @piwikpro/tracking-base-library'))
  // remove per-namespace "Functions" heading; the bullet list is enough
  .filter((line) => !line.includes('### Functions'))
  // rename the index group heading
  .map((line) => line.replace('### Namespaces', '### Table of contents'))
  // restore the title heading level
  .map((line) =>
    line.replace(
      '## Piwik PRO Tracking Base Library',
      '# Piwik PRO Tracking Base Library'
    )
  )
  // strip the module-dir prefix from anchors and links
  .map((line) =>
    line.replaceAll('tracking-base-librarynamespaces', 'namespaces')
  )
  // keep separators between sections, not between type-alias properties
  .filter((line) => line.trim() !== '***')
  // add a separator before each section anchor (except the readme title)
  .map((line) =>
    line.startsWith('<a name="') && !line.includes('name="readmemd"')
      ? `${line}\n\n\n***\n`
      : line
  )
  .join('\n')

writeFileSync(README, formattedOutput)
