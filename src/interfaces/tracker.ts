import { VisitorInfo } from './visitorInfo'

export type Tracker = {
  hasCookies: () => boolean
  getCookieDomain: () => string
  getCookiePath: () => string
  getSessionCookieTimeout: () => number
  getConfigVisitorCookieTimeout: () => number
  getCustomDimensionValue: (id: string | number) => string | undefined
  getLinkTrackingTimer: () => number
  getEcommerceItems: () => object
  getUserId: () => string
  getVisitorId: () => string
  getVisitorInfo: () => VisitorInfo
}
