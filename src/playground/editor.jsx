import './tw-imports';

import ReactDOM from 'react-dom';
import React from 'react';

import Player from './render-gui.jsx';

const appTarget = document.createElement('div');
document.body.appendChild(appTarget);
document.body.classList.add('tw-loaded');
ReactDOM.render(<Player
    canSeeInside
/>, appTarget);
