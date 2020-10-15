import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import log from './log';

import {getIsShowingWithId} from '../reducers/project-state';
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

const TWProjectMetaFetcherHOC = function (WrappedComponent) {
    class ProjectMetaFetcherComponent extends React.Component {
        componentDidMount () {
            this.initialTitle = document.title;
        }
        shouldComponentUpdate (nextProps) {
            return this.props.isShowingWithId !== nextProps.isShowingWithId;
        }
        componentDidUpdate (prevProps) {
            this.props.onSetProjectTitle('');
            this.props.onSetAuthor('', '');
            this.props.onSetDescription('', '');
            if (this.props.isShowingWithId && !prevProps.isShowingWithId) {
                const projectId = this.props.projectId;
                fetchProjectMeta(projectId)
                    .then(data => {
                        // If project ID changed, ignore the results.
                        if (this.props.projectId !== projectId) {
                            return;
                        }
                        const title = data.title;
                        if (title) {
                            document.title = `${title} - TurboWarp`;
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
                    })
                    .catch(err => {
                        log.warn('cannot fetch project meta', err);
                    });
            } else {
                document.title = this.initialTitle;
            }
        }
        componentWillUnmount () {
            document.title = this.initialTitle;
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                isShowingWithId,
                projectId,
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
        isShowingWithId: PropTypes.bool,
        projectId: PropTypes.string,
        onSetAuthor: PropTypes.func,
        onSetDescription: PropTypes.func,
        onSetProjectTitle: PropTypes.func
    };
    const mapStateToProps = state => {
        const loadingState = state.scratchGui.projectState.loadingState;
        return {
            isShowingWithId: getIsShowingWithId(loadingState),
            projectId: state.scratchGui.projectState.projectId
        };
    };
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
