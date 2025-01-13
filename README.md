
<a name="readmemd"></a>


# Piwik PRO Tracking Base Library

Dedicated Piwik PRO library that helps with implementing Piwik PRO Tag Manager and the Piwik PRO tracking client in JavaScript browser applications.

### Installation

#### NPM

To use this package in your project, run the following command.

```
npm install @piwikpro/tracking-base-library
```

#### Basic setup

In your project, include the default `PiwikPro` in the highest level application module. ie `index`. To set up the Piwik PRO Tag Manager container in the app, the easiest way is to call the `PiwikPro.
initialize()` method. `PiwikPro.initialize()` must be initialized using this function before any of the other tracking functions will record any data.

In the arguments, pass your app ID and your account URL as parameters (marked 'container-id' and 'container-url' in the example below).

```ts
import PiwikPro from '@piwikpro/tracking-base-library';

PiwikPro.initialize('container-id', 'container-url');
```

#### Setup with nonce

The nonce attribute is useful to allow-list specific elements, such as a particular inline script or style elements. It can help you to avoid using the CSP unsafe-inline directive, which would allow-list all inline scripts or styles.

If you want your nonce to be passed to the script, pass it as an option to the third argument when calling the script initialization method.

```ts
import PiwikPro from '@piwikpro/tracking-base-library';

PiwikPro.initialize('container-id', 'container-url', { nonce: 'nonce-string' });
```

#### Custom Data Layer Name

```ts
import PiwikPro from '@piwikpro/tracking-base-library';

PiwikPro.initialize('container-id', 'container-url', { dataLayerName: 'my-data-layer' });
```

#### Basic usage
```ts
import { PageViews, GoalConversions } from "@piwikpro/tracking-base-library"

PageViews.trackPageView();

GoalConversions.trackGoal(1, 100);
```


<a name="modulesmd"></a>



### Table of contents

#### Namespaces

