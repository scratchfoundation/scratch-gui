import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ProjectState, defaultProjectId, setHashProjectId} from '../reducers/project-id';

/* Higher Order Component to get the project id from location.hash
 * @param {React.Component} WrappedComponent component to receive projectData prop
 * @returns {React.Component} component with project fetching behavior
 */
const HashParserHOC = function (WrappedComponent) {
    class HashParserComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'handleHashChange'
            ]);
        }
        componentDidMount () {
            window.addEventListener('hashchange', this.handleHashChange);
            this.handleHashChange();
        }
        componentWillReceiveProps (nextProps) {
            // if we are newly fetching a non-hash project...
            if (nextProps.isFetchingNonHashProject && !this.props.isFetchingNonHashProject) {
                // ...clear the hash from the url
                history.pushState('new-project', 'new-project',
                    window.location.pathname + window.location.search);
            }
        }
        componentWillUnmount () {
            window.removeEventListener('hashchange', this.handleHashChange);
        }
        handleHashChange () {
            const hashMatch = window.location.hash.match(/#(\d+)/);
            const hashProjectId = hashMatch === null ? defaultProjectId : hashMatch[1];
            if (hashProjectId !== this.props.reduxProjectId) {
                this.props.setHashProjectId(hashProjectId);
            }
        }
        // handleRequestNewProject (callback) {
        //     // unset the projectId
        //     this.setState({projectId: defaultProjectId}, () => {
        //         // strip the hash tag from the url
        //         // history.pushState('new-project', 'new-project',
        //         //     window.location.pathname + window.location.search);
        //         if (callback) callback(defaultProjectId);
        //     });
        // }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                isFetchingNonHashProject,
                reduxProjectId,
                setHashProjectId: setHashProjectIdProp,
                /* eslint-enable no-unused-vars */
                ...componentProps
            } = this.props;
            return (
                <WrappedComponent
                    hideIntro={this.state.projectId && this.state.projectId !== 0}
                    // projectId={this.state.projectId}
                    // onRequestNewProject={this.handleRequestNewProject}
                    {...componentProps}
                />
            );
        }
    }
    HashParserComponent.propTypes = {
        isFetchingNonHashProject: PropTypes.bool,
        reduxProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        setHashProjectId: PropTypes.func
    };
    const mapStateToProps = state => {
        const projectState = state.scratchGui.projectId.projectState;
        return {
            isFetchingNonHashProject: projectState === ProjectState.FETCHING_FILE_UPLOAD ||
                projectState === ProjectState.FETCHING_NEW_DEFAULT,
            reduxProjectId: state.scratchGui.projectId.projectId
        };
    };
    const mapDispatchToProps = dispatch => ({
        setHashProjectId: projectId => dispatch(setHashProjectId(projectId))
    });
    // return HashParserComponent;
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(HashParserComponent);
};

export {
    HashParserHOC as default
};
