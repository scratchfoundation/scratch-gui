import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {showAlertWithTimeout} from '../reducers/alerts';

const TWEditorWarningHOC = function (WrappedComponent) {
    class EditorWarningComponent extends React.Component {
        constructor (props) {
            super(props);
            this.shownWarning = false;
        }
        componentDidUpdate () {
            if (!this.props.isPlayerOnly && !this.shownWarning) {
                this.shownWarning = true;
                this.props.onShowWarning();
            }
        }
        render () {
            return (
                <WrappedComponent
                    {...this.props}
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
        onShowWarning: () => showAlertWithTimeout(dispatch, 'twWarning')
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditorWarningComponent);
};

export {
    TWEditorWarningHOC as default
};
