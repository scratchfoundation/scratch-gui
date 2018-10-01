// NOTE: maybe this whole HOC can be moved inside project-id reducer?

import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';

import {ProjectState, doneSavingWithId} from '../reducers/project-id';
import {doStoreProject} from '../reducers/vm';
// import storage from './storage';

/* Higher Order Component to provide behavior for saving projects.
 */
const ProjectSaverHOC = function (WrappedComponent) {
    class ProjectSaverComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
            ]);
            this.state = {
            };
        }
        componentWillReceiveProps (nextProps) {
            if (nextProps.isSavingWithId && !this.props.isSavingWithId) {
                this.doStoreProject(nextProps.reduxProjectId).then(() => {
                    this.doneSavingWithId();
                });
            }
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
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
        doStoreProject: PropTypes.func,
        doneSavingWithId: PropTypes.func,
        isSavingWithId: PropTypes.bool,
        reduxProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    };

    const mapStateToProps = state => {
        const projectState = state.scratchGui.projectId.projectState;
        return {
            isSavingWithId: projectState === ProjectState.SAVING_WITH_ID ||
                projectState === ProjectState.SAVING_WITH_ID_BEFORE_NEW,
            reduxProjectId: state.scratchGui.projectId.projectId
        };
    };
    const mapDispatchToProps = dispatch => ({
        doStoreProject: projectId => dispatch(doStoreProject(projectId)),
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
