import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import AppStateHOC from '../lib/app-state-hoc.jsx';
import GreenFlag from '../containers/green-flag.jsx';
import StopAll from '../containers/stop-all.jsx';
import Blocks from '../containers/blocks.jsx';
import GUI from '../containers/gui.jsx';
import ProjectLoaderHOC from '../lib/project-loader-hoc.jsx';

import styles from './blocks-only.css';

const mapStateToProps = (state) => ({vm: state.vm});

const VMBlocks = connect(mapStateToProps)(Blocks);
const VMGreenFlag = connect(mapStateToProps)(GreenFlag);
const VMStopAll = connect(mapStateToProps)(StopAll);

const BlocksOnly = props => (
    <GUI {...props}>
        <VMBlocks
            grow={1}
            options={{
                media: `static/blocks-media/`
            }}
        />
        <VMGreenFlag className={styles.greenFlag} />
        <VMStopAll className={styles.stopAll} />
    </GUI>
);

const App = AppStateHOC(ProjectLoaderHOC(BlocksOnly));

const appTarget = document.createElement('div');
document.body.appendChild(appTarget);

ReactDOM.render(<App />, appTarget);
