import { CLIENT_CONFIG_TRACK_EVENT } from '../../constants/track-event.constant'
import { Tracker } from '../../interfaces/tracker'
import { push } from '../paqService/paq.service'

/**
 * Allows to define a list of internal domains or mobile app URIs.
 * Used in outlink tracking for determining whether a link is an outlink and in cross domain linking for determining which links should have visitor ID parameter injected.
 */
export function setDomains(domains: string[]) {
  push([CLIENT_CONFIG_TRACK_EVENT.SET_DOMAINS, domains])
}

/**
 * Returns list of internal domains (set with "setDomains" function and used in outlink tracking).
 */
export function getDomains(): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    try {
      push([
        function (this: Tracker) {
          resolve(this.getDomains())
        },
      ])
    } catch (e) {
      if (e instanceof ReferenceError) {
        reject(e)
      }
    }
  })
}
