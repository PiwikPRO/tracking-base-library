export enum ECOMMERCE_TRACK_EVENT {
  TRACK_ECOMMERCE_CART_UPDATE = 'trackEcommerceCartUpdate',
  TRACK_ECOMMERCE_ORDER = 'trackEcommerceOrder',
  REMOVE_ECOMMERCE_ITEM = 'removeEcommerceItem',
  SET_ECOMMERCE_VIEW = 'setEcommerceView',
  CLEAR_ECOMMERCE_CART = 'clearEcommerceCart',
  ADD_ECOMMERCE_ITEM = 'addEcommerceItem',
}

export enum ECOMMERCE_V2_TRACK_EVENT {
  ECOMMERCE_ADD_TO_CART = 'ecommerceAddToCart',
  ECOMMERCE_REMOVE_FROM_CART = 'ecommerceRemoveFromCart',
  ECOMMERCE_PRODUCT_DETAIL_VIEW = 'ecommerceProductDetailView',
  ECOMMERCE_CART_UPDATE = 'ecommerceCartUpdate',
  ECOMMERCE_ORDER = 'ecommerceOrder',
}

export enum COOKIE_TRACK_EVENT {
  DISABLE_COOKIES = 'disableCookies',
  ENABLE_COOKIES = 'enableCookies',
  DELETE_COOKIES = 'deleteCookies',
  SET_COOKIE_NAME_PREFIX = 'setCookieNamePrefix',
  SET_COOKIE_DOMAIN = 'setCookieDomain',
  SET_COOKIE_PATH = 'setCookiePath',
  SET_SECURE_COOKIE = 'setSecureCookie',
  SET_VISITOR_COOKIE_TIMEOUT = 'setVisitorCookieTimeout',
  SET_SESSION_COOKIE_TIMEOUT = 'setSessionCookieTimeout',
  SET_VISITOR_ID_COOKIE = 'setVisitorIdCookie',
  SET_REFERRAL_COOKIE_TIMEOUT = 'setReferralCookieTimeout',
}

export enum CONTENT_TRACK_EVENT {
  ALL_CONTENT_IMPRESSIONS = 'trackAllContentImpressions',
  VISIBLE_CONTENT_IMPRESSIONS = 'trackVisibleContentImpressions',
  CONTENT_IMPRESSIONS_WITH_NODE = 'trackContentImpressionsWithinNode',
  CONTENT_IMPRESSION = 'trackContentImpression',
  LOG_ALL_CONTENT_BLOCKS_ON_PAGE = 'logAllContentBlocksOnPage',
  CONTENT_INTERACTION_NODE = 'trackContentInteractionNode',
  CONTENT_INTERACTION = 'trackContentInteraction',
}

export enum CUSTOM_DIMENSIONS_TRACK_EVENT {
  SET_CUSTOM_DIMENSION_VALUE = 'setCustomDimensionValue',
  DELETE_CUSTOM_DIMENSION = 'deleteCustomDimension',
  SET_CUSTOM_DIMENSION = 'setCustomDimension',
}

export enum CUSTOM_EVENT_TRACK_EVENT {
  CUSTOM_EVENT = 'trackEvent',
}

export enum DOWNLOAD_AND_OUTLINK_TRACK_EVENT {
  LINK = 'trackLink',
  ENABLE_LINK_TRACKING = 'enableLinkTracking',
  SET_IGNORE_CLASSES = 'setIgnoreClasses',
  SET_LINK_CLASSES = 'setLinkClasses',
  SET_DOWNLOAD_CLASSES = 'setDownloadClasses',
  SET_DOWNLOAD_EXTENSIONS = 'setDownloadExtensions',
  ADD_DOWNLOAD_EXTENSIONS = 'addDownloadExtensions',
  REMOVE_DOWNLOAD_EXTENSIONS = 'removeDownloadExtensions',
  SET_LINK_TRACKING_TIMER = 'setLinkTrackingTimer',
}

export enum GOAL_CONVERSIONS_TRACK_EVENT {
  GOAL = 'trackGoal',
}

export enum PAGE_VIEWS_TRACK_EVENT {
  PAGE_VIEW = 'trackPageView',
}

export enum SITE_SEARCH_TRACK_EVENT {
  SEARCH = 'trackSiteSearch',
}

export enum CROSS_DOMAIN_TRACK_EVENT {
  ENABLE_CROSS_DOMAIN_LINKING = 'enableCrossDomainLinking',
  DISABLE_CROSS_DOMAIN_LINKING = 'disableCrossDomainLinking',
  SET_CROSS_DOMAIN_LINKING_TIMEOUT = 'setCrossDomainLinkingTimeout',
  IS_CROSS_DOMAIN_LINKING_ENABLED = 'isCrossDomainLinkingEnabled',
  GET_CROSS_DOMAIN_LINKING_URL_PARAMETER = 'getCrossDomainLinkingUrlParameter',
  CUSTOM_CROSS_DOMAIN_LINK_DECORATOR = 'customCrossDomainLinkDecorator',
  CUSTOM_CROSS_DOMAIN_LINK_VISITOR_ID_GETTER = 'customCrossDomainLinkVisitorIdGetter',
}

export enum USER_MANAGEMENT_TRACK_EVENT {
  SET_USER_ID = 'setUserId',
  RESET_USER_ID = 'resetUserId',
  SET_USER_IS_ANONYMOUS = 'setUserIsAnonymous',
  DEANONYMIZE_USER = 'deanonymizeUser',
}

export enum PAQ_SERVICE_TRACK_EVENT {
  SET_CUSTOM_URL = 'setCustomUrl',
  SET_DOCUMENT_TITLE = 'setDocumentTitle',
}

export enum ERROR_TRACKING_TRACK_EVENT {
  ENABLE_JS_ERROR_TRACKING = 'enableJSErrorTracking',
  TRACK_ERROR = 'trackError',
}

export enum CLIENT_CONFIG_TRACK_EVENT {
  SET_DOMAINS = 'setDomains',
  GET_DOMAINS = 'getDomains',
}

export type TRACK_EVENT =
  | ECOMMERCE_TRACK_EVENT
  | ECOMMERCE_V2_TRACK_EVENT
  | COOKIE_TRACK_EVENT
  | CONTENT_TRACK_EVENT
  | CUSTOM_DIMENSIONS_TRACK_EVENT
  | CUSTOM_EVENT_TRACK_EVENT
  | DOWNLOAD_AND_OUTLINK_TRACK_EVENT
  | GOAL_CONVERSIONS_TRACK_EVENT
  | PAGE_VIEWS_TRACK_EVENT
  | SITE_SEARCH_TRACK_EVENT
  | CROSS_DOMAIN_TRACK_EVENT
  | USER_MANAGEMENT_TRACK_EVENT
  | PAQ_SERVICE_TRACK_EVENT
  | ERROR_TRACKING_TRACK_EVENT
  | CLIENT_CONFIG_TRACK_EVENT