- [ClientConfiguration](#modulesclientconfigurationmd)
- [ContentTracking](#modulescontenttrackingmd)
- [CookieManagement](#modulescookiemanagementmd)
- [CrossDomainTracking](#modulescrossdomaintrackingmd)
- [CustomDimensions](#modulescustomdimensionsmd)
- [CustomEvent](#modulescustomeventmd)
- [DataLayer](#modulesdatalayermd)
- [DownloadAndOutlink](#modulesdownloadandoutlinkmd)
- [ErrorTracking](#moduleserrortrackingmd)
- [GoalConversions](#modulesgoalconversionsmd)
- [Heartbeat](#modulesheartbeatmd)
- [PageViews](#modulespageviewsmd)
- [SiteSearch](#modulessitesearchmd)
- [UserManagement](#modulesusermanagementmd)
- [eCommerce](#modulesecommercemd)

#### Type Aliases

- [Dimensions](#dimensions)
- [EcommerceOptions](#ecommerceoptions)
- [InitOptions](#initoptions)
- [PaymentInformation](#paymentinformation)
- [Product](#product)
- [VisitorInfo](#visitorinfo)

#### Variables

- [default](#default)

### Type Aliases

#### Dimensions

Ƭ **Dimensions**: `Record`\<\`dimension$\{number}\`, `string`\>

##### Defined in

[interfaces/utils.ts:11](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/interfaces/utils.ts#L11)

___

#### EcommerceOptions

Ƭ **EcommerceOptions**: `Object`

##### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `currencyCode?` | `string` | Currency code in [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format. If not provided, the currency set in app settings will be used instead. |

##### Defined in

[interfaces/utils.ts:15](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/interfaces/utils.ts#L15)

___

#### InitOptions

Ƭ **InitOptions**: `Object`

##### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataLayerName?` | `string` | Defaults to 'dataLayer' |
| `nonce?` | `string` | - |

##### Defined in

[core/index.ts:4](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/core/index.ts#L4)

___

#### PaymentInformation

Ƭ **PaymentInformation**: `Object`

##### Type declaration

| Name | Type |
| :------ | :------ |
| `discount?` | `number` \| `string` |
| `grandTotal` | `number` \| `string` |
| `orderId` | `string` |
| `shipping?` | `number` \| `string` |
| `subTotal?` | `number` \| `string` |
| `tax?` | `number` \| `string` |

##### Defined in

[interfaces/payment.ts:1](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/interfaces/payment.ts#L1)

___

#### Product

Ƭ **Product**: `Object`

##### Type declaration

| Name | Type |
| :------ | :------ |
| `brand?` | `string` |
| `category?` | `LimitedArrayFiveStrings` |
| `customDimensions?` | `Record`\<`number`, `string`\> |
| `name?` | `string` |
| `price?` | `number` |
| `quantity?` | `number` |
| `sku` | `string` |
| `variant?` | `string` |

##### Defined in

[interfaces/product.ts:3](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/interfaces/product.ts#L3)

___

#### VisitorInfo

Ƭ **VisitorInfo**: [isNew: "0" \| "1", visitorId: string, firstVisitTS: number, previousVisitCount: string \| number, currentVisitTS: number, lastVisitTS: number \| "", lastEcommerceOrderTS: number \| ""]

##### Defined in

[interfaces/visitorInfo.ts:1](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/interfaces/visitorInfo.ts#L1)

### Variables

#### default

• **default**: `Object`

##### Type declaration

| Name | Type |
| :------ | :------ |
| `getInitScript` | (`__namedParameters`: \{ `containerId`: `string` ; `containerUrl`: `string` ; `dataLayerName?`: `string` ; `nonceValue?`: `string`  }) => `string` |
| `initialize` | (`containerId`: `string`, `containerUrl`: `string`, `nonce?`: `string`) => `void`(`containerId`: `string`, `containerUrl`: `string`, `options?`: [`InitOptions`](#initoptions)) => `void` |

##### Defined in

[index.ts:25](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/index.ts#L25)


<a name="modulesclientconfigurationmd"></a>


## ClientConfiguration

### Table of contents


- [getDomains](#getdomains)
- [setDomains](#setdomains)


#### getDomains

▸ **getDomains**(): `Promise`\<`string`[]\>

Returns list of internal domains (set with "setDomains" function and used in outlink tracking).

##### Returns

`Promise`\<`string`[]\>

##### Defined in

[services/client-configuration/clientConfiguration.service.ts:15](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/client-configuration/clientConfiguration.service.ts#L15)

___

#### setDomains

▸ **setDomains**(`domains`): `void`

Allows to define a list of internal domains or mobile app URIs. Used in outlink tracking for determining whether a link is an outlink and in cross domain linking for determining which links should have visitor ID parameter injected.

##### Parameters

| Name | Type |
| :------ | :------ |
| `domains` | `string`[] |

##### Returns

`void`

##### Defined in

[services/client-configuration/clientConfiguration.service.ts:8](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/client-configuration/clientConfiguration.service.ts#L8)


<a name="modulescontenttrackingmd"></a>


## ContentTracking

### Table of contents


- [logAllContentBlocksOnPage](#logallcontentblocksonpage)
- [trackAllContentImpressions](#trackallcontentimpressions)
- [trackContentImpression](#trackcontentimpression)
- [trackContentImpressionsWithinNode](#trackcontentimpressionswithinnode)
- [trackContentInteraction](#trackcontentinteraction)
- [trackContentInteractionNode](#trackcontentinteractionnode)
- [trackVisibleContentImpressions](#trackvisiblecontentimpressions)


#### logAllContentBlocksOnPage

▸ **logAllContentBlocksOnPage**(): `void`

Print all content blocks to the console for debugging purposes

##### Returns

`void`

##### Defined in

[services/content-tracking/contentTracking.service.ts:49](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/content-tracking/contentTracking.service.ts#L49)

___

#### trackAllContentImpressions

▸ **trackAllContentImpressions**(): `void`

Scans the entire DOM for content blocks and tracks impressions after all page
elements load. It does not send duplicates on repeated calls unless
trackPageView was called in between trackAllContentImpressions invocations

##### Returns

`void`

##### Defined in

[services/content-tracking/contentTracking.service.ts:9](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/content-tracking/contentTracking.service.ts#L9)

___

#### trackContentImpression

▸ **trackContentImpression**(`contentName`, `contentPiece`, `contentTarget`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `contentName` | `string` |
| `contentPiece` | `string` |
| `contentTarget` | `string` |

##### Returns

`void`

##### Defined in

[services/content-tracking/contentTracking.service.ts:33](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/content-tracking/contentTracking.service.ts#L33)

___

#### trackContentImpressionsWithinNode

▸ **trackContentImpressionsWithinNode**(`domNode`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `domNode` | `Node` |

##### Returns

`void`

##### Defined in

[services/content-tracking/contentTracking.service.ts:29](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/content-tracking/contentTracking.service.ts#L29)

___

#### trackContentInteraction

▸ **trackContentInteraction**(`contentInteraction`, `contentName`, `contentPiece`, `contentTarget`): `void`

Tracks manual content interaction event

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contentInteraction` | `string` | Type of interaction (e.g. "click") |
| `contentName` | `string` | Name of a content block |
| `contentPiece` | `string` | Name of the content that was displayed (e.g. link to an image) |
| `contentTarget` | `string` | Where the content leads to (e.g. URL of some external website) |

##### Returns

`void`

##### Defined in

[services/content-tracking/contentTracking.service.ts:76](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/content-tracking/contentTracking.service.ts#L76)

___

#### trackContentInteractionNode

▸ **trackContentInteractionNode**(`domNode`, `contentInteraction?`): `void`

Tracks interaction with a block in domNode. Can be called from code placed in onclick attribute

##### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `domNode` | `Node` | `undefined` | Node marked as content block or containing content blocks. If content block can’t be found, nothing will tracked. |
| `contentInteraction` | `string` | `'Unknown'` | Name of interaction (e.g. "click") |

##### Returns

`void`

##### Defined in

[services/content-tracking/contentTracking.service.ts:58](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/content-tracking/contentTracking.service.ts#L58)

___

#### trackVisibleContentImpressions

▸ **trackVisibleContentImpressions**(`checkOnScroll?`, `watchInterval?`): `void`

Scans DOM for all visible content blocks and tracks impressions

##### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `checkOnScroll` | `boolean` | `true` | Whether to scan for visible content on scroll event |
| `watchInterval` | `number` | `750` | Delay, in milliseconds, between scans for new visible content. Periodic checks can be disabled by passing 0 |

##### Returns

`void`

##### Defined in

[services/content-tracking/contentTracking.service.ts:18](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/content-tracking/contentTracking.service.ts#L18)


<a name="modulescookiemanagementmd"></a>


## CookieManagement

### Table of contents


- [deleteCookies](#deletecookies)
- [disableCookies](#disablecookies)
- [enableCookies](#enablecookies)
- [getConfigVisitorCookieTimeout](#getconfigvisitorcookietimeout)
- [getCookieDomain](#getcookiedomain)
- [getCookiePath](#getcookiepath)
- [getSessionCookieTimeout](#getsessioncookietimeout)
- [hasCookies](#hascookies)
- [setCookieDomain](#setcookiedomain)
- [setCookieNamePrefix](#setcookienameprefix)
- [setCookiePath](#setcookiepath)
- [setReferralCookieTimeout](#setreferralcookietimeout)
- [setSecureCookie](#setsecurecookie)
- [setSessionCookieTimeout](#setsessioncookietimeout)
- [setVisitorCookieTimeout](#setvisitorcookietimeout)
- [setVisitorIdCookie](#setvisitoridcookie)


#### deleteCookies

▸ **deleteCookies**(): `void`

Deletes existing tracking cookies on the next page view

##### Returns

`void`

##### Defined in

[services/cookie-management/cookieManagement.service.ts:22](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cookie-management/cookieManagement.service.ts#L22)

___

#### disableCookies

▸ **disableCookies**(): `void`

Disables all first party cookies. Existing cookies will be deleted in the next page view

##### Returns

`void`

##### Defined in

[services/cookie-management/cookieManagement.service.ts:8](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cookie-management/cookieManagement.service.ts#L8)

___

#### enableCookies

▸ **enableCookies**(): `void`

Enables all first party cookies. Cookies will be created on the next tracking request

##### Returns

`void`

##### Defined in

[services/cookie-management/cookieManagement.service.ts:15](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cookie-management/cookieManagement.service.ts#L15)

___

#### getConfigVisitorCookieTimeout

▸ **getConfigVisitorCookieTimeout**(): `Promise`\<`number`\>

Returns expiration time of visitor cookies (in milliseconds)

##### Returns

`Promise`\<`number`\>

##### Defined in

[services/cookie-management/cookieManagement.service.ts:86](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cookie-management/cookieManagement.service.ts#L86)

___

#### getCookieDomain

▸ **getCookieDomain**(): `Promise`\<`string`\>

Returns domain of the analytics tracking cookies (set with setCookieDomain()).

##### Returns

`Promise`\<`string`\>

##### Defined in

[services/cookie-management/cookieManagement.service.ts:48](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cookie-management/cookieManagement.service.ts#L48)

___

#### getCookiePath

▸ **getCookiePath**(): `Promise`\<`string`\>

Returns the analytics tracking cookies path

##### Returns

`Promise`\<`string`\>

##### Defined in

[services/cookie-management/cookieManagement.service.ts:67](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cookie-management/cookieManagement.service.ts#L67)

___

#### getSessionCookieTimeout

▸ **getSessionCookieTimeout**(): `Promise`\<`number`\>

Returns expiration time of session cookies

##### Returns

`Promise`\<`number`\>

##### Defined in

[services/cookie-management/cookieManagement.service.ts:112](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cookie-management/cookieManagement.service.ts#L112)

___

#### hasCookies

▸ **hasCookies**(): `Promise`\<`boolean`\>

Returns true if cookies are enabled in this browser

##### Returns

`Promise`\<`boolean`\>

##### Defined in

[services/cookie-management/cookieManagement.service.ts:29](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cookie-management/cookieManagement.service.ts#L29)

___

#### setCookieDomain

▸ **setCookieDomain**(`domain`): `void`

Sets the domain for the analytics tracking cookies

##### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

##### Returns

`void`

##### Defined in

[services/cookie-management/cookieManagement.service.ts:138](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cookie-management/cookieManagement.service.ts#L138)

___

#### setCookieNamePrefix

▸ **setCookieNamePrefix**(`prefix`): `void`

Sets the prefix for analytics tracking cookies. Default is "_pk_".

##### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `string` |

##### Returns

`void`

##### Defined in

[services/cookie-management/cookieManagement.service.ts:131](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cookie-management/cookieManagement.service.ts#L131)

___

#### setCookiePath

▸ **setCookiePath**(`path`): `void`

Sets the analytics tracking cookies path

##### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

##### Returns

`void`

##### Defined in

[services/cookie-management/cookieManagement.service.ts:145](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cookie-management/cookieManagement.service.ts#L145)

___

#### setReferralCookieTimeout

▸ **setReferralCookieTimeout**(`seconds`): `void`

Sets the expiration time of referral cookies

##### Parameters

| Name | Type |
| :------ | :------ |
| `seconds` | `number` |

##### Returns

`void`

##### Defined in

[services/cookie-management/cookieManagement.service.ts:105](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cookie-management/cookieManagement.service.ts#L105)

___

#### setSecureCookie

▸ **setSecureCookie**(`secure`): `void`

Toggles the secure cookie flag on all first party cookies (if you are using HTTPS)

##### Parameters

| Name | Type |
| :------ | :------ |
| `secure` | `boolean` |

##### Returns

`void`

##### Defined in

[services/cookie-management/cookieManagement.service.ts:152](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cookie-management/cookieManagement.service.ts#L152)

___

#### setSessionCookieTimeout

▸ **setSessionCookieTimeout**(`seconds`): `void`

Sets the expiration time of session cookies

##### Parameters

| Name | Type |
| :------ | :------ |
| `seconds` | `number` |

##### Returns

`void`

##### Defined in

[services/cookie-management/cookieManagement.service.ts:166](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cookie-management/cookieManagement.service.ts#L166)

___

#### setVisitorCookieTimeout

▸ **setVisitorCookieTimeout**(`seconds`): `void`

Sets the expiration time of visitor cookies

##### Parameters

| Name | Type |
| :------ | :------ |
| `seconds` | `number` |

##### Returns

`void`

##### Defined in

[services/cookie-management/cookieManagement.service.ts:159](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cookie-management/cookieManagement.service.ts#L159)

___

#### setVisitorIdCookie

▸ **setVisitorIdCookie**(): `void`

Sets cookie containing [analytics ID](https://developers.piwik.pro/en/latest/glossary.html#term-analytics-id) in browser

##### Returns

`void`

##### Defined in

[services/cookie-management/cookieManagement.service.ts:173](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cookie-management/cookieManagement.service.ts#L173)


<a name="modulescrossdomaintrackingmd"></a>


## CrossDomainTracking

### Table of contents

#### Type Aliases

- [LinkDecorator](#linkdecorator)
- [VisitorIdGetter](#visitoridgetter)


- [customCrossDomainLinkDecorator](#customcrossdomainlinkdecorator)
- [customCrossDomainLinkVisitorIdGetter](#customcrossdomainlinkvisitoridgetter)
- [disableCrossDomainLinking](#disablecrossdomainlinking)
- [enableCrossDomainLinking](#enablecrossdomainlinking)
- [getCrossDomainLinkingUrlParameter](#getcrossdomainlinkingurlparameter)
- [isCrossDomainLinkingEnabled](#iscrossdomainlinkingenabled)
- [setCrossDomainLinkingTimeout](#setcrossdomainlinkingtimeout)

### Type Aliases

#### LinkDecorator

Ƭ **LinkDecorator**: (`url`: `string`, `value`: `string`, `name`: `string`) => `string` \| ``null``

##### Type declaration

▸ (`url`, `value`, `name`): `string` \| ``null``

###### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `value` | `string` |
| `name` | `string` |

###### Returns

`string` \| ``null``

##### Defined in

[services/cross-domain-tracking/crossDomainTracking.service.ts:5](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cross-domain-tracking/crossDomainTracking.service.ts#L5)

___

#### VisitorIdGetter

Ƭ **VisitorIdGetter**: (`url`: `string`, `name`: `string`) => `string`

##### Type declaration

▸ (`url`, `name`): `string`

###### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `name` | `string` |

###### Returns

`string`

##### Defined in

[services/cross-domain-tracking/crossDomainTracking.service.ts:11](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cross-domain-tracking/crossDomainTracking.service.ts#L11)


#### customCrossDomainLinkDecorator

▸ **customCrossDomainLinkDecorator**(`decorator`): `void`

Sets custom cross domains URL decorator for injecting visitor ID into URLs. Used when cross domain linking is enabled.

##### Parameters

| Name | Type |
| :------ | :------ |
| `decorator` | [`LinkDecorator`](#linkdecorator) |

##### Returns

`void`

##### Defined in

[services/cross-domain-tracking/crossDomainTracking.service.ts:75](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cross-domain-tracking/crossDomainTracking.service.ts#L75)

___

#### customCrossDomainLinkVisitorIdGetter

▸ **customCrossDomainLinkVisitorIdGetter**(`getter`): `void`

Sets custom cross domain URL parser for extracting visitor ID from URLs. Should extract data injected by URL decorator. The getter should return visitor ID extracted from page URL.

##### Parameters

| Name | Type |
| :------ | :------ |
| `getter` | [`VisitorIdGetter`](#visitoridgetter) |

##### Returns

`void`

##### Defined in

[services/cross-domain-tracking/crossDomainTracking.service.ts:87](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cross-domain-tracking/crossDomainTracking.service.ts#L87)

___

#### disableCrossDomainLinking

▸ **disableCrossDomainLinking**(): `void`

Disables cross domain linking.

##### Returns

`void`

##### Defined in

[services/cross-domain-tracking/crossDomainTracking.service.ts:23](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cross-domain-tracking/crossDomainTracking.service.ts#L23)

___

#### enableCrossDomainLinking

▸ **enableCrossDomainLinking**(): `void`

Enables cross domain linking. Visitors across domains configured with "setDomains" function will be linked by passing visitor ID parameter in links.

##### Returns

`void`

##### Defined in

[services/cross-domain-tracking/crossDomainTracking.service.ts:16](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cross-domain-tracking/crossDomainTracking.service.ts#L16)

___

#### getCrossDomainLinkingUrlParameter

▸ **getCrossDomainLinkingUrlParameter**(): `Promise`\<`string`\>

Returns the name of a cross domain URL parameter (query parameter by default) holding visitor ID. This is "pk_vid" by default.

##### Returns

`Promise`\<`string`\>

##### Defined in

[services/cross-domain-tracking/crossDomainTracking.service.ts:56](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cross-domain-tracking/crossDomainTracking.service.ts#L56)

___

#### isCrossDomainLinkingEnabled

▸ **isCrossDomainLinkingEnabled**(): `Promise`\<`boolean`\>

Returns boolean telling whether cross domain linking is enabled.

##### Returns

`Promise`\<`boolean`\>

##### Defined in

[services/cross-domain-tracking/crossDomainTracking.service.ts:37](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cross-domain-tracking/crossDomainTracking.service.ts#L37)

___

#### setCrossDomainLinkingTimeout

▸ **setCrossDomainLinkingTimeout**(`timeout`): `void`

Changes the time in which two visits across domains will be linked. The default timeout is 180 seconds (3 minutes).

##### Parameters

| Name | Type |
| :------ | :------ |
| `timeout` | `number` |

##### Returns

`void`

##### Defined in

[services/cross-domain-tracking/crossDomainTracking.service.ts:30](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/cross-domain-tracking/crossDomainTracking.service.ts#L30)


<a name="modulescustomdimensionsmd"></a>


## CustomDimensions

### Table of contents


- [deleteCustomDimension](#deletecustomdimension)
- [getCustomDimensionValue](#getcustomdimensionvalue)
- [setCustomDimensionValue](#setcustomdimensionvalue)


#### deleteCustomDimension

▸ **deleteCustomDimension**(`customDimensionId`): `void`

Removes a custom dimension with the specified ID.

##### Parameters

| Name | Type |
| :------ | :------ |
| `customDimensionId` | `string` \| `number` |

##### Returns

`void`

##### Defined in

[services/custom-dimensions/customDimensions.service.ts:21](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/custom-dimensions/customDimensions.service.ts#L21)

___

#### getCustomDimensionValue

▸ **getCustomDimensionValue**(`customDimensionId`): `Promise`\<`string` \| `undefined`\>

Returns the value of a custom dimension with the specified ID.

##### Parameters

| Name | Type |
| :------ | :------ |
| `customDimensionId` | `string` \| `number` |

##### Returns

`Promise`\<`string` \| `undefined`\>

##### Defined in

[services/custom-dimensions/customDimensions.service.ts:30](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/custom-dimensions/customDimensions.service.ts#L30)

___

#### setCustomDimensionValue

▸ **setCustomDimensionValue**(`customDimensionId`, `customDimensionValue`): `void`

Sets a custom dimension value to be used later.

##### Parameters

| Name | Type |
| :------ | :------ |
| `customDimensionId` | `string` \| `number` |
| `customDimensionValue` | `string` |

##### Returns

`void`

##### Defined in

[services/custom-dimensions/customDimensions.service.ts:8](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/custom-dimensions/customDimensions.service.ts#L8)


<a name="modulescustomeventmd"></a>


## CustomEvent

### Table of contents


- [trackEvent](#trackevent)


#### trackEvent

▸ **trackEvent**(`category`, `action`, `name?`, `value?`, `dimensions?`): `void`

Tracks a custom event, e.g. when a visitor interacts with the page

##### Parameters

| Name | Type |
| :------ | :------ |
| `category` | `string` |
| `action` | `string` |
| `name?` | `string` |
| `value?` | `number` |
| `dimensions?` | [`Dimensions`](#dimensions) |

##### Returns

`void`

##### Defined in

[services/custom-events/customEvents.service.ts:8](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/custom-events/customEvents.service.ts#L8)


<a name="modulesdatalayermd"></a>


## DataLayer

### Table of contents

#### Type Aliases

- [DataLayerEntry](#datalayerentry)


- [push](#push)
- [setDataLayerName](#setdatalayername)

### Type Aliases

#### DataLayerEntry

Ƭ **DataLayerEntry**: `Record`\<`string`, `AnyData`\>

##### Defined in

[services/dataLayer/dataLayer.service.ts:11](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/dataLayer/dataLayer.service.ts#L11)


#### push

▸ **push**(`data`): `number`

Adds entry to a data layer

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`DataLayerEntry`](#datalayerentry) |

##### Returns

`number`

##### Defined in

[services/dataLayer/dataLayer.service.ts:15](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/dataLayer/dataLayer.service.ts#L15)

___

#### setDataLayerName

▸ **setDataLayerName**(`name`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

##### Returns

`void`

##### Defined in

[services/dataLayer/dataLayer.service.ts:7](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/dataLayer/dataLayer.service.ts#L7)


<a name="modulesdownloadandoutlinkmd"></a>


## DownloadAndOutlink

### Table of contents


- [addDownloadExtensions](#adddownloadextensions)
- [enableLinkTracking](#enablelinktracking)
- [getLinkTrackingTimer](#getlinktrackingtimer)
- [removeDownloadExtensions](#removedownloadextensions)
- [setDownloadClasses](#setdownloadclasses)
- [setDownloadExtensions](#setdownloadextensions)
- [setIgnoreClasses](#setignoreclasses)
- [setLinkClasses](#setlinkclasses)
- [setLinkTrackingTimer](#setlinktrackingtimer)
- [trackLink](#tracklink)


#### addDownloadExtensions

▸ **addDownloadExtensions**(`extensions`): `void`

Adds new extensions to the download extensions list

##### Parameters

| Name | Type |
| :------ | :------ |
| `extensions` | `string`[] |

##### Returns

`void`

##### Defined in

[services/download-and-outlink/download-and-outlink.service.ts:61](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/download-and-outlink/download-and-outlink.service.ts#L61)

___

#### enableLinkTracking

▸ **enableLinkTracking**(`trackAlsoMiddleAndRightClicks?`): `void`

Enables automatic link tracking. If called with `true`, left, right and
middle clicks on links will be treated as opening a link. Opening a links to
an external site (different domain) creates an outlink event. Opening a link
to a downloadable file creates a download event

##### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `trackAlsoMiddleAndRightClicks` | `boolean` | `true` |

##### Returns

`void`

##### Defined in

[services/download-and-outlink/download-and-outlink.service.ts:30](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/download-and-outlink/download-and-outlink.service.ts#L30)

___

#### getLinkTrackingTimer

▸ **getLinkTrackingTimer**(): `Promise`\<`number`\>

Returns lock/wait time after a request set by setLinkTrackingTimer

##### Returns

`Promise`\<`number`\>

##### Defined in

[services/download-and-outlink/download-and-outlink.service.ts:89](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/download-and-outlink/download-and-outlink.service.ts#L89)

___

#### removeDownloadExtensions

▸ **removeDownloadExtensions**(`extensions`): `void`

Removes extensions from the download extensions list

##### Parameters

| Name | Type |
| :------ | :------ |
| `extensions` | `string`[] |

##### Returns

`void`

##### Defined in

[services/download-and-outlink/download-and-outlink.service.ts:68](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/download-and-outlink/download-and-outlink.service.ts#L68)

___

#### setDownloadClasses

▸ **setDownloadClasses**(`classes`): `void`

Sets a list of class names that indicate whether a list is a download and not an outlink

##### Parameters

| Name | Type |
| :------ | :------ |
| `classes` | `string`[] |

##### Returns

`void`

##### Defined in

[services/download-and-outlink/download-and-outlink.service.ts:47](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/download-and-outlink/download-and-outlink.service.ts#L47)

___

#### setDownloadExtensions

▸ **setDownloadExtensions**(`extensions`): `void`

Overwrites the list of file extensions indicating that a link is a download

##### Parameters

| Name | Type |
| :------ | :------ |
| `extensions` | `string`[] |

##### Returns

`void`

##### Defined in

[services/download-and-outlink/download-and-outlink.service.ts:54](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/download-and-outlink/download-and-outlink.service.ts#L54)

___

#### setIgnoreClasses

▸ **setIgnoreClasses**(`classes`): `void`

Set a list of class names that indicate a link should not be tracked

##### Parameters

| Name | Type |
| :------ | :------ |
| `classes` | `string`[] |

##### Returns

`void`

##### Defined in

[services/download-and-outlink/download-and-outlink.service.ts:108](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/download-and-outlink/download-and-outlink.service.ts#L108)

___

#### setLinkClasses

▸ **setLinkClasses**(`classes`): `void`

Sets a list of class names that indicate whether a link is an outlink and not download

##### Parameters

| Name | Type |
| :------ | :------ |
| `classes` | `string`[] |

##### Returns

`void`

##### Defined in

[services/download-and-outlink/download-and-outlink.service.ts:40](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/download-and-outlink/download-and-outlink.service.ts#L40)

___

#### setLinkTrackingTimer

▸ **setLinkTrackingTimer**(`time`): `void`

When a visitor produces an events and closes the page immediately afterwards,
e.g. when opening a link, the request might get cancelled. To avoid loosing
the last event this way, JavaScript Tracking Client will lock the page for a
fraction of a second (if wait time hasn’t passed), giving the request time to
reach the Collecting & Processing Pipeline

##### Parameters

| Name | Type |
| :------ | :------ |
| `time` | `number` |

##### Returns

`void`

##### Defined in

[services/download-and-outlink/download-and-outlink.service.ts:82](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/download-and-outlink/download-and-outlink.service.ts#L82)

___

#### trackLink

▸ **trackLink**(`url`, `linkType`, `dimensions?`, `callback?`): `void`

Manually tracks outlink or download event with provided values

##### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `linkType` | `string` |
| `dimensions?` | [`Dimensions`](#dimensions) |
| `callback?` | () => `void` |

##### Returns

`void`

##### Defined in

[services/download-and-outlink/download-and-outlink.service.ts:9](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/download-and-outlink/download-and-outlink.service.ts#L9)


<a name="moduleserrortrackingmd"></a>


## ErrorTracking

### Table of contents


- [enableJSErrorTracking](#enablejserrortracking)
- [trackError](#trackerror)


#### enableJSErrorTracking

▸ **enableJSErrorTracking**(`unique?`): `void`

Enables tracking of unhandled JavaScript errors.

##### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `unique` | `boolean` | `true` | track only unique errors |

##### Returns

`void`

##### Defined in

[services/error-tracking/errorTracking.service.ts:8](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/error-tracking/errorTracking.service.ts#L8)

___

#### trackError

▸ **trackError**(`error`): `void`

Attempts to send error tracking request using same format as native errors caught by enableJSErrorTracking().
Such error request will still follow rules set for tracker, so it will be sent only when JS error tracking is enabled
([enableJSErrorTracking](#enablejserrortracking) function was called before this attempt). It will also respect rules for tracking only unique errors.

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |

##### Returns

`void`

##### Defined in

[services/error-tracking/errorTracking.service.ts:16](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/error-tracking/errorTracking.service.ts#L16)


<a name="modulesgoalconversionsmd"></a>


## GoalConversions

### Table of contents


- [trackGoal](#trackgoal)


#### trackGoal

▸ **trackGoal**(`goalId`, `conversionValue`, `dimensions?`, `options?`): `void`

Tracks manual goal conversion

##### Parameters

| Name | Type |
| :------ | :------ |
| `goalId` | `string` \| `number` |
| `conversionValue` | `number` |
| `dimensions?` | [`Dimensions`](#dimensions) |
| `options?` | [`EcommerceOptions`](#ecommerceoptions) |

##### Returns

`void`

##### Defined in

[services/goal-conversions/goal-conversions.service.ts:8](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/goal-conversions/goal-conversions.service.ts#L8)


<a name="modulesheartbeatmd"></a>


## Heartbeat

### Table of contents


- [disableHeartBeatTimer](#disableheartbeattimer)
- [enableHeartBeatTimer](#enableheartbeattimer)


#### disableHeartBeatTimer

▸ **disableHeartBeatTimer**(): `void`

Disables sending heartbeats if they were previously enabled by "enableHeartBeatTimer" function.

##### Returns

`void`

##### Defined in

[services/heartbeat/heartbeat.service.ts:14](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/heartbeat/heartbeat.service.ts#L14)

___

#### enableHeartBeatTimer

▸ **enableHeartBeatTimer**(`delays?`): `void`

When a visitor is not producing any events (e.g. because they are reading an article or watching a video), we don’t know if they are still on the page. This might skew page statistics, e.g. time on page value. Heartbeat timer allows us to determine how much time visitors spend on a page by sending heartbeats to the Tracker as long as the page is in focus.

##### Parameters

| Name | Type |
| :------ | :------ |
| `delays?` | `number`[] |

##### Returns

`void`

##### Defined in

[services/heartbeat/heartbeat.service.ts:7](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/heartbeat/heartbeat.service.ts#L7)


<a name="modulespageviewsmd"></a>


## PageViews

### Table of contents


- [trackPageView](#trackpageview)


#### trackPageView

▸ **trackPageView**(`customPageTitle?`): `void`

Tracks a visit on the page that the function was run on

##### Parameters

| Name | Type |
| :------ | :------ |
| `customPageTitle?` | `string` |

##### Returns

`void`

##### Defined in

[services/pageViews/pageViews.service.ts:7](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/pageViews/pageViews.service.ts#L7)


<a name="modulessitesearchmd"></a>


## SiteSearch

### Table of contents


- [trackSiteSearch](#tracksitesearch)


#### trackSiteSearch

▸ **trackSiteSearch**(`keyword`, `category?`, `searchCount?`, `dimensions?`): `void`

Tracks search requests on a website

##### Parameters

| Name | Type |
| :------ | :------ |
| `keyword` | `string` |
| `category?` | `string` |
| `searchCount?` | `number` |
| `dimensions?` | [`Dimensions`](#dimensions) |

##### Returns

`void`

##### Defined in

[services/site-search/site-search.service.ts:8](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/site-search/site-search.service.ts#L8)


<a name="modulesusermanagementmd"></a>


## UserManagement

### Table of contents


- [deanonymizeUser](#deanonymizeuser)
- [getUserId](#getuserid)
- [getVisitorId](#getvisitorid)
- [getVisitorInfo](#getvisitorinfo)
- [resetUserId](#resetuserid)
- [setUserId](#setuserid)
- [setUserIsAnonymous](#setuserisanonymous)


#### deanonymizeUser

▸ **deanonymizeUser**(): `void`

Disables anonymous tracking and sends deanonymization event to the Tracker. Recommended method for disabling anonymous tracking.

##### Returns

`void`

##### Defined in

[services/user-management/userManagement.service.ts:89](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/user-management/userManagement.service.ts#L89)

___

#### getUserId

▸ **getUserId**(): `Promise`\<`string`\>

The function that will return user ID

##### Returns

`Promise`\<`string`\>

##### Defined in

[services/user-management/userManagement.service.ts:9](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/user-management/userManagement.service.ts#L9)

___

#### getVisitorId

▸ **getVisitorId**(): `Promise`\<`string`\>

Returns 16-character hex ID of the visitor

##### Returns

`Promise`\<`string`\>

##### Defined in

[services/user-management/userManagement.service.ts:44](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/user-management/userManagement.service.ts#L44)

___

#### getVisitorInfo

▸ **getVisitorInfo**(): `Promise`\<[`VisitorInfo`](#visitorinfo)\>

Returns visitor information in an array

##### Returns

`Promise`\<[`VisitorInfo`](#visitorinfo)\>

##### Defined in

[services/user-management/userManagement.service.ts:63](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/user-management/userManagement.service.ts#L63)

___

#### resetUserId

▸ **resetUserId**(): `void`

Clears previously set userID, e.g. when visitor logs out

##### Returns

`void`

##### Defined in

[services/user-management/userManagement.service.ts:37](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/user-management/userManagement.service.ts#L37)

___

#### setUserId

▸ **setUserId**(`userId`): `void`

User ID is an additional parameter that allows you to aggregate data. When
set up, you will be able to search through sessions by this parameter, filter
reports through it or create Multi attribution reports using User ID

##### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |

##### Returns

`void`

##### Defined in

[services/user-management/userManagement.service.ts:30](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/user-management/userManagement.service.ts#L30)

___

#### setUserIsAnonymous

▸ **setUserIsAnonymous**(`isAnonymous`): `void`

Enables or disables anonymous tracking (anonymous = without consent). The next emitted event will have anonymous mode set accordingly.

##### Parameters

| Name | Type |
| :------ | :------ |
| `isAnonymous` | `boolean` |

##### Returns

`void`

##### Defined in

[services/user-management/userManagement.service.ts:82](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/user-management/userManagement.service.ts#L82)


<a name="modulesecommercemd"></a>


## eCommerce

### Table of contents


- [addEcommerceItem](#addecommerceitem)
- [clearEcommerceCart](#clearecommercecart)
- [ecommerceAddToCart](#ecommerceaddtocart)
- [ecommerceCartUpdate](#ecommercecartupdate)
- [ecommerceOrder](#ecommerceorder)
- [ecommerceProductDetailView](#ecommerceproductdetailview)
- [ecommerceRemoveFromCart](#ecommerceremovefromcart)
- [getEcommerceItems](#getecommerceitems)
- [removeEcommerceItem](#removeecommerceitem)
- [setEcommerceView](#setecommerceview)
- [trackEcommerceCartUpdate](#trackecommercecartupdate)
- [trackEcommerceOrder](#trackecommerceorder)


#### addEcommerceItem

▸ **addEcommerceItem**(`productSKU`, `productName`, `productCategory`, `productPrice`, `productQuantity`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `productSKU` | `string` |
| `productName` | `string` |
| `productCategory` | `string` \| `string`[] |
| `productPrice` | `number` |
| `productQuantity` | `number` |

##### Returns

`void`

**`Deprecated`**

Please use the ecommerceAddToCart instead.

##### Defined in

[services/e-commerce/e-commerce.service.ts:15](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/e-commerce/e-commerce.service.ts#L15)

___

#### clearEcommerceCart

▸ **clearEcommerceCart**(): `void`

##### Returns

`void`

**`Deprecated`**

##### Defined in

[services/e-commerce/e-commerce.service.ts:156](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/e-commerce/e-commerce.service.ts#L156)

___

#### ecommerceAddToCart

▸ **ecommerceAddToCart**(`products`, `options?`): `void`

Tracks action of adding products to a cart

##### Parameters

| Name | Type |
| :------ | :------ |
| `products` | [`Product`](#product)[] |
| `options?` | [`EcommerceOptions`](#ecommerceoptions) |

##### Returns

`void`

##### Defined in

[services/e-commerce/e-commerce.service.ts:35](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/e-commerce/e-commerce.service.ts#L35)

___

#### ecommerceCartUpdate

▸ **ecommerceCartUpdate**(`products`, `grandTotal`, `options?`): `void`

Tracks current state of a cart

##### Parameters

| Name | Type |
| :------ | :------ |
| `products` | [`Product`](#product)[] |
| `grandTotal` | `string` \| `number` |
| `options?` | [`EcommerceOptions`](#ecommerceoptions) |

##### Returns

`void`

##### Defined in

[services/e-commerce/e-commerce.service.ts:126](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/e-commerce/e-commerce.service.ts#L126)

___

#### ecommerceOrder

▸ **ecommerceOrder**(`products`, `paymentInformation`, `options?`): `void`

Tracks conversion, including products and payment details

##### Parameters

| Name | Type |
| :------ | :------ |
| `products` | [`Product`](#product)[] |
| `paymentInformation` | [`PaymentInformation`](#paymentinformation) |
| `options?` | [`EcommerceOptions`](#ecommerceoptions) |

##### Returns

`void`

##### Defined in

[services/e-commerce/e-commerce.service.ts:103](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/e-commerce/e-commerce.service.ts#L103)

___

#### ecommerceProductDetailView

▸ **ecommerceProductDetailView**(`products`, `options?`): `void`

Tracks action of viewing product page

##### Parameters

| Name | Type |
| :------ | :------ |
| `products` | [`Product`](#product)[] |
| `options?` | [`EcommerceOptions`](#ecommerceoptions) |

##### Returns

`void`

##### Defined in

[services/e-commerce/e-commerce.service.ts:142](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/e-commerce/e-commerce.service.ts#L142)

___

#### ecommerceRemoveFromCart

▸ **ecommerceRemoveFromCart**(`products`, `options?`): `void`

Tracks action of removing a products from a cart

##### Parameters

| Name | Type |
| :------ | :------ |
| `products` | [`Product`](#product)[] |
| `options?` | [`EcommerceOptions`](#ecommerceoptions) |

##### Returns

`void`

##### Defined in

[services/e-commerce/e-commerce.service.ts:52](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/e-commerce/e-commerce.service.ts#L52)

___

#### getEcommerceItems

▸ **getEcommerceItems**(): `Promise`\<`object`\>

##### Returns

`Promise`\<`object`\>

**`Deprecated`**

##### Defined in

[services/e-commerce/e-commerce.service.ts:62](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/e-commerce/e-commerce.service.ts#L62)

___

#### removeEcommerceItem

▸ **removeEcommerceItem**(`productSKU`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `productSKU` | `string` |

##### Returns

`void`

**`Deprecated`**

Please use the ecommerceRemoveFromCart instead.

##### Defined in

[services/e-commerce/e-commerce.service.ts:45](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/e-commerce/e-commerce.service.ts#L45)

___

#### setEcommerceView

▸ **setEcommerceView**(`productSKU`, `productName?`, `productCategory?`, `productPrice?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `productSKU` | `string` |
| `productName?` | `string` |
| `productCategory?` | `string`[] |
| `productPrice?` | `string` |

##### Returns

`void`

**`Deprecated`**

##### Defined in

[services/e-commerce/e-commerce.service.ts:163](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/e-commerce/e-commerce.service.ts#L163)

___

#### trackEcommerceCartUpdate

▸ **trackEcommerceCartUpdate**(`cartAmount`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `cartAmount` | `number` |

##### Returns

`void`

**`Deprecated`**

Please use the ecommerceCartUpdate instead.

##### Defined in

[services/e-commerce/e-commerce.service.ts:119](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/e-commerce/e-commerce.service.ts#L119)

___

#### trackEcommerceOrder

▸ **trackEcommerceOrder**(`orderId`, `orderGrandTotal`, `orderSubTotal?`, `orderTax?`, `orderShipping?`, `orderDiscount?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `string` |
| `orderGrandTotal` | `number` |
| `orderSubTotal?` | `number` |
| `orderTax?` | `number` |
| `orderShipping?` | `number` |
| `orderDiscount?` | `number` |

##### Returns

`void`

**`Deprecated`**

Please use the ecommerceOrder instead.

##### Defined in

[services/e-commerce/e-commerce.service.ts:81](https://github.com/PiwikPRO/tracking-base-library/blob/master/src/services/e-commerce/e-commerce.service.ts#L81)
