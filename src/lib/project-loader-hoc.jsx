import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import analytics from './analytics';
import log from './log';
import storage from './storage';

import {setProjectId, setProjectData} from '../reducers/vm';

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
                fetchingProject: false
            };
        }
        componentDidMount () {
            window.addEventListener('hashchange', this.updateProject);
            this.updateProject();
        }
        componentWillUpdate (nextProps) {
            const projectId = nextProps.projectId;
            if (this.props.projectId !== projectId) {
                // Replace URL hash without triggering a hash change event
                history.replaceState({}, document.title,
                    projectId ? `./#${projectId}` : '.');
                if (projectId === null) return; // load button triggered this and is already calling setProjectData
                this.setState({fetchingProject: true}, () => {
                    storage
                        .load(storage.AssetType.Project, projectId, storage.DataFormat.JSON)
                        .then(projectAsset => {
                            if (!projectAsset) return;

                            this.setState({
                                fetchingProject: false
                            });

                            this.props.setNewProjectData(projectAsset.data, projectId);
                        })
                        .catch(err => log.error(err));
                });
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
            if (projectId !== this.props.projectId) {
                if (projectId.length < 1) projectId = 0;
                this.props.setNewProjectId(projectId);

                if (projectId !== 0) {
                    analytics.event({
                        category: 'project',
                        action: 'Load Project',
                        value: projectId,
                        nonInteraction: true
                    });
                }
            }
        }
        render () {
            const {
                projectId, // eslint-disable-line no-unused-vars
                setNewProjectData, // eslint-disable-line no-unused-vars
                setNewProjectId, // eslint-disable-line no-unused-vars
                ...props
            } = this.props;
            return (
                <WrappedComponent
                    fetchingProject={this.state.fetchingProject}
                    {...props}
                />
            );
        }
    }

    ProjectLoaderComponent.propTypes = {
        projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        setNewProjectData: PropTypes.func,
        setNewProjectId: PropTypes.func
    };

    const mapStateToProps = state => ({
        projectId: state.vm.projectId
    });

    const mapDispatchToProps = dispatch => ({
        setNewProjectId: projectId => dispatch(setProjectId(projectId)),
        setNewProjectData: (projectData, projectId) => dispatch(setProjectData(projectData, projectId))
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(ProjectLoaderComponent);
};

export {
    ProjectLoaderHOC as default
};
