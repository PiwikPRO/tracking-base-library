/* eslint-disable prettier/prettier */
import init from './index'

describe('init', () => {
  let createElementMock: jest.Mock
  let appendChildMock: jest.Mock

  beforeEach(() => {
    createElementMock = jest.fn().mockReturnValue({
      async: false,
      setAttribute: jest.fn(),
    })
    appendChildMock = jest.fn()
  
    // Mock document.createElement and document.getElementsByTagName
    document.createElement = createElementMock
    document.getElementsByTagName = jest.fn(
      () =>
        [{ appendChild: appendChildMock }] as unknown as HTMLCollectionOf<any>
    )
  })

  afterEach(() => {
    jest.restoreAllMocks()
    jest.resetModules()
  })

  it('should create and append script element with correct attributes', () => {
    init.init('containerId', 'containerUrl')

    expect(createElementMock).toHaveBeenCalledWith('script')
    expect(createElementMock.mock.results[0].value.async).toBe(true)
    expect(createElementMock.mock.results[0].value.text).toMatch(
      /window\[dataLayerName\]=window\[dataLayerName\]||\[\]/
    )
    expect(appendChildMock).toHaveBeenCalledWith(
      createElementMock.mock.results[0].value
    )
  })

  it('should set nonce attribute if provided', () => {
    init.init('containerId', 'containerUrl', 'nonce')

    expect(
      createElementMock.mock.results[0].value.setAttribute
    ).toHaveBeenCalledWith('nonce', 'nonce')
  })

  it('should log error if containerId is empty', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation()

    init.init('', 'containerUrl')

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Empty tracking code for Piwik Pro.'
    )
  })

  it('should log error if containerUrl is empty', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation()

    init.init('containerId', '')

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Empty tracking URL for Piwik Pro.'
    )
  })

  it('should log error if document is not available', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation()
  
    const originalCreateElement = document.createElement
    document.createElement = () => { throw new Error('document not available') }
  
    init.init('containerId', 'containerUrl')
  
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Was not possible to access Document interface. Make sure this module is running on a Browser w/ access do Document interface.'
    )
  
    document.createElement = originalCreateElement
  })
})
