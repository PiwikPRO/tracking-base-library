import { CROSS_DOMAIN_TRACK_EVENT } from '../../constants/track-event.constant'
import {
  expectPaqEvent,
  lastPaqEvent,
  resetPaq,
} from '../../test-utils/paq.mock'
import * as CrossDomainTracking from './crossDomainTracking.service'

beforeEach(() => {
  resetPaq()
})

describe('CrossDomainTracking setters', () => {
  it('enables cross domain linking', () => {
    CrossDomainTracking.enableCrossDomainLinking()

    expectPaqEvent([CROSS_DOMAIN_TRACK_EVENT.ENABLE_CROSS_DOMAIN_LINKING])
  })

  it('disables cross domain linking', () => {
    CrossDomainTracking.disableCrossDomainLinking()

    expectPaqEvent([CROSS_DOMAIN_TRACK_EVENT.DISABLE_CROSS_DOMAIN_LINKING])
  })

  it('sets the cross domain linking timeout', () => {
    CrossDomainTracking.setCrossDomainLinkingTimeout(300)

    expectPaqEvent([
      CROSS_DOMAIN_TRACK_EVENT.SET_CROSS_DOMAIN_LINKING_TIMEOUT,
      300,
    ])
  })
})

describe('CrossDomainTracking custom callbacks', () => {
  it('wraps a custom link decorator and forwards the call and return value', () => {
    const decorator = jest.fn(() => 'decorated-url')
    CrossDomainTracking.customCrossDomainLinkDecorator(decorator)

    const paqEvent = lastPaqEvent()
    expect(paqEvent[0]).toBe(
      CROSS_DOMAIN_TRACK_EVENT.CUSTOM_CROSS_DOMAIN_LINK_DECORATOR
    )
    const wrapper = paqEvent[1] as (...a: unknown[]) => unknown
    const result = wrapper('https://example.com', 'visitor-id', 'pk_vid')

    expect(decorator).toHaveBeenCalledWith(
      'https://example.com',
      'visitor-id',
      'pk_vid'
    )
    expect(result).toBe('decorated-url')
  })

  it('wraps a custom visitor id getter and forwards the call and return value', () => {
    const getter = jest.fn(() => 'visitor-id')
    CrossDomainTracking.customCrossDomainLinkVisitorIdGetter(getter)

    const paqEvent = lastPaqEvent()
    expect(paqEvent[0]).toBe(
      CROSS_DOMAIN_TRACK_EVENT.CUSTOM_CROSS_DOMAIN_LINK_VISITOR_ID_GETTER
    )
    const wrapper = paqEvent[1] as (...a: unknown[]) => unknown
    const result = wrapper('https://example.com', 'pk_vid')

    expect(getter).toHaveBeenCalledWith('https://example.com', 'pk_vid')
    expect(result).toBe('visitor-id')
  })
})
