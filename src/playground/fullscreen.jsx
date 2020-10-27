import './import-first';

import ReactDOM from 'react-dom';
import React from 'react';

import Interface from './render-interface.jsx';
import appTarget from './app-target';

ReactDOM.render(<Interface
    isPlayerOnly
    isFullScreen
/>, appTarget);
