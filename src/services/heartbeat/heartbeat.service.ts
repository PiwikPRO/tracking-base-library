import { HEARTBEAT_TRACK_EVENT } from '../../constants/track-event.constant'
import { push } from '../paqService/paq.service'

export function enableHeartBeatTimer(delays?: number[]): void {
  push([HEARTBEAT_TRACK_EVENT.ENABLE_HEARTBEAT_TIMER, delays])
}

export function disableHeartBeatTimer(): void {
  push([HEARTBEAT_TRACK_EVENT.DISABLE_HEARTBEAT_TIMER])
}
