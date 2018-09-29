import React from 'react';
import bindAll from 'lodash.bindall';

import {defaultProjectId} from '../reducers/project-id';

/* Higher Order Component to get the project id from location.hash
 * @param {React.Component} WrappedComponent component to receive projectData prop
 * @returns {React.Component} component with project loading behavior
 */
const HashParserHOC = function (WrappedComponent) {
    class HashParserComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'handleHashChange',
                'handleRequestNewProject'
            ]);
            this.state = {
                projectId: null
            };
        }
        componentDidMount () {
            window.addEventListener('hashchange', this.handleHashChange);
            this.handleHashChange();
        }
        componentWillUnmount () {
            window.removeEventListener('hashchange', this.handleHashChange);
        }
        handleHashChange () {
            const hashMatch = window.location.hash.match(/#(\d+)/);
            const projectId = hashMatch === null ? defaultProjectId : hashMatch[1];
            if (projectId !== this.state.projectId) {
                this.setState({projectId: projectId});
            }
        }
        handleRequestNewProject (callback) {
            // unset the projectId
            this.setState({projectId: defaultProjectId}, () => {
                // strip the hash tag from the url
                history.pushState('new-project', 'new-project',
                    window.location.pathname + window.location.search);
                if (callback) callback(defaultProjectId);
            });
        }
        render () {
            return (
                <WrappedComponent
                    hideIntro={this.state.projectId && this.state.projectId !== 0}
                    projectId={this.state.projectId}
                    onRequestNewProject={this.handleRequestNewProject}
                    {...this.props}
                />
            );
        }
    }

    return HashParserComponent;
};

export {
    HashParserHOC as default
};
