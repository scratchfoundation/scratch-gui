import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import VM from 'scratch-vm';

import storage from '../lib/storage';
import {
    ProjectState,
    doneCreatingNew,
    doneSavingWithId,
    goToErrorState,
    isSavingWithId
} from '../reducers/project-state';

/* Higher Order Component to provide behavior for saving projects.
 */
const ProjectSaverHOC = function (WrappedComponent) {
    class ProjectSaverComponent extends React.Component {
        componentDidUpdate (prevProps) {
            if (this.props.isSavingWithId && !prevProps.isSavingWithId) {
                this.storeProject({
                    action: 'update',
                    id: this.props.reduxProjectId
                })
                    .then(response => { // eslint-disable-line no-unused-vars
                        // NOTE: should we check/handle response value here?
                        this.props.doneSavingWithId(this.props.projectState);
                    })
                    .catch(err => {
                        // NOTE: should throw up a notice for user
                        this.props.goToErrorState(`Saving the project failed with error: ${err}`);
                    });
            }
            if (this.props.isCreatingNew && !prevProps.isCreatingNew) {
                this.storeProject({
                    action: 'create'
                })
                    .then(response => {
                        this.props.doneCreatingNew(response.id);
                    })
                    .catch(err => {
                        // NOTE: should throw up a notice for user
                        this.props.goToErrorState(`Creating a new project failed with error: ${err}`);
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
                doneCreatingNew: doneCreatingNewProp,
                doneSavingWithId: doneSavingWithIdProp,
                goToErrorState: goToErrorStateProp,
                isCreatingNew: isCreatingNewProp,
                isSavingWithId: isSavingWithIdProp,
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
        doneCreatingNew: PropTypes.func,
        doneSavingWithId: PropTypes.func,
        goToErrorState: PropTypes.func,
        isCreatingNew: PropTypes.bool,
        isSavingWithId: PropTypes.bool,
        projectState: PropTypes.string,
        reduxProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        vm: PropTypes.instanceOf(VM).isRequired
    };
    const mapStateToProps = state => {
        const projectState = state.scratchGui.projectId.projectState;
        return {
            isCreatingNew: projectState === ProjectState.CREATING_NEW,
            isSavingWithId: isSavingWithId(projectState),
            projectState: projectState,
            reduxProjectId: state.scratchGui.projectId.projectId,
            vm: state.scratchGui.vm
        };
    };
    const mapDispatchToProps = dispatch => ({
        doneCreatingNew: projectId => dispatch(doneCreatingNew(projectId)),
        doneSavingWithId: (projectId, projectState) => dispatch(doneSavingWithId(projectId, projectState)),
        goToErrorState: errStr => dispatch(goToErrorState(errStr))
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(ProjectSaverComponent);
};

export {
    ProjectSaverHOC as default
};
