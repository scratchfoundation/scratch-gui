const plausibleHost = process.env.PLAUSIBLE_HOST;
const plausibleDomain = process.env.PLAUSIBLE_DOMAIN;
const isFile = location.protocol === 'file:';
const enabled = plausibleHost && plausibleDomain && !isFile;

if (enabled) {
    const sendEvent = eventName => {
        // Delay analytics events until idle, we don't need to run them immediately.
        (window.requestIdleCallback || window.setTimeout)(() => {
            const url = new URL(location.href);

            url.pathname = url.pathname
                // Don't include project IDs
                .replace(/\d/g, '')
                // Removing project IDs might result in multiple slashes: //editor, so merge multiple slashes into one
                .replace(/\/+/g, '/');

            const req = new XMLHttpRequest();
            req.open('POST', `${plausibleHost}/api/event`, true);
            req.setRequestHeader('Content-Type', 'text/plain');
            req.send(JSON.stringify({
                n: eventName,
                u: url.href,
                d: plausibleDomain,
                r: document.referrer || null,
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
