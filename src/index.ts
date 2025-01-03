import * as PiwikPro from './core'

export * as PageViews from './services/pageViews/pageViews.service'
export * as CustomEvent from './services/custom-events/customEvents.service'
export * as ContentTracking from './services/content-tracking/contentTracking.service'
export * as CookieManagement from './services/cookie-management/cookieManagement.service'
export * as CustomDimensions from './services/custom-dimensions/customDimensions.service'
export * as DownloadAndOutlink from './services/download-and-outlink/download-and-outlink.service'
export * as eCommerce from './services/e-commerce/e-commerce.service'
export * as GoalConversions from './services/goal-conversions/goal-conversions.service'
export * as SiteSearch from './services/site-search/site-search.service'
export * as UserManagement from './services/user-management/userManagement.service'
export * as DataLayer from './services/dataLayer/dataLayer.service'
export * as ErrorTracking from './services/error-tracking/errorTracking.service'
export * as CrossDomain from './services/cross-domain/crossDomain.service'
export * as ClientConfiguration from './services/client-configuration/clientConfiguration.service'

export * from './interfaces/payment'
export * from './interfaces/product'
export * from './interfaces/visitorInfo'
export type { Dimensions } from './interfaces/utils'
export type { InitOptions } from './core'

export default {
  initialize: PiwikPro.init,
  getInitScript: PiwikPro.getInitScript,
}
