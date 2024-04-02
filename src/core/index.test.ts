import { init } from './index'

afterEach(() => {
  const body = document.getElementsByTagName('body')[0]
  body.innerHTML = ''
})

describe('init', () => {
  it('should create and append script element with correct attributes', () => {
    init('containerId', 'containerUrl')

    const script = document.getElementById(
      'PiwikPROInitializer'
    ) as HTMLScriptElement

    expect(script.async).toBe(true)
    expect(script.text).toMatch(
      /window\[dataLayerName\]=window\[dataLayerName\]||\[\]/
    )
  })

  it('should set nonce attribute if provided', () => {
    init('containerId', 'containerUrl', 'nonce')

    const script = document.getElementById(
      'PiwikPROInitializer'
    ) as HTMLScriptElement

    expect(script.nonce).toEqual('nonce')
  })

  it('should log error if containerId is empty', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation()

    init('', 'containerUrl')

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Empty tracking code for Piwik Pro.'
    )
  })

  it('should log error if containerUrl is empty', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation()

    init('containerId', '')

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Empty tracking URL for Piwik Pro.'
    )
  })

  it('should log error if trying to run in server environment', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation()

    const originalWindow = global.window
    // here we simulate as if the code was run in the server environment
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete global.window

    init('containerId', 'containerUrl')

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Was not possible to access window. Make sure this module is running in a browser'
    )

    global.window = originalWindow
  })
})
