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
            if (this.shouldConnect(this.props)) {
                this.connectToCloud();
            }
        }
        componentDidUpdate (prevProps) {
            // TODO need to add cloud provider disconnection logic and cloud data clearing logic
            // when loading a new project e.g. via file upload
            // (and eventually move it out of the vm.clear function)

            if (this.shouldConnect(this.props) && !this.shouldConnect(prevProps)) {
                this.connectToCloud();
            }

            if (this.shouldDisconnect(this.props, prevProps)) {
                this.disconnectFromCloud();
            }
        }
        componentWillUnmount () {
            this.disconnectFromCloud();
        }
        canUseCloud (props) {
            // TODO add a canUseCloud to pass down to this HOC (e.g. from www) and also check that here.
            // This should cover info about the website specifically, like scrather status
            return !!(props.cloudHost && props.username && props.vm && props.projectId);
        }
        shouldConnect (props) {
            return !this.isConnected() && this.canUseCloud(props) && props.isShowingWithId;
        }
        shouldDisconnect (props, prevProps) {
            return this.isConnected() &&
                ( // Can no longer use cloud or cloud provider info is now stale
                    !this.canUseCloud(this.props) ||
                    (props.projectId !== prevProps.projectId) ||
                    (props.username !== prevProps.username)
                );
            // TODO need to add provisions for viewing someone
            // else's project in editor mode
        }
        isConnected () {
            return this.cloudProvider && !!this.cloudProvider.connection;
        }
        connectToCloud () {
            this.cloudProvider = new CloudProvider(
                this.props.cloudHost,
                this.props.vm,
                this.props.username,
                this.props.projectId);
            this.props.vm.setCloudProvider(this.cloudProvider);
        }
        disconnectFromCloud () {
            if (this.cloudProvider) {
                this.cloudProvider.requestCloseConnection();
                this.cloudProvider = null;
                this.props.vm.setCloudProvider(null);
            }
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
