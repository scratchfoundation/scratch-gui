import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {createStore, combineReducers, compose} from 'redux';

import {intlShape} from 'react-intl';
import {IntlProvider, updateIntl} from 'react-intl-redux';
import intlReducer from '../reducers/intl.js';

import guiReducer, {guiInitialState, guiMiddleware, initFullScreen, initPlayer} from '../reducers/gui';

import {setPlayer, setFullScreen} from '../reducers/mode.js';

import {ScratchPaintReducer} from 'scratch-paint';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(guiMiddleware);

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
            let initializedGui = guiInitialState;
            if (props.isFullScreen) {
                initializedGui = initFullScreen(initializedGui);
            }
            if (props.isPlayerOnly) {
                initializedGui = initPlayer(initializedGui);
            }
            const reducer = combineReducers({
                intl: intlReducer,
                scratchGui: guiReducer,
                scratchPaint: ScratchPaintReducer
            });

            this.store = createStore(
                reducer,
                {scratchGui: initializedGui},
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
            const {
                intl, // eslint-disable-line no-unused-vars
                isFullScreen, // eslint-disable-line no-unused-vars
                isPlayerOnly, // eslint-disable-line no-unused-vars
                ...componentProps
            } = this.props;
            return (
                <Provider store={this.store}>
                    <IntlProvider>
                        <WrappedComponent {...componentProps} />
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
