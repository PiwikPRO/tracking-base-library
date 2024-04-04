import { readFileSync, writeFileSync } from 'node:fs'

const README = 'README.md'

const BLOB_REGEX = /\/blob\/([^\/]+)\//

const file = readFileSync(README, 'utf-8')

const formattedOutput = file
  .split('\n')
  // remove additional heading
  .filter((line) => !line.includes('# @piwik-pro/tracking-base-library'))
  // remove links suited for multi page documentation
  .filter((line) => !line.includes('Exports'))
  // remove duplicated header
  .filter((line) => !line.includes('### Functions'))
  // remove remove additional prefix
  .map((line) => line.replace('Namespace: ', ''))
  // replace branch specific source code reference with master branch
  .map((line) => line.replace(BLOB_REGEX, '/blob/master/'))
  .join('\n')

writeFileSync(README, formattedOutput)
