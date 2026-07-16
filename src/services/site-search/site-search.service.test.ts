import { SITE_SEARCH_TRACK_EVENT } from '../../constants/track-event.constant'
import { expectPaqEvent, resetPaq } from '../../test-utils/paq.mock'
import * as SiteSearch from './site-search.service'

beforeEach(() => {
  resetPaq()
})

describe('SiteSearch.trackSiteSearch', () => {
  it('pushes only the keyword with trailing undefined arguments', () => {
    SiteSearch.trackSiteSearch('keyword')

    expectPaqEvent([
      SITE_SEARCH_TRACK_EVENT.SEARCH,
      'keyword',
      undefined,
      undefined,
      undefined,
    ])
  })

  it('pushes all provided arguments', () => {
    const dimensions = { dimension1: 'value' }
    SiteSearch.trackSiteSearch('keyword', 'category', 5, dimensions)

    expectPaqEvent([
      SITE_SEARCH_TRACK_EVENT.SEARCH,
      'keyword',
      'category',
      5,
      dimensions,
    ])
  })
})
