import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import VM from 'scratch-vm';

import {setUsername} from '../reducers/tw';

const USERNAME_KEY = 'tw:username';

/**
 * The State Manager is responsible for parsing state from the URL and storing and loading persistent state.
 */

const setLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        // ignore
    }
};

const getLocalStorage = key => {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        // ignore
    }
    return null;
};

const TWStateManager = function (WrappedComponent) {
    class StateManagerComponent extends React.Component {
        componentDidMount () {
            const urlParams = new URLSearchParams(location.search);

            if (urlParams.has('fps')) {
                this.props.vm.setFramerate(+urlParams.get('fps'));
            } else if (urlParams.has('60fps')) {
                this.props.vm.setFramerate(60);
            }

            if (urlParams.has('username')) {
                const username = urlParams.get('username');
                // Do not save username when loaded from URL
                this.doNotPersistUsername = username;
                this.props.onSetUsername(username);
            } else {
                const persistentUsername = getLocalStorage(USERNAME_KEY);
                if (persistentUsername === null) {
                    const randomId = Math.random().toString().substr(2, 6);
                    const randomUsername = `player${randomId}`;
                    setLocalStorage(USERNAME_KEY, randomUsername);
                    this.props.onSetUsername(randomUsername);
                } else {
                    this.props.onSetUsername(persistentUsername);
                }
            }

            if (urlParams.has('hqpen')) {
                this.props.vm.renderer.setUseHighQualityPen(true);
            }

            if (urlParams.has('turbo')) {
                this.props.vm.setTurboMode(true);
            }
        }
        componentDidUpdate (prevProps) {
            if (this.props.username !== prevProps.username && this.props.username !== this.doNotPersistUsername) {
                // TODO: this always restores the current username once at startup, which is unnecessary
                setLocalStorage(USERNAME_KEY, this.props.username);
            }
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                onSetUsername,
                username,
                vm,
                /* eslint-enable no-unused-vars */
                ...props
            } = this.props;
            return (
                <WrappedComponent
                    {...props}
                />
            );
        }
    }
    StateManagerComponent.propTypes = {
        onSetUsername: PropTypes.func,
        username: PropTypes.string,
        vm: PropTypes.instanceOf(VM)
    };
    const mapStateToProps = state => ({
        username: state.scratchGui.tw.username,
        vm: state.scratchGui.vm
    });
    const mapDispatchToProps = dispatch => ({
        onSetUsername: username => dispatch(setUsername(username))
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(StateManagerComponent);
};

export {
    TWStateManager as default
};
