import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import VM from 'scratch-vm';
import CloudProvider from '../lib/cloud-provider';

import {
    getIsShowingWithId
} from '../reducers/project-state';

/*
 * Higher Order Component to manage the connection to the cloud dserver.
 * @param {React.Component} WrappedComponent component to manage VM events for
 * @returns {React.Component} connected component with vm events bound to redux
 */
const cloudManagerHOC = function (WrappedComponent) {
    class CloudManager extends React.Component {
        constructor (props) {
            super(props);
            this.cloudProvider = null;
        }
        componentDidMount () {
            if (this.canUseCloud(this.props)) {
                this.connectToCloud();
            }
        }
        componentDidUpdate (prevProps) {
            // If we couldn't use cloud data before, but now we can, try opening a cloud connection
            if (this.canUseCloud(this.props) && !this.canUseCloud(prevProps)) {
                this.connectToCloud();
                return;
            }

            // TODO add scratcher check

            if ((this.props.username !== prevProps.username) ||
                (this.props.projectId !== prevProps.projectId)) {
                this.connectToCloud();
            }
        }
        componentWillUnmount () {
            if (this.cloudProvider) {
                this.cloudProvider.requestCloseConnection();
                this.cloudProvider = null;
            }
        }
        canUseCloud (props) {
            return props.cloudHost && props.username && props.isShowingWithId &&
                props.vm && props.username && props.projectId;
        }
        connectToCloud () {
            if (this.cloudProvider && this.cloudProvider.connection) {
                // Already connected
                return;
            }

            // TODO need to add provisions for viewing someone
            // else's project in editor mode
            this.cloudProvider = new CloudProvider(
                this.props.cloudHost,
                this.props.vm,
                this.props.username,
                this.props.projectId);
            this.props.vm.setCloudProvider(this.cloudProvider);
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                cloudHost,
                projectId,
                username,
                isShowingWithId,
                /* eslint-enable no-unused-vars */
                vm,
                ...componentProps
            } = this.props;
            return (
                <WrappedComponent
                    canUseCloud={this.canUseCloud(this.props)}
                    vm={vm}
                    {...componentProps}
                />
            );
        }
    }

    CloudManager.propTypes = {
        cloudHost: PropTypes.string,
        isShowingWithId: PropTypes.bool,
        projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        username: PropTypes.string,
        vm: PropTypes.instanceOf(VM).isRequired
    };

    const mapStateToProps = state => {
        const loadingState = state.scratchGui.projectState.loadingState;
        return {
            isShowingWithId: getIsShowingWithId(loadingState),
            projectId: state.scratchGui.projectState.projectId
        };
    };

    const mapDispatchToProps = () => ({});

    // Allow incoming props to override redux-provided props. Used to mock in tests.
    const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
        {}, stateProps, dispatchProps, ownProps
    );

    return connect(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps
    )(CloudManager);
};

export default cloudManagerHOC;
