import { Tracker } from '../../interfaces/tracker'
import { USER_MANAGEMENT_TRACK_EVENT } from '../../constants/track-event.constant'
import { VisitorInfo } from '../../interfaces/visitorInfo'
import { push } from '../paqService/paq.service'

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

export function setUserId(userId: string): void {
  push([USER_MANAGEMENT_TRACK_EVENT.SET_USER_ID, userId])
}

export function resetUserId(): void {
  push([USER_MANAGEMENT_TRACK_EVENT.RESET_USER_ID])
}

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
