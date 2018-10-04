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
                isLoading: !props.vm.initialized,
                isStarted: false,
                loadingError: false,
                errorMessage: ''
            };
        }
        componentDidMount () {
            if (this.props.vm.initialized) return;
            this.audioEngine = new AudioEngine();
            this.props.vm.attachAudioEngine(this.audioEngine);
        }
        componentWillReceiveProps (nextProps) {
            if (nextProps.isLoadingProjectWithId && !this.props.isLoadingProjectWithId) {
                this.loadProject(nextProps.projectData);
                if (!this.props.vm.initialized) {
                    this.props.vm.initialized = true;
                }
            }
            // if we went from loading to showing, we're done starting the vm
            if (nextProps.isShowingProjectWithId && this.props.isLoadingProjectWithId) {
                this.setState({isStarted: true});
            }
        }
        loadProject (projectData) {
            return this.props.vm.loadProject(projectData)
                .then(() => {
                    this.setState({isLoading: false}, () => {
                        if (!this.state.isStarted) {
                            this.props.vm.setCompatibilityMode(true);
                            this.props.vm.start();
                            // NOTE: this logic is slightly different from previous
                            // https://github.com/LLK/scratch-gui/blob/develop/src/containers/gui.jsx
                            // Here, we relied on an explicit initial call in componentDidMount
                            // to setCompatibilityMode and start().
                        }
                        this.props.doneLoading();
                    });
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
                isLoadingProjectWithId: isLoadingProjectWithIdProp,
                isShowingProjectWithId: isShowingProjectWithIdProp,
                projectData,
                projectId,
                /* eslint-enable no-unused-vars */
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
                    isLoading={this.state.isLoading}
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
        vm: PropTypes.instanceOf(VM).isRequired
    };

    const mapStateToProps = state => {
        const projectState = state.scratchGui.projectId.projectState;
        return {
            isLoadingProjectWithId: isLoadingProjectWithId(projectState),
            isShowingProjectWithId: isShowingProjectWithId(projectState),
            projectData: state.scratchGui.projectId.projectData,
            projectId: state.scratchGui.projectId.projectId
        };
    };

    const mapDispatchToProps = dispatch => ({
        doneLoading: () => dispatch(doneLoading())
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(VMManager);
};

export default vmManagerHOC;
