import {
  assertContainerId,
  assertContainerUrl,
  assertDataLayerName,
  stripTrailingSlashes,
  toJsLiteral,
} from './utils'

describe('stripTrailingSlashes method', () => {
  it('should return value without trailing slash', () => {
    const url = 'https://example.com/'
    const expected = 'https://example.com'

    expect(stripTrailingSlashes(url)).toStrictEqual(expected)
  })

  it('should return value without multiple trailing slashes', () => {
    const url = 'https://example.com///'
    const expected = 'https://example.com'

    expect(stripTrailingSlashes(url)).toStrictEqual(expected)
  })

  it('should return same value without trailing slash', () => {
    const url = 'https://example.com'
    const expected = 'https://example.com'

    expect(stripTrailingSlashes(url)).toStrictEqual(expected)
  })
})

describe('assertContainerId', () => {
  it('accepts a UUID container ID', () => {
    expect(
      assertContainerId('1f74dda5-b598-41d6-a9e4-f501ef4379e1')
    ).toBe('1f74dda5-b598-41d6-a9e4-f501ef4379e1')
  })

  it('rejects non-UUID values', () => {
    expect(() => assertContainerId('containerId')).toThrow(
      /Expected a UUID container ID/
    )
  })
})

describe('assertDataLayerName', () => {
  it('accepts alphanumeric names including identifiers', () => {
    expect(assertDataLayerName('dataLayer')).toBe('dataLayer')
    expect(assertDataLayerName('myDataLayer')).toBe('myDataLayer')
    expect(assertDataLayerName('_private')).toBe('_private')
    expect(assertDataLayerName('1startsWithNumber')).toBe('1startsWithNumber')
    expect(assertDataLayerName('$layer')).toBe('$layer')
  })

  it('accepts names with dashes', () => {
    expect(assertDataLayerName('my-data-layer')).toBe('my-data-layer')
    expect(assertDataLayerName('a-b-c')).toBe('a-b-c')
  })

  it('rejects names with unsafe or invalid characters', () => {
    expect(() => assertDataLayerName("');alert(1);//")).toThrow(
      /Use letters, digits/
    )
    expect(() => assertDataLayerName('has space')).toThrow(/Use letters, digits/)
    expect(() => assertDataLayerName('has&amp')).toThrow(/Use letters, digits/)
  })
})

describe('assertContainerUrl', () => {
  it('accepts absolute https URLs and returns a canonical form', () => {
    expect(assertContainerUrl('https://example.com')).toBe(
      'https://example.com'
    )
    expect(assertContainerUrl('https://example.com/')).toBe(
      'https://example.com'
    )
    expect(assertContainerUrl('https://example.com/path/')).toBe(
      'https://example.com/path'
    )
  })

  it('re-serializes from parsed parts and drops search/hash', () => {
    expect(assertContainerUrl('https://example.com/path?x=1#frag')).toBe(
      'https://example.com/path'
    )
  })

  it('rejects non-https protocols', () => {
    expect(() => assertContainerUrl('http://example.com')).toThrow(/https/)
    expect(() => assertContainerUrl('javascript:alert(1)')).toThrow()
  })

  it('rejects URLs with quotes, whitespace, or control characters', () => {
    expect(() =>
      assertContainerUrl('https://example.com/"')
    ).toThrow(/control characters, quotes, or whitespace/)
    expect(() =>
      assertContainerUrl('https://example.com/ path')
    ).toThrow(/control characters, quotes, or whitespace/)
    expect(() =>
      assertContainerUrl('https://example.com/\u0000evil')
    ).toThrow(/control characters, quotes, or whitespace/)
    expect(() =>
      assertContainerUrl('https://example.com/\u007F')
    ).toThrow(/control characters, quotes, or whitespace/)
  })

  it('rejects embedded credentials', () => {
    expect(() =>
      assertContainerUrl('https://user:pass@example.com')
    ).toThrow(/credentials/)
    expect(() =>
      assertContainerUrl('https://user@example.com')
    ).toThrow(/credentials/)
  })

  it('rejects invalid URLs', () => {
    expect(() => assertContainerUrl('not-a-url')).toThrow(
      /Invalid tracking URL/
    )
  })
})

describe('toJsLiteral', () => {
  it('JSON-serializes values and escapes < for script embedding', () => {
    expect(toJsLiteral({ a: 'b' })).toBe('{"a":"b"}')
    expect(toJsLiteral('</script>')).toBe('"\\u003c/script>"')
  })
})
