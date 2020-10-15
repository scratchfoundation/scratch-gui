import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {showStandardAlert} from '../reducers/alerts';

const TWEditorWarningHOC = function (WrappedComponent) {
    class EditorWarningComponent extends React.Component {
        componentDidMount () {
            // TODO: need to clean this up, probably don't use a HOC just to display a single message
            this.props.onShowWarning();
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                isPlayerOnly,
                onShowWarning,
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
    EditorWarningComponent.propTypes = {
        isPlayerOnly: PropTypes.bool,
        onShowWarning: PropTypes.func
    };
    const mapStateToProps = state => ({
        isPlayerOnly: state.scratchGui.mode.isPlayerOnly
    });
    const mapDispatchToProps = dispatch => ({
        onShowWarning: () => dispatch(showStandardAlert('twWarning'))
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditorWarningComponent);
};

export {
    TWEditorWarningHOC as default
};
