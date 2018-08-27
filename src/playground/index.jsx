// Polyfills
import 'es6-object-assign/auto';
import 'core-js/fn/array/includes';
import 'intl'; // For Safari 9

import React from 'react';
import ReactDOM from 'react-dom';
import bindAll from 'lodash.bindall';

import analytics from '../lib/analytics';
import AppStateHOC from '../lib/app-state-hoc.jsx';
import BrowserModalComponent from '../components/browser-modal/browser-modal.jsx';
import supportedBrowser from '../lib/supported-browser';

import styles from './index.css';

// Register "base" page view
analytics.pageview('/');

const appTarget = document.createElement('div');
appTarget.className = styles.app;
document.body.appendChild(appTarget);

if (supportedBrowser()) {
    // require needed here to avoid importing unsupported browser-crashing code
    // at the top level
    require('./render-gui.jsx').default(appTarget);

} else {
    BrowserModalComponent.setAppElement(appTarget);
    const WrappedBrowserModalComponent = AppStateHOC(BrowserModalComponent, true /* localesOnly */);
    const handleBack = () => {};
    // eslint-disable-next-line react/jsx-no-bind
    ReactDOM.render(<WrappedBrowserModalComponent onBack={handleBack} />, appTarget);
}

// GUI.setAppElement(appTarget);
//
// // simple example of how you might manage project title externally.
// // Changing project title within GUI interface will update it here.
// class TitledGUI extends React.Component {
//     constructor (props) {
//         super(props);
//         bindAll(this, [
//             'handleUpdateProjectTitle'
//         ]);
//         this.state = {
//             projectTitle: 'Untitled-1'
//         };
//     }
//     handleUpdateProjectTitle (newTitle) {
//         this.setState({projectTitle: newTitle});
//     }
//     render () {
//         const {
//             projectTitle, // eslint-disable-line no-unused-vars
//             onUpdateProjectTitle, // eslint-disable-line no-unused-vars
//             ...componentProps
//         } = this.props;
//         return (
//             <GUI
//                 {...componentProps}
//                 projectTitle={this.state.projectTitle}
//                 onUpdateProjectTitle={this.handleUpdateProjectTitle}
//             />
//         );
//     }
// }
//
// const WrappedGui = HashParserHOC(AppStateHOC(TitledGUI));
//
// // TODO a hack for testing the backpack, allow backpack host to be set by url param
// const backpackHostMatches = window.location.href.match(/[?&]backpack_host=([^&]*)&?/);
// const backpackHost = backpackHostMatches ? backpackHostMatches[1] : null;
//
// const backpackOptions = {
//     visible: true,
//     host: backpackHost
// };
//
// ReactDOM.render(
//     <WrappedGui
//         backpackOptions={backpackOptions}
//     />,
//     appTarget
// );
