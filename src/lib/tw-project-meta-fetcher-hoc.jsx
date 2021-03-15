import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import log from './log';

import {setProjectTitle} from '../reducers/project-title';
import {setAuthor, setDescription} from '../reducers/tw';

const API_URL = 'https://trampoline.turbowarp.org/proxy/projects/$id';

const fetchProjectMeta = projectId => fetch(API_URL.replace('$id', projectId))
    .then(r => {
        if (r.status !== 200) {
            throw new Error(`Unexpected status code: ${r.status}`);
        }
        return r.json();
    });

const getNoIndexTag = () => document.querySelector('meta[name="robots"][content="noindex"]');

const TWProjectMetaFetcherHOC = function (WrappedComponent) {
    class ProjectMetaFetcherComponent extends React.Component {
        shouldComponentUpdate (nextProps) {
            return this.props.projectId !== nextProps.projectId;
        }
        componentDidUpdate () {
            // project title resetting is handled in titled-hoc.jsx
            this.props.onSetAuthor('', '');
            this.props.onSetDescription('', '');
            const projectId = this.props.projectId;
            // Don't try to load metadata for empty projects.
            if (projectId === '0') {
                return;
            }
            fetchProjectMeta(projectId)
                .then(data => {
                    // If project ID changed, ignore the results.
                    if (this.props.projectId !== projectId) {
                        return;
                    }
                    const title = data.title;
                    if (title) {
                        this.props.onSetProjectTitle(title);
                    }
                    const authorName = data.author.username;
                    const authorThumbnail = data.author.profile.images['32x32'];
                    if (authorName && authorThumbnail) {
                        this.props.onSetAuthor(authorName, authorThumbnail);
                    }
                    const instructions = data.instructions || '';
                    const credits = data.description || '';
                    if (instructions || credits) {
                        this.props.onSetDescription(instructions, credits);
                    }
                    if (getNoIndexTag()) {
                        getNoIndexTag().remove();
                    }
                })
                .catch(err => {
                    if (!getNoIndexTag()) {
                        const tag = document.createElement('meta');
                        tag.name = 'robots';
                        tag.content = 'noindex';
                        document.head.appendChild(tag);
                    }
                    log.warn('cannot fetch project meta', err);
                });
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                projectId,
                onSetAuthor,
                onSetDescription,
                onSetProjectTitle,
                /* eslint-enable no-unused-vars */
                ...props
            } = this.props;
            return (
                <WrappedComponent
                    {...props}
                />
            );
        }
    }
    ProjectMetaFetcherComponent.propTypes = {
        projectId: PropTypes.string,
        onSetAuthor: PropTypes.func,
        onSetDescription: PropTypes.func,
        onSetProjectTitle: PropTypes.func
    };
    const mapStateToProps = state => ({
        projectId: state.scratchGui.projectState.projectId
    });
    const mapDispatchToProps = dispatch => ({
        onSetAuthor: (username, thumbnail) => dispatch(setAuthor({
            username,
            thumbnail
        })),
        onSetDescription: (instructions, credits) => dispatch(setDescription({
            instructions,
            credits
        })),
        onSetProjectTitle: title => dispatch(setProjectTitle(title))
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(ProjectMetaFetcherComponent);
};

export {
    TWProjectMetaFetcherHOC as default
};
