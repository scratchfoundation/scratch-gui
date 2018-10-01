// NOTE: maybe this whole HOC can be moved inside project-id reducer?

import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';
import VM from 'scratch-vm';

import storage from '../lib/storage';
import {ProjectState, doneSavingWithId} from '../reducers/project-id';
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
        }
        doStoreProject (id, onSaveFinished) {
            // NOTE: temporarily just pretend saving worked
            if (1===1) {
                return Promise.resolve();
            }
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
                isSavingWithId,
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
        doneSavingWithId: PropTypes.func,
        isSavingWithId: PropTypes.bool,
        reduxProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        vm: PropTypes.instanceOf(VM).isRequired
    };
    const mapStateToProps = state => {
        const projectState = state.scratchGui.projectId.projectState;
        return {
            isSavingWithId: projectState === ProjectState.SAVING_WITH_ID ||
                projectState === ProjectState.SAVING_WITH_ID_BEFORE_NEW,
            reduxProjectId: state.scratchGui.projectId.projectId,
            vm: state.scratchGui.vm
        };
    };
    const mapDispatchToProps = dispatch => ({
        // doStoreProject: projectId => doStoreProject(projectId),
        doneSavingWithId: projectId => dispatch(doneSavingWithId(projectId))
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(ProjectSaverComponent);
};

export {
    ProjectSaverHOC as default
};
