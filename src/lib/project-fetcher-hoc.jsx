import React from 'react';
import PropTypes from 'prop-types';
import {intlShape, injectIntl} from 'react-intl';
import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';

import {setProjectUnchanged} from '../reducers/project-changed';
import {
    LoadingStates,
    getIsCreatingNew,
    getIsFetchingWithId,
    getIsLoading,
    getIsShowingProject,
    onFetchedProjectData,
    projectError,
    setProjectId
} from '../reducers/project-state';
import {
    activateTab,
    BLOCKS_TAB_INDEX
} from '../reducers/editor-tab';

import { setSessionData } from '../reducers/session'; // 새로 추가

import log from './log';
import storage from './storage';

import jwt_decode from 'jwt-decode'; // JWT 디코딩을 위한 라이브러리

  componentDidMount() {
    this.fetchSessionData();
  }

  fetchSessionData() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        this.props.onSetSessionData(decodedToken);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    } else {
      fetch('/get-user-session', {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${document.cookie.split('token=')[1].split(';')[0]}`
        }
      })
      .then(res => res.json())
      .then(sessionData => {
        this.props.onSetSessionData(sessionData);
      })
      .catch(err => console.error('Failed to fetch session data:', err));
    }
  }

/* Higher Order Component to provide behavior for loading projects by id. If
 * there's no id, the default project is loaded.
 * @param {React.Component} WrappedComponent component to receive projectData prop
 * @returns {React.Component} component with project loading behavior
 */

class ProjectFetcherComponent extends React.Component {
  constructor(props) {
    super(props);
    this.fetchSessionData = this.fetchSessionData.bind(this);
  }
    
const ProjectFetcherHOC = function (WrappedComponent) {
  class ProjectFetcherComponent extends React.Component {
    constructor (props) {
      super(props);
      this.fetchSessionData = this.fetchSessionData.bind(this);
            bindAll(this, [
                'fetchProject',
                 'fetchSessionData' // 새로 추가
            ]);
            storage.setProjectHost(props.projectHost);
            storage.setProjectToken(props.projectToken);
            storage.setAssetHost(props.assetHost);
            storage.setTranslatorFunction(props.intl.formatMessage);
            // props.projectId might be unset, in which case we use our default;
            // or it may be set by an even higher HOC, and passed to us.
            // Either way, we now know what the initial projectId should be, so
            // set it in the redux store.
            if (
                props.projectId !== '' &&
                props.projectId !== null &&
                typeof props.projectId !== 'undefined'
            ) {
                this.props.setProjectId(props.projectId.toString());
            }
        }

        componentDidMount() {
            this.fetchSessionData(); // 새로 추가
        }

             fetchSessionData() {
            fetch('/get-user-session', {
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${document.cookie.split('token=')[1].split(';')[0]}`
                }
            })
            .then(res => res.json())
            .then(sessionData => {
                this.props.onSetSessionData(sessionData);
            })
            .catch(err => console.error('Failed to fetch session data:', err));
        }
        
        componentDidUpdate (prevProps) {
            if (prevProps.projectHost !== this.props.projectHost) {
                storage.setProjectHost(this.props.projectHost);
            }
            if (prevProps.projectToken !== this.props.projectToken) {
                storage.setProjectToken(this.props.projectToken);
            }
            if (prevProps.assetHost !== this.props.assetHost) {
                storage.setAssetHost(this.props.assetHost);
            }
            if (this.props.isFetchingWithId && !prevProps.isFetchingWithId) {
                this.fetchProject(this.props.reduxProjectId, this.props.loadingState);
            }
            if (this.props.isShowingProject && !prevProps.isShowingProject) {
                this.props.onProjectUnchanged();
            }
            if (this.props.isShowingProject && (prevProps.isLoadingProject || prevProps.isCreatingNew)) {
                this.props.onActivateTab(BLOCKS_TAB_INDEX);
            }
        }
        fetchProject (projectId, loadingState) {
            const urlHash = window.location.hash;
            console.log('URL Hash:', urlHash); // 추가된 로그
        
            if (urlHash.startsWith('#http')) {
                const projectUrl = urlHash.substring(1); 
                console.log('Loading project from URL:', projectUrl); // 추가된 로그
                fetch(projectUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to load project from ${projectUrl}`);
                        }
                        return response.arrayBuffer();
                    })
                    .then(arrayBuffer => {
                        console.log('Project arrayBuffer loaded'); // 추가된 로그
                        this.props.onFetchedProjectData(arrayBuffer, loadingState);
                        this.props.vm.loadProject(arrayBuffer)
                            .then(() => {
                                console.log(`Project loaded from ${projectUrl}`);
                            })
                            .catch(error => {
                                console.error(`Error loading project from ${projectUrl}:`, error);
                            });
                    })
                    .catch(error => {
                        this.props.onError(error);
                        log.error(`Failed to fetch project from ${projectUrl}: ${error}`);
                    });
            } else {
                // Default project loading behavior
                storage
                    .load(storage.AssetType.Project, projectId, storage.DataFormat.JSON)
                    .then(projectAsset => {
                        if (projectAsset) {
                            this.props.onFetchedProjectData(projectAsset.data, loadingState);
                        } else {
                            // Treat failure to load as an error
                            // Throw to be caught by catch later on
                            throw new Error('Could not find project');
                        }
                    })
                    .catch(err => {
                        this.props.onError(err);
                        log.error(err);
                    });
            }
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                assetHost,
                intl,
                isLoadingProject: isLoadingProjectProp,
                loadingState,
                onActivateTab,
                onError: onErrorProp,
                onFetchedProjectData: onFetchedProjectDataProp,
                onProjectUnchanged,
                projectHost,
                projectId,
                reduxProjectId,
                setProjectId: setProjectIdProp,
                /* eslint-enable no-unused-vars */
                isFetchingWithId: isFetchingWithIdProp,
                ...componentProps
            } = this.props;
            return (
                <WrappedComponent
                    fetchingProject={isFetchingWithIdProp}
                    {...componentProps}
                />
            );
        }
    }
    ProjectFetcherComponent.propTypes = {
        assetHost: PropTypes.string,
        canSave: PropTypes.bool,
        intl: intlShape.isRequired,
        isCreatingNew: PropTypes.bool,
        isFetchingWithId: PropTypes.bool,
        isLoadingProject: PropTypes.bool,
        isShowingProject: PropTypes.bool,
        loadingState: PropTypes.oneOf(LoadingStates),
        onActivateTab: PropTypes.func,
        onError: PropTypes.func,
        onFetchedProjectData: PropTypes.func,
        onProjectUnchanged: PropTypes.func,
        onSetSessionData: PropTypes.func, // 새로 추가
        projectHost: PropTypes.string,
        projectToken: PropTypes.string,
        projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        reduxProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        setProjectId: PropTypes.func
    };
    ProjectFetcherComponent.defaultProps = {
        assetHost: 'https://assets.scratch.mit.edu',
        projectHost: 'https://projects.scratch.mit.edu'
    };

    const mapStateToProps = state => ({
        isCreatingNew: getIsCreatingNew(state.scratchGui.projectState.loadingState),
        isFetchingWithId: getIsFetchingWithId(state.scratchGui.projectState.loadingState),
        isLoadingProject: getIsLoading(state.scratchGui.projectState.loadingState),
        isShowingProject: getIsShowingProject(state.scratchGui.projectState.loadingState),
        loadingState: state.scratchGui.projectState.loadingState,
        reduxProjectId: state.scratchGui.projectState.projectId
    });
    const mapDispatchToProps = dispatch => ({
        onActivateTab: tab => dispatch(activateTab(tab)),
        onError: error => dispatch(projectError(error)),
        onFetchedProjectData: (projectData, loadingState) =>
            dispatch(onFetchedProjectData(projectData, loadingState)),
        onSetSessionData: sessionData => dispatch(setSessionData(sessionData)), // 새로 추가
        setProjectId: projectId => dispatch(setProjectId(projectId)),
        onProjectUnchanged: () => dispatch(setProjectUnchanged())
    });
    // Allow incoming props to override redux-provided props. Used to mock in tests.
    const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
        {}, stateProps, dispatchProps, ownProps
    );
  return injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectFetcherComponent));
};

export {
    ProjectFetcherHOC as default
};
