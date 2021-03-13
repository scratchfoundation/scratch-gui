import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {showStandardAlert} from '../reducers/alerts';

let shownWarning = false;

const DIRTY_KEY = 'tw:dirty';

// Attempt to clean up old values from local storage (temporary)
try {
    localStorage.removeItem(DIRTY_KEY);
} catch (e) {
    // ignore
}

const TWEditorWarningHOC = function (WrappedComponent) {
    class EditorWarningComponent extends React.Component {
        componentDidMount () {
            if (!shownWarning) {
                this.showWarningIfInEditor();
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
