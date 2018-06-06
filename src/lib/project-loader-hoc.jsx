import React from 'react';
import PropTypes from 'prop-types';

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
        }
        componentDidMount () {
            if (this.props.projectId || this.props.projectId === 0) {
                this.updateProject(this.props.projectId);
            }
        }
        componentWillUpdate (nextProps) {
            if (this.props.projectId !== nextProps.projectId) {
                this.setState({fetchingProject: true}, () => {
                    this.updateProject(nextProps.projectId);
                });
            }
        }
        updateProject (projectId) {
            storage
                .load(storage.AssetType.Project, projectId, storage.DataFormat.JSON)
                .then(projectAsset => projectAsset && this.setState({
                    projectData: projectAsset.data,
                    fetchingProject: false
                }))
                .then(() => {
                    if (projectId !== 0) {
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
                projectId, // eslint-disable-line no-unused-vars
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
        projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    };
    ProjectLoaderComponent.defaultProps = {
        projectId: 0
    };

    return ProjectLoaderComponent;
};

export {
    ProjectLoaderHOC as default
};
