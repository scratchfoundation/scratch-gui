import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import VM from 'scratch-vm';

import storage from '../lib/storage';
import {showStandardAlert} from '../reducers/alerts';
import {
    LoadingStates,
    autoUpdateProject,
    createProject,
    doneCreatingProject,
    doneUpdatingProject,
    getIsCreatingCopy,
    getIsCreatingNew,
    getIsManualUpdating,
    getIsRemixing,
    getIsShowingWithId,
    getIsShowingWithoutId,
    getIsUpdating,
    manualUpdateProject,
    projectError
} from '../reducers/project-state';

/**
 * Higher Order Component to provide behavior for saving projects.
 * @param {React.Component} WrappedComponent the component to add project saving functionality to
 * @returns {React.Component} WrappedComponent with project saving functionality added
 *
 * <ProjectSaverHOC>
 *     <WrappedComponent />
 * </ProjectSaverHOC>
 */
const ProjectSaverHOC = function (WrappedComponent) {
    class ProjectSaverComponent extends React.Component {
        componentDidUpdate (prevProps) {
            if (this.props.isUpdating && !prevProps.isUpdating) {
                this.updateProjectToStorage();
            }
            if (this.props.isCreatingNew && !prevProps.isCreatingNew) {
                this.createNewProjectToStorage();
            }
            if (this.props.isCreatingCopy && !prevProps.isCreatingCopy) {
                this.createCopyToStorage();
            }
            if (this.props.isRemixing && !prevProps.isRemixing) {
                this.createRemixToStorage();
            }

            // check if the project state, and user capabilities, have changed so as to indicate
            // that we should create or update project
            //
            // if we're newly able to create this project on the server, create it!
            const showingCreateable = this.props.canCreateNew && this.props.isShowingWithoutId;
            const prevShowingCreateable = prevProps.canCreateNew && prevProps.isShowingWithoutId;
            if (showingCreateable && !prevShowingCreateable) {
                this.props.onCreateProject();
            } else {
                // if we're newly able to save this project, save it!
                const showingSaveable = this.props.canSave && this.props.isShowingWithId;
                const becameAbleToSave = this.props.canSave && !prevProps.canSave;
                const becameShared = this.props.isShared && !prevProps.isShared;
                if (showingSaveable && (becameAbleToSave || becameShared)) {
                    this.props.onAutoUpdateProject();
                }
            }
        }
        componentWillUnmount () {
            const showingSaveable = this.props.canSave && this.props.isShowingWithId;
            if (showingSaveable) {
                this.updateProjectToStorage();
            }
        }
        updateProjectToStorage () {
            if (this.props.isManualUpdating) {
                this.props.onShowSavingAlert();
            }
            return this.storeProject(this.props.reduxProjectId)
                .then(() => {
                    if (this.props.isManualUpdating) {
                        this.props.onShowSaveSuccessAlert();
                    }
                    // there is nothing we expect to find in response that we need to check here
                    this.props.onUpdatedProject(this.props.loadingState);
                })
                .catch(err => {
                    // NOTE: should throw up a notice for user
                    if (this.props.isManualUpdating) {
                        this.props.onShowAlert('savingError');
                    }
                    this.props.onProjectError(err);
                });
        }
        createNewProjectToStorage () {
            this.props.onShowCreatingAlert();
            return this.storeProject(null)
                .then(response => {
                    this.props.onShowCreateSuccessAlert();
                    this.props.onCreatedProject(response.id.toString(), this.props.loadingState);
                })
                .catch(err => {
                    this.props.onShowAlert('savingError');
                    this.props.onProjectError(err);
                });
        }
        createCopyToStorage () {
            this.props.onShowCreatingAlert();
            return this.storeProject(null, {
                original_id: this.props.reduxProjectId,
                is_copy: 1,
                title: this.props.reduxProjectTitle
            })
                .then(response => {
                    this.props.onShowCreateSuccessAlert();
                    this.props.onCreatedProject(response.id.toString(), this.props.loadingState);
                })
                .catch(err => {
                    this.props.onShowAlert('savingError');
                    this.props.onProjectError(err);
                });
        }
        createRemixToStorage () {
            this.props.onShowCreatingAlert();
            return this.storeProject(null, {
                original_id: this.props.reduxProjectId,
                is_remix: 1,
                title: this.props.reduxProjectTitle
            })
                .then(response => {
                    this.props.onShowCreateSuccessAlert();
                    this.props.onCreatedProject(response.id.toString(), this.props.loadingState);
                })
                .catch(err => {
                    this.props.onShowAlert('savingError');
                    this.props.onProjectError(err);
                });
        }
        /**
         * storeProject:
         * @param  {number|string|undefined} projectId - defined value will PUT/update; undefined/null will POST/create
         * @return {Promise} - resolves with json object containing project's existing or new id
         * @param {?object} requestParams - object of params to add to request body
         */
        storeProject (projectId, requestParams) {
            return this.props.vm.saveProjectSb3()
                .then(content => {
                    const assetType = storage.AssetType.Project;
                    const dataFormat = storage.DataFormat.SB3;
                    const body = new FormData();
                    body.append('sb3_file', content, 'sb3_file');
                    if (requestParams) {
                        for (const key in requestParams) {
                            body.append(key, requestParams[key]);
                        }
                    }
                    // when id is undefined or null, storage.store as we have
                    // configured it will create a new project with id
                    return storage.store(
                        assetType,
                        dataFormat,
                        body,
                        projectId
                    );
                });
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                isCreatingCopy,
                isCreatingNew,
                isManualUpdating,
                isRemixing,
                isShowingWithId,
                isShowingWithoutId,
                isUpdating,
                loadingState,
                onAutoUpdateProject,
                onCreatedProject,
                onCreateProject,
                onManualUpdateProject,
                onProjectError,
                onShowAlert,
                onShowCreateSuccessAlert,
                onShowCreatingAlert,
                onShowSaveSuccessAlert,
                onShowSavingAlert,
                onUpdatedProject,
                reduxProjectId,
                reduxProjectTitle,
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

    ProjectSaverComponent.propTypes = {
        canCreateNew: PropTypes.bool,
        canSave: PropTypes.bool,
        isCreatingCopy: PropTypes.bool,
        isCreatingNew: PropTypes.bool,
        isManualUpdating: PropTypes.bool,
        isRemixing: PropTypes.bool,
        isShared: PropTypes.bool,
        isShowingWithId: PropTypes.bool,
        isShowingWithoutId: PropTypes.bool,
        isUpdating: PropTypes.bool,
        loadingState: PropTypes.oneOf(LoadingStates),
        onAutoUpdateProject: PropTypes.func,
        onCreateProject: PropTypes.func,
        onCreatedProject: PropTypes.func,
        onManualUpdateProject: PropTypes.func,
        onProjectError: PropTypes.func,
        onShowAlert: PropTypes.func,
        onShowCreateSuccessAlert: PropTypes.func,
        onShowCreatingAlert: PropTypes.func,
        onShowSaveSuccessAlert: PropTypes.func,
        onShowSavingAlert: PropTypes.func,
        onUpdatedProject: PropTypes.func,
        reduxProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        reduxProjectTitle: PropTypes.string,
        vm: PropTypes.instanceOf(VM).isRequired
    };
    const mapStateToProps = state => {
        const loadingState = state.scratchGui.projectState.loadingState;
        return {
            isCreatingCopy: getIsCreatingCopy(loadingState),
            isCreatingNew: getIsCreatingNew(loadingState),
            isRemixing: getIsRemixing(loadingState),
            isShowingWithId: getIsShowingWithId(loadingState),
            isShowingWithoutId: getIsShowingWithoutId(loadingState),
            isUpdating: getIsUpdating(loadingState),
            isManualUpdating: getIsManualUpdating(loadingState),
            loadingState: loadingState,
            reduxProjectId: state.scratchGui.projectState.projectId,
            reduxProjectTitle: state.scratchGui.projectTitle,
            vm: state.scratchGui.vm
        };
    };
    const mapDispatchToProps = dispatch => ({
        onAutoUpdateProject: () => dispatch(autoUpdateProject()),
        onCreatedProject: (projectId, loadingState) => dispatch(doneCreatingProject(projectId, loadingState)),
        onCreateProject: () => dispatch(createProject()),
        onManualUpdateProject: () => dispatch(manualUpdateProject()),
        onProjectError: error => dispatch(projectError(error)),
        onShowAlert: alertType => dispatch(showStandardAlert(alertType)),
        onShowCreateSuccessAlert: () => dispatch(showStandardAlert('createSuccess')),
        onShowCreatingAlert: () => dispatch(showStandardAlert('creating')),
        onShowSaveSuccessAlert: () => dispatch(showStandardAlert('saveSuccess')),
        onShowSavingAlert: () => dispatch(showStandardAlert('saving')),
        onUpdatedProject: (projectId, loadingState) => dispatch(doneUpdatingProject(projectId, loadingState))
    });
    // Allow incoming props to override redux-provided props. Used to mock in tests.
    const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
        {}, stateProps, dispatchProps, ownProps
    );
    return connect(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps
    )(ProjectSaverComponent);
};

export {
    ProjectSaverHOC as default
};
