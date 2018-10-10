import React from 'react';
import PropTypes from 'prop-types';
import {intlShape, injectIntl} from 'react-intl';
import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';

import {
    ProjectStates,
    defaultProjectId,
    onFetchedProjectData,
    isFetchingProjectWithId,
    setProjectId
} from '../reducers/project-state';

import analytics from './analytics';
import log from './log';
import storage from './storage';

/* Higher Order Component to provide behavior for loading projects by id. If
 * there's no id, the default project is loaded.
 * @param {React.Component} WrappedComponent component to receive projectData prop
 * @returns {React.Component} component with project loading behavior
 */
const ProjectFetcherHOC = function (WrappedComponent) {
    class ProjectFetcherComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'fetchProject'
            ]);
            storage.setProjectHost(props.projectHost);
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
                this.props.setProjectId(props.projectId);
            }
        }
        componentDidUpdate (prevProps) {
            if (prevProps.projectHost !== this.props.projectHost) {
                storage.setProjectHost(this.props.projectHost);
            }
            if (prevProps.assetHost !== this.props.assetHost) {
                storage.setAssetHost(this.props.assetHost);
            }
            if (this.props.isFetchingProjectWithId && !prevProps.isFetchingProjectWithId) {
                this.fetchProject(this.props.reduxProjectId, this.props.projectState);
            }
        }
        fetchProject (projectId, projectState) {
            return storage
                .load(storage.AssetType.Project, projectId, storage.DataFormat.JSON)
                .then(projectAsset => {
                    if (projectAsset) {
                        this.props.onFetchedProjectData(projectAsset.data, projectState);
                    }
                })
                .then(() => {
                    if (projectId !== defaultProjectId) {
                        // if not default project, register a project load event
                        analytics.event({
                            category: 'project',
                            action: 'Load Project',
                            label: projectId,
                            nonInteraction: true
                        });
                    }
                })
                .catch(err => {
                    log.error(err);
                });
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                assetHost,
                onFetchedProjectData: onFetchedProjectDataProp,
                intl,
                projectHost,
                projectId,
                projectState,
                reduxProjectId,
                setProjectId: setProjectIdProp,
                /* eslint-enable no-unused-vars */
                isFetchingProjectWithId: isFetchingProjectWithIdProp,
                ...componentProps
            } = this.props;
            return (
                <WrappedComponent
                    fetchingProject={isFetchingProjectWithIdProp}
                    {...componentProps}
                />
            );
        }
    }
    ProjectFetcherComponent.propTypes = {
        assetHost: PropTypes.string,
        intl: intlShape.isRequired,
        isFetchingProjectWithId: PropTypes.bool,
        onFetchedProjectData: PropTypes.func,
        projectHost: PropTypes.string,
        projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        projectState: PropTypes.oneOf(ProjectStates),
        reduxProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        setProjectId: PropTypes.func
    };
    ProjectFetcherComponent.defaultProps = {
        assetHost: 'https://assets.scratch.mit.edu',
        projectHost: 'https://projects.scratch.mit.edu'
    };

    const mapStateToProps = state => ({
        isFetchingProjectWithId: isFetchingProjectWithId(state.scratchGui.projectId.projectState),
        projectState: state.scratchGui.projectId.projectState,
        reduxProjectId: state.scratchGui.projectId.projectId
    });
    const mapDispatchToProps = dispatch => ({
        onFetchedProjectData: (projectData, projectState) =>
            dispatch(onFetchedProjectData(projectData, projectState)),
        setProjectId: projectId => dispatch(setProjectId(projectId))
    });
    return injectIntl(connect(
        mapStateToProps,
        mapDispatchToProps
    )(ProjectFetcherComponent));
};

export {
    ProjectFetcherHOC as default
};
