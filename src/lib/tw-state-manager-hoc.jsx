import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import bindAll from 'lodash.bindall';
import VM from 'scratch-vm';

import {
    setUsername
} from '../reducers/tw';
import {
    openLoadingProject,
    closeLoadingProject
} from '../reducers/modals';
import {
    defaultProjectId,
    getIsFetchingWithoutId,
    setProjectId
} from '../reducers/project-state';
import {
    setPlayer,
    setFullScreen
} from '../reducers/mode';
import * as progressMonitor from '../components/loader/tw-progress-monitor';

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

const playerPath = location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1);
const editorPath = `${playerPath}editor.html`;
const fullscreenPath = `${playerPath}fullscreen.html`;
const useRouting = location.protocol === 'https:' || location.protocol === 'http:';

const TWStateManager = function (WrappedComponent) {
    class StateManagerComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'handleHashChange',
                'handleSearchChange'
            ]);
        }
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
                    const randomNumber = Math.random().toString();
                    const randomId = randomNumber.substr(2, 6);
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

            if (urlParams.has('project_url')) {
                const projectUrl = urlParams.get('project_url');
                this.props.onProjectFetchStarted();
                progressMonitor.fetchWithProgress(projectUrl)
                    .then(res => {
                        if (res.status !== 200) {
                            throw new Error(`Unexpected status code: ${res.status}`);
                        }
                        return res.arrayBuffer();
                    })
                    .then(arrayBuffer => this.props.vm.loadProject(arrayBuffer))
                    .then(() => {
                        this.props.onProjectFetchFinished();
                        this.props.vm.renderer.draw();
                    })
                    .catch(err => {
                        // eslint-disable-next-line no-alert
                        alert(`cannot load project: ${err}`);
                    });
            }

            window.addEventListener('hashchange', this.handleHashChange);
            window.addEventListener('popstate', this.handleSearchChange);
            this.handleHashChange();
        }
        componentDidUpdate (prevProps) {
            if (this.props.username !== prevProps.username && this.props.username !== this.doNotPersistUsername) {
                // TODO: this always restores the current username once at startup, which is unnecessary
                setLocalStorage(USERNAME_KEY, this.props.username);
            }

            let newPathname = location.pathname;
            let newHash = location.hash;

            // Store project ID in the URL.
            if (this.props.isFetchingWithoutId && !prevProps.isFetchingWithoutId) {
                newHash = '';
            } else if (this.props.projectId !== prevProps.projectId && this.props.projectId !== '0') {
                newHash = `#${this.props.projectId}`;
            }

            // Store whether the editor is active.
            if (useRouting && (
                this.props.isPlayerOnly !== prevProps.isPlayerOnly ||
                this.props.isFullScreen !== prevProps.isFullScreen
            )) {
                if (this.props.isFullScreen) {
                    newPathname = fullscreenPath;
                } else if (this.props.isPlayerOnly) {
                    newPathname = playerPath;
                } else {
                    newPathname = editorPath;
                }
            }

            if (newHash !== location.hash || newPathname !== location.pathname) {
                history.pushState('', '', `${newPathname}${location.search}${newHash}`);
            }
        }
        handleHashChange () {
            const hashMatch = window.location.hash.match(/#(\d+)/);
            const hashProjectId = hashMatch === null ? defaultProjectId : hashMatch[1];
            if (this.props.projectId !== hashProjectId) {
                if (this.props.projectChanged) {
                    // eslint-disable-next-line no-alert
                    if (!confirm('Switch to different project?')) {
                        history.pushState('', '', `#${this.props.projectId}`);
                        return;
                    }
                }
                this.props.onSetProjectId(hashProjectId.toString());
            }
        }
        handleSearchChange () {
            if (useRouting) {
                if (location.pathname === editorPath) {
                    if (this.props.isPlayerOnly) {
                        this.props.onSetIsPlayerOnly(false);
                    }
                    if (this.props.isFullScreen) {
                        this.props.onSetIsFullScreen(false);
                    }
                } else if (location.pathname === playerPath) {
                    if (!this.props.isPlayerOnly) {
                        this.props.onSetIsPlayerOnly(true);
                    }
                    if (this.props.isFullScreen) {
                        this.props.onSetIsFullScreen(false);
                    }
                } else if (location.pathname === fullscreenPath) {
                    if (!this.props.isFullScreen) {
                        this.props.onSetIsFullScreen(true);
                    }
                }
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
        onProjectFetchStarted: PropTypes.func,
        onProjectFetchFinished: PropTypes.func,
        vm: PropTypes.instanceOf(VM),
        isFetchingWithoutId: PropTypes.bool,
        isPlayerOnly: PropTypes.bool,
        isFullScreen: PropTypes.bool,
        onSetIsFullScreen: PropTypes.func,
        onSetIsPlayerOnly: PropTypes.func,
        onSetProjectId: PropTypes.func,
        projectChanged: PropTypes.bool,
        projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    };
    const mapStateToProps = state => {
        const loadingState = state.scratchGui.projectState.loadingState;
        return {
            username: state.scratchGui.tw.username,
            vm: state.scratchGui.vm,
            isFetchingWithoutId: getIsFetchingWithoutId(loadingState),
            isFullScreen: state.scratchGui.mode.isFullScreen,
            isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
            projectChanged: state.scratchGui.projectChanged,
            projectId: state.scratchGui.projectState.projectId
        };
    };
    const mapDispatchToProps = dispatch => ({
        onSetUsername: username => dispatch(setUsername(username)),
        onProjectFetchFinished: () => dispatch(closeLoadingProject()),
        onProjectFetchStarted: () => dispatch(openLoadingProject()),
        onSetIsFullScreen: isFullScreen => dispatch(setFullScreen(isFullScreen)),
        onSetIsPlayerOnly: isPlayerOnly => dispatch(setPlayer(isPlayerOnly)),
        onSetProjectId: projectId => dispatch(setProjectId(projectId))
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(StateManagerComponent);
};

export {
    TWStateManager as default
};
