import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import VM from 'scratch-vm';

import log from '../lib/log';
import storage from '../lib/storage';
import dataURItoBlob from '../lib/data-uri-to-blob';

import {
    showAlertWithTimeout,
    showStandardAlert
} from '../reducers/alerts';
import {setAutoSaveTimeoutId} from '../reducers/timeout';
import {setProjectUnchanged} from '../reducers/project-changed';
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
        constructor (props) {
            super(props);
            bindAll(this, [
                'tryToAutoSave'
            ]);
        }
        componentDidUpdate (prevProps) {
            if (this.props.projectChanged && !prevProps.projectChanged) {
                this.scheduleAutoSave();
            }
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

            // see if we should "create" the current project on the server
            //
            // don't try to create or save immediately after trying to create
            if (prevProps.isCreatingNew) return;
            // if we're newly able to create this project, create it!
            if (this.isShowingCreatable(this.props) && !this.isShowingCreatable(prevProps)) {
                this.props.onCreateProject();
            }

            // see if we should save/update the current project on the server
            //
            // don't try to save immediately after trying to save
            if (prevProps.isUpdating) return;
            // if we're newly able to save this project, save it!
            const becameAbleToSave = this.props.canSave && !prevProps.canSave;
            const becameShared = this.props.isShared && !prevProps.isShared;
            if (this.props.isShowingSaveable && (becameAbleToSave || becameShared)) {
                this.props.onAutoUpdateProject();
            }
        }
        componentWillUnmount () {
            this.clearAutoSaveTimeout();
        }
        clearAutoSaveTimeout () {
            if (this.props.autoSaveTimeoutId !== null) {
                clearTimeout(this.props.autoSaveTimeoutId);
                this.props.setAutoSaveTimeoutId(null);
            }
        }
        scheduleAutoSave () {
            if (this.props.isShowingSaveable && this.props.autoSaveTimeoutId === null) {
                const timeoutId = setTimeout(this.tryToAutoSave,
                    this.props.autosaveIntervalSecs * 1000);
                this.props.setAutoSaveTimeoutId(timeoutId);
            }
        }
        tryToAutoSave () {
            if (this.props.projectChanged && this.props.isShowingSaveable) {
                this.props.onAutoUpdateProject();
            }
        }
        isShowingCreatable (props) {
            return props.canCreateNew && props.isShowingWithoutId;
        }
        updateProjectToStorage () {
            this.props.onShowSavingAlert();
            return this.storeProject(this.props.reduxProjectId)
                .then(() => {
                    // there's an http response object available here, but we don't need to examine
                    // it, because there are no values contained in it that we care about
                    this.props.onUpdatedProject(this.props.loadingState);
                    this.props.onShowSaveSuccessAlert();
                })
                .catch(err => {
                    // Always show the savingError alert because it gives the
                    // user the chance to download or retry the save manually.
                    this.props.onShowAlert('savingError');
                    this.props.onProjectError(err);
                });
        }
        createNewProjectToStorage () {
            this.props.onShowCreatingAlert();
            return this.storeProject(null)
                .then(response => {
                    this.props.onCreatedProject(response.id.toString(), this.props.loadingState);
                    this.props.onShowCreateSuccessAlert();
                })
                .catch(err => {
                    this.props.onShowAlert('creatingError');
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
                    this.props.onCreatedProject(response.id.toString(), this.props.loadingState);
                    this.props.onShowCreateSuccessAlert();
                })
                .catch(err => {
                    this.props.onShowAlert('creatingError');
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
                    this.props.onCreatedProject(response.id.toString(), this.props.loadingState);
                    this.props.onShowCreateSuccessAlert();
                })
                .catch(err => {
                    this.props.onShowAlert('creatingError');
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
            requestParams = requestParams || {};
            this.clearAutoSaveTimeout();
            return Promise.all(this.props.vm.assets
                .filter(asset => !asset.clean)
                .map(
                    asset => storage.store(
                        asset.assetType,
                        asset.dataFormat,
                        asset.data,
                        asset.assetId
                    ).then(
                        () => (asset.clean = true)
                    )
                )
            ).then(() => {
                const body = new FormData();
                const sb3Json = new Blob([this.props.vm.toJSON()], {type: 'application/json'});
                body.append('sb3_file', sb3Json, 'sb3_file');
                for (const key in requestParams) {
                    if (requestParams.hasOwnProperty(key)) body.append(key, requestParams[key]);
                }
                return storage.store(
                    storage.AssetType.Project,
                    storage.DataFormat.JSON,
                    body,
                    projectId
                );
            })
                .then(response => {
                    this.props.onSetProjectUnchanged();
                    const id = response.id.toString();
                    if (id && this.props.onUpdateProjectThumbnail) {
                        this.storeProjectThumbnail(id);
                    }
                    return response;
                })
                .catch(err => {
                    log.error(err);
                    throw err; // pass the error up the chain
                });
        }

        /**
         * Store a snapshot of the project once it has been saved/created.
         * Needs to happen _after_ save because the project must have an ID.
         * @param {!string} projectId - id of the project, must be defined.
         */
        storeProjectThumbnail (projectId) {
            try {
                this.props.vm.renderer.requestSnapshot(dataURI => {
                    this.props.onUpdateProjectThumbnail(
                        projectId, dataURItoBlob(dataURI));
                });
            } catch (e) {
                log.error('Project thumbnail save error', e);
                // This is intentionally fire/forget because a failure
                // to save the thumbnail is not vitally important to the user.
            }
        }

        render () {
            const {
                /* eslint-disable no-unused-vars */
                autosaveIntervalSecs,
                isCreatingCopy,
                isCreatingNew,
                projectChanged,
                isManualUpdating,
                isRemixing,
                isShowingSaveable,
                isShowingWithId,
                isShowingWithoutId,
                isUpdating,
                loadingState,
                onAutoUpdateProject,
                onCreatedProject,
                onCreateProject,
                onProjectError,
                onShowAlert,
                onShowCreateSuccessAlert,
                onShowCreatingAlert,
                onShowSaveSuccessAlert,
                onShowSavingAlert,
                onUpdatedProject,
                onUpdateProjectThumbnail,
                reduxProjectId,
                reduxProjectTitle,
                setAutoSaveTimeoutId: setAutoSaveTimeoutIdProp,
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
        autoSaveTimeoutId: PropTypes.number,
        canCreateNew: PropTypes.bool,
        canSave: PropTypes.bool,
        isCreatingCopy: PropTypes.bool,
        isCreatingNew: PropTypes.bool,
        isManualUpdating: PropTypes.bool,
        isRemixing: PropTypes.bool,
        isShared: PropTypes.bool,
        isShowingSaveable: PropTypes.bool,
        isShowingWithId: PropTypes.bool,
        isShowingWithoutId: PropTypes.bool,
        isUpdating: PropTypes.bool,
        loadingState: PropTypes.oneOf(LoadingStates),
        onAutoUpdateProject: PropTypes.func,
        onCreateProject: PropTypes.func,
        onCreatedProject: PropTypes.func,
        onProjectError: PropTypes.func,
        onShowAlert: PropTypes.func,
        onShowCreateSuccessAlert: PropTypes.func,
        onShowCreatingAlert: PropTypes.func,
        onShowSaveSuccessAlert: PropTypes.func,
        onShowSavingAlert: PropTypes.func,
        onUpdateProjectThumbnail: PropTypes.func,
        onUpdatedProject: PropTypes.func,
        projectChanged: PropTypes.bool,
        reduxProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        reduxProjectTitle: PropTypes.string,
        vm: PropTypes.instanceOf(VM).isRequired
    };
    ProjectSaverComponent.defaultProps = {
        autosaveIntervalSecs: 120
    };
    const mapStateToProps = (state, ownProps) => {
        const loadingState = state.scratchGui.projectState.loadingState;
        const isShowingWithId = getIsShowingWithId(loadingState);
        return {
            autoSaveTimeoutId: state.scratchGui.timeout.autoSaveTimeoutId,
            isCreatingCopy: getIsCreatingCopy(loadingState),
            isCreatingNew: getIsCreatingNew(loadingState),
            isRemixing: getIsRemixing(loadingState),
            isShowingSaveable: ownProps.canSave && isShowingWithId,
            isShowingWithId: isShowingWithId,
            isShowingWithoutId: getIsShowingWithoutId(loadingState),
            isUpdating: getIsUpdating(loadingState),
            isManualUpdating: getIsManualUpdating(loadingState),
            loadingState: loadingState,
            projectChanged: state.scratchGui.projectChanged,
            reduxProjectId: state.scratchGui.projectState.projectId,
            reduxProjectTitle: state.scratchGui.projectTitle,
            vm: state.scratchGui.vm
        };
    };
    const mapDispatchToProps = dispatch => ({
        onAutoUpdateProject: () => dispatch(autoUpdateProject()),
        onCreatedProject: (projectId, loadingState) => dispatch(doneCreatingProject(projectId, loadingState)),
        onCreateProject: () => dispatch(createProject()),
        onProjectError: error => dispatch(projectError(error)),
        onSetProjectUnchanged: () => dispatch(setProjectUnchanged()),
        onShowAlert: alertType => dispatch(showStandardAlert(alertType)),
        onShowCreateSuccessAlert: () => showAlertWithTimeout(dispatch, 'createSuccess'),
        onShowCreatingAlert: () => showAlertWithTimeout(dispatch, 'creating'),
        onShowSaveSuccessAlert: () => showAlertWithTimeout(dispatch, 'saveSuccess'),
        onShowSavingAlert: () => showAlertWithTimeout(dispatch, 'saving'),
        onUpdatedProject: (projectId, loadingState) => dispatch(doneUpdatingProject(projectId, loadingState)),
        setAutoSaveTimeoutId: id => dispatch(setAutoSaveTimeoutId(id))
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
