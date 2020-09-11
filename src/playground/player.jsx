import './tw-self-check';

import ReactDOM from 'react-dom';
import React from 'react';

import Interface from './render-interface.jsx';

const appTarget = document.createElement('div');
document.body.appendChild(appTarget);
document.body.classList.add('tw-loaded');

ReactDOM.render(<Interface
    isPlayerOnly
/>, appTarget);
