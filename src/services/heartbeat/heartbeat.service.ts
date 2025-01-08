import { HEARTBEAT_TRACK_EVENT } from '../../constants/track-event.constant'
import { push } from '../paqService/paq.service'

/**
 * When a visitor is not producing any events (e.g. because they are reading an article or watching a video), we don’t know if they are still on the page. This might skew page statistics, e.g. time on page value. Heartbeat timer allows us to determine how much time visitors spend on a page by sending heartbeats to the Tracker as long as the page is in focus.
 */
export function enableHeartBeatTimer(delays?: number[]): void {
  push([HEARTBEAT_TRACK_EVENT.ENABLE_HEARTBEAT_TIMER, delays])
}

/**
 * Disables sending heartbeats if they were previously enabled by "enableHeartBeatTimer" function.
 */
export function disableHeartBeatTimer(): void {
  push([HEARTBEAT_TRACK_EVENT.DISABLE_HEARTBEAT_TIMER])
}
