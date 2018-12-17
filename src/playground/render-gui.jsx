import React from 'react';
import ReactDOM from 'react-dom';
import {compose} from 'redux';

import AppStateHOC from '../lib/app-state-hoc.jsx';
import GUI from '../containers/gui.jsx';
import HashParserHOC from '../lib/hash-parser-hoc.jsx';
import isScratchDesktop from '../lib/isScratchDesktop';
import TitledHOC from '../lib/titled-hoc.jsx';

const onClickLogo = () => {
    window.location = 'https://scratch.mit.edu';
};

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
        HashParserHOC,
        TitledHOC
    )(GUI);

    // hack for testing the GUI in Scratch Desktop mode
    // add "?isScratchDesktop=1" or similar to the URL
    const scratchDesktopMatches = window.location.href.match(/[?&]isScratchDesktop=([^&]+)/);
    if (scratchDesktopMatches) {
        try {
            // parse 'true' into `true`, 'false' into `false`, etc.
            isScratchDesktop.override = JSON.parse(scratchDesktopMatches[1]);
        } catch {
            // it's not JSON so just use the string
            // note that a typo like "falsy" will be treated as true
            isScratchDesktop.override = scratchDesktopMatches[1];
        }
    }

    // TODO a hack for testing the backpack, allow backpack host to be set by url param
    const backpackHostMatches = window.location.href.match(/[?&]backpack_host=([^&]*)&?/);
    const backpackHost = backpackHostMatches ? backpackHostMatches[1] : null;

    if (process.env.NODE_ENV === 'production' && typeof window === 'object') {
        // Warn before navigating away
        window.onbeforeunload = () => true;
    }

    ReactDOM.render(
        <WrappedGui
            backpackHost={backpackHost}
            backpackVisible={!isScratchDesktop()}
            canSave={false}
            showComingSoon={!isScratchDesktop()}
            showPreviewInfo={!isScratchDesktop()}
            onClickLogo={isScratchDesktop() ? null : onClickLogo}
        />,
        appTarget);
};
