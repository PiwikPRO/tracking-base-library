import { ERROR_TRACKING_TRACK_EVENT } from '../../constants/track-event.constant'
import { expectPaqEvent, resetPaq } from '../../test-utils/paq.mock'
import * as ErrorTracking from './errorTracking.service'

beforeEach(() => {
  resetPaq()
})

describe('ErrorTracking', () => {
  it('enables JS error tracking with unique defaulting to true', () => {
    ErrorTracking.enableJSErrorTracking()

    expectPaqEvent([ERROR_TRACKING_TRACK_EVENT.ENABLE_JS_ERROR_TRACKING, true])
  })

  it('enables JS error tracking with the provided unique flag', () => {
    ErrorTracking.enableJSErrorTracking(false)

    expectPaqEvent([ERROR_TRACKING_TRACK_EVENT.ENABLE_JS_ERROR_TRACKING, false])
  })

  it('tracks an error', () => {
    const error = new Error('boom')
    ErrorTracking.trackError(error)

    expectPaqEvent([ERROR_TRACKING_TRACK_EVENT.TRACK_ERROR, error])
  })
})
