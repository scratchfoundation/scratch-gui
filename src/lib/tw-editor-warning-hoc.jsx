import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {showStandardAlert} from '../reducers/alerts';

const TWEditorWarningHOC = function (WrappedComponent) {
    class EditorWarningComponent extends React.Component {
        componentDidMount () {
            this.enableWarpTimerIfInEditor();
        }
        shouldComponentUpdate () {
            return !this.disabled;
        }
        componentDidUpdate () {
            this.enableWarpTimerIfInEditor();
        }
        enableWarpTimerIfInEditor () {
            if (!this.props.isPlayerOnly) {
                this.props.onShowWarning();
                this.props.vm.setCompilerOptions({
                    warpTimer: true
                });
                this.disabled = true;
            }
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
        compilerOptions: PropTypes.shape({
            enabled: PropTypes.bool,
            warpTimer: PropTypes.bool
        }),
        isPlayerOnly: PropTypes.bool,
        onShowWarning: PropTypes.func,
        vm: PropTypes.shape({
            setCompilerOptions: PropTypes.func
        })
    };
    const mapStateToProps = state => ({
        compilerOptions: state.scratchGui.tw.compilerOptions,
        isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
        vm: state.scratchGui.vm
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
