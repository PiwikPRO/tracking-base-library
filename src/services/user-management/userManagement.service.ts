import { Tracker } from '../../interfaces/tracker'
import { USER_MANAGEMENT_TRACK_EVENT } from '../../constants/track-event.constant'
import { VisitorInfo } from '../../interfaces/visitorInfo'
import { push } from '../paqService/paq.service'

/**
 * The function that will return user ID
 */
export function getUserId(): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      push([
        function (this: Tracker): void {
          resolve(this.getUserId())
        },
      ])
    } catch (e) {
      if (e instanceof ReferenceError) {
        reject(e)
      }
    }
  })
}

/**
 * User ID is an additional parameter that allows you to aggregate data. When
 * set up, you will be able to search through sessions by this parameter, filter
 * reports through it or create Multi attribution reports using User ID
 */
export function setUserId(userId: string): void {
  push([USER_MANAGEMENT_TRACK_EVENT.SET_USER_ID, userId])
}

/**
 * Clears previously set userID, e.g. when visitor logs out
 */
export function resetUserId(): void {
  push([USER_MANAGEMENT_TRACK_EVENT.RESET_USER_ID])
}

/**
 * Returns 16-character hex ID of the visitor
 */
export function getVisitorId(): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      push([
        function (this: Tracker): void {
          resolve(this.getVisitorId())
        },
      ])
    } catch (e) {
      if (e instanceof ReferenceError) {
        reject(e)
      }
    }
  })
}

/**
 * Returns visitor information in an array
 */
export function getVisitorInfo(): Promise<VisitorInfo> {
  return new Promise((resolve, reject) => {
    try {
      push([
        function (this: Tracker): void {
          resolve(this.getVisitorInfo())
        },
      ])
    } catch (e) {
      if (e instanceof ReferenceError) {
        reject(e)
      }
    }
  })
}
