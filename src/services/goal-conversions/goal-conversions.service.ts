import { Dimensions, EcommerceOptions } from './../../interfaces/utils'
import { GOAL_CONVERSIONS_TRACK_EVENT } from '../../constants/track-event.constant'
import { push } from '../paqService/paq.service'

/**
 * Tracks manual goal conversion
 */
export function trackGoal(
  goalId: number | string,
  conversionValue: number,
  dimensions?: Dimensions,
  options?: EcommerceOptions
) {
  push([
    GOAL_CONVERSIONS_TRACK_EVENT.GOAL,
    goalId,
    conversionValue,
    // prevent mutating user-provided object
    dimensions ? { ...dimensions } : undefined,
    options,
  ])
}
