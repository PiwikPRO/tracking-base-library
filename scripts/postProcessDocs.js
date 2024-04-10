import { readFileSync, writeFileSync } from 'node:fs'

const README = 'README.md'

const file = readFileSync(README, 'utf-8')

const formattedOutput = file
  .split('\n')
  // remove additional heading
  .filter((line) => !line.includes('# @piwikpro/tracking-base-library'))
  // remove links suited for multi page documentation
  .filter((line) => !line.includes('Exports'))
  // remove duplicated header
  .filter((line) => !line.includes('### Functions'))
  // remove remove additional prefix
  .map((line) => line.replace('Namespace: ', ''))
  .join('\n')

writeFileSync(README, formattedOutput)
