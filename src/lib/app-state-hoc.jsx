import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import throttle from 'redux-throttle';

import {intlInitialState, IntlProvider} from '../reducers/intl.js';
import reducer from '../reducers/gui';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
    applyMiddleware(
        throttle(300, {leading: true, trailing: true})
    )
);
const store = createStore(reducer, intlInitialState, enhancer);

/*
 * Higher Order Component to provide redux state
 * @param {React.Component} WrappedComponent - component to provide state for
 * @returns {React.Component} component with redux and intl state provided
 */
const AppStateHOC = function (WrappedComponent) {
    const AppStateWrapper = ({...props}) => (
        <Provider store={store}>
            <IntlProvider>
                <WrappedComponent {...props} />
            </IntlProvider>
        </Provider>
    );
    return AppStateWrapper;
};

export default AppStateHOC;
