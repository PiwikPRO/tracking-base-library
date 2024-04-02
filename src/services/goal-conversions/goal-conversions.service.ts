import { Dimensions } from './../../interfaces/utils'
import { GOAL_CONVERSIONS_TRACK_EVENT } from '../../constants/track-event.constant'
import { push } from '../paqService/paq.service'

export function trackGoal(
  goalId: number | string,
  conversionValue: number,
  dimensions?: Dimensions
) {
  push([
    GOAL_CONVERSIONS_TRACK_EVENT.GOAL,
    goalId,
    conversionValue,
    ...(dimensions ? [{ ...dimensions }] : []),
  ])
}
