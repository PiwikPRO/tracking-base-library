import { IS_DEBUG } from '../../core'
import { PAQ_SERVICE_TRACK_EVENT } from '../../constants/track-event.constant'
import { QueueItem } from '../../interfaces/utils'

export function push(collection: QueueItem) {
  if (!window._paq) {
    window._paq = []
  }

  window._paq.push([
    PAQ_SERVICE_TRACK_EVENT.SET_CUSTOM_URL,
    window.location.href,
  ])
  window._paq.push([PAQ_SERVICE_TRACK_EVENT.SET_DOCUMENT_TITLE, document.title])
  IS_DEBUG && console.log('Push', collection)
  return window._paq.push(collection)
}
