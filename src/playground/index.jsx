import 'es6-object-assign/auto';
import React from 'react';
import ReactDOM from 'react-dom';

import analytics from '../lib/analytics';
import GUI from '../containers/gui.jsx';
import HashParserHOC from '../lib/hash-parser-hoc.jsx';

import styles from './index.css';

if (process.env.NODE_ENV === 'production' && typeof window === 'object') {
    // Warn before navigating away
    window.onbeforeunload = () => true;
}

// Register "base" page view
analytics.pageview('/');

const appTarget = document.createElement('div');
appTarget.className = styles.app;
document.body.appendChild(appTarget);

GUI.setAppElement(appTarget);
const WrappedGui = HashParserHOC(GUI);

ReactDOM.render(<WrappedGui />, appTarget);
