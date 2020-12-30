// Polyfills
import 'es6-object-assign/auto';
import 'core-js/fn/array/includes';
import 'core-js/fn/promise/finally';
import 'intl'; // For Safari 9

import React from 'react';
import ReactDOM from 'react-dom';
import analytics from '../lib/analytics';
import AppStateHOC from '../lib/app-state-hoc.jsx';
import HashParserHOC from '../lib/hash-parser-hoc.jsx';
import BrowserModalComponent from '../components/browser-modal/browser-modal.jsx';
import {compose} from 'redux';
import supportedBrowser from '../lib/supported-browser';

import styles from './index.css';

import GUI from '../containers/gui.jsx';
// const WrappedGui = AppStateHOC(HashParserHOC(GUI));

// Register "base" page view
analytics.pageview('/');

const appTarget = document.createElement('div');
appTarget.className = styles.app;
document.body.appendChild(appTarget);

if (supportedBrowser()) {
    // require needed here to avoid importing unsupported browser-crashing code
    // at the top level
    require('./render-gui.jsx').default(appTarget);

    //获取session
    // const {requestSession} = require('../lib/session');
    // new Promise((resolve, reject) => {
    //     requestSession(resolve, reject);
    // }).then(session => {
    //     if (typeof session === 'undefined'){ return runScratch({}); }
    //     else return runScratch(session);
    // }, err => {
    //     const session = {"user":{"id":89,"banned":false,"username":"course3","token":"token","thumbnailUrl":"//sc-assets.jzcode.cn/get_image/user/default_32x32.png","dateJoined":"2019-01-03T13:42:06","email":"","classroomId":"0"},"permissions":{"admin":false,"scratcher":true,"social":true,"educator":false,"student":false},"flags":{"must_reset_password":false,"must_complete_registration":false,"has_outstanding_email_confirmation":false,"show_welcome":true,"confirm_email_banner":true,"unsupported_browser_banner":true}}
    //     return runScratch(session);
    // });

    // const redux = require('redux');
    // const store = redux.createStore({})
    // const sessionActions = require('../reducers/session.js');
    // store.dispatch(sessionActions.refreshSession());

} else {
    BrowserModalComponent.setAppElement(appTarget);
    const WrappedBrowserModalComponent = AppStateHOC(BrowserModalComponent, true /* localesOnly */);
    const handleBack = () => {};
    // eslint-disable-next-line react/jsx-no-bind
    ReactDOM.render(<WrappedBrowserModalComponent onBack={handleBack} />, appTarget);
}


function runScratch(session) {
    if (process.env.NODE_ENV === 'production' && typeof window === 'object') {
        window.onbeforeunload = () => true;//在即将离开当前页面(刷新或关闭)时执行 JavaScript
    }
 
    // require('./render-gui.jsx').default(appTarget);
// import BrowserModalComponent from '../components/browser-modal/browser-modal.jsx';

    // const GUI = require('./render-gui.jsx')
    const WrappedGui = compose(AppStateHOC, HashParserHOC)(GUI);
    // const WrappedGui = compose(AppStateHOC,HashParserHOC)(BrowserModalComponent);
    /**
        _session=：用户的登录信息，在app-state-hoc.jsx中使用即可，不需要继续后传
     */
    ReactDOM.render(<WrappedGui _session={session} />, appTarget);        
};