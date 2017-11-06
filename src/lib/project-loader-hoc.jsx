import React from 'react';

import log from './log';
import storage from './storage';

/* Higher Order Component to provide behavior for loading projects by id from
 * the window's hash (#this part in the url)
 * @param {React.Component} WrappedComponent component to receive projectData prop
 * @returns {React.Component} component with project loading behavior
 */
const ProjectLoaderHOC = function (WrappedComponent) {
    class ProjectLoaderComponent extends React.Component {
        constructor (props) {
            super(props);
            this.fetchProjectId = this.fetchProjectId.bind(this);
            this.updateProject = this.updateProject.bind(this);
            this.state = {
                projectId: null,
                projectData: null
            };
        }
        componentDidMount () {
            window.addEventListener('hashchange', this.updateProject);
            this.updateProject();
        }
        componentDidUpdate (prevProps, prevState) {
            if (this.state.projectId !== prevState.projectId) {
                storage
                    .load(storage.AssetType.Project, this.state.projectId, storage.DataFormat.JSON)
                    .then(projectAsset => projectAsset && this.setState({
                        projectData: projectAsset.data.toString()
                    }))
                    .catch(err => log.error(err));
            }
        }
        componentWillUnmount () {
            window.removeEventListener('hashchange', this.updateProject);
        }
        fetchProjectId () {
            return window.location.hash.substring(1);
        }
        updateProject () {
            let projectId = this.fetchProjectId();
            if (projectId !== this.state.projectId) {
                if (projectId.length < 1) projectId = 0;
                this.setState({projectId: projectId});
            }
        }
        render () {
            if (!this.state.projectData) return null;
            return (
                <WrappedComponent
                    projectData={this.state.projectData}
                    {...this.props}
                />
            );
        }
    }

    return ProjectLoaderComponent;
};


export {
    ProjectLoaderHOC as default
};
