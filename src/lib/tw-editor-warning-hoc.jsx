import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {showStandardAlert} from '../reducers/alerts';

let shownWarning = false;

const DIRTY_KEY = 'tw:dirty';

const TWEditorWarningHOC = function (WrappedComponent) {
    class EditorWarningComponent extends React.Component {
        componentDidMount () {
            // This makes it so that if the VM ever is unable to finish a frame, we may be able to detect it.
            // This isn't foolproof, but it's better than nothing.
            this.props.vm.runtime.beforeStep = () => {
                if (!this.props.isPlayerOnly && !document.hidden) {
                    localStorage.setItem(DIRTY_KEY, '1');
                }
            };
            this.props.vm.runtime.afterStep = () => {
                if (!this.props.isPlayerOnly && !document.hidden) {
                    localStorage.setItem(DIRTY_KEY, '0');
                }
            };

            if (!shownWarning) {
                this.showWarningIfInEditor();

                if (localStorage.getItem(DIRTY_KEY) === '1') {
                    this.props.onShowRecovery();
                }
            }
        }
        shouldComponentUpdate () {
            return !shownWarning;
        }
        componentDidUpdate () {
            this.showWarningIfInEditor();
        }
        showWarningIfInEditor () {
            if (!this.props.isPlayerOnly) {
                shownWarning = true;

                this.props.onShowWarning();
                this.props.vm.setCompilerOptions({
                    warpTimer: true
                });
            }
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                compilerOptions,
                isPlayerOnly,
                onShowWarning,
                onShowRecovery,
                vm,
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
            enabled: PropTypes.bool
        }),
        isPlayerOnly: PropTypes.bool,
        onShowWarning: PropTypes.func,
        onShowRecovery: PropTypes.func,
        vm: PropTypes.shape({
            runtime: PropTypes.shape({
                beforeStep: PropTypes.func,
                afterStep: PropTypes.func
            }),
            setCompilerOptions: PropTypes.func
        })
    };
    const mapStateToProps = state => ({
        compilerOptions: state.scratchGui.tw.compilerOptions,
        isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
        vm: state.scratchGui.vm
    });
    const mapDispatchToProps = dispatch => ({
        onShowWarning: () => dispatch(showStandardAlert('twWarning')),
        onShowRecovery: () => dispatch(showStandardAlert('twCrashRecovery'))
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditorWarningComponent);
};

export {
    TWEditorWarningHOC as default
};
