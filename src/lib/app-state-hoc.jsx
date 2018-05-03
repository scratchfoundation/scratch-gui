import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import throttle from 'redux-throttle';

import {intlShape} from 'react-intl';
import {IntlProvider, updateIntl} from 'react-intl-redux';
import {intlInitialState} from '../reducers/intl.js';
import {initialState as modeInitialState, setPlayer, setFullScreen} from '../reducers/mode.js';
import reducer from '../reducers/gui';
import ErrorBoundary from '../containers/error-boundary.jsx';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
    applyMiddleware(
        throttle(300, {leading: true, trailing: true})
    )
);

/*
 * Higher Order Component to provide redux state. If an `intl` prop is provided
 * it will override the internal `intl` redux state
 * @param {React.Component} WrappedComponent - component to provide state for
 * @returns {React.Component} component with redux and intl state provided
 */
const AppStateHOC = function (WrappedComponent) {
    class AppStateWrapper extends React.Component {
        constructor (props) {
            super(props);
            let intl = {};
            let mode = {};
            if (props.intl) {
                intl = {
                    defaultLocale: 'en',
                    locale: props.intl.locale,
                    messages: props.intl.messages
                };
            } else {
                intl = intlInitialState.intl;
            }
            if (props.isPlayerOnly || props.isFullScreen) {
                mode = {
                    isFullScreen: props.isFullScreen || false,
                    isPlayerOnly: props.isPlayerOnly || false
                };
            } else {
                mode = modeInitialState;
            }

            this.store = createStore(
                reducer,
                {
                    intl: intl,
                    mode: mode
                },
                enhancer);
        }
        componentDidUpdate (prevProps) {
            if (prevProps.intl !== this.props.intl) {
                this.store.dispatch(updateIntl(this.props.intl));
            }
            if (prevProps.isPlayerOnly !== this.props.isPlayerOnly) {
                this.store.dispatch(setPlayer(this.props.isPlayerOnly));
            }
            if (prevProps.isFullScreen !== this.props.isFullScreen) {
                this.store.dispatch(setFullScreen(this.props.isFullScreen));
            }
        }
        render () {
            return (
                <Provider store={this.store}>
                    <IntlProvider>
                        <ErrorBoundary action="Top Level App">
                            <WrappedComponent {...this.props} />
                        </ErrorBoundary>
                    </IntlProvider>
                </Provider>
            );
        }
    }
    AppStateWrapper.propTypes = {
        intl: intlShape,
        isFullScreen: PropTypes.bool,
        isPlayerOnly: PropTypes.bool
    };
    return AppStateWrapper;
};

export default AppStateHOC;
