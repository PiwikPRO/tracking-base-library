import { PAQ_SERVICE_TRACK_EVENT } from '../constants/track-event.constant'
import { Tracker } from '../interfaces/tracker'
import { QueueItem } from '../interfaces/utils'

export const PAGE_DATA_PREFIX_LENGTH = 2

export function resetPaq(): void {
  delete window._paq
}

export function getPaq(): QueueItem[] {
  return window._paq ?? []
}

export function lastPaqEvent(): QueueItem {
  const paq = getPaq()
  return paq[paq.length - 1]
}

export function expectPageDataPrefix(): void {
  const paq = getPaq()
  expect(paq[0]).toEqual([
    PAQ_SERVICE_TRACK_EVENT.SET_CUSTOM_URL,
    window.location.href,
  ])
  expect(paq[1]).toEqual([
    PAQ_SERVICE_TRACK_EVENT.SET_DOCUMENT_TITLE,
    document.title,
  ])
}

export function expectPaqEvent(expected: unknown[]): void {
  expectPageDataPrefix()
  const paq = getPaq()
  expect(paq).toHaveLength(PAGE_DATA_PREFIX_LENGTH + 1)
  expect(lastPaqEvent()).toEqual(expected)
}

/**
 * Default {@link Tracker} implementation used by async getter tests. Every
 * method returns a deterministic value so a test can assert that the value
 * produced by the tracker is what the service's promise resolves with. Pass
 * `overrides` to control the value a specific getter should return.
 */
export function createTrackerMock(overrides: Partial<Tracker> = {}): Tracker {
  return {
    hasCookies: () => true,
    getCookieDomain: () => '.example.com',
    getCookiePath: () => '/',
    getSessionCookieTimeout: () => 1800,
    getConfigVisitorCookieTimeout: () => 3600,
    getCustomDimensionValue: (id) => `value-for-${id}`,
    getLinkTrackingTimer: () => 500,
    getEcommerceItems: () => ({}),
    getUserId: () => 'user-id',
    getVisitorId: () => 'visitor-id',
    getVisitorInfo: () => ['1', 'visitor-id', 0, 0, 0, '', ''],
    getCrossDomainLinkingUrlParameter: () => 'pk_vid',
    isCrossDomainLinkingEnabled: () => true,
    getDomains: () => ['example.com'],
    getDownloadClasses: () => ['download'],
    ...overrides,
  }
}

/**
 * Async getter services push a single callback `[function]` onto the queue.
 * The real Piwik tracker invokes that callback with itself bound as `this`;
 * this helper simulates that step so the service's promise can resolve.
 *
 * Asserts the last queued item is a lone callback, then invokes it with the
 * provided (mock) tracker as `this`.
 */
export function resolveLastTrackerCallback(tracker: Tracker): void {
  const item = lastPaqEvent()
  expect(item).toHaveLength(1)
  expect(typeof item[0]).toBe('function')
  const callback = item[0] as (this: Tracker) => void
  callback.call(tracker)
}
