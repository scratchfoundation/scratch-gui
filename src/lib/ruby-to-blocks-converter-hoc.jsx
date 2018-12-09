import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import VM from 'scratch-vm';
import {targetCodeToBlocks} from '../lib/ruby-to-blocks-converter';

import {
    activateTab,
    RUBY_TAB_INDEX
} from '../reducers/editor-tab';
import {showAlertWithTimeout} from '../reducers/alerts';
import {highlightTarget} from '../reducers/targets';
import {
    rubyCodeShape,
    updateRubyCodeErrors,
    convertedRubyCode
} from '../reducers/ruby-code';


/**
 * Higher Order Component to provide behavior for converting Ruby to Code.
 * @param {React.Component} WrappedComponent the component to add Ruby to Code converting functionality to
 * @returns {React.Component} WrappedComponent with Ruby to Code converting functionality added
 *
 * <ProjectSaverHOC>
 *     <WrappedComponent />
 * </ProjectSaverHOC>
 */
const RubyToBlocksConverterHOC = function (WrappedComponent) {
    class RubyToBlocksConverterComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'targetCodeToBlocks'
            ]);
        }

        /**
         * targetCodeToBlocks:
         * @return {boolean} - True if succeeded to convert Ruby to Blocks
         */
        targetCodeToBlocks () {
            if (this.props.rubyCode.modified) {
                const errors = [];
                if (!targetCodeToBlocks(this.props.vm, this.props.rubyCode.target, this.props.rubyCode.code, errors)) {
                    this.props.vm.setEditingTarget(this.props.rubyCode.target.id);
                    if (!this.props.rubyCode.target.isStage) {
                        this.props.onHighlightTarget(this.props.rubyCode.target.id);
                    }
                    this.props.onActivateRubyTab();
                    this.props.onShowConvertRubyToBlocksErrorAlert();
                    this.props.updateRubyCodeErrorsState(errors);
                    return false;
                }
                this.props.convertedRubyCodeState();
            }
            return true;
        }

        render () {
            const {
                /* eslint-disable no-unused-vars */
                editingTarget,
                convertedRubyCodeState,
                onActivateRubyTab,
                onHighlightTarget,
                onShowConvertRubyToBlocksErrorAlert,
                rubyCode,
                updateRubyCodeErrorsState,
                /* eslint-enable no-unused-vars */
                ...componentProps
            } = this.props;
            return (
                <WrappedComponent
                    targetCodeToBlocks={this.targetCodeToBlocks}
                    {...componentProps}
                />
            );
        }
    }

    RubyToBlocksConverterComponent.propTypes = {
        convertedRubyCodeState: PropTypes.func,
        editingTarget: PropTypes.string,
        onActivateRubyTab: PropTypes.func,
        onHighlightTarget: PropTypes.func,
        onShowConvertRubyToBlocksErrorAlert: PropTypes.func,
        rubyCode: rubyCodeShape,
        updateRubyCodeErrorsState: PropTypes.func,
        vm: PropTypes.instanceOf(VM)
    };

    const mapStateToProps = state => ({
        editingTarget: state.scratchGui.targets.editingTarget,
        rubyCode: state.scratchGui.rubyCode,
        vm: state.scratchGui.vm
    });

    const mapDispatchToProps = dispatch => ({
        convertedRubyCodeState: () => dispatch(convertedRubyCode()),
        onActivateRubyTab: () => dispatch(activateTab(RUBY_TAB_INDEX)),
        onHighlightTarget: id => dispatch(highlightTarget(id)),
        onShowConvertRubyToBlocksErrorAlert: () => showAlertWithTimeout(dispatch, 'convertRubyToBlocksError'),
        updateRubyCodeErrorsState: errors => dispatch(updateRubyCodeErrors(errors))
    });

    // Allow incoming props to override redux-provided props. Used to mock in tests.
    const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
        {}, stateProps, dispatchProps, ownProps
    );

    return connect(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps
    )(RubyToBlocksConverterComponent);
};

export {
    RubyToBlocksConverterHOC as default
};
