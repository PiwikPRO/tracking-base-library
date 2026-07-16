import { DEFAULT_DATA_LAYER_NAME } from '../../constants/data-layer.constant'
import * as DataLayer from './dataLayer.service'

const CUSTOM_NAME = 'customDataLayer'

afterEach(() => {
  // dataLayerName is module-level mutable state — restore the default so tests
  // stay isolated.
  DataLayer.setDataLayerName(DEFAULT_DATA_LAYER_NAME)
  delete window[DEFAULT_DATA_LAYER_NAME]
  delete window[CUSTOM_NAME]
})

describe('DataLayer.push', () => {
  it('lazily creates the default data layer and appends the entry', () => {
    expect(window[DEFAULT_DATA_LAYER_NAME]).toBeUndefined()

    const entry = { event: 'custom-event' }
    const length = DataLayer.push(entry)

    expect(window[DEFAULT_DATA_LAYER_NAME]).toEqual([entry])
    expect(length).toBe(1)
  })

  it('appends subsequent entries to the existing data layer', () => {
    DataLayer.push({ event: 'first' })
    DataLayer.push({ event: 'second' })

    expect(window[DEFAULT_DATA_LAYER_NAME]).toEqual([
      { event: 'first' },
      { event: 'second' },
    ])
  })
})

describe('DataLayer.setDataLayerName', () => {
  it('redirects pushes to the configured data layer', () => {
    DataLayer.setDataLayerName(CUSTOM_NAME)
    DataLayer.push({ event: 'custom' })

    expect(window[CUSTOM_NAME]).toEqual([{ event: 'custom' }])
    expect(window[DEFAULT_DATA_LAYER_NAME]).toBeUndefined()
  })
})

describe('DataLayer debug logging', () => {
  it('logs the entry when IS_DEBUG is enabled', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation()
    window.IS_DEBUG = true
    jest.resetModules()

    const freshDataLayer = await import('./dataLayer.service')
    freshDataLayer.push({ event: 'debug' })

    expect(logSpy).toHaveBeenCalledWith('DataLayer push', { event: 'debug' })

    delete window.IS_DEBUG
    logSpy.mockRestore()
  })
})
