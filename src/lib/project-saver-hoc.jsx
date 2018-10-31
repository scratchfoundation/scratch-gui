import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import VM from 'scratch-vm';

import storage from '../lib/storage';
import {
    LoadingStates,
    createProject,
    doneCreatingProject,
    doneUpdatingProject,
    getIsCreatingCopy,
    getIsCreatingNew,
    getIsRemixing,
    getIsShowingProject,
    getIsShowingWithoutId,
    getIsUpdating,
    projectError,
    updateProject
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
                this.storeProject(this.props.reduxProjectId)
                    .then(() => {
                        // there is nothing we expect to find in response that we need to check here
                        this.props.onUpdatedProject(this.props.loadingState);
                    })
                    .catch(err => {
                        // NOTE: should throw up a notice for user
                        this.props.onProjectError(`Saving the project failed with error: ${err}`);
                    });
            }
            // TODO: distinguish between creating new, remixing, and saving as a copy
            if (this.props.isCreatingNew && !prevProps.isCreatingNew) {
                this.storeProject(null)
                    .then(response => {
                        this.props.onCreatedProject(response.id.toString(), this.props.loadingState);
                    })
                    .catch(err => {
                        this.props.onProjectError(`Creating a new project failed with error: ${err}`);
                    });
            }
            if (this.props.isCreatingCopy && !prevProps.isCreatingCopy) {
                this.storeProject(null, {
                    original_id: this.props.reduxProjectId,
                    is_copy: 1,
                    title: this.props.reduxProjectTitle
                })
                    .then(response => {
                        this.props.onCreatedProject(response.id.toString(), this.props.loadingState);
                    })
                    .catch(err => {
                        this.props.onProjectError(`Creating a project copy failed with error: ${err}`);
                    });
            }
            if (this.props.isRemixing && !prevProps.isRemixing) {
                this.storeProject(null, {
                    original_id: this.props.reduxProjectId,
                    is_remix: 1,
                    title: this.props.reduxProjectTitle
                })
                    .then(response => {
                        this.props.onCreatedProject(response.id.toString(), this.props.loadingState);
                    })
                    .catch(err => {
                        this.props.onProjectError(`Remixing a project failed with error: ${err}`);
                    });
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
                if (showingSaveable && becameAbleToSave) {
                    this.props.onUpdateProject();
                }
            }
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
                isCreatingCopy: isCreatingCopyProp,
                isCreatingNew: isCreatingNewProp,
                isRemixing: isRemixingProp,
                isShowingWithId: isShowingWithIdProp,
                isShowingWithoutId: isShowingWithoutIdProp,
                isUpdating: isUpdatingProp,
                loadingState,
                onCreatedProject: onCreatedProjectProp,
                onCreateProject: onCreateProjectProp,
                onProjectError: onProjectErrorProp,
                onUpdatedProject: onUpdatedProjectProp,
                onUpdateProject: onUpdateProjectProp,
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
        isRemixing: PropTypes.bool,
        isShowingWithId: PropTypes.bool,
        isShowingWithoutId: PropTypes.bool,
        isUpdating: PropTypes.bool,
        loadingState: PropTypes.oneOf(LoadingStates),
        onCreateProject: PropTypes.func,
        onCreatedProject: PropTypes.func,
        onProjectError: PropTypes.func,
        onUpdateProject: PropTypes.func,
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
            isShowingWithId: getIsShowingProject(loadingState),
            isShowingWithoutId: getIsShowingWithoutId(loadingState),
            isUpdating: getIsUpdating(loadingState),
            loadingState: loadingState,
            reduxProjectId: state.scratchGui.projectState.projectId,
            reduxProjectTitle: state.scratchGui.projectTitle,
            vm: state.scratchGui.vm
        };
    };
    const mapDispatchToProps = dispatch => ({
        onCreatedProject: (projectId, loadingState) => dispatch(doneCreatingProject(projectId, loadingState)),
        onCreateProject: () => dispatch(createProject()),
        onProjectError: error => dispatch(projectError(error)),
        onUpdateProject: () => dispatch(updateProject()),
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
