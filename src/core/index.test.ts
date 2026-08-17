import { DataLayerEntry } from '../services/dataLayer/dataLayer.service'
import * as DataLayer from '../services/dataLayer/dataLayer.service'
import { getInitScript, init } from './index'

const CONTAINER_ID = '1f74dda5-b598-41d6-a9e4-f501ef4379e1'
const CONTAINER_URL = 'https://example.com'

afterEach(() => {
  const body = document.getElementsByTagName('body')[0]
  body.innerHTML = ''
})

describe('init', () => {
  it('should create and append script element with correct attributes', () => {
    init(CONTAINER_ID, CONTAINER_URL)

    const script = document.getElementById(
      'PiwikPROInitializer'
    ) as HTMLScriptElement

    expect(script.async).toBe(true)
    expect(script.text).toContain('(function(window, document, config)')
    expect(script.text).toContain(`"containerId":"${CONTAINER_ID}"`)
    expect(script.text).toContain(`"containerUrl":"${CONTAINER_URL}"`)
    expect(script.text).toContain('"dataLayerName":"dataLayer"')
    expect(script.text).toContain('tags.src=config.containerUrl+"/"+id+".js"')
  })

  it('should set nonce attribute if provided', () => {
    init(CONTAINER_ID, CONTAINER_URL, 'nonce')

    const script = document.getElementById(
      'PiwikPROInitializer'
    ) as HTMLScriptElement

    expect(script.nonce).toEqual('nonce')
  })

  it('should set nonce attribute if provided as option', () => {
    init(CONTAINER_ID, CONTAINER_URL, { nonce: 'nonce' })

    const script = document.getElementById(
      'PiwikPROInitializer'
    ) as HTMLScriptElement

    expect(script.nonce).toEqual('nonce')
  })

  it('should log error if containerId is empty', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation()

    init('', CONTAINER_URL)

    const script = document.getElementById(
      'PiwikPROInitializer'
    ) as HTMLScriptElement

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Empty tracking code for Piwik Pro.'
    )
    expect(script).toBeNull()

    consoleErrorMock.mockRestore()
  })

  it('should log error if containerUrl is empty', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation()

    init(CONTAINER_ID, '')

    const script = document.getElementById(
      'PiwikPROInitializer'
    ) as HTMLScriptElement

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Empty tracking URL for Piwik Pro.'
    )
    expect(script).toBeNull()

    consoleErrorMock.mockRestore()
  })

  it('should log error if containerId is not a UUID', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation()

    init('not-a-uuid', CONTAINER_URL)

    expect(consoleErrorMock).toHaveBeenCalledWith(
      expect.stringContaining('Expected a UUID container ID')
    )
    expect(document.getElementById('PiwikPROInitializer')).toBeNull()

    consoleErrorMock.mockRestore()
  })

  it('should log error if containerUrl is not https', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation()

    init(CONTAINER_ID, 'http://example.com')

    expect(consoleErrorMock).toHaveBeenCalledWith(
      expect.stringContaining('Only https: URLs are allowed')
    )
    expect(document.getElementById('PiwikPROInitializer')).toBeNull()

    consoleErrorMock.mockRestore()
  })

  it('should push events to the data layer with correct name', () => {
    const dataLayerName = 'myDataLayer'
    init(CONTAINER_ID, CONTAINER_URL, {
      dataLayerName,
    })
    const event = { event: 'event' }
    DataLayer.push(event)

    // first entry is from init script
    expect((window[dataLayerName] as DataLayerEntry[])[1]).toEqual(event)
  })

  it('should support data layer names with dashes', () => {
    const dataLayerName = 'my-data-layer'
    init(CONTAINER_ID, CONTAINER_URL, {
      dataLayerName,
    })
    const event = { event: 'dashed-layer-event' }
    DataLayer.push(event)

    expect((window[dataLayerName] as DataLayerEntry[])[1]).toEqual(event)
  })
})

describe('getInitScript', () => {
  it('should include nonce in config when nonce value is provided', () => {
    const scriptContent = getInitScript({
      containerId: CONTAINER_ID,
      containerUrl: CONTAINER_URL,
      dataLayerName: 'dataLayer',
      nonceValue: 'test-nonce',
    })

    expect(scriptContent).toContain('"nonceValue":"test-nonce"')
    expect(scriptContent).toContain(
      'config.nonceValue&&(tags.nonce=config.nonceValue)'
    )
  })

  it('should not include nonce in config when nonce value is not provided', () => {
    const scriptContent = getInitScript({
      containerId: CONTAINER_ID,
      containerUrl: CONTAINER_URL,
      dataLayerName: 'dataLayer',
    })

    expect(scriptContent).not.toContain('"nonceValue"')
  })

  it('should handle trailing slash in containerUrl', () => {
    const scriptContent = getInitScript({
      containerUrl: `${CONTAINER_URL}/`,
      containerId: CONTAINER_ID,
    })

    expect(scriptContent).toContain(`"containerUrl":"${CONTAINER_URL}"`)
    expect(scriptContent).not.toContain(`"containerUrl":"${CONTAINER_URL}/"`)
  })

  it('should encode configuration as a JSON object literal', () => {
    const scriptContent = getInitScript({
      containerId: CONTAINER_ID,
      containerUrl: CONTAINER_URL,
    })

    expect(scriptContent).toMatch(
      /\)\(window, document, \{.*"containerId":"1f74dda5-b598-41d6-a9e4-f501ef4379e1".*\}\);$/s
    )
  })

  it('should reject unsafe containerUrl values', () => {
    expect(() =>
      getInitScript({
        containerId: CONTAINER_ID,
        containerUrl: 'https://example.com/";alert(1);//',
      })
    ).toThrow(/control characters, quotes, or whitespace/)
  })

  it('should reject unsafe dataLayerName values', () => {
    expect(() =>
      getInitScript({
        containerId: CONTAINER_ID,
        containerUrl: CONTAINER_URL,
        dataLayerName: "');alert(1);//",
      })
    ).toThrow(/Use letters, digits/)
  })

  it('should encode data layer names with dashes in the config literal', () => {
    const scriptContent = getInitScript({
      containerId: CONTAINER_ID,
      containerUrl: CONTAINER_URL,
      dataLayerName: 'my-data-layer',
    })

    expect(scriptContent).toContain('"dataLayerName":"my-data-layer"')
    expect(scriptContent).toContain('encodeURIComponent(dataLayerName)')
  })
})
