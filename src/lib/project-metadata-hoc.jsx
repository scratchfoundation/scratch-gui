import React from 'react';
import defaultsdeep from 'lodash.defaultsdeep';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
// import {connect} from 'react-redux';
import {intlShape, injectIntl} from 'react-intl';
import xhr from 'xhr';

import {defaultProjectId} from '../reducers/project-id';
import {defaultProjectTitleMessages} from '../reducers/project-title';

const api = (options, token, callback) => {
    defaultsdeep(options, {
        host: process.env.API_HOST,
        headers: {},
        responseType: 'json'
    });
    if (token) {
        options.headers['X-Token'] = token;
    }

    xhr(options, (err, res, body) => {
        if (err) {
            console.log('err!');
        }
        console.log('response:');
        console.log(res);
        console.log('response body:');
        console.log(body);
        callback(body);
    });
};

/* Higher Order Component to get and set project metadata; currently only uses title.
 * @param {React.Component} WrappedComponent component to receive project title related props
 * @returns {React.Component} component with project loading behavior
 */
const ProjectMetaDataHOC = function (WrappedComponent) {
    class ProjectMetaDataComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'handleRequestNewProject',
                'updateProjectMetaData'
            ]);
            this.updateProjectMetaData(props.projectId);
        }
        componentWillUpdate (nextProps) {
            // if projectId has changed, and not just from one default value to
            // another equivalent value, look up project metadata
            if (this.props.projectId !== nextProps.projectId &&
                (this.props.projectId !== defaultProjectId ||
                this.props.projectId === null ||
                typeof this.props.projectId === 'undefined' ||
                nextProps.projectId !== defaultProjectId ||
                nextProps.projectId === null ||
                typeof nextProps.projectId === 'undefined')) {
                this.updateProjectMetaData(nextProps.projectId);
            }
        }
        handleRequestNewProject (callback) {
            // pass the request up the chain
            this.props.onRequestNewProject(newProjectId => {
                // now that parents have had chance to act and change the projectId,
                // update the metadata using the projectId -- even if it is the
                // same projectId as before.
                this.updateProjectMetaData(newProjectId);
                if (callback) callback(newProjectId); // pass the callback down the chain
            });
        }
        updateProjectMetaData (projectId) {
            if (projectId === defaultProjectId || projectId === null || typeof projectId === 'undefined') {
                // if project is default, use static data
                const newProjectTitle =
                    this.props.intl.formatMessage(defaultProjectTitleMessages.defaultProjectTitle);
                this.props.onUpdateProjectTitle(newProjectTitle);
            } else {
                // not using default project, so fetch from api
                api({
                    uri: `/projects/${projectId}`
                },
                null,
                // this.props.token,
                data => {
                    this.props.onUpdateProjectTitle(data.title);
                });
            }
        }
        render () {
            const {
                // don't pass down parent's onRequestNewProject
                onRequestNewProject, // eslint-disable-line no-unused-vars
                ...componentProps
            } = this.props;
            return (
                <WrappedComponent
                    onRequestNewProject={this.handleRequestNewProject}
                    {...componentProps}
                />
            );
        }
    }

    ProjectMetaDataComponent.propTypes = {
        intl: intlShape.isRequired,
        onRequestNewProject: PropTypes.func,
        onUpdateProjectTitle: PropTypes.func,
        projectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        token: PropTypes.string
    };

    // const mapStateToProps = state => ({
    //     token: state.session.session && state.session.session.user && state.session.session.user.token
    // });
    //
    // const mapDispatchToProps = () => ({});
    //
    // return injectIntl(connect(mapStateToProps, mapDispatchToProps)(ProjectMetaDataComponent));
    return injectIntl(ProjectMetaDataComponent);
};

export {
    ProjectMetaDataHOC as default
};
