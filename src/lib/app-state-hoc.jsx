import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import throttle from 'redux-throttle';

import {intlShape} from 'react-intl';
import {IntlProvider, updateIntl} from 'react-intl-redux';
import {intlInitialState} from '../reducers/intl.js';
import reducer from '../reducers/gui';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
    applyMiddleware(
        throttle(300, {leading: true, trailing: true})
    )
);

import ErrorBoundary from '../containers/error-boundary.jsx';

/*
 * Higher Order Component to provide redux state
 * @param {React.Component} WrappedComponent - component to provide state for
 * @returns {React.Component} component with redux and intl state provided
 */
const AppStateHOC = function (WrappedComponent) {
    class AppStateWrapper extends React.Component {
        constructor (props) {
            super(props);
            this.store = createStore(reducer, (props.intl || intlInitialState), enhancer);
        }
        componentDidUpdate (prevProps) {
            if (prevProps.intl !== this.props.intl) updateIntl(this.props.intl);
        }
        render () {
            return (
                <Provider store={this.store}>
                    <IntlProvider>
                        <ErrorBoundary>
                            <WrappedComponent {...this.props} />
                        </ErrorBoundary>
                    </IntlProvider>
                </Provider>
            );

        }


    }
    AppStateWrapper.propTypes = {
        intl: intlShape
    };
    return AppStateWrapper;
};

export default AppStateHOC;
