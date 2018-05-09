import React from 'react';

/* Higher Order Component to get the project id from location.hash
 * @param {React.Component} WrappedComponent component to receive projectData prop
 * @returns {React.Component} component with project loading behavior
 */
const HashParserHOC = function (WrappedComponent) {
    class HashParserComponent extends React.Component {
        constructor (props) {
            super(props);
            this.fetchProjectId = this.fetchProjectId.bind(this);
            this.updateProject = this.updateProject.bind(this);
            this.state = {
                projectId: null
            };
        }
        componentDidMount () {
            window.addEventListener('hashchange', this.updateProject);
            this.updateProject();
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
            return (
                <WrappedComponent
                    projectId={this.state.projectId}
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
