import { VisitorInfo } from './visitorInfo'

export type Tracker = {
  hasCookies: () => boolean
  getCustomDimensionValue: (id: string | number) => string | undefined
  getLinkTrackingTimer: () => number
  getEcommerceItems: () => object
  getUserId: () => string
  getVisitorId: () => string
  getVisitorInfo: () => VisitorInfo
}
