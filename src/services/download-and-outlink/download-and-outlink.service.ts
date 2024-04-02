import { DOWNLOAD_AND_OUTLINK_TRACK_EVENT } from '../../constants/track-event.constant'
import { Dimensions } from './../../interfaces/utils'
import { Tracker } from '../../interfaces/tracker'
import { push } from '../paqService/paq.service'

export function trackLink(
  url: string,
  linkType: string,
  dimensions?: Dimensions,
  callback?: () => void
) {
  push([
    DOWNLOAD_AND_OUTLINK_TRACK_EVENT.LINK,
    url,
    linkType,
    dimensions,
    callback,
  ])
}

export function enableLinkTracking(enable: boolean) {
  push([DOWNLOAD_AND_OUTLINK_TRACK_EVENT.ENABLE_LINK_TRACKING, enable])
}

export function setLinkClasses(classes: string[]) {
  push([DOWNLOAD_AND_OUTLINK_TRACK_EVENT.SET_LINK_CLASSES, classes])
}

export function setDownloadClasses(classes: string[]) {
  push([DOWNLOAD_AND_OUTLINK_TRACK_EVENT.SET_DOWNLOAD_CLASSES, classes])
}

export function setDownloadExtensions(extensions: string[]) {
  push([DOWNLOAD_AND_OUTLINK_TRACK_EVENT.SET_DOWNLOAD_EXTENSIONS, extensions])
}

export function addDownloadExtensions(extensions: string[]) {
  push([DOWNLOAD_AND_OUTLINK_TRACK_EVENT.ADD_DOWNLOAD_EXTENSIONS, extensions])
}

export function removeDownloadExtensions(extensions: string[]) {
  push([
    DOWNLOAD_AND_OUTLINK_TRACK_EVENT.REMOVE_DOWNLOAD_EXTENSIONS,
    extensions,
  ])
}

export function setLinkTrackingTimer(time: number) {
  push([DOWNLOAD_AND_OUTLINK_TRACK_EVENT.SET_LINK_TRACKING_TIMER, time])
}

export function getLinkTrackingTimer(): Promise<number> {
  return new Promise((resolve, reject) => {
    try {
      push([
        function (this: Tracker) {
          resolve(this.getLinkTrackingTimer())
        },
      ])
    } catch (e) {
      if (e instanceof ReferenceError) {
        reject(e)
      }
    }
  })
}

export function setIgnoreClasses(classes: string[]) {
  push([DOWNLOAD_AND_OUTLINK_TRACK_EVENT.SET_IGNORE_CLASSES, classes])
}
