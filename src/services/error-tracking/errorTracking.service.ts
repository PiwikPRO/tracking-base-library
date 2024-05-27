import { ERROR_TRACKING_TRACK_EVENT } from '../../constants/track-event.constant'
import { push } from '../paqService/paq.service'

/**
 * Enables tracking of unhandled JavaScript errors.
 * @param unique track only unique errors
 */
export function enableJSErrorTracking(unique: boolean = true) {
  push([ERROR_TRACKING_TRACK_EVENT.ENABLE_JS_ERROR_TRACKING, unique])
}
/**
 * Attempts to send error tracking request using same format as native errors caught by enableJSErrorTracking().
 * Such error request will still follow rules set for tracker, so it will be sent only when JS error tracking is enabled
 * ({@link enableJSErrorTracking} function was called before this attempt). It will also respect rules for tracking only unique errors.
 */
export function trackError(error: Error) {
  push([ERROR_TRACKING_TRACK_EVENT.TRACK_ERROR, error])
}
