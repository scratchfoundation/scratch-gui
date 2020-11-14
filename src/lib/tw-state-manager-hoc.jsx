import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import bindAll from 'lodash.bindall';
import VM from 'scratch-vm';
import log from './log';

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
 * The State Manager is responsible for managing persistent state and the URL.
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

const readHashProjectId = () => {
    const match = location.hash.match(/#(\d+)/);
    return match === null ? null : match[1];
};

class Router {
    constructor ({onSetProjectId, onSetIsPlayerOnly, onSetIsFullScreen}) {
        this.onSetProjectId = onSetProjectId;
        this.onSetIsPlayerOnly = onSetIsPlayerOnly;
        this.onSetIsFullScreen = onSetIsFullScreen;
    }

    onhashchange () {

    }

    onpathchange () {

    }

    generateURL () {
        return '';
    }
}

class HashRouter extends Router {
    onhashchange () {
        this.onSetProjectId(readHashProjectId() || defaultProjectId);
    }

    generateURL ({projectId}) {
        return `${location.pathname}${location.search}#${projectId}`;
    }
}

class FileHashRouter extends HashRouter {
    constructor (callbacks) {
        super(callbacks);
        this.playerPath = location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1);
        this.editorPath = `${this.playerPath}editor.html`;
        this.fullscreenPath = `${this.playerPath}fullscreen.html`;
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

class WildcardRouter extends Router {
    constructor (callbacks) {
        super(callbacks);
        this.root = process.env.ROOT;
    }

    onhashchange () {
        const hashProjectId = readHashProjectId();
        if (hashProjectId) {
            this.onSetProjectId(hashProjectId);
            // Completely remove the hash
            history.replaceState(null, null, `${location.pathname}${location.search}`);
        } else {
            // Do not detect page type here as it is already setup by index.html, editor.html, etc.
            this.parseURL(false);
        }
    }

    onpathchange () {
        this.parseURL(true);
    }

    parseURL (detectPageType) {
        const path = location.pathname.substr(this.root.length);
        const parts = path.split('/');

        const parseProjectId = id => {
            if (id) {
                this.onSetProjectId(id);
            } else {
                this.onSetProjectId(defaultProjectId);
            }
        };

        const parsePageType = type => {
            if (!detectPageType) {
                return;
            }
            if (type === 'fullscreen') {
                this.onSetIsFullScreen(true);
            } else if (type === 'editor') {
                this.onSetIsPlayerOnly(false);
                this.onSetIsFullScreen(false);
            } else {
                this.onSetIsPlayerOnly(true);
                this.onSetIsFullScreen(false);
            }
        };

        if (+parts[0] && Number.isFinite(+parts[0])) {
            parseProjectId(parts[0]);
            parsePageType(parts[1]);
        } else {
            this.onSetProjectId(defaultProjectId);
            parsePageType(parts[0]);
        }
    }

    generateURL ({projectId, isPlayerOnly, isFullScreen}) {
        const parts = [];

        if (projectId !== '0') {
            parts.push(projectId);
        }
        if (isFullScreen) {
            parts.push('fullscreen');
        } else if (!isPlayerOnly) {
            parts.push('editor');
        }

        const path = `${this.root}${parts.join('/')}`;

        return `${path}${location.search}${location.hash}`;
    }
}

const routers = {
    none: Router,
    hash: HashRouter,
    filehash: FileHashRouter,
    wildcard: WildcardRouter
};

/**
 * Return the optimal Router for the current environment
 * @param {string} style Routing style name
 * @param {*} callbacks Redux callbacks
 * @returns {Router} The optimal router for the current environment
 */
const createRouter = (style, callbacks) => {
    const supportedStyles = ['none', 'hash'];

    // FileHashRouter is not supported on non-http(s) protocols.
    const isHTTP = location.protocol === 'http:' || location.protocol === 'https:';
    if (isHTTP) {
        supportedStyles.push('filehash');
    }

    // WildcardRouter is not supported if ROOT is not set.
    if (process.env.ROOT) {
        supportedStyles.push('wildcard');
    }

    if (!supportedStyles.includes(style)) {
        log.warn(`routing style is unknown or not supported: ${style}, falling back to hash`);
        style = 'hash';
    }

    if (routers.hasOwnProperty(style)) {
        return new routers[style](callbacks);
    }

    throw new Error(`unknown router: ${style}`);
};

const TWStateManager = function (WrappedComponent) {
    class StateManagerComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'handleHashChange',
                'handlePopState'
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

            if (urlParams.has('stuck')) {
                this.props.vm.setCompilerOptions({
                    warpTimer: true
                });
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
            this.router = createRouter(this.props.routingStyle, routerCallbacks);
            this.router.onhashchange();
            window.addEventListener('hashchange', this.handleHashChange);
            window.addEventListener('popstate', this.handlePopState);
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
        componentWillUnmount () {
            window.removeEventListener('hashchange', this.handleHashChange);
            window.removeEventListener('popstate', this.handlePopState);
        }
        handleHashChange () {
            this.router.onhashchange();
        }
        handlePopState () {
            this.router.onpathchange();
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                isFullScreen,
                isPlayerOnly,
                onProjectFetchFinished,
                onProjectFetchStarted,
                onSetIsFullScreen,
                onSetIsPlayerOnly,
                onSetProjectId,
                onSetUsername,
                projectId,
                routingStyle,
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
        isFullScreen: PropTypes.bool,
        isPlayerOnly: PropTypes.bool,
        onProjectFetchFinished: PropTypes.func,
        onProjectFetchStarted: PropTypes.func,
        onSetIsFullScreen: PropTypes.func,
        onSetIsPlayerOnly: PropTypes.func,
        onSetProjectId: PropTypes.func,
        onSetUsername: PropTypes.func,
        projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        routingStyle: PropTypes.oneOf(Object.keys(routers)),
        username: PropTypes.string,
        vm: PropTypes.instanceOf(VM)
    };
    StateManagerComponent.defaultProps = {
        routingStyle: process.env.ROUTING_STYLE
    };
    const mapStateToProps = state => ({
        isFullScreen: state.scratchGui.mode.isFullScreen,
        isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
        projectId: state.scratchGui.projectState.projectId,
        username: state.scratchGui.tw.username,
        vm: state.scratchGui.vm
    });
    const mapDispatchToProps = dispatch => ({
        onProjectFetchFinished: () => dispatch(closeLoadingProject()),
        onProjectFetchStarted: () => dispatch(openLoadingProject()),
        onSetIsFullScreen: isFullScreen => dispatch(setFullScreen(isFullScreen)),
        onSetIsPlayerOnly: isPlayerOnly => dispatch(setPlayer(isPlayerOnly)),
        onSetProjectId: projectId => dispatch(setProjectId(projectId)),
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
