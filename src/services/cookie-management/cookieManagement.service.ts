import { COOKIE_TRACK_EVENT } from '../../constants/track-event.constant'
import { push } from '../paqService/paq.service'

export function disableCookies() {
  push([COOKIE_TRACK_EVENT.DISABLE_COOKIES])
}

export function enableCookies() {
  push([COOKIE_TRACK_EVENT.ENABLE_COOKIES])
}

export function deleteCookies() {
  push([COOKIE_TRACK_EVENT.DELETE_COOKIES])
}

export function hasCookies(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      push([
        function (this: any) {
          resolve(this.hasCookies())
        },
      ])
    } catch (e) {
      if (e instanceof ReferenceError) {
        reject(e)
      }
    }
  })
}
export function getCookieDomain(): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      push([
        function (this: any) {
          resolve(this.getCookieDomain())
        },
      ])
    } catch (e) {
      if (e instanceof ReferenceError) {
        reject(e)
      }
    }
  })
}

export function getCookiePath(): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      push([
        function (this: any) {
          resolve(this.getCookiePath())
        },
      ])
    } catch (e) {
      if (e instanceof ReferenceError) {
        reject(e)
      }
    }
  })
}

export function getConfigVisitorCookieTimeout(): Promise<number> {
  return new Promise((resolve, reject) => {
    try {
      push([
        function (this: any) {
          resolve(this.getConfigVisitorCookieTimeout())
        },
      ])
    } catch (e) {
      if (e instanceof ReferenceError) {
        reject(e)
      }
    }
  })
}

export function setReferralCookieTimeout(seconds: number) {
  push([COOKIE_TRACK_EVENT.SET_REFERRAL_COOKIE_TIMEOUT, seconds])
}

export function getSessionCookieTimeout(): Promise<number> {
  return new Promise((resolve, reject) => {
    try {
      push([
        function (this: any) {
          resolve(this.getSessionCookieTimeout())
        },
      ])
    } catch (e) {
      if (e instanceof ReferenceError) {
        reject(e)
      }
    }
  })
}

export function setCookieNamePrefix(prefix: string) {
  push([COOKIE_TRACK_EVENT.SET_COOKIE_NAME_PREFIX, prefix])
}

export function setCookieDomain(domain: string) {
  push([COOKIE_TRACK_EVENT.SET_COOKIE_DOMAIN, domain])
}

export function setCookiePath(path: string) {
  push([COOKIE_TRACK_EVENT.SET_COOKIE_PATH, path])
}

export function setSecureCookie(secure: boolean) {
  push([COOKIE_TRACK_EVENT.SET_SECURE_COOKIE, secure])
}

export function setVisitorCookieTimeout(seconds: number) {
  push([COOKIE_TRACK_EVENT.SET_VISITOR_COOKIE_TIMEOUT, seconds])
}

export function setSessionCookieTimeout(seconds: number) {
  push([COOKIE_TRACK_EVENT.SET_SESSION_COOKIE_TIMEOUT, seconds])
}

export function setVisitorIdCookie() {
  push([COOKIE_TRACK_EVENT.SET_VISITOR_ID_COOKIE])
}
