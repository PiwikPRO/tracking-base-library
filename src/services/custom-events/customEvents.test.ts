import { trackEvent } from './customEvents.service'
import { push } from '../paqService/paq.service'
import {
  CUSTOM_EVENT_TRACK_EVENT,
  PAQ_SERVICE_TRACK_EVENT,
  TRACK_EVENT
} from '../../constants/track-event.constant'
import { QueueItem, Dimensions } from '../../interfaces/utils'
import { Tracker } from '../../interfaces/tracker'

describe('Tracking functions', () => {
  let mockPushFunction: jest.Mock<number, [QueueItem]>

  beforeEach(() => {
    // Reset window._paq before each test
    mockPushFunction = jest.fn<number, [QueueItem]>()
    window._paq = {
      push: (...args: Parameters<typeof mockPushFunction>) => mockPushFunction(...args)
    } as any

    // Mock console.log for IS_DEBUG cases
    jest.spyOn(console, 'log').mockImplementation(() => {})

    // Mock location and document.title
    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://example.com/test'
      },
      writable: true
    })

    Object.defineProperty(document, 'title', {
      value: 'Test Page',
      writable: true
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('trackEvent function', () => {
    it('should track event with minimal required parameters', () => {
      const category = 'test-category'
      const action = 'test-action'

      trackEvent(category, action)

      expect(mockPushFunction).toHaveBeenCalledWith([
        PAQ_SERVICE_TRACK_EVENT.SET_CUSTOM_URL,
        'https://example.com/test'
      ] as QueueItem)
      expect(mockPushFunction).toHaveBeenCalledWith([
        PAQ_SERVICE_TRACK_EVENT.SET_DOCUMENT_TITLE,
        'Test Page'
      ] as QueueItem)
      expect(mockPushFunction).toHaveBeenCalledWith([
        CUSTOM_EVENT_TRACK_EVENT.CUSTOM_EVENT,
        category,
        action,
        undefined,
        undefined,
        undefined
      ] as QueueItem)
    })

    it('should track event with all parameters', () => {
      const category = 'test-category'
      const action = 'test-action'
      const name = 'test-name'
      const value = 123
      const dimensions: Dimensions = { dimension1: 'test' }

      trackEvent(category, action, name, value, dimensions)

      expect(mockPushFunction).toHaveBeenCalledWith([
        PAQ_SERVICE_TRACK_EVENT.SET_CUSTOM_URL,
        'https://example.com/test'
      ] as QueueItem)
      expect(mockPushFunction).toHaveBeenCalledWith([
        PAQ_SERVICE_TRACK_EVENT.SET_DOCUMENT_TITLE,
        'Test Page'
      ] as QueueItem)
      expect(mockPushFunction).toHaveBeenCalledWith([
        CUSTOM_EVENT_TRACK_EVENT.CUSTOM_EVENT,
        category,
        action,
        name,
        value,
        dimensions
      ] as QueueItem)
    })

    it('should track event with Title, Category and empty dimensions object', () => {
      const category = 'Title'
      const action = 'Category'
      const dimensions: Dimensions = {}

      trackEvent(category, action, undefined, undefined, dimensions)

      expect(mockPushFunction).toHaveBeenCalledWith([
        PAQ_SERVICE_TRACK_EVENT.SET_CUSTOM_URL,
        'https://example.com/test'
      ] as QueueItem)
      expect(mockPushFunction).toHaveBeenCalledWith([
        PAQ_SERVICE_TRACK_EVENT.SET_DOCUMENT_TITLE,
        'Test Page'
      ] as QueueItem)
      expect(mockPushFunction).toHaveBeenCalledWith([
        CUSTOM_EVENT_TRACK_EVENT.CUSTOM_EVENT,
        category,
        action,
        undefined,
        undefined,
        dimensions
      ] as QueueItem)
    })
  })
})