import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
    defaultProjectId,
    getIsFetchingWithoutId,
    setProjectId
} from '../reducers/project-state';
import {
    setPlayer,
    setFullScreen
} from '../reducers/mode';

const getRoot = () => {
    const path = location.pathname.split('/');
    path.pop();
    return `/${path.join('/')}`;
};

const getUseRouting = () => ['turbowarp.org', 'staging.turbowarp.org', 'localhost'].includes(location.hostname);

const playerPath = getRoot();
const editorPath = `${playerPath}editor.html`;
const fullscreenPath = `${playerPath}fullscreen.html`;
const useRouting = getUseRouting();

const TWParserHoc = function (WrappedComponent) {
    class HashParserComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'handleHashChange',
                'handleSearchChange'
            ]);
        }
        componentDidMount () {
            window.addEventListener('hashchange', this.handleHashChange);
            window.addEventListener('popstate', this.handleSearchChange);
            this.handleHashChange();
        }
        shouldComponentUpdate (nextProps) {
            return (
                this.props.isFetchingWithoutId !== nextProps.isFetchingWithoutId ||
                this.props.isPlayerOnly !== nextProps.isPlayerOnly ||
                this.props.isFullScreen !== nextProps.isFullScreen ||
                this.props.projectId !== nextProps.projectId
            );
        }
        componentDidUpdate (prevProps) {
            let newPathname = location.pathname;
            let newHash = location.hash;

            // Store project ID in the URL.
            if (this.props.isFetchingWithoutId && !prevProps.isFetchingWithoutId) {
                newHash = '';
            } else if (this.props.projectId !== prevProps.projectId) {
                newHash = `#${this.props.projectId}`;
            }

            // Store whether the editor is active.
            if (useRouting && (this.props.isPlayerOnly !== prevProps.isPlayerOnly || this.props.isFullScreen !== prevProps.isFullScreen)) {
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
        componentWillUnmount () {
            window.removeEventListener('hashchange', this.handleHashChange);
            window.removeEventListener('popstate', this.handleSearchChange);
        }
        handleHashChange () {
            const hashMatch = window.location.hash.match(/#(\d+)/);
            const hashProjectId = hashMatch === null ? defaultProjectId : hashMatch[1];
            this.props.onSetProjectId(hashProjectId.toString());
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
                isFetchingWithoutId,
                isPlayerOnly,
                onSetIsPlayerOnly,
                isFullScreen,
                onSetIsFullScreen,
                projectId,
                onSetProjectId,
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
    HashParserComponent.propTypes = {
        isFetchingWithoutId: PropTypes.bool,
        isPlayerOnly: PropTypes.bool,
        onSetIsPlayerOnly: PropTypes.func,
        isFullScreen: PropTypes.bool,
        onSetIsFullScreen: PropTypes.func,
        projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onSetProjectId: PropTypes.func
    };
    const mapStateToProps = state => {
        const loadingState = state.scratchGui.projectState.loadingState;
        return {
            isFetchingWithoutId: getIsFetchingWithoutId(loadingState),
            isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
            isFullScreen: state.scratchGui.mode.isFullScreen,
            projectId: state.scratchGui.projectState.projectId
        };
    };
    const mapDispatchToProps = dispatch => ({
        onSetIsPlayerOnly: isPlayerOnly => dispatch(setPlayer(isPlayerOnly)),
        onSetIsFullScreen: isFullScreen => dispatch(setFullScreen(isFullScreen)),
        onSetProjectId: projectId => dispatch(setProjectId(projectId))
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(HashParserComponent);
};

export {
    TWParserHoc as default
};
