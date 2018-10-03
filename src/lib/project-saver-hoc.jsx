// NOTE: maybe this whole HOC can be moved inside project-id reducer?

import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';
import VM from 'scratch-vm';

import storage from '../lib/storage';
import {
    ProjectState,
    doneCreatingNew,
    doneSavingWithId,
    goToErrorState,
    isSavingWithId
} from '../reducers/project-id';
// import {doStoreProject} from '../reducers/vm';
// import storage from './storage';

/* Higher Order Component to provide behavior for saving projects.
 */
const ProjectSaverHOC = function (WrappedComponent) {
    class ProjectSaverComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'doStoreProject'
            ]);
            this.state = {
            };
        }
        componentWillReceiveProps (nextProps) {
            if (nextProps.isSavingWithId && !this.props.isSavingWithId) {
                this.doStoreProject(nextProps.reduxProjectId).then(() => {
                    this.props.doneSavingWithId();
                });
            }
            if (nextProps.isCreatingNew && !this.props.isCreatingNew) {
                this.doStoreProject()
                    .then(projectBody => {
                        this.props.doneCreatingNew(projectBody.id);
                    })
                    .catch(err => {
                        this.props.goToErrorState(`Creating a new project failed with error: ${err}`);
                    });
            }
        }
        doStoreProject (id, onSaveFinished) {
            // NOTE: temporarily just pretend saving worked
            // if (1===1) {
            //     return Promise.resolve();
            // }
            return this.props.vm.saveProjectSb3()
                .then(content => {
                    if (onSaveFinished) {
                        onSaveFinished();
                    }
                    const assetType = storage.AssetType.Project;
                    const dataFormat = storage.DataFormat.SB3;
                    const body = new FormData();
                    body.append('sb3_file', content, 'sb3_file');
                    return storage.store(
                        assetType,
                        dataFormat,
                        body,
                        id
                    );
                });
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                // doStoreProject: doStoreProjectProp,
                doneSavingWithId: doneSavingWithIdProp,
                isSavingWithId: isSavingWithIdProp,
                reduxProjectId,
                /* eslint-enable no-unused-vars */
                ...componentProps
            } = this.props;
            return (
                <WrappedComponent
                    doStoreProject={this.doStoreProject}
                    {...componentProps}
                />
            );
        }
    }
    ProjectSaverComponent.propTypes = {
        doStoreProject: PropTypes.func,
        doneCreatingNew: PropTypes.func,
        doneSavingWithId: PropTypes.func,
        goToErrorState: PropTypes.func,
        isCreatingNew: PropTypes.bool,
        isSavingWithId: PropTypes.bool,
        reduxProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        vm: PropTypes.instanceOf(VM).isRequired
    };
    const mapStateToProps = state => {
        const projectState = state.scratchGui.projectId.projectState;
        return {
            isCreatingNew: projectState === ProjectState.CREATING_NEW,
            isSavingWithId: isSavingWithId(projectState),
            reduxProjectId: state.scratchGui.projectId.projectId,
            vm: state.scratchGui.vm
        };
    };
    const mapDispatchToProps = dispatch => ({
        // doStoreProject: projectId => doStoreProject(projectId),
        doneCreatingNew: projectId => dispatch(doneCreatingNew(projectId)),
        doneSavingWithId: projectId => dispatch(doneSavingWithId(projectId)),
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
