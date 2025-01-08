import { CROSS_DOMAIN_TRACK_EVENT } from '../../constants/track-event.constant'
import { Tracker } from '../../interfaces/tracker'
import { push } from '../paqService/paq.service'

export type LinkDecorator = (
  url: string,
  value: string,
  name: string
) => string | null

export type VisitorIdGetter = (url: string, name: string) => string

/**
 * Enables cross domain linking. Visitors across domains configured with "setDomains" function will be linked by passing visitor ID parameter in links.
 */
export function enableCrossDomainLinking() {
  push([CROSS_DOMAIN_TRACK_EVENT.ENABLE_CROSS_DOMAIN_LINKING])
}

/**
 * Disables cross domain linking.
 */
export function disableCrossDomainLinking() {
  push([CROSS_DOMAIN_TRACK_EVENT.DISABLE_CROSS_DOMAIN_LINKING])
}

/**
 * Changes the time in which two visits across domains will be linked. The default timeout is 180 seconds (3 minutes).
 */
export function setCrossDomainLinkingTimeout(timeout: number) {
  push([CROSS_DOMAIN_TRACK_EVENT.SET_CROSS_DOMAIN_LINKING_TIMEOUT, timeout])
}

/**
 * Returns boolean telling whether cross domain linking is enabled.
 */
export function isCrossDomainLinkingEnabled(): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    try {
      push([
        function (this: Tracker) {
          resolve(this.isCrossDomainLinkingEnabled())
        },
      ])
    } catch (e) {
      if (e instanceof ReferenceError) {
        reject(e)
      }
    }
  })
}

/**
 * Returns the name of a cross domain URL parameter (query parameter by default) holding visitor ID. This is "pk_vid" by default.
 */
export function getCrossDomainLinkingUrlParameter(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    try {
      push([
        function (this: Tracker) {
          resolve(this.getCrossDomainLinkingUrlParameter())
        },
      ])
    } catch (e) {
      if (e instanceof ReferenceError) {
        reject(e)
      }
    }
  })
}

/**
 * Sets custom cross domains URL decorator for injecting visitor ID into URLs. Used when cross domain linking is enabled.
 */
export function customCrossDomainLinkDecorator(decorator: LinkDecorator) {
  push([
    CROSS_DOMAIN_TRACK_EVENT.CUSTOM_CROSS_DOMAIN_LINK_DECORATOR,
    function (...args: Parameters<LinkDecorator>) {
      return decorator(...args)
    },
  ])
}

/**
 * Sets custom cross domain URL parser for extracting visitor ID from URLs. Should extract data injected by URL decorator. The getter should return visitor ID extracted from page URL.
 */
export function customCrossDomainLinkVisitorIdGetter(getter: VisitorIdGetter) {
  push([
    CROSS_DOMAIN_TRACK_EVENT.CUSTOM_CROSS_DOMAIN_LINK_VISITOR_ID_GETTER,
    function (...args: Parameters<VisitorIdGetter>) {
      return getter(...args)
    },
  ])
}
