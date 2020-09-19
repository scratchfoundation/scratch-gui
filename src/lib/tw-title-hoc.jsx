import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getIsShowingWithId} from '../reducers/project-state';

const API_URL = 'https://trampoline.turbowarp.org/proxy/projects/$id';

const fetchProjectTitle = projectId => fetch(API_URL.replace('$id', projectId))
    .then(r => r.json())
    .then(data => {
        if (data.title) {
            return data.title;
        }
        return '';
    });

const TWTitleHOC = function (WrappedComponent) {
    class TitleComponent extends React.Component {
        componentDidMount () {
            this.initialTitle = document.title;
        }
        shouldComponentUpdate (nextProps) {
            return this.props.isShowingWithId !== nextProps.isShowingWithId;
        }
        componentDidUpdate (prevProps) {
            if (this.props.isShowingWithId && !prevProps.isShowingWithId) {
                const projectId = this.props.projectId;
                fetchProjectTitle(projectId)
                    .then(title => {
                        if (!title) {
                            return;
                        }
                        if (this.props.projectId !== projectId) {
                            return;
                        }
                        document.title = `${title} - TurboWarp`;
                    })
                    .catch(() => {
                        // ignore errors
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
    TitleComponent.propTypes = {
        isShowingWithId: PropTypes.bool,
        projectId: PropTypes.string
    };
    const mapStateToProps = state => {
        const loadingState = state.scratchGui.projectState.loadingState;
        return {
            isShowingWithId: getIsShowingWithId(loadingState),
            projectId: state.scratchGui.projectState.projectId
        };
    };
    const mapDispatchToProps = dispatch => ({

    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(TitleComponent);
};

export {
    TWTitleHOC as default
};
