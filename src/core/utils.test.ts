import { sanitizeUrl } from './utils'

describe('sanitizeUrl method', () => {
  it('should return value without trailing slash', () => {
    const url = 'https://example.com/'
    const expectedSanitizedUrl = 'https://example.com'

    expect(sanitizeUrl(url)).toStrictEqual(expectedSanitizedUrl)
  })

  it('should return value without multiple trailing slashes', () => {
    const url = 'https://example.com///'
    const expectedSanitizedUrl = 'https://example.com'

    expect(sanitizeUrl(url)).toStrictEqual(expectedSanitizedUrl)
  })

  it('should return same value without trailing slash', () => {
    const url = 'https://example.com'
    const expectedSanitizedUrl = 'https://example.com'

    expect(sanitizeUrl(url)).toStrictEqual(expectedSanitizedUrl)
  })
})
