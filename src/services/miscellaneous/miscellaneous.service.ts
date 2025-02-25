import { MISCELLANEOUS_TRACK_EVENT } from '../../constants/track-event.constant'
import { push } from '../paqService/paq.service'

/**
 * Adds metadata about used framework
 */
export function setTrackingSourceProvider(provider: string, version: string) {
  push(
    [MISCELLANEOUS_TRACK_EVENT.SET_TRACKING_SOURCE_PROVIDER, provider, version],
    // this function should be called on the startup,
    // we don't want to modify any other configurations as the page may not be fully loaded yet
    { skipSettingPageData: true }
  )
}
