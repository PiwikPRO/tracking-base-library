import * as TrackingBaseLibrary from './core'
export * as PageViews from './services/pageViews/pageViews.service'
export * as eCommerce from './services/e-commerce/e-commerce.service'
export * from './interfaces'
export * as UserManagement from './services/user-management/userManagement.service'
export * as CustomEvent from './services/custom-events/customEvents.service'
export * as ContentTracking from './services/content-tracking/contentTracking.service'
export * as GoalConversions from './services/goal-conversions/goal-conversions.service'
export * as DownloadAndOutlink from './services/download-and-outlink/download-and-outlink.service'
export * as SiteSearch from './services/site-search/site-search.service'
export * as CustomDimensions from './services/custom-dimensions/customDimensions.service'
export * as CookieManagement from './services/cookie-management/cookieManagement.service'

export default {
  initialize: TrackingBaseLibrary.default.init,
}
