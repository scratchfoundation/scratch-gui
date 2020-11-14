import './import-first';

import ReactDOM from 'react-dom';
import React from 'react';
import {compose} from 'redux';
import AppStateHOC from '../lib/app-state-hoc.jsx';
import TWEmbedFullScreenHOC from '../lib/tw-embed-fullscreen-hoc.jsx';
import TWStateManagerHOC from '../lib/tw-state-manager-hoc.jsx';
import TWFullscreenResizerHOC from '../lib/tw-fullscreen-resizer-hoc.jsx';

import GUI from './render-gui.jsx';
import appTarget from './app-target';

const getProjectId = () => {
    // For compatibility reasons, we first look at the hash.
    // eg. https://turbowarp.org/embed.html#1
    const hashMatch = location.hash.match(/#(\d+)/);
    if (hashMatch !== null) {
        return hashMatch[1];
    }
    // Otherwise, we'll recreate what "wildcard" routing does.
    // eg. https://turbowarp.org/1/embed
    const pathMatch = location.pathname.match(/(\d+)\/embed/);
    if (pathMatch !== null) {
        return pathMatch[pathMatch.length - 1];
    }
    return null;
};

const projectId = getProjectId();

let vm;

const onVmInit = _vm => {
    vm = _vm;
};

const onProjectLoaded = () => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.has('autoplay')) {
        vm.start();
        vm.greenFlag();
    }
};

const WrappedGUI = compose(
    AppStateHOC,
    TWStateManagerHOC,
    TWEmbedFullScreenHOC,
    TWFullscreenResizerHOC
)(GUI);

ReactDOM.render(<WrappedGUI
    isEmbedded
    projectId={projectId}
    onVmInit={onVmInit}
    onProjectLoaded={onProjectLoaded}
    routingStyle="none"
/>, appTarget);
