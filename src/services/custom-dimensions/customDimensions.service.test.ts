import { CUSTOM_DIMENSIONS_TRACK_EVENT } from '../../constants/track-event.constant'
import { expectPaqEvent, resetPaq } from '../../test-utils/paq.mock'
import * as CustomDimensions from './customDimensions.service'

beforeEach(() => {
  resetPaq()
})

describe('CustomDimensions', () => {
  it('sets a custom dimension value', () => {
    CustomDimensions.setCustomDimensionValue(1, 'value')

    expectPaqEvent([
      CUSTOM_DIMENSIONS_TRACK_EVENT.SET_CUSTOM_DIMENSION_VALUE,
      1,
      'value',
    ])
  })

  it('deletes a custom dimension', () => {
    CustomDimensions.deleteCustomDimension(1)

    expectPaqEvent([CUSTOM_DIMENSIONS_TRACK_EVENT.DELETE_CUSTOM_DIMENSION, 1])
  })
})
