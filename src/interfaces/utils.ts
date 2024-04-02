import { TRACK_EVENT } from '../constants/track-event.constant'
import { Tracker } from './tracker'

export type LimitedArrayFiveStrings =
  | [string, ...string[]]
  | [string, string, string, string, string]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyData = any

export type Dimensions = Record<`dimension${number}`, string>

export type QueueItem = [TRACK_EVENT, ...unknown[]] | [(this: Tracker) => void]
