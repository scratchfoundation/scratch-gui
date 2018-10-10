import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import VM from 'scratch-vm';

import storage from '../lib/storage';
import {
    ProjectState,
    ProjectStates,
    isCreating,
    isUpdating,
    onCreated,
    onUpdated,
    onError
} from '../reducers/project-state';

/* Higher Order Component to provide behavior for saving projects.
 */
const ProjectSaverHOC = function (WrappedComponent) {
    class ProjectSaverComponent extends React.Component {
        componentDidUpdate (prevProps) {
            if (this.props.isUpdating && !prevProps.isUpdating) {
                this.storeProject({
                    action: 'update',
                    id: this.props.reduxProjectId
                })
                    .then(() => { // eslint-disable-line no-unused-vars
                        // there is nothing we expect to find in response that we need to check here
                        this.props.onUpdated(this.props.projectState);
                    })
                    .catch(err => {
                        // NOTE: should throw up a notice for user
                        this.props.onError(`Saving the project failed with error: ${err}`);
                    });
            }
            if (this.props.isCreating && !prevProps.isCreating) {
                this.storeProject({
                    action: 'create'
                })
                    .then(response => {
                        this.props.onCreated(response.id);
                    })
                    .catch(err => {
                        // NOTE: should throw up a notice for user
                        this.props.onError(`Creating a new project failed with error: ${err}`);
                    });
            }
        }
        storeProject (opts) {
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
                        opts.id // undefined value will cause POST/create; defined id will cause PUT/update
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
                projectState,
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
        onCreated: PropTypes.func,
        onError: PropTypes.func,
        onUpdated: PropTypes.func,
        projectState: PropTypes.oneOf(ProjectStates),
        reduxProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        vm: PropTypes.instanceOf(VM).isRequired
    };
    const mapStateToProps = state => {
        const projectState = state.scratchGui.projectId.projectState;
        return {
            isCreating: isCreating(projectState),
            isUpdating: isUpdating(projectState),
            projectState: projectState,
            reduxProjectId: state.scratchGui.projectId.projectId,
            vm: state.scratchGui.vm
        };
    };
    const mapDispatchToProps = dispatch => ({
        onCreated: projectId => dispatch(onCreated(projectId)),
        onUpdated: (projectId, projectState) => dispatch(onUpdated(projectId, projectState)),
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
