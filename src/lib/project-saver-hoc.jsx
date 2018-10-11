import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import VM from 'scratch-vm';

import storage from '../lib/storage';
import {
    LoadingStates,
    getIsCreating,
    getIsUpdating,
    onCreated,
    onUpdated,
    onError
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
                    .then(() => { // eslint-disable-line no-unused-vars
                        // there is nothing we expect to find in response that we need to check here
                        this.props.onUpdated(this.props.loadingState);
                    })
                    .catch(err => {
                        // NOTE: should throw up a notice for user
                        this.props.onError(`Saving the project failed with error: ${err}`);
                    });
            }
            if (this.props.isCreating && !prevProps.isCreating) {
                this.storeProject()
                    .then(response => {
                        this.props.onCreated(response.id);
                    })
                    .catch(err => {
                        // NOTE: should throw up a notice for user
                        this.props.onError(`Creating a new project failed with error: ${err}`);
                    });
            }
        }
        /**
         * storeProject:
         * @param  {number|string|undefined} projectId defined value causes PUT/update; undefined causes POST/create
         * @return {Promise} resolves with json object containing project's existing or new id
         */
        storeProject (projectId) {
            return this.props.vm.saveProjectSb3()
                .then(content => {
                    const assetType = storage.AssetType.Project;
                    const dataFormat = storage.DataFormat.SB3;
                    const body = new FormData();
                    body.append('sb3_file', content, 'sb3_file');
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
                onCreated: onCreatedProp,
                onUpdated: onUpdatedProp,
                onError: onErrorProp,
                isCreating: isCreatingProp,
                isUpdating: isUpdatingProp,
                loadingState,
                reduxProjectId,
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
        isCreating: PropTypes.bool,
        isUpdating: PropTypes.bool,
        loadingState: PropTypes.oneOf(LoadingStates),
        onCreated: PropTypes.func,
        onError: PropTypes.func,
        onUpdated: PropTypes.func,
        reduxProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        vm: PropTypes.instanceOf(VM).isRequired
    };
    const mapStateToProps = state => {
        const loadingState = state.scratchGui.projectState.loadingState;
        return {
            isCreating: getIsCreating(loadingState),
            isUpdating: getIsUpdating(loadingState),
            loadingState: loadingState,
            reduxProjectId: state.scratchGui.projectState.projectId,
            vm: state.scratchGui.vm
        };
    };
    const mapDispatchToProps = dispatch => ({
        onCreated: projectId => dispatch(onCreated(projectId)),
        onUpdated: (projectId, loadingState) => dispatch(onUpdated(projectId, loadingState)),
        onError: errStr => dispatch(onError(errStr))
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(ProjectSaverComponent);
};

export {
    ProjectSaverHOC as default
};
