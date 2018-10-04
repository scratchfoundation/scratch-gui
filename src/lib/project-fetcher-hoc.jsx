import React from 'react';
import PropTypes from 'prop-types';
import {intlShape, injectIntl} from 'react-intl';
import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';

import {
    defaultProjectId,
    fetchedProjectData,
    isFetchingProjectWithId,
    setInitialProjectId
} from '../reducers/project-id';

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
            this.state = {
                fetchingProject: false
            };
            storage.setProjectHost(props.projectHost);
            storage.setAssetHost(props.assetHost);
            storage.setTranslatorFunction(props.intl.formatMessage);
            // props.projectId might be unset, in which case we use our default;
            // or it may be set by an even higher HOC, and passed to us.
            // Either way, we now know what the initial projectId should be, so
            // set it in the redux store.
            // debugger;
            if (
                props.projectId !== '' &&
                props.projectId !== null &&
                typeof props.projectId !== 'undefined'
            ) {
                this.props.setInitialProjectId(props.projectId);
            }
        }
        // NOTE: should this be componentWillUpdate or componentWillReceiveProps?
        componentWillUpdate (nextProps) {
            if (this.props.projectHost !== nextProps.projectHost) {
                storage.setProjectHost(nextProps.projectHost);
            }
            if (this.props.assetHost !== nextProps.assetHost) {
                storage.setAssetHost(nextProps.assetHost);
            }
            if (nextProps.isFetchingProjectWithId && !this.props.isFetchingProjectWithId) {
                this.fetchProject(nextProps.reduxProjectId);
            }
        }
        fetchProject (projectId) {
            return storage
                .load(storage.AssetType.Project, projectId, storage.DataFormat.JSON)
                .then(projectAsset => {
                    if (projectAsset) {
                        this.setState({
                            fetchingProject: false
                        }, () => {
                            this.props.fetchedProjectData(projectAsset.data);
                        });
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
                .catch(err => log.error(err));
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                assetHost,
                fetchedProjectData: fetchedProjectDataProp,
                intl,
                isFetchingProjectWithId: isFetchingProjectWithIdProp,
                projectHost,
                projectId,
                reduxProjectId,
                setInitialProjectId: setInitialProjectIdProp,
                /* eslint-enable no-unused-vars */
                ...componentProps
            } = this.props;
            return (
                <WrappedComponent
                    fetchingProject={this.state.fetchingProject}
                    {...componentProps}
                />
            );
        }
    }
    ProjectFetcherComponent.propTypes = {
        assetHost: PropTypes.string,
        fetchedProjectData: PropTypes.func,
        intl: intlShape.isRequired,
        isFetchingProjectWithId: PropTypes.bool,
        projectHost: PropTypes.string,
        projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        reduxProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        setInitialProjectId: PropTypes.func
    };
    ProjectFetcherComponent.defaultProps = {
        // NOTE: shouldn't these settings be moved into webpack, like API_HOST?
        assetHost: 'https://assets.scratch.mit.edu',
        projectHost: 'https://projects.scratch.mit.edu'
    };

    const mapStateToProps = state => {
        const projectState = state.scratchGui.projectId.projectState;
        return {
            isFetchingProjectWithId: isFetchingProjectWithId(projectState),
            reduxProjectId: state.scratchGui.projectId.projectId
        };
    };
    const mapDispatchToProps = dispatch => ({
        fetchedProjectData: data => dispatch(fetchedProjectData(data)),
        setInitialProjectId: projectId => dispatch(setInitialProjectId(projectId))
    });
    return injectIntl(connect(
        mapStateToProps,
        mapDispatchToProps
    )(ProjectFetcherComponent));
};

export {
    ProjectFetcherHOC as default
};
