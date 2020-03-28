import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setProjectTitle} from '../reducers/project-title';

import {
    LoadingStates,
    defaultProjectId,
    getIsFetchingWithoutId,
    setProjectId,
    requestProjectUpload,
    onLoadedProject
} from '../reducers/project-state';

import {
    openLoadingProject,
    closeLoadingProject
} from '../reducers/modals';

/* Higher Order Component to get the project id from location.hash
 * @param {React.Component} WrappedComponent: component to render
 * @returns {React.Component} component with hash parsing behavior
 */
const HashParserHOC = function (WrappedComponent) {
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
        }
        componentDidUpdate (prevProps) {
            // if we are newly fetching a non-hash project...
            if (false && this.props.isFetchingWithoutId && !prevProps.isFetchingWithoutId) {
                // ...clear the hash from the url
                history.pushState('new-project', 'new-project',
                    window.location.pathname + window.location.search);
            }
        }
        componentWillUnmount () {
            window.removeEventListener('hashchange', this.handleHashChange);
        }
        getProjectTitleFromFilename (fileInputFilename) {
            if (!fileInputFilename) return '';
            // only parse title with valid scratch project extensions
            // (.sb, .sb2, and .sb3)
            const matches = fileInputFilename.match(/\/([^//]*)\.sb[23]?$/);
            if (!matches) return '';
            return matches[1];
        }
        handleHashChange () {
            const hashMatch = window.location.hash.match(/#(?:(\d+)|(.+))/);
            const hashProjectId = hashMatch === null || !hashMatch[1] ? defaultProjectId : hashMatch[1];
            if (hashMatch && hashMatch[2]) {
                const projectURL = decodeURIComponent(hashMatch[2]);
                this.props.requestProjectUpload(this.props.loadingState);
                this.props.onLoadingStarted();
                fetch(projectURL)
                    .then(response => response.arrayBuffer())
                    .then(arrayBuffer => this.props.vm.loadProject(arrayBuffer))
                    .then(() => {
                        this.props.onLoadingFinished(this.props.loadingState, true);
                        const uploadedProjectTitle = this.getProjectTitleFromFilename(projectURL);
                        this.props.onReceivedProjectTitle(uploadedProjectTitle);
                    })
                    .catch(error => {
                        this.props.onLoadingFinished(this.props.loadingState, false);
                    });
            } else {
                this.props.setProjectId(hashProjectId.toString());
            }
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                isFetchingWithoutId: isFetchingWithoutIdProp,
                reduxProjectId,
                setProjectId: setProjectIdProp,
                loadingState,
                onLoadingFinished,
                requestProjectUpload,
                onReceivedProjectTitle,
                /* eslint-enable no-unused-vars */
                ...componentProps
            } = this.props;
            return (
                <WrappedComponent
                    {...componentProps}
                />
            );
        }
    }
    HashParserComponent.propTypes = {
        isFetchingWithoutId: PropTypes.bool,
        reduxProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        setProjectId: PropTypes.func,
        loadingState: PropTypes.oneOf(LoadingStates),
        onLoadingFinished: PropTypes.func,
        onLoadingStarted: PropTypes.func,
        requestProjectUpload: PropTypes.func,
        onReceivedProjectTitle: PropTypes.func,
        vm: PropTypes.shape({
            loadProject: PropTypes.func
        })
    };
    const mapStateToProps = state => {
        const loadingState = state.scratchGui.projectState.loadingState;
        return {
            isFetchingWithoutId: getIsFetchingWithoutId(loadingState),
            reduxProjectId: state.scratchGui.projectState.projectId,
            loadingState: loadingState,
            vm: state.scratchGui.vm
        };
    };
    const mapDispatchToProps = (dispatch, ownProps) => ({
        setProjectId: projectId => {
            dispatch(setProjectId(projectId));
        },
        onLoadingFinished: (loadingState, success) => {
            dispatch(onLoadedProject(loadingState, ownProps.canSave, success));
            dispatch(closeLoadingProject());
        },
        requestProjectUpload: loadingState => dispatch(requestProjectUpload(loadingState)),
        onLoadingStarted: () => dispatch(openLoadingProject()),
        onReceivedProjectTitle: title => dispatch(setProjectTitle(title))
    });
    // Allow incoming props to override redux-provided props. Used to mock in tests.
    const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
        {}, stateProps, dispatchProps, ownProps
    );
    return connect(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps
    )(HashParserComponent);
};

export {
    HashParserHOC as default
};
