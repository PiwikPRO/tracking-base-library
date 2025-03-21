import { DataLayerEntry } from '../services/dataLayer/dataLayer.service'
import * as DataLayer from '../services/dataLayer/dataLayer.service'
import { getInitScript, init } from './index'

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
    expect(script.text)
      .toContain(`(function(window, document, dataLayerName, id) {
  window[dataLayerName]=window[dataLayerName]||[],window[dataLayerName].push({start:(new Date).getTime(),event:"stg.start"});var scripts=document.getElementsByTagName('script')[0],tags=document.createElement('script');
  function stgCreateCookie(a,b,c){var d="";if(c){var e=new Date;e.setTime(e.getTime()+24*c*60*60*1e3),d="; expires="+e.toUTCString();f="; SameSite=Strict"}document.cookie=a+"="+b+d+f+"; path=/"}
  var isStgDebug=(window.location.href.match("stg_debug")||document.cookie.match("stg_debug"))&&!window.location.href.match("stg_disable_debug");stgCreateCookie("stg_debug",isStgDebug?1:"",isStgDebug?14:-1);
  var qP=[];dataLayerName!=="dataLayer"&&qP.push("data_layer_name="+dataLayerName),isStgDebug&&qP.push("stg_debug");var qPString=qP.length>0?("?"+qP.join("&")):"";
  tags.async=!0,tags.src="containerUrl/"+id+".js"+qPString,scripts.parentNode.insertBefore(tags,scripts);
  !function(a,n,i){a[n]=a[n]||{};for(var c=0;c<i.length;c++)!function(i){a[n][i]=a[n][i]||{},a[n][i].api=a[n][i].api||function(){var a=[].slice.call(arguments,0);"string"==typeof a[0]&&window[dataLayerName].push({event:n+"."+i+":"+a[0],parameters:[].slice.call(arguments,1)})}}(i[c])}(window,"ppms",["tm","cm"]);
  })(window, document, 'dataLayer', 'containerId');`)
  })

  it('should set nonce attribute if provided', () => {
    init('containerId', 'containerUrl', 'nonce')

    const script = document.getElementById(
      'PiwikPROInitializer'
    ) as HTMLScriptElement

    expect(script.nonce).toEqual('nonce')
  })

  it('should set nonce attribute if provided as option', () => {
    init('containerId', 'containerUrl', { nonce: 'nonce' })

    const script = document.getElementById(
      'PiwikPROInitializer'
    ) as HTMLScriptElement

    expect(script.nonce).toEqual('nonce')
  })

  it('should log error if containerId is empty', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation()

    init('', 'containerUrl')

    const script = document.getElementById(
      'PiwikPROInitializer'
    ) as HTMLScriptElement

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Empty tracking code for Piwik Pro.'
    )
    expect(script).toBeNull()
  })

  it('should log error if containerUrl is empty', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation()

    init('containerId', '')

    const script = document.getElementById(
      'PiwikPROInitializer'
    ) as HTMLScriptElement

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Empty tracking URL for Piwik Pro.'
    )
    expect(script).toBeNull()
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

  it('should push events to the data layer with correct name', () => {
    const dataLayerName = 'my-data-layer'
    init('containerId', 'containerURL', {
      dataLayerName,
    })
    const event = { event: 'event' }
    DataLayer.push(event)

    // first entry is from init script
    expect((window[dataLayerName] as DataLayerEntry[])[1]).toEqual(event)
  })
})

describe('getInitScript', () => {
  it('should include nonce in query parameters when nonce value is provided', () => {
    const scriptContent = getInitScript({
      containerId: 'test-container',
      containerUrl: 'https://example.com',
      dataLayerName: 'dataLayer',
      nonceValue: 'test-nonce',
    })

    expect(scriptContent).toContain(',tags.nonce="test-nonce"')
  })

  it('should not include nonce in query parameters when nonce value is not provided', () => {
    const scriptContent = getInitScript({
      containerId: 'test-container',
      containerUrl: 'https://example.com',
      dataLayerName: 'dataLayer',
    })

    expect(scriptContent).not.toContain('tags.nonce=')
  })

  it('should handle trailing slash in containerUrl', () => {
    // One slash is always added in getInitScript, thats why wrong value is `${containerUrl}//`
    const expectContainerUrl = `https://example.com/`
    const notExpectContainerUrl = `https://example.com//`

    const scriptContent = getInitScript({
      containerUrl: 'https://example.com/',
      containerId: 'test-container',
    })

    expect(scriptContent).toContain(expectContainerUrl)
    expect(scriptContent).not.toContain(notExpectContainerUrl)
  })
})
