import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import VM from 'scratch-vm';
import AudioEngine from 'scratch-audio';
import Renderer from 'scratch-render';
import VideoProvider from '../lib/video/video-provider';
import {SVGRenderer as V2SVGAdapter} from 'scratch-svg-renderer';
import {BitmapAdapter as V2BitmapAdapter} from 'scratch-svg-renderer';

import {
    LoadingStates,
    onLoadedProject,
    getIsLoadingWithId
} from '../reducers/project-state';

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
            // if project state is LOADING variation, and fonts are loaded,
            // and that wasn't true until now, load project
            if (this.props.isLoadingWithId && this.props.fontsLoaded &&
                (!prevProps.isLoadingWithId || !prevProps.fontsLoaded)) {
                this.loadProject(this.props.projectData, this.props.loadingState);
            }
        }
        loadProject (projectData, loadingState) {
            return this.props.vm.loadProject(projectData)
                .then(() => {
                    this.props.onLoadedProject(loadingState);
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
                fontsLoaded,
                onLoadedProject: onLoadedProjectProp,
                projectData,
                projectId,
                loadingState,
                /* eslint-enable no-unused-vars */
                isLoadingWithId: isLoadingWithIdProp,
                vm,
                ...componentProps
            } = this.props;
            return (
                <WrappedComponent
                    errorMessage={this.state.errorMessage}
                    isLoading={isLoadingWithIdProp}
                    loadingError={this.state.loadingError}
                    vm={vm}
                    {...componentProps}
                />
            );
        }
    }

    VMManager.propTypes = {
        fontsLoaded: PropTypes.bool,
        isLoadingWithId: PropTypes.bool,
        loadingState: PropTypes.oneOf(LoadingStates),
        onLoadedProject: PropTypes.func,
        projectData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        vm: PropTypes.instanceOf(VM).isRequired
    };

    const mapStateToProps = state => {
        const loadingState = state.scratchGui.projectState.loadingState;
        return {
            isLoadingWithId: getIsLoadingWithId(loadingState),
            projectData: state.scratchGui.projectState.projectData,
            projectId: state.scratchGui.projectState.projectId,
            loadingState: loadingState
        };
    };

    const mapDispatchToProps = dispatch => ({
        onLoadedProject: loadingState => dispatch(onLoadedProject(loadingState))
    });

    // Allow incoming props to override redux-provided props. Used to mock in tests.
    const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
        {}, stateProps, dispatchProps, ownProps
    );

    return connect(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps
    )(VMManager);
};

export default vmManagerHOC;
