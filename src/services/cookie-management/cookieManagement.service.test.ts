import { COOKIE_TRACK_EVENT } from '../../constants/track-event.constant'
import { expectPaqEvent, resetPaq } from '../../test-utils/paq.mock'
import * as CookieManagement from './cookieManagement.service'

beforeEach(() => {
  resetPaq()
})

const SETTERS: Array<{ method: string; args: unknown[]; paqEvent: unknown[] }> =
  [
    {
      method: 'disableCookies',
      args: [],
      paqEvent: [COOKIE_TRACK_EVENT.DISABLE_COOKIES],
    },
    {
      method: 'enableCookies',
      args: [],
      paqEvent: [COOKIE_TRACK_EVENT.ENABLE_COOKIES],
    },
    {
      method: 'deleteCookies',
      args: [],
      paqEvent: [COOKIE_TRACK_EVENT.DELETE_COOKIES],
    },
    {
      method: 'setVisitorIdCookie',
      args: [],
      paqEvent: [COOKIE_TRACK_EVENT.SET_VISITOR_ID_COOKIE],
    },
    {
      method: 'setReferralCookieTimeout',
      args: [86400],
      paqEvent: [COOKIE_TRACK_EVENT.SET_REFERRAL_COOKIE_TIMEOUT, 86400],
    },
    {
      method: 'setCookieNamePrefix',
      args: ['_pk_'],
      paqEvent: [COOKIE_TRACK_EVENT.SET_COOKIE_NAME_PREFIX, '_pk_'],
    },
    {
      method: 'setCookieDomain',
      args: ['.example.com'],
      paqEvent: [COOKIE_TRACK_EVENT.SET_COOKIE_DOMAIN, '.example.com'],
    },
    {
      method: 'setCookiePath',
      args: ['/'],
      paqEvent: [COOKIE_TRACK_EVENT.SET_COOKIE_PATH, '/'],
    },
    {
      method: 'setSecureCookie',
      args: [true],
      paqEvent: [COOKIE_TRACK_EVENT.SET_SECURE_COOKIE, true],
    },
    {
      method: 'setVisitorCookieTimeout',
      args: [3600],
      paqEvent: [COOKIE_TRACK_EVENT.SET_VISITOR_COOKIE_TIMEOUT, 3600],
    },
    {
      method: 'setSessionCookieTimeout',
      args: [1800],
      paqEvent: [COOKIE_TRACK_EVENT.SET_SESSION_COOKIE_TIMEOUT, 1800],
    },
  ]

describe('CookieManagement setters', () => {
  it.each(SETTERS)(
    '$method pushes the correct command',
    ({ method, args, paqEvent }) => {
      const fn = (
        CookieManagement as Record<string, (...a: unknown[]) => void>
      )[method]
      fn(...args)

      expectPaqEvent(paqEvent)
    }
  )
})
