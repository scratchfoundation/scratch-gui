import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import AppStateHOC from './lib/app-state-hoc.jsx';
import GUI from './containers/gui.jsx';
import ProjectLoaderHOC from './lib/project-loader-hoc.jsx';

import styles from './index.css';

const App = AppStateHOC(ProjectLoaderHOC(GUI));

const appTarget = document.createElement('div');
appTarget.className = styles.app;
document.body.appendChild(appTarget);

Modal.setAppElement(appTarget);

ReactDOM.render(<App />, appTarget);
