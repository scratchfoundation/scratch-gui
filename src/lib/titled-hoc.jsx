import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import {getIsShowingWithoutId} from '../reducers/project-state';
import {setProjectTitle} from '../reducers/project-title';

const messages = defineMessages({
    defaultProjectTitle: {
        id: 'gui.gui.defaultProjectTitle',
        description: 'Default title for project',
        defaultMessage: 'Scratch Project'
    }
});

/* Higher Order Component to get and set the project title
 * @param {React.Component} WrappedComponent component to receive project title related props
 * @returns {React.Component} component with project loading behavior
 */
const TitledHOC = function (WrappedComponent) {
    class TitledComponent extends React.Component {
        componentDidMount () {
            this.handleReceivedProjectTitle(this.props.projectTitle);
        }
        componentDidUpdate (prevProps) {
            if (this.props.projectTitle !== prevProps.projectTitle) {
                this.handleReceivedProjectTitle(this.props.projectTitle);
            }
            // if the projectTitle hasn't changed, but the reduxProjectTitle
            // HAS changed, we need to report that change to the projectTitle's owner
            if (this.props.reduxProjectTitle !== prevProps.reduxProjectTitle &&
                this.props.reduxProjectTitle !== this.props.projectTitle) {
                this.props.onUpdateProjectTitle(this.props.reduxProjectTitle);
            }
        }
        handleReceivedProjectTitle (requestedTitle) {
            let newTitle = requestedTitle;
            if (newTitle === null || typeof newTitle === 'undefined') {
                newTitle = this.props.intl.formatMessage(messages.defaultProjectTitle);
            }
            this.props.onChangedProjectTitle(newTitle);
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                intl,
                isShowingWithoutId,
                onChangedProjectTitle,
                // for children, we replace onUpdateProjectTitle with our own
                onUpdateProjectTitle,
                // we don't pass projectTitle prop to children -- they must use
                // redux value
                projectTitle,
                reduxProjectTitle,
                /* eslint-enable no-unused-vars */
                ...componentProps
            } = this.props;
            return (
                <WrappedComponent
                    {...componentProps}
                />
            );
        }
    }

    TitledComponent.propTypes = {
        intl: intlShape,
        isShowingWithoutId: PropTypes.bool,
        onChangedProjectTitle: PropTypes.func,
        onUpdateProjectTitle: PropTypes.func,
        projectTitle: PropTypes.string,
        reduxProjectTitle: PropTypes.string
    };

    TitledComponent.defaultProps = {
        onUpdateProjectTitle: () => {}
    };

    const mapStateToProps = state => {
        const loadingState = state.scratchGui.projectState.loadingState;
        return {
            isShowingWithoutId: getIsShowingWithoutId(loadingState),
            reduxProjectTitle: state.scratchGui.projectTitle
        };
    };

    const mapDispatchToProps = dispatch => ({
        onChangedProjectTitle: title => dispatch(setProjectTitle(title))
    });

    return injectIntl(connect(
        mapStateToProps,
        mapDispatchToProps,
    )(TitledComponent));
};

export {
    TitledHOC as default
};
