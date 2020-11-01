const PLAUSIBLE_API = process.env.PLAUSIBLE_API;
const PLAUSIBLE_DOMAIN = process.env.PLAUSIBLE_DOMAIN;
const enabled =
    PLAUSIBLE_API &&
    PLAUSIBLE_DOMAIN &&
    // Must be on http: or https:
    (location.protocol === 'http:' || location.protocol === 'https:') &&
    // Domain must roughly match
    // This type of comparison allows experiments.turbowarp.org and turbowarp.org to use the same domain
    location.origin.includes(PLAUSIBLE_DOMAIN);

if (enabled) {
    let referrer = null;
    if (document.referrer) {
        try {
            // Limit URL precision to origin
            const url = new URL(document.referrer);
            url.pathname = '';
            referrer = url.href;
        } catch (e) {
            // If URL threw, ignore
        }
    }

    const sendEvent = eventName => {
        // Delay analytics events until idle, we don't need to run them immediately.
        (window.requestIdleCallback || window.setTimeout)(() => {
            const url = new URL(location.href);

            url.pathname = url.pathname
                // Don't include project IDs
                .replace(/\d/g, '')
                // Removing project IDs might result in multiple slashes: //editor, so merge multiple slashes
                .replace(/\/+/g, '/');

            const req = new XMLHttpRequest();
            req.open('POST', PLAUSIBLE_API, true);
            req.setRequestHeader('Content-Type', 'text/plain');
            req.send(JSON.stringify({
                n: eventName,
                u: url.href,
                d: PLAUSIBLE_DOMAIN,
                r: referrer,
                w: window.innerWidth
            }));
        });
    };

    const trackPageview = () => {
        sendEvent('pageview');
    };

    const originalPushState = history.pushState;
    history.pushState = (a, b, c) => {
        originalPushState.call(history, a, b, c);
        trackPageview();
    };
    window.addEventListener('popstate', trackPageview);

    trackPageview();
}

// Mock GoogleAnalytics to disable Scratch's events
const GoogleAnalytics = {
    event () {}
};

export default GoogleAnalytics;
