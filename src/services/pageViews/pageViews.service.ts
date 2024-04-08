import { PAGE_VIEWS_TRACK_EVENT } from '../../constants/track-event.constant'
import { push } from '../paqService/paq.service'

/**
 * Tracks a visit on the page that the function was run on
 */
export function trackPageView(customPageTitle?: string) {
  push([
    PAGE_VIEWS_TRACK_EVENT.PAGE_VIEW,
    ...(customPageTitle ? [customPageTitle] : []),
  ])
}
