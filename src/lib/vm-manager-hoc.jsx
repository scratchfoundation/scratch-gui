import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import VM from 'scratch-vm';
import AudioEngine from 'scratch-audio';

import {
    doneLoading,
    isLoadingProjectWithId,
    isShowingProjectWithId
} from '../reducers/project-id';

/*
 * Higher Order Component to manage events emitted by the VM
 * @param {React.Component} WrappedComponent component to manage VM events for
 * @returns {React.Component} connected component with vm events bound to redux
 */
const vmManagerHOC = function (WrappedComponent) {
    class VMManager extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'loadProject'
            ]);
            this.state = {
                loadingError: false,
                errorMessage: ''
            };
        }
        componentDidMount () {
            if (this.props.vm.initialized) return;
            this.audioEngine = new AudioEngine();
            this.props.vm.attachAudioEngine(this.audioEngine);
            this.props.vm.setCompatibilityMode(true);
            this.props.vm.start();
            this.props.vm.initialized = true;
        }
        componentDidUpdate (prevProps) {
            if (this.props.isLoadingProjectWithId && !prevProps.isLoadingProjectWithId) {
                this.loadProject(this.props.projectData, this.props.projectState);
            }
        }
        loadProject (projectData, projectState) {
            return this.props.vm.loadProject(projectData)
                .then(() => {
                    this.props.doneLoading(projectState);
                })
                .catch(e => {
                    // Need to catch this error and update component state so that
                    // error page gets rendered if project failed to load
                    this.setState({loadingError: true, errorMessage: e});
                });
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                doneLoading: doneLoadingProp,
                isShowingProjectWithId: isShowingProjectWithIdProp,
                projectData,
                projectId,
                projectState,
                /* eslint-enable no-unused-vars */
                isLoadingProjectWithId: isLoadingProjectWithIdProp,
                vm,
                ...componentProps
            } = this.props;
            // don't display anything until we have data loaded
            if (!this.props.projectData) {
                return null;
            }
            return (
                <WrappedComponent
                    errorMessage={this.state.errorMessage}
                    isLoading={isLoadingProjectWithIdProp}
                    loadingError={this.state.loadingError}
                    vm={vm}
                    {...componentProps}
                />
            );
        }
    }

    VMManager.propTypes = {
        doneLoading: PropTypes.func,
        isLoadingProjectWithId: PropTypes.bool,
        isShowingProjectWithId: PropTypes.bool,
        projectData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        projectState: PropTypes.string,
        vm: PropTypes.instanceOf(VM).isRequired
    };

    const mapStateToProps = state => {
        const projectState = state.scratchGui.projectId.projectState;
        return {
            isLoadingProjectWithId: isLoadingProjectWithId(projectState),
            isShowingProjectWithId: isShowingProjectWithId(projectState),
            projectData: state.scratchGui.projectId.projectData,
            projectId: state.scratchGui.projectId.projectId,
            projectState: projectState
        };
    };

    const mapDispatchToProps = dispatch => ({
        doneLoading: projectState => dispatch(doneLoading(projectState))
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(VMManager);
};

export default vmManagerHOC;
