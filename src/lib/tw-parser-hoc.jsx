import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
    setCompatibilityState,
    setHighQualityPen,
    setUsername
} from '../reducers/tw';

import {
    defaultProjectId,
    getIsFetchingWithoutId,
    setProjectId
} from '../reducers/project-state';

const getRoot = () => {
    const path = location.pathname.split('/');
    path.pop();
    return `/${path.join('/')}`;
};

const getUseRouting = () => ['turbowarp.xyz', 'localhost'].includes(location.hostname);

const root = getRoot();
const useRouting = getUseRouting();

const TWParserHoc = function (WrappedComponent) {
    class HashParserComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'handleHashChange'
            ]);
        }
        componentDidMount () {
            window.addEventListener('hashchange', this.handleHashChange);
            window.addEventListener('popstate', this.handleSearchChange);
            this.handleHashChange();
            this.handleSearchChange();
        }
        shouldComponentUpdate (nextProps) {
            return (
                this.props.isFetchingWithoutId !== nextProps.isFetchingWithoutId ||
                this.props.isPlayerOnly !== nextProps.isPlayerOnly ||
                this.props.compatibility !== nextProps.compatibility ||
                this.props.highQualityPen !== nextProps.highQualityPen ||
                this.props.projectId !== nextProps.projectId ||
                this.props.username !== nextProps.username
            );
        }
        componentDidUpdate (prevProps) {
            let newPathname = location.pathname;
            let newSearch = location.search;
            let newHash = location.hash;
            let push = false;

            // Reflect project ID changes in the URL.
            if (this.props.isFetchingWithoutId && !prevProps.isFetchingWithoutId) {
                newHash = '';
                push = true;
            } else if (this.props.projectId !== prevProps.projectId) {
                newHash = `#${this.props.projectId}`;
                push = true;
            }

            // Editor or not editor in URL
            if (useRouting && this.props.isPlayerOnly !== prevProps.isPlayerOnly) {
                if (this.props.isPlayerOnly) {
                    newPathname = root;
                } else {
                    newPathname = `${root}editor.html`;
                }
            }

            // Reflect option changes in the URL
            const searchParams = new URLSearchParams();
            if (!this.props.compatibility) {
                searchParams.set('fps', '60');
            }
            if (this.props.username) {
                searchParams.set('username', this.props.username);
            }
            newSearch = `?${searchParams}`;
            if (newSearch === '?') newSearch = '';

            if (newHash !== location.hash || newSearch !== location.search || newPathname !== location.pathname) {
                if (push) {
                    history.pushState('', '', `${newPathname}${newSearch}${newHash}`);
                } else {
                    history.replaceState('', '', `${newPathname}${newSearch}${newHash}`);
                }
            }
        }
        componentWillUnmount () {
            window.removeEventListener('hashchange', this.handleHashChange);
        }
        handleHashChange () {
            const hashMatch = window.location.hash.match(/#(\d+)/);
            const hashProjectId = hashMatch === null ? defaultProjectId : hashMatch[1];
            this.props.setProjectId(hashProjectId.toString());
        }
        handleSearchChange () {
            const searchParams = new URLSearchParams(location.search);
            if (searchParams.get('fps') === '60') {
                // todo: support for other framerates
                this.props.setCompatibility(false);
            }
            if (searchParams.get('username') !== null) {
                this.props.setUsername(searchParams.get('username'));
            }
        }
        render () {
            return (
                <WrappedComponent
                    {...this.props}
                />
            );
        }
    }
    HashParserComponent.propTypes = {
        isFetchingWithoutId: PropTypes.bool,
        isPlayerOnly: PropTypes.bool,
        compatibility: PropTypes.bool,
        setCompatibility: PropTypes.func,
        highQualityPen: PropTypes.bool,
        setHighQualityPen: PropTypes.func,
        projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        setProjectId: PropTypes.func,
        username: PropTypes.string,
        setUsername: PropTypes.func
    };
    const mapStateToProps = state => {
        const loadingState = state.scratchGui.projectState.loadingState;
        return {
            isFetchingWithoutId: getIsFetchingWithoutId(loadingState),
            isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
            compatibility: state.scratchGui.tw.compatibility,
            setHighQualityPen: state.scratchGui.tw.highQualityPen,
            projectId: state.scratchGui.projectState.projectId,
            username: state.scratchGui.tw.username
        };
    };
    const mapDispatchToProps = dispatch => ({
        setCompatibility: compatibility => dispatch(setCompatibilityState(compatibility)),
        setHighQualityPen: highQualityPen => dispatch(setHighQualityPen(highQualityPen)),
        setProjectId: projectId => dispatch(setProjectId(projectId)),
        setUsername: username => dispatch(setUsername(username, false))
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(HashParserComponent);
};

export {
    TWParserHoc as default
};
