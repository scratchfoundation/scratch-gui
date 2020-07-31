// must be first for progress bar to work
import './tw-hacky-progress-bar';

import ReactDOM from 'react-dom';
import React from 'react';

import Player from './render-gui.jsx';

const appTarget = document.createElement('div');
document.body.appendChild(appTarget);
document.body.classList.add('tw-loaded');
ReactDOM.render(<Player
    isPlayerOnly
    // no canSeeInside
/>, appTarget);
