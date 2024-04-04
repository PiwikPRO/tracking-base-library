import { Dimensions } from './../../interfaces/utils'
import { SITE_SEARCH_TRACK_EVENT } from '../../constants/track-event.constant'
import { push } from '../paqService/paq.service'

/**
 * Tracks search requests on a website
 */
export function trackSiteSearch(
  keyword: string,
  category?: string,
  searchCount?: number,
  dimensions?: Dimensions
) {
  push([
    SITE_SEARCH_TRACK_EVENT.SEARCH,
    keyword,
    category,
    searchCount,
    dimensions,
  ])
}
