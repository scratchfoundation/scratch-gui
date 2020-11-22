import React from 'react';
import ReactDOM from 'react-dom';
import {compose} from 'redux';

import AppStateHOC from '../lib/app-state-hoc.jsx';
import GUI from '../containers/gui.jsx';
import HashParserHOC from '../lib/hash-parser-hoc.jsx';
import log from '../lib/log.js';

const onClickLogo = () => {
    window.location = 'https://github.com/SheepTester/scratch-gui#url-parameters';
};

const handleTelemetryModalCancel = () => {
    log('User canceled telemetry modal');
};

const handleTelemetryModalOptIn = () => {
    log('User opted into telemetry');
};

const handleTelemetryModalOptOut = () => {
    log('User opted out of telemetry');
};

function urlOptionValue (name, defaultValue) {
    const matches = window.location.href.match(new RegExp(`[?&]${name}=([^&]*)&?`));
    return matches ? matches[1] : defaultValue;
}

function urlFlag (name, defaultValue = false) {
    const matches = window.location.href.match(new RegExp(`[?&]${name}=([^&]+)`));
    let yes = defaultValue;
    if (matches) {
        try {
            // parse 'true' into `true`, 'false' into `false`, etc.
            yes = JSON.parse(matches[1]);
        } catch {
            // it's not JSON so just use the string
            // note that a typo like "falsy" will be treated as true
            yes = matches[1];
        }
    }
    return yes;
}

/*
 * Render the GUI playground. This is a separate function because importing anything
 * that instantiates the VM causes unsupported browsers to crash
 * {object} appTarget - the DOM element to render to
 */
export default appTarget => {
    GUI.setAppElement(appTarget);

    // note that redux's 'compose' function is just being used as a general utility to make
    // the hierarchy of HOC constructor calls clearer here; it has nothing to do with redux's
    // ability to compose reducers.
    const WrappedGui = compose(
        AppStateHOC,
        HashParserHOC
    )(GUI);

    const loadGriffpatch = urlFlag('load_griffpatch', false);
    if (loadGriffpatch) {
        // From https://github.com/griffpatch/Scratch3-Dev-Tools/blob/master/inject.user.js
        // Ideally, I'd just load inject.user.js directly, but jsdelivr seems to omit it.
        document.head.appendChild(Object.assign(document.createElement('script'), {
            src: 'https://cdn.jsdelivr.net/gh/griffpatch/Scratch3-Dev-Tools/inject3.js'
        }));
        document.head.appendChild(Object.assign(document.createElement('link'), {
            href: 'https://cdn.jsdelivr.net/gh/griffpatch/Scratch3-Dev-Tools/inject.css',
            rel: 'stylesheet'
        }));
    }

    const loadPlugin = urlOptionValue('load_plugin', null);
    if (loadPlugin) {
        document.head.appendChild(Object.assign(document.createElement('script'), {
            src: decodeURIComponent(loadPlugin)
        }));
    }

    // TODO a hack for testing the backpack, allow backpack host to be set by url param
    // (Currently ignored; it'll always use localStorage)
    const backpackHost = decodeURIComponent(urlOptionValue('backpack_host', 'localStorage'));

    const cloudHost = decodeURIComponent(urlOptionValue('cloud_host', 'localStorage'));

    const username = urlOptionValue('username', 'username');

    const simulateScratchDesktop = urlFlag('isScratchDesktop', false);

    const compatibilityMode = urlFlag('compatibility_mode', true);

    const extensionURLs = [];
    const extensionURLRegex = /[?&](?:extension|url)=([^&]*)/g;
    let match;
    while ((match = extensionURLRegex.exec(window.location.href))) {
        extensionURLs.push(match[1]);
    }

    const imposeLimits = urlFlag('limits', true);

    const onVmInit = vm => {
        for (const extensionURL of extensionURLs) {
            vm.extensionManager.loadExtensionURL(decodeURIComponent(extensionURL));
        }
        if (!imposeLimits) {
            vm.requireLimits(imposeLimits);
        }
        window.vm = vm;
    };

    if (process.env.NODE_ENV === 'production' && typeof window === 'object') {
        // Warn before navigating away
        window.onbeforeunload = () => true;
    }

    ReactDOM.render(
        // important: this is checking whether `simulateScratchDesktop` is truthy, not just defined!
        simulateScratchDesktop ?
            <WrappedGui
                canEditTitle
                isScratchDesktop
                showTelemetryModal
                canSave={false}
                onTelemetryModalCancel={handleTelemetryModalCancel}
                onTelemetryModalOptIn={handleTelemetryModalOptIn}
                onTelemetryModalOptOut={handleTelemetryModalOptOut}
            /> :
            <WrappedGui
                canEditTitle
                backpackVisible
                backpackHost={backpackHost}
                cloudHost={cloudHost}
                compatibilityMode={compatibilityMode}
                hasCloudPermission={true}
                canSave={false}
                onClickLogo={onClickLogo}
                onVmInit={onVmInit}
                username={username}
            />,
        appTarget);
};
