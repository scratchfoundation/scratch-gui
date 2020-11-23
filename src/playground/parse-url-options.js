function urlOptionValue (name, defaultValue) {
    const matches = window.location.href.match(new RegExp(`[?&]${name}=([^&]*)&?`));
    return matches ? matches[1] : defaultValue;
}

function urlFlag (name, defaultValue = false) {
    const match = window.location.href.match(new RegExp(`[?&]${name}=([^&]+)`));
    let yes = defaultValue;
    if (match) {
        try {
            // parse 'true' into `true`, 'false' into `false`, etc.
            yes = JSON.parse(match[1]);
        } catch {
            // it's not JSON so just use the string
            // note that a typo like "falsy" will be treated as true
            yes = match[1];
        }
    }
    return yes;
}

function urlFlagInt (name, defaultValue = 0) {
    const match = window.location.href.match(new RegExp(`[?&]${name}=(\\d+)`));
    if (match) {
        return +match[1];
    } else {
        return defaultValue;
    }
}

function urlFlagMultiple (name) {
    const regex = new RegExp(`[?&]${name}=([^&]+)`, 'g');
    const matches = [];
    let match;
    while ((match = regex.exec(window.location.href))) {
        matches.push(match[1]);
    }
    return matches;
}

export default function parseOptionsFromUrl () {
    const loadGriffpatch = urlFlag('load_griffpatch', false);
    const loadPlugins = urlFlagMultiple('load_plugin').map(decodeURIComponent);
    // TODO a hack for testing the backpack, allow backpack host to be set by url param
    // (Currently ignored; it'll always use localStorage)
    const backpackHost = decodeURIComponent(urlOptionValue('backpack_host', 'localStorage'));
    const cloudHost = decodeURIComponent(urlOptionValue('cloud_host', 'localStorage'));
    const username = urlOptionValue('username', 'username');
    const simulateScratchDesktop = urlFlag('isScratchDesktop', false);
    const compatibilityMode = urlFlag('compatibility_mode', true);
    const extensionURLs = urlFlagMultiple('(?:extension|url)').map(decodeURIComponent);
    const imposeLimits = urlFlag('limits', true);
    // ¡Ojo! The GUI does not use what is parsed here. See src/lib/layout-constants.js
    const width = urlFlagInt('width', 480);
    const height = urlFlagInt('height', 360);
    return {
        width,
        height,
        loadGriffpatch,
        loadPlugins,
        backpackHost,
        cloudHost,
        username,
        simulateScratchDesktop,
        compatibilityMode,
        extensionURLs,
        imposeLimits
    };
}
