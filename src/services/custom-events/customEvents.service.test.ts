import { CUSTOM_EVENT_TRACK_EVENT } from '../../constants/track-event.constant'
import { expectPaqEvent, resetPaq } from '../../test-utils/paq.mock'
import * as CustomEvent from './customEvents.service'

beforeEach(() => {
  resetPaq()
})

describe('CustomEvent.trackEvent', () => {
  it('pushes the category and action with trailing undefined arguments', () => {
    CustomEvent.trackEvent('Category', 'Action')

    expectPaqEvent([
      CUSTOM_EVENT_TRACK_EVENT.CUSTOM_EVENT,
      'Category',
      'Action',
      undefined,
      undefined,
      undefined,
    ])
  })

  it('pushes all provided arguments', () => {
    const dimensions = { dimension1: 'value' }
    CustomEvent.trackEvent('Category', 'Action', 'Name', 42, dimensions)

    expectPaqEvent([
      CUSTOM_EVENT_TRACK_EVENT.CUSTOM_EVENT,
      'Category',
      'Action',
      'Name',
      42,
      dimensions,
    ])
  })
})
