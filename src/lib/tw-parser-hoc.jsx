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
            this.handleHashChange();

            // Read URL parameters and apply them.
            const searchParams = new URLSearchParams(location.search);
            if (searchParams.get('fps') === '60') {
                // todo: support for other framerates
                this.props.setCompatibility(false);
            }
            if (searchParams.get('username') !== null) {
                this.props.setUsername(searchParams.get('username'));
            }
            // Disabled for now until some high quality pen bugs get ironed out.
            // if (searchParams.get('hqp') !== null) {
            //     this.props.setHighQualityPen(true);
            // }
        }
        shouldComponentUpdate (nextProps) {
            return (
                this.props.isFetchingWithoutId !== nextProps.isFetchingWithoutId ||
                this.props.projectId !== nextProps.projectId ||
                this.props.compatibility !== nextProps.compatibility
            );
        }
        componentDidUpdate (prevProps) {
            // Reflect project ID changes in the URL.
            if (this.props.isFetchingWithoutId && !prevProps.isFetchingWithoutId) {
                history.pushState('', '', location.pathname + location.search);
            } else if (this.props.projectId !== prevProps.projectId) {
                history.pushState('', '', location.pathname + location.search + '#' + this.props.projectId);
            }

            // Reflect option changes in the URL
            const searchParams = new URLSearchParams();
            if (!this.props.compatibility) {
                searchParams.set('fps', '60');
            }
            if (this.props.username) {
                searchParams.set('username', this.props.username);
            }
            const params = `?${searchParams}`;
            if (location.search !== params) {
                history.replaceState('', '', location.pathname + params + location.hash);
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
