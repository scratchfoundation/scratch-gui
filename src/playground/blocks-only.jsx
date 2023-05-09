import React from 'react';
import ReactDOM from 'react-dom';
// import {connect} from 'react-redux';

// import Controls from '../containers/controls.jsx';
// import Blocks from '../containers/blocks.jsx';
// import GUI from '../containers/gui.jsx';
import HashParserHOC from '../lib/hash-parser-hoc.jsx';
import AppStateHOC from '../lib/app-state-hoc.jsx';

// import styles from './blocks-only.css';

import MicroBitFirmwareWriter from './microbit-firmware-writer.tsx';

// const mapStateToProps = state => ({vm: state.scratchGui.vm});

// const VMBlocks = connect(mapStateToProps)(Blocks);
// const VMControls = connect(mapStateToProps)(Controls);

const BlocksOnly = /* props */() => (
    <MicroBitFirmwareWriter />
);

const App = AppStateHOC(HashParserHOC(BlocksOnly));

const appTarget = document.createElement('div');
document.body.appendChild(appTarget);

ReactDOM.render(<App />, appTarget);
