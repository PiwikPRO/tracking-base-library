import { CUSTOM_DIMENSIONS_TRACK_EVENT } from '../../constants/track-event.constant'
import { Tracker } from '../../interfaces/tracker'
import { push } from '../paqService/paq.service'

/**
 * Sets a custom dimension value to be used later.
 */
export function setCustomDimensionValue(
  customDimensionId: string | number,
  customDimensionValue: string
) {
  push([
    CUSTOM_DIMENSIONS_TRACK_EVENT.SET_CUSTOM_DIMENSION_VALUE,
    customDimensionId,
    customDimensionValue,
  ])
}
/**
 * Removes a custom dimension with the specified ID.
 */
export function deleteCustomDimension(customDimensionId: string) {
  push([
    CUSTOM_DIMENSIONS_TRACK_EVENT.DELETE_CUSTOM_DIMENSION,
    customDimensionId,
  ])
}
/**
 * Returns the value of a custom dimension with the specified ID.
 */
export function getCustomDimensionValue(
  customDimensionId: string | number
): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    try {
      push([
        function (this: Tracker): void {
          resolve(this.getCustomDimensionValue(customDimensionId))
        },
      ])
    } catch (e) {
      if (e instanceof ReferenceError) {
        reject(e)
      }
    }
  })
}
