import ReactDOM from 'react-dom';
import React from 'react';
import {compose} from 'redux';
import AppStateHOC from '../lib/app-state-hoc.jsx';
import TWFullScreenHOC from '../lib/tw-fullscreen-hoc.jsx';

import GUI from './render-gui.jsx';

const appTarget = document.createElement('div');
document.body.appendChild(appTarget);
document.body.classList.add('tw-loaded');

// Read the project ID from location.hash once.
// URL parameters are not used for this as hash is already used elsewhere, and this won't tell TurboWarp.org which project is being loaded. (I don't want to know!)
const projectId = location.hash.substr(1);

const WrappedGUI = compose(
    AppStateHOC,
    TWFullScreenHOC
)(GUI);

ReactDOM.render(<WrappedGUI
    isEmbedded
    projectId={projectId}
/>, appTarget);
