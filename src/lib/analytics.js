const PLAUSIBLE_API = process.env.PLAUSIBLE_API;
const PLAUSIBLE_DOMAIN = process.env.PLAUSIBLE_DOMAIN;
const enabled =
    PLAUSIBLE_API &&
    PLAUSIBLE_DOMAIN &&
    // Must be on http: or https:
    (location.protocol === 'http:' || location.protocol === 'https:') &&
    // Domain must match expected
    location.hostname === PLAUSIBLE_DOMAIN &&
    // Respect Do Not Track
    navigator.doNotTrack !== '1' &&
    typeof DISABLE_ANALYTICS === 'undefined';

let referrer = null;
if (enabled && document.referrer) {
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
    // Delay analytics events until idle. We don't need to send them immediately.
    (window.requestIdleCallback || window.setTimeout)(() => {
        const url = new URL(location.href);

        url.pathname = url.pathname
            // Don't include project IDs
            .replace(/\d/g, '')
            // Removing project IDs might result in multiple slashes like //editor, so merge multiple slashes
            .replace(/\/+/g, '/')
            // Remove .html so that old links like /fullscreen.html links will be logged as /fullscreen
            .replace('.html', '')
            // Remove trailing /
            .replace(/(?!^)\/$/, '');

        const req = new XMLHttpRequest();
        req.open('POST', PLAUSIBLE_API, true);
        req.setRequestHeader('Content-Type', 'text/plain');
        req.send(JSON.stringify({
            n: eventName,
            u: url.href,
            d: PLAUSIBLE_DOMAIN,
            r: referrer
        }));
    });
};

if (enabled) {
    sendEvent('pageview');

    window.addEventListener('appinstalled', () => {
        if (document.hidden) return;
        sendEvent('Installed');
    });

    if (window.matchMedia('(display-mode: standalone)').matches) {
        sendEvent('Standalone');
    }
}

const GoogleAnalytics = {
    // Disable Scratch's analytics
    event () {},
    // For TurboWarp's analytics
    twEvent (name) {
        if (enabled) {
            sendEvent(name);
        }
    }
};

export default GoogleAnalytics;
