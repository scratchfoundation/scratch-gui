import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import AppStateHOC from './lib/app-state-hoc.jsx';
import GUI from './containers/gui.jsx';
import ProjectLoaderHOC from './lib/project-loader-hoc.jsx';

import styles from './index.css';

if (process.env.NODE_ENV === 'production' && typeof window === 'object') {
    // Warn before navigating away
    window.onbeforeunload = () => true;
}

// 加载主界面(动态加载项目)
const App = AppStateHOC(ProjectLoaderHOC(GUI));

const appTarget = document.createElement('div');
appTarget.className = styles.app;
document.body.appendChild(appTarget);

Modal.setAppElement(appTarget);

ReactDOM.render(<App />, appTarget);
