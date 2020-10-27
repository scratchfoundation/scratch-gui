import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
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

// const useRouting = location.protocol === 'https:' || location.protocol === 'http:';
const root = process.env.ROOT;

/**
 * @typedef State
 * @property {string} projectId
 * @property {boolean} isPlayerOnly
 * @property {boolean} isFullScreen
 */

class HashRouter {
    constructor ({onSetProjectId, onSetIsPlayerOnly, onSetIsFullScreen}) {
        this.onSetProjectId = onSetProjectId;
        this.onSetIsPlayerOnly = onSetIsPlayerOnly;
        this.onSetIsFullScreen = onSetIsFullScreen;

        this.playerPath = location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1);
        this.editorPath = `${this.playerPath}editor.html`;
        this.fullscreenPath = `${this.playerPath}fullscreen.html`;

        this.onhashchange();
    }

    onhashchange () {
        const hashMatch = location.hash.match(/#(\d+)/);
        const projectId = hashMatch === null ? defaultProjectId : hashMatch[1];
        this.onSetProjectId(projectId);
    }

    onpathchange () {
        const pathName = location.pathname;

        if (pathName === this.playerPath) {
            this.onSetIsPlayerOnly(true);
            this.onSetIsFullScreen(false);
        } else if (pathName === this.editorPath) {
            this.onSetIsPlayerOnly(false);
            this.onSetIsFullScreen(false);
        } else if (pathName === this.fullscreenPath) {
            this.onSetIsFullScreen(true);
        }
    }

    generateURL ({projectId, isPlayerOnly, isFullScreen}) {
        let newPathname = '';
        let newHash = '';

        if (projectId !== '0') {
            newHash = `#${projectId}`;
        }

        if (isFullScreen) {
            newPathname = this.fullscreenPath;
        } else if (isPlayerOnly) {
            newPathname = this.playerPath;
        } else {
            newPathname = this.editorPath;
        }

        return `${newPathname}${location.search}${newHash}`;
    }
}

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

            const routerCallbacks = {
                onSetProjectId: this.props.onSetProjectId,
                onSetIsPlayerOnly: this.props.onSetIsPlayerOnly,
                onSetIsFullScreen: this.props.onSetIsFullScreen
            };

            this.router = new HashRouter(routerCallbacks);

            window.addEventListener('hashchange', () => this.router.onhashchange());
            window.addEventListener('popstate', () => this.router.onpathchange());
        }
        componentDidUpdate (prevProps) {
            if (this.props.username !== prevProps.username && this.props.username !== this.doNotPersistUsername) {
                // TODO: this always restores the current username once at startup, which is unnecessary
                setLocalStorage(USERNAME_KEY, this.props.username);
            }

            if (
                this.props.projectId !== prevProps.projectId ||
                this.props.isPlayerOnly !== prevProps.isPlayerOnly ||
                this.props.isFullScreen !== prevProps.isFullScreen
            ) {
                const oldPath = `${location.pathname}${location.search}${location.hash}`;
                const routerState = {
                    projectId: this.props.projectId,
                    isPlayerOnly: this.props.isPlayerOnly,
                    isFullScreen: this.props.isFullScreen
                };
                const newPath = this.router.generateURL(routerState);

                if (newPath !== oldPath) {
                    history.pushState(null, null, newPath);
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
    const mapStateToProps = state => ({
        username: state.scratchGui.tw.username,
        vm: state.scratchGui.vm,
        isFullScreen: state.scratchGui.mode.isFullScreen,
        isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
        projectChanged: state.scratchGui.projectChanged,
        projectId: state.scratchGui.projectState.projectId
    });
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
