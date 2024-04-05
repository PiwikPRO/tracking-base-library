# Piwik PRO Tracking Base Library

Dedicated Piwik PRO library that helps with implementing Piwik PRO Tag Manager and the Piwik PRO tracking client in JavaScript browser applications.

## Installation

### NPM

To use this package in your project, run the following command.

```
npm install @piwikpro/tracking-base-library
```

### Basic setup

In your project, include the default `PiwikPro` in the highest level application module. ie `index`. To set up the Piwik PRO Tag Manager container in the app, the easiest way is to call the `PiwikPro.
initialize()` method. `PiwikPro.initialize()` must be initialized using this function before any of the other tracking functions will record any data.

In the arguments, pass your app ID and your account URL as parameters (marked 'container-id' and 'container-url' in the example below).

```ts
import PiwikPro from '@piwikpro/tracking-base-library';

PiwikPro.initialize('container-id', 'container-url');
```

### Setup with nonce

The nonce attribute is useful to allow-list specific elements, such as a particular inline script or style elements. It can help you to avoid using the CSP unsafe-inline directive, which would allow-list all inline scripts or styles.

If you want your nonce to be passed to the script, pass it as the third argument when calling the script initialization method.

```ts
import PiwikPro from '@piwikpro/tracking-base-library';

PiwikPro.initialize('container-id', 'container-url', 'nonce-string');
```

### Basic usage
```ts
import { PageViews, GoalConversions } from "@piwikpro/tracking-base-library"

PageViews.trackPageView();

GoalConversions.trackGoal(1, 100);
```
