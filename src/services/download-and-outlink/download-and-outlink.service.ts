import { DOWNLOAD_AND_OUTLINK_TRACK_EVENT } from '../../constants/track-event.constant'
import { Dimensions } from './../../interfaces/utils'
import { Tracker } from '../../interfaces/tracker'
import { push } from '../paqService/paq.service'

/**
 * Manually tracks outlink or download event with provided values
 */
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

/**
 * Enables automatic link tracking. If called with `true`, left, right and
 * middle clicks on links will be treated as opening a link. Opening a links to
 * an external site (different domain) creates an outlink event. Opening a link
 * to a downloadable file creates a download event
 */
export function enableLinkTracking(trackAlsoMiddleAndRightClicks = true) {
  push([
    DOWNLOAD_AND_OUTLINK_TRACK_EVENT.ENABLE_LINK_TRACKING,
    trackAlsoMiddleAndRightClicks,
  ])
}

/**
 * Sets a list of class names that indicate whether a link is an outlink and not download
 */
export function setLinkClasses(classes: string[]) {
  push([DOWNLOAD_AND_OUTLINK_TRACK_EVENT.SET_LINK_CLASSES, classes])
}

/**
 * Sets a list of class names that indicate whether a list is a download and not an outlink
 */
export function setDownloadClasses(classes: string[]) {
  push([DOWNLOAD_AND_OUTLINK_TRACK_EVENT.SET_DOWNLOAD_CLASSES, classes])
}

/**
 * Overwrites the list of file extensions indicating that a link is a download
 */
export function setDownloadExtensions(extensions: string[]) {
  push([DOWNLOAD_AND_OUTLINK_TRACK_EVENT.SET_DOWNLOAD_EXTENSIONS, extensions])
}

/**
 * Adds new extensions to the download extensions list
 */
export function addDownloadExtensions(extensions: string[]) {
  push([DOWNLOAD_AND_OUTLINK_TRACK_EVENT.ADD_DOWNLOAD_EXTENSIONS, extensions])
}

/**
 * Removes extensions from the download extensions list
 */
export function removeDownloadExtensions(extensions: string[]) {
  push([
    DOWNLOAD_AND_OUTLINK_TRACK_EVENT.REMOVE_DOWNLOAD_EXTENSIONS,
    extensions,
  ])
}

/**
 * When a visitor produces an events and closes the page immediately afterwards,
 * e.g. when opening a link, the request might get cancelled. To avoid loosing
 * the last event this way, JavaScript Tracking Client will lock the page for a
 * fraction of a second (if wait time hasn’t passed), giving the request time to
 * reach the Collecting & Processing Pipeline
 */
export function setLinkTrackingTimer(time: number) {
  push([DOWNLOAD_AND_OUTLINK_TRACK_EVENT.SET_LINK_TRACKING_TIMER, time])
}

/**
 * Returns lock/wait time after a request set by setLinkTrackingTimer
 */
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

/**
 * Set a list of class names that indicate a link should not be tracked
 */
export function setIgnoreClasses(classes: string[]) {
  push([DOWNLOAD_AND_OUTLINK_TRACK_EVENT.SET_IGNORE_CLASSES, classes])
}
