import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
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
        constructor (props) {
            super(props);
            bindAll(this, [
                'handleUpdateProjectTitle'
            ]);
        }
        componentDidMount () {
            this.setReduxTitle(this.props.projectTitle);
        }
        componentDidUpdate (prevProps) {
            if (this.props.projectTitle !== prevProps.projectTitle) {
                this.setReduxTitle(this.props.projectTitle);
            }
            if (this.props.isShowingWithoutId && !prevProps.isShowingWithoutId) {
                const defaultProjectTitle = this.titleWithDefault();
                this.setReduxTitle(defaultProjectTitle);
                this.props.onUpdateProjectTitle(defaultProjectTitle);
            }
        }
        titleWithDefault (title) {
            if (title === null || typeof title === 'undefined') {
                return this.props.intl.formatMessage(messages.defaultProjectTitle);
            }
            return title;
        }
        setReduxTitle (newTitle) {
            if (newTitle === null || typeof newTitle === 'undefined') {
                this.props.onUpdateReduxProjectTitle(
                    this.props.intl.formatMessage(messages.defaultProjectTitle)
                );
            } else {
                this.props.onUpdateReduxProjectTitle(newTitle);
            }
        }
        handleUpdateProjectTitle (newTitle) {
            this.setReduxTitle(newTitle);
            this.props.onUpdateProjectTitle(newTitle);
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                intl,
                isShowingWithoutId,
                // for children, we replace onUpdateProjectTitle with our own
                onUpdateProjectTitle,
                onUpdateReduxProjectTitle,
                // we don't pass projectTitle prop to children -- they must use
                // redux value
                projectTitle,
                /* eslint-enable no-unused-vars */
                ...componentProps
            } = this.props;
            return (
                <WrappedComponent
                    onUpdateProjectTitle={this.handleUpdateProjectTitle}
                    {...componentProps}
                />
            );
        }
    }

    TitledComponent.propTypes = {
        intl: intlShape,
        isShowingWithoutId: PropTypes.bool,
        onUpdateProjectTitle: PropTypes.func,
        onUpdateReduxProjectTitle: PropTypes.func,
        projectTitle: PropTypes.string
    };

    TitledComponent.defaultProps = {
        onUpdateProjectTitle: () => {}
    };

    const mapStateToProps = state => {
        const loadingState = state.scratchGui.projectState.loadingState;
        return {
            isShowingWithoutId: getIsShowingWithoutId(loadingState)
        };
    };

    const mapDispatchToProps = dispatch => ({
        onUpdateReduxProjectTitle: title => dispatch(setProjectTitle(title))
    });

    return injectIntl(connect(
        mapStateToProps,
        mapDispatchToProps,
    )(TitledComponent));
};

export {
    TitledHOC as default
};
