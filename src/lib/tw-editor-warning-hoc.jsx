import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {showStandardAlert} from '../reducers/alerts';

const TWEditorWarningHOC = function (WrappedComponent) {
    class EditorWarningComponent extends React.Component {
        componentDidMount () {
            if (this.props.alerts.find(i => i.alertId === 'twWarning')) {
                return;
            }
            this.props.onShowWarning();
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                alerts,
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
        alerts: PropTypes.arrayOf(PropTypes.shape({
            alertId: PropTypes.string
        })),
        isPlayerOnly: PropTypes.bool,
        onShowWarning: PropTypes.func
    };
    const mapStateToProps = state => ({
        alerts: state.scratchGui.alerts.alertsList,
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
