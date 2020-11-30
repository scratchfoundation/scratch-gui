import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {closeAlertWithId, showStandardAlert} from '../reducers/alerts';

const TWEditorWarningHOC = function (WrappedComponent) {
    class EditorWarningComponent extends React.Component {
        componentDidMount () {
            if (this.props.alerts.find(i => i.alertId === 'twWarning')) {
                return;
            }
            if (!this.shouldShow()) {
                return;
            }
            this.props.onShowWarning();
        }
        componentDidUpdate () {
            if (!this.shouldShow()) {
                this.props.onCloseWarning();
            }
        }
        shouldShow () {
            return this.props.compilerOptions.enabled && !this.props.compilerOptions.warpTimer;
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                alerts,
                compilerOptions,
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
        compilerOptions: PropTypes.shape({
            enabled: PropTypes.bool,
            warpTimer: PropTypes.bool
        }),
        isPlayerOnly: PropTypes.bool,
        onShowWarning: PropTypes.func,
        onCloseWarning: PropTypes.func
    };
    const mapStateToProps = state => ({
        alerts: state.scratchGui.alerts.alertsList,
        compilerOptions: state.scratchGui.tw.compilerOptions,
        isPlayerOnly: state.scratchGui.mode.isPlayerOnly
    });
    const mapDispatchToProps = dispatch => ({
        onShowWarning: () => dispatch(showStandardAlert('twWarning')),
        onCloseWarning: () => dispatch(closeAlertWithId('twWarning'))
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditorWarningComponent);
};

export {
    TWEditorWarningHOC as default
};
