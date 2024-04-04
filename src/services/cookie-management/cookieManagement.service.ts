import { COOKIE_TRACK_EVENT } from '../../constants/track-event.constant'
import { Tracker } from '../../interfaces/tracker'
import { push } from '../paqService/paq.service'

/**
 * Disables all first party cookies. Existing cookies will be deleted in the next page view
 */
export function disableCookies() {
  push([COOKIE_TRACK_EVENT.DISABLE_COOKIES])
}

/**
 * Enables all first party cookies. Cookies will be created on the next tracking request
 */
export function enableCookies() {
  push([COOKIE_TRACK_EVENT.ENABLE_COOKIES])
}

/**
 * Deletes existing tracking cookies on the next page view
 */
export function deleteCookies() {
  push([COOKIE_TRACK_EVENT.DELETE_COOKIES])
}

/**
 * Returns true if cookies are enabled in this browser
 */
export function hasCookies(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      push([
        function (this: Tracker) {
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

/**
 * Returns domain of the analytics tracking cookies (set with setCookieDomain()).
 */
export function getCookieDomain(): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      push([
        function (this: Tracker) {
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

/**
 * Returns the analytics tracking cookies path
 */
export function getCookiePath(): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      push([
        function (this: Tracker) {
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

/**
 * Returns expiration time of visitor cookies (in milliseconds)
 */
export function getConfigVisitorCookieTimeout(): Promise<number> {
  return new Promise((resolve, reject) => {
    try {
      push([
        function (this: Tracker) {
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

/**
 * Sets the expiration time of referral cookies
 */
export function setReferralCookieTimeout(seconds: number) {
  push([COOKIE_TRACK_EVENT.SET_REFERRAL_COOKIE_TIMEOUT, seconds])
}

/**
 * Returns expiration time of session cookies
 */
export function getSessionCookieTimeout(): Promise<number> {
  return new Promise((resolve, reject) => {
    try {
      push([
        function (this: Tracker) {
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

/**
 * Sets the prefix for analytics tracking cookies. Default is "_pk_".
 */
export function setCookieNamePrefix(prefix: string) {
  push([COOKIE_TRACK_EVENT.SET_COOKIE_NAME_PREFIX, prefix])
}

/**
 * Sets the domain for the analytics tracking cookies
 */
export function setCookieDomain(domain: string) {
  push([COOKIE_TRACK_EVENT.SET_COOKIE_DOMAIN, domain])
}

/**
 * Sets the analytics tracking cookies path
 */
export function setCookiePath(path: string) {
  push([COOKIE_TRACK_EVENT.SET_COOKIE_PATH, path])
}

/**
 * Toggles the secure cookie flag on all first party cookies (if you are using HTTPS)
 */
export function setSecureCookie(secure: boolean) {
  push([COOKIE_TRACK_EVENT.SET_SECURE_COOKIE, secure])
}

/**
 * Sets the expiration time of visitor cookies
 */
export function setVisitorCookieTimeout(seconds: number) {
  push([COOKIE_TRACK_EVENT.SET_VISITOR_COOKIE_TIMEOUT, seconds])
}

/**
 * Sets the expiration time of session cookies
 */
export function setSessionCookieTimeout(seconds: number) {
  push([COOKIE_TRACK_EVENT.SET_SESSION_COOKIE_TIMEOUT, seconds])
}

/**
 * Sets cookie containing {@link https://developers.piwik.pro/en/latest/glossary.html#term-analytics-id | analytics ID} in browser
 */
export function setVisitorIdCookie() {
  push([COOKIE_TRACK_EVENT.SET_VISITOR_ID_COOKIE])
}
