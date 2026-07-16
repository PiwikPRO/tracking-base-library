import { MISCELLANEOUS_TRACK_EVENT } from '../../constants/track-event.constant'
import { getPaq, resetPaq } from '../../test-utils/paq.mock'
import * as Miscellaneous from './miscellaneous.service'

beforeEach(() => {
  resetPaq()
})

describe('Miscellaneous.setTrackingSourceProvider', () => {
  it('pushes the provider and version without the page-data prefix', () => {
    Miscellaneous.setTrackingSourceProvider('react', '1.0.0')

    expect(getPaq()).toEqual([
      [
        MISCELLANEOUS_TRACK_EVENT.SET_TRACKING_SOURCE_PROVIDER,
        'react',
        '1.0.0',
      ],
    ])
  })
})
