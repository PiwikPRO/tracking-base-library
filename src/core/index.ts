import { DEFAULT_DATA_LAYER_NAME } from '../constants/data-layer.constant'
import * as DataLayer from '../services/dataLayer/dataLayer.service'

export type InitOptions = {
  nonce?: string
  /**
   * Defaults to 'dataLayer'
   */
  dataLayerName?: string
}

function getConfig(nonceOrOptions?: string | InitOptions): InitOptions {
  if (typeof nonceOrOptions === 'string') {
    return {
      dataLayerName: DEFAULT_DATA_LAYER_NAME,
      nonce: nonceOrOptions,
    }
  }

  if (!nonceOrOptions) {
    // default config
    return {
      dataLayerName: DEFAULT_DATA_LAYER_NAME,
    }
  }

  return nonceOrOptions
}

export function init(
  containerId: string,
  containerUrl: string,
  nonce?: string
): void
export function init(
  containerId: string,
  containerUrl: string,
  options?: InitOptions
): void
export function init(
  containerId: string,
  containerUrl: string,
  nonceOrOptions?: string | InitOptions
): void {
  if (!containerId) {
    console.error('Empty tracking code for Piwik Pro.')
    return
  }

  if (!containerUrl) {
    console.error('Empty tracking URL for Piwik Pro.')
    return
  }

  if (typeof window === 'undefined') {
    console.error(
      'Was not possible to access window. Make sure this module is running in a browser'
    )
    return
  }

  const config = getConfig(nonceOrOptions)

  if (config.dataLayerName) {
    DataLayer.setDataLayerName(config.dataLayerName)
  }

  const scriptEl = document.createElement('script')

  scriptEl.id = 'PiwikPROInitializer'
  scriptEl.async = true
  if (config.nonce) {
    scriptEl.nonce = config.nonce
  }
  scriptEl.text = getInitScript({
    containerId,
    containerUrl,
    dataLayerName: config.dataLayerName,
    nonceValue: config.nonce,
  })

  const body: HTMLHeadElement = document.getElementsByTagName('body')[0]
  body.prepend(scriptEl)
}

export function getInitScript({
  containerId,
  containerUrl,
  dataLayerName,
  nonceValue,
}: {
  containerId: string
  containerUrl: string
  dataLayerName?: string
  nonceValue?: string
}) {
  const dataLayer = dataLayerName || DEFAULT_DATA_LAYER_NAME
  const nonceTag = nonceValue ? `,tags.nonce="${nonceValue}"` : ''

  return `(function(window, document, dataLayerName, id) {
  window[dataLayerName]=window[dataLayerName]||[],window[dataLayerName].push({start:(new Date).getTime(),event:"stg.start"});var scripts=document.getElementsByTagName('script')[0],tags=document.createElement('script');
  function stgCreateCookie(a,b,c){var d="";if(c){var e=new Date;e.setTime(e.getTime()+24*c*60*60*1e3),d="; expires="+e.toUTCString();f="; SameSite=Strict"}document.cookie=a+"="+b+d+f+"; path=/"}
  var isStgDebug=(window.location.href.match("stg_debug")||document.cookie.match("stg_debug"))&&!window.location.href.match("stg_disable_debug");stgCreateCookie("stg_debug",isStgDebug?1:"",isStgDebug?14:-1);
  var qP=[];dataLayerName!=="dataLayer"&&qP.push("data_layer_name="+dataLayerName)${nonceTag},isStgDebug&&qP.push("stg_debug");var qPString=qP.length>0?("?"+qP.join("&")):"";
  tags.async=!0,tags.src="${containerUrl}/"+id+".js"+qPString,scripts.parentNode.insertBefore(tags,scripts);
  !function(a,n,i){a[n]=a[n]||{};for(var c=0;c<i.length;c++)!function(i){a[n][i]=a[n][i]||{},a[n][i].api=a[n][i].api||function(){var a=[].slice.call(arguments,0);"string"==typeof a[0]&&window[dataLayerName].push({event:n+"."+i+":"+a[0],parameters:[].slice.call(arguments,1)})}}(i[c])}(window,"ppms",["tm","cm"]);
  })(window, document, '${dataLayer}', '${containerId}');`
}

export const IS_DEBUG =
  (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') ||
  (typeof window !== 'undefined' && window.IS_DEBUG) ||
  false
