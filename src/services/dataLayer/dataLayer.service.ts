import { AnyData } from '../../interfaces/utils'
import { IS_DEBUG } from '../../core'
import { PiwikProWindow } from '../../interfaces/piwikpro.window'

export function push(data: AnyData) {
  if (!(window as PiwikProWindow).dataLayer) {
    ;(window as PiwikProWindow).dataLayer = []
  }

  IS_DEBUG && console.log('DataLayer push', data)
  return (window as PiwikProWindow).dataLayer?.push(data)
}
