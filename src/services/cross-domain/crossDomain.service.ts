import { CROSS_DOMAIN_TRACK_EVENT } from '../../constants/track-event.constant'
import { Tracker } from '../../interfaces/tracker'
import { push } from '../paqService/paq.service'

export type LinkDecorator = (
  url: string,
  value: string,
  name: string
) => string | null

export type VisitorIdGetter = (url: string, name: string) => string

export function enableCrossDomainLinking() {
  push([CROSS_DOMAIN_TRACK_EVENT.ENABLE_CROSS_DOMAIN_LINKING])
}

export function disableCrossDomainLinking() {
  push([CROSS_DOMAIN_TRACK_EVENT.DISABLE_CROSS_DOMAIN_LINKING])
}

export function setCrossDomainLinkingTimeout(timeout: number) {
  push([CROSS_DOMAIN_TRACK_EVENT.SET_CROSS_DOMAIN_LINKING_TIMEOUT, timeout])
}

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

export function customCrossDomainLinkDecorator(decorator: LinkDecorator) {
  push([
    CROSS_DOMAIN_TRACK_EVENT.CUSTOM_CROSS_DOMAIN_LINK_DECORATOR,
    function (...args: Parameters<LinkDecorator>) {
      return decorator(...args)
    },
  ])
}

export function customCrossDomainLinkVisitorIdGetter(getter: VisitorIdGetter) {
  push([
    CROSS_DOMAIN_TRACK_EVENT.CUSTOM_CROSS_DOMAIN_LINK_VISITOR_ID_GETTER,
    function (...args: Parameters<VisitorIdGetter>) {
      return getter(...args)
    },
  ])
}
