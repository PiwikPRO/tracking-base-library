import PiwikPro, * as TrackingBaseLibrary from './index'

/**
 * The service namespaces the core library is expected to expose. The framework
 * wrappers (react/vue/…) assert against the same list, so it doubles as a guard
 * against an accidental change to the public surface.
 */
const EXPECTED_SERVICES = [
  'PageViews',
  'CustomEvent',
  'ContentTracking',
  'CookieManagement',
  'CustomDimensions',
  'DownloadAndOutlink',
  'eCommerce',
  'GoalConversions',
  'SiteSearch',
  'UserManagement',
  'DataLayer',
  'ErrorTracking',
  'CrossDomainTracking',
  'ClientConfiguration',
  'Heartbeat',
  'Miscellaneous',
] as const

describe('public API', () => {
  it.each(EXPECTED_SERVICES)(
    're-exports the "%s" service namespace',
    (name) => {
      const service = (TrackingBaseLibrary as Record<string, unknown>)[name]
      expect(service).toBeDefined()
      expect(typeof service).toBe('object')
    }
  )

  it('default export exposes initialize and getInitScript', () => {
    expect(typeof PiwikPro.initialize).toBe('function')
    expect(typeof PiwikPro.getInitScript).toBe('function')
  })
})
