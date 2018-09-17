import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {intlShape, injectIntl} from 'react-intl';

import {setProjectId, newDefaultProjectId} from '../reducers/project-id';
import {defaultProjectTitleMessages, setProjectTitle} from '../reducers/project-title';

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
            this.updateProject = this.updateProject.bind(this);
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
            props.setReduxProjectId(props.projectId);
            if (
                props.projectId !== '' &&
                props.projectId !== null &&
                typeof props.projectId !== 'undefined'
            ) {
                this.updateProject(props.projectId);
            }
        }
        componentWillUpdate (nextProps) {
            if (this.props.projectHost !== nextProps.projectHost) {
                storage.setProjectHost(nextProps.projectHost);
            }
            if (this.props.assetHost !== nextProps.assetHost) {
                storage.setAssetHost(nextProps.assetHost);
            }
            // debugger;
            // updating the projectId after initial mount depends on four values:
            // 1. existing projectId property passed in from higher
            // 2. existing redux projectId maintained in store
            // 3. new projectId property passed in from higher
            // 4. new redux projectId from store
            //
            // the update logic is to update which project we display, iff:
            // a. new redux projectId is different from existing redux projectId
            // AND existing projectId prop (#2 !== #4 && #1 !== #4)
            // b. redux projectId has NOT been changed, but projectId passed in
            // has (#1 !== #3)
            if (this.props.reduxProjectId !== nextProps.reduxProjectId &&
                this.props.projectId !== nextProps.reduxProjectId) {
                this.setState({fetchingProject: true}, () => {
                    this.updateProject(nextProps.reduxProjectId);
                });
            } else if (this.props.projectId !== nextProps.projectId) {
                this.props.setReduxProjectId(nextProps.projectId);
                this.setState({fetchingProject: true}, () => {
                    this.updateProject(nextProps.projectId);
                });
            }
        }
        updateProject (projectId) {
            // debugger;
            storage
                .load(storage.AssetType.Project, projectId, storage.DataFormat.JSON)
                .then(projectAsset => projectAsset && this.setState({
                    projectData: projectAsset.data,
                    fetchingProject: false
                }))
                .then(() => {
                    if (projectId === newDefaultProjectId) {
                        // if default project, set title to localized default
                        this.props.setReduxProjectTitle(
                            this.props.intl.formatMessage(defaultProjectTitleMessages.defaultProjectTitle)
                        );
                        history.pushState(
                            null,
                            this.props.intl.formatMessage(defaultProjectTitleMessages.defaultProjectTitle),
                            '/newprojecturlhere'
                        );
                    } else {
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
                projectHost,
                projectId,
                reduxProjectId,
                setReduxProjectId: setReduxProjectIdProp,
                /* eslint-enable no-unused-vars */
                ...componentProps
            } = this.props;
            if (!this.state.projectData) return null;
            return (
                <WrappedComponent
                    fetchingProject={this.state.fetchingProject}
                    projectData={this.state.projectData}
                    {...componentProps}
                />
            );
        }
    }
    ProjectLoaderComponent.propTypes = {
        assetHost: PropTypes.string,
        intl: intlShape.isRequired,
        projectHost: PropTypes.string,
        projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        reduxProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        setReduxProjectId: PropTypes.func,
        setReduxProjectTitle: PropTypes.func
    };
    ProjectLoaderComponent.defaultProps = {
        assetHost: 'https://assets.scratch.mit.edu',
        projectHost: 'https://projects.scratch.mit.edu',
        projectId: newDefaultProjectId
    };

    const mapStateToProps = state => {
        return {
            reduxProjectId: state.scratchGui.projectId
        };
    };

    const mapDispatchToProps = dispatch => ({
        setReduxProjectId: id => dispatch(setProjectId(id)),
        setReduxProjectTitle: title => dispatch(setProjectTitle(title))
    });

    return injectIntl(connect(mapStateToProps, mapDispatchToProps)(ProjectLoaderComponent));
};

export {
    ProjectLoaderHOC as default
};
