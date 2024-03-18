import { PAGE_VIEWS_TRACK_EVENT } from '../../constants/track-event.constant.ts'
import { push } from '../paqService/paq.service.ts'

export function trackPageView(customPageTitle?: string) {
  push([PAGE_VIEWS_TRACK_EVENT.PAGE_VIEW, ...(customPageTitle ? [customPageTitle] : [])])
}
