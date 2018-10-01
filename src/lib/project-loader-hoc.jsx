import React from 'react';
import PropTypes from 'prop-types';
import {intlShape, injectIntl} from 'react-intl';
import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';

import {ProjectState, defaultProjectId, setInitialProjectId} from '../reducers/project-id';

import analytics from './analytics';
import log from './log';
import storage from './storage';

/* Higher Order Component to provide behavior for loading projects by id. If
 * there's no id, the default project is loaded.
 * @param {React.Component} WrappedComponent component to receive projectData prop
 * @returns {React.Component} component with project loading behavior
 */
const ProjectLoaderHOC = function (WrappedComponent) {
    class ProjectLoaderComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'handleRequestNewProject',
                'updateProject'
            ]);
            this.state = {
                projectData: null,
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
                // NOTE: may need to reenable this
                // this.updateProject(props.projectId);
            }
        }
        // NOTE: try componentWillReceiveProps instead?
        componentWillUpdate (nextProps) {
            if (this.props.projectHost !== nextProps.projectHost) {
                storage.setProjectHost(nextProps.projectHost);
            }
            if (this.props.assetHost !== nextProps.assetHost) {
                storage.setAssetHost(nextProps.assetHost);
            }
            if (nextProps.isLoadingProjectWithId && !this.props.isLoadingProjectWithId) {
                this.updateProject(nextProps.reduxProjectId);
            }
            // if (this.props.projectId !== nextProps.projectId) {
            //     this.setState({fetchingProject: true}, () => {
            //         this.updateProject(nextProps.projectId);
            //     });
            // }
        }
        // handleRequestNewProject (callback) {
        //     // pass the request up the chain
        //     this.props.onRequestNewProject(newProjectId => {
        //         // now that parents have had chance to act and change the projectId,
        //         // update the metadata using the projectId -- even if it is the
        //         // same projectId as before.
        //         // this.updateProject(newProjectId).then(() => {
        //             if (callback) callback(newProjectId); // pass the callback down the chain
        //         // });
        //     });
        // }
        // NOTE: should we instesad have updateProject return a promise, and resolve those
        // in the functions that call updatePromise to improve the execution sequence?
        updateProject (projectId) {
            return storage
                .load(storage.AssetType.Project, projectId, storage.DataFormat.JSON)
                .then(projectAsset => {
                    if (projectAsset) {
                        this.setState({
                            projectData: projectAsset.data,
                            fetchingProject: false
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
                onRequestNewProject,
                projectHost,
                projectId,
                /* eslint-enable no-unused-vars */
                ...componentProps
            } = this.props;
            if (!this.state.projectData) return null;
            return (
                <WrappedComponent
                    fetchingProject={this.state.fetchingProject}
                    projectData={this.state.projectData}
                    onRequestNewProject={this.handleRequestNewProject}
                    {...componentProps}
                />
            );
        }
    }
    ProjectLoaderComponent.propTypes = {
        assetHost: PropTypes.string,
        intl: intlShape.isRequired,
        isLoadingProjectWithId: PropTypes.bool,
        onRequestNewProject: PropTypes.func,
        projectHost: PropTypes.string,
        projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        reduxProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        setInitialProjectId: PropTypes.func
    };
    ProjectLoaderComponent.defaultProps = {
        // NOTE: shouldn't these settings be moved into webpack, like API_HOST?
        assetHost: 'https://assets.scratch.mit.edu',
        projectHost: 'https://projects.scratch.mit.edu'
        // NOTE: disabled because either embed or hash parser should provide val
        // projectId: defaultProjectId
    };

    const mapStateToProps = state => {
        const projectState = state.scratchGui.projectId.projectState;
        return {
            isLoadingProjectWithId: projectState === ProjectState.LOADING_WITH_ID ||
                projectState === ProjectState.LOADING_NEW_DEFAULT,
            reduxProjectId: state.scratchGui.projectId.projectId
        };
    };
    const mapDispatchToProps = dispatch => ({
        setInitialProjectId: projectId => dispatch(setInitialProjectId(projectId))
    });
    return injectIntl(connect(
        mapStateToProps,
        mapDispatchToProps
    )(ProjectLoaderComponent));
};

export {
    ProjectLoaderHOC as default
};
