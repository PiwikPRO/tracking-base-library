import { PAGE_VIEWS_TRACK_EVENT } from '../../constants/track-event.constant'
import { expectPaqEvent, resetPaq } from '../../test-utils/paq.mock'
import * as PageViews from './pageViews.service'

beforeEach(() => {
  resetPaq()
})

describe('PageViews.trackPageView', () => {
  it('pushes trackPageView without a custom title', () => {
    PageViews.trackPageView()

    expectPaqEvent([PAGE_VIEWS_TRACK_EVENT.PAGE_VIEW])
  })

  it('pushes trackPageView with a custom title', () => {
    PageViews.trackPageView('Home page')

    expectPaqEvent([PAGE_VIEWS_TRACK_EVENT.PAGE_VIEW, 'Home page'])
  })
})
