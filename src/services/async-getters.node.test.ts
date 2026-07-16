/**
 * @jest-environment node
 *
 */
import * as ClientConfiguration from './client-configuration/clientConfiguration.service'
import * as CookieManagement from './cookie-management/cookieManagement.service'
import * as CrossDomainTracking from './cross-domain-tracking/crossDomainTracking.service'
import * as CustomDimensions from './custom-dimensions/customDimensions.service'
import * as DownloadAndOutlink from './download-and-outlink/download-and-outlink.service'
import * as eCommerce from './e-commerce/e-commerce.service'
import * as UserManagement from './user-management/userManagement.service'

// Every async getter delegates to `push`, which reads `window`. In a server
// (node) environment `window` is undefined, so `push` throws a `ReferenceError`
// that the getter catches and surfaces by rejecting its promise. This file
// exercises that rejection branch for each getter — it is unreachable in the
// jsdom environment used by the other suites, where `window` always exists.
const GETTERS: Array<{ name: string; call: () => Promise<unknown> }> = [
  { name: 'UserManagement.getUserId', call: () => UserManagement.getUserId() },
  {
    name: 'UserManagement.getVisitorId',
    call: () => UserManagement.getVisitorId(),
  },
  {
    name: 'UserManagement.getVisitorInfo',
    call: () => UserManagement.getVisitorInfo(),
  },
  {
    name: 'CookieManagement.hasCookies',
    call: () => CookieManagement.hasCookies(),
  },
  {
    name: 'CookieManagement.getCookieDomain',
    call: () => CookieManagement.getCookieDomain(),
  },
  {
    name: 'CookieManagement.getCookiePath',
    call: () => CookieManagement.getCookiePath(),
  },
  {
    name: 'CookieManagement.getConfigVisitorCookieTimeout',
    call: () => CookieManagement.getConfigVisitorCookieTimeout(),
  },
  {
    name: 'CookieManagement.getSessionCookieTimeout',
    call: () => CookieManagement.getSessionCookieTimeout(),
  },
  {
    name: 'ClientConfiguration.getDomains',
    call: () => ClientConfiguration.getDomains(),
  },
  {
    name: 'CustomDimensions.getCustomDimensionValue',
    call: () => CustomDimensions.getCustomDimensionValue(1),
  },
  {
    name: 'CrossDomainTracking.isCrossDomainLinkingEnabled',
    call: () => CrossDomainTracking.isCrossDomainLinkingEnabled(),
  },
  {
    name: 'CrossDomainTracking.getCrossDomainLinkingUrlParameter',
    call: () => CrossDomainTracking.getCrossDomainLinkingUrlParameter(),
  },
  {
    name: 'DownloadAndOutlink.getLinkTrackingTimer',
    call: () => DownloadAndOutlink.getLinkTrackingTimer(),
  },
  {
    name: 'DownloadAndOutlink.getDownloadClasses',
    call: () => DownloadAndOutlink.getDownloadClasses(),
  },
  {
    name: 'eCommerce.getEcommerceItems',
    call: () => eCommerce.getEcommerceItems(),
  },
]

describe('async getters in a server (node) environment', () => {
  it('does not expose window', () => {
    expect(typeof window).toBe('undefined')
  })

  it.each(GETTERS)('$name rejects with a ReferenceError', async ({ call }) => {
    await expect(call()).rejects.toBeInstanceOf(ReferenceError)
  })
})
