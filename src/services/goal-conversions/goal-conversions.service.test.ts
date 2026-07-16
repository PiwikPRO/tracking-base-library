import { GOAL_CONVERSIONS_TRACK_EVENT } from '../../constants/track-event.constant'
import {
  expectPaqEvent,
  lastPaqEvent,
  resetPaq,
} from '../../test-utils/paq.mock'
import * as GoalConversions from './goal-conversions.service'

beforeEach(() => {
  resetPaq()
})

describe('GoalConversions.trackGoal', () => {
  it('pushes the goal id and conversion value with trailing undefined arguments', () => {
    GoalConversions.trackGoal(1, 100)

    expectPaqEvent([
      GOAL_CONVERSIONS_TRACK_EVENT.GOAL,
      1,
      100,
      undefined,
      undefined,
    ])
  })

  it('pushes a shallow copy of the dimensions to avoid mutating the caller object', () => {
    const dimensions = { dimension1: 'value' }
    const options = { currencyCode: 'EUR' }
    GoalConversions.trackGoal('goal', 50, dimensions, options)

    const paqEvent = lastPaqEvent()
    expect(paqEvent).toEqual([
      GOAL_CONVERSIONS_TRACK_EVENT.GOAL,
      'goal',
      50,
      { dimension1: 'value' },
      options,
    ])
    expect(paqEvent[3]).not.toBe(dimensions)
  })
})
