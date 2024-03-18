import { SITE_SEARCH_TRACK_EVENT } from '../../constants/track-event.constant'
import { push } from '../paqService/paq.service'

export function trackSiteSearch(
  keyword: string,
  category?: string,
  searchCount?: number,
  dimensions?: object
) {
  push([SITE_SEARCH_TRACK_EVENT.SEARCH, keyword, category, searchCount, dimensions])
}
