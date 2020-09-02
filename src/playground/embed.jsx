import './tw-imports';

import ReactDOM from 'react-dom';
import React from 'react';
import {compose} from 'redux';
import TWParserHOC from '../lib/tw-parser-hoc.jsx';
import AppStateHOC from '../lib/app-state-hoc.jsx';

import GUI from './render-gui.jsx';

const appTarget = document.createElement('div');
document.body.appendChild(appTarget);
document.body.classList.add('tw-loaded');

const searchParams = new URLSearchParams(location.search);
const projectId = searchParams.get('id');

const WrappedGUI = compose(
    AppStateHOC,
    TWParserHOC
)(GUI);

ReactDOM.render(<WrappedGUI
    isEmbedded
    projectId={projectId}
/>, appTarget);
