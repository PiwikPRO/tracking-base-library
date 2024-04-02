import { CUSTOM_EVENT_TRACK_EVENT } from '../../constants/track-event.constant'
import { Dimensions } from '../../interfaces/utils'
import { push } from '../paqService/paq.service'

export function trackEvent(
  category: string,
  action: string,
  name?: string,
  value?: number,
  dimensions?: Dimensions
) {
  const eventArguments = [
    category,
    action,
    ...(name ? [name] : []),
    ...(name ? [value] : []),
    ...(dimensions ? [dimensions] : []),
  ]
  push([CUSTOM_EVENT_TRACK_EVENT.CUSTOM_EVENT, ...eventArguments])
}
