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
            if (props.intl) {
                intl = {
                    intl: {
                        defaultLocale: 'en',
                        locale: props.intl.locale,
                        messages: props.intl.messages
                    }
                };
            } else {
                intl = intlInitialState;
            }

            this.store = createStore(reducer, intl, enhancer);
        }
        componentDidUpdate (prevProps) {
            if (prevProps.intl !== this.props.intl) updateIntl(this.props.intl);
        }
        render () {
            return (
                <Provider store={this.store}>
                    <IntlProvider>
                        <WrappedComponent {...this.props} />
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
