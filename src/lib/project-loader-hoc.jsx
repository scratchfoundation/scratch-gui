import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {injectIntl, intlShape} from 'react-intl';

import {setProjectId} from '../reducers/project-id';

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
            props.setProjectId(props.projectId);
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
            if (this.props.projectId !== nextProps.projectId) {
                this.props.setProjectId(nextProps.projectId);
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
                /* eslint-disable no-unused-vars */
                assetHost,
                projectHost,
                projectId,
                setProjectId: setProjectIdProp,
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
        setProjectId: PropTypes.func
    };
    ProjectLoaderComponent.defaultProps = {
        assetHost: 'https://assets.scratch.mit.edu',
        projectHost: 'https://projects.scratch.mit.edu',
        projectId: 0
    };

    const mapStateToProps = () => ({});

    const mapDispatchToProps = dispatch => ({
        setProjectId: id => dispatch(setProjectId(id))
    });

    return injectIntl(connect(mapStateToProps, mapDispatchToProps)(ProjectLoaderComponent));
};

export {
    ProjectLoaderHOC as default
};
