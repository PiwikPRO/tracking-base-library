import { CLIENT_CONFIG_TRACK_EVENT } from '../../constants/track-event.constant'
import { Tracker } from '../../interfaces/tracker'
import { push } from '../paqService/paq.service'

export function setDomains(domains: string[]) {
  push([CLIENT_CONFIG_TRACK_EVENT.SET_DOMAINS, domains])
}

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
