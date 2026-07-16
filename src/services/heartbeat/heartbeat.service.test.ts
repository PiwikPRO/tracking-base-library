import { HEARTBEAT_TRACK_EVENT } from '../../constants/track-event.constant'
import { expectPaqEvent, resetPaq } from '../../test-utils/paq.mock'
import * as Heartbeat from './heartbeat.service'

beforeEach(() => {
  resetPaq()
})

describe('Heartbeat', () => {
  it('enables the heartbeat timer without delays', () => {
    Heartbeat.enableHeartBeatTimer()

    expectPaqEvent([HEARTBEAT_TRACK_EVENT.ENABLE_HEARTBEAT_TIMER, undefined])
  })

  it('enables the heartbeat timer with custom delays', () => {
    Heartbeat.enableHeartBeatTimer([5, 10])

    expectPaqEvent([HEARTBEAT_TRACK_EVENT.ENABLE_HEARTBEAT_TIMER, [5, 10]])
  })

  it('disables the heartbeat timer', () => {
    Heartbeat.disableHeartBeatTimer()

    expectPaqEvent([HEARTBEAT_TRACK_EVENT.DISABLE_HEARTBEAT_TIMER])
  })
})
