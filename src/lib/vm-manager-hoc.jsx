import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import AudioEngine from 'scratch-audio';

import {connect} from 'react-redux';

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
                'handleRequestNewProject',
                'loadProject'
            ]);
            this.state = {
                isLoading: !props.vm.initialized,
                loadingError: false,
                errorMessage: ''
            };
        }
        componentDidMount () {
            if (this.props.vm.initialized) return;
            this.audioEngine = new AudioEngine();
            this.props.vm.attachAudioEngine(this.audioEngine);
            this.loadProject(true).then(() => {
                this.props.vm.initialized = true;
            });
        }
        componentWillReceiveProps (nextProps) {
            if (this.props.projectData !== nextProps.projectData) {
                this.setState({isLoading: true}, () => {
                    this.loadProject(false);
                });
            }
        }
        // NOTE: keep working here. problem is that we ONLY want to load the project
        // here when the old project id was aolso default... otherwise, we load twice!!!
        loadProject (isInitial) {
            return this.props.vm.loadProject(this.props.projectData)
                .then(() => {
                    this.setState({isLoading: false}, () => {
                        if (isInitial) {
                            this.props.vm.setCompatibilityMode(true);
                            this.props.vm.start();
                        }
                    });
                })
                .catch(e => {
                    // Need to catch this error and update component state so that
                    // error page gets rendered if project failed to load
                    this.setState({loadingError: true, errorMessage: e});
                });
        }
        handleRequestNewProject (callback) {
            // pass the request up the chain
            this.props.onRequestNewProject(newProjectId => {
                // now that parents have had chance to act and change the projectId,
                this.setState({isLoading: true}, () => {
                    this.loadProject(false).then(() => {
                        if (callback) callback(newProjectId); // pass the callback down the chain
                    });
                });
            });
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                projectData,
                onRequestNewProject, // must remove parent's onRequestNewProject to use our own
                /* eslint-enable no-unused-vars */
                vm,
                ...componentProps
            } = this.props;
            return (
                <WrappedComponent
                    errorMessage={this.state.errorMessage}
                    isLoading={this.state.isLoading}
                    loadingError={this.state.loadingError}
                    vm={vm}
                    onRequestNewProject={this.handleRequestNewProject}
                    {...componentProps}
                />
            );
        }
    }

    VMManager.propTypes = {
        onRequestNewProject: PropTypes.func,
        projectData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        vm: PropTypes.instanceOf(VM).isRequired
    };

    const mapStateToProps = state => ({
        vm: state.scratchGui.vm
    });

    const mapDispatchToProps = dispatch => ({
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(VMManager);
};

export default vmManagerHOC;
