import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {injectIntl, intlShape} from 'react-intl';
import {connect} from 'react-redux';
import AceEditor from 'react-ace';
import {
    rubyCodeShape,
    updateRubyCode,
    updateRubyCodeTarget
} from '../reducers/ruby-code';
import VM from 'scratch-vm';
import {BLOCKS_TAB_INDEX} from '../reducers/editor-tab';

import RubyToBlocksConverterHOC from '../lib/ruby-to-blocks-converter-hoc.jsx';

import 'brace/mode/ruby';
import 'brace/theme/clouds';

class RubyTab extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'setAceEditorRef'
        ]);
    }

    componentDidUpdate (prevProps) {
        let modified = this.props.rubyCode.modified;
        if (modified) {
            const targetId = this.props.rubyCode.target ? this.props.rubyCode.target.id : null;
            const changedTarget =
                  this.props.vm.editingTarget && this.props.rubyCode.target &&
                  this.props.vm.editingTarget.id !== targetId;
            if (changedTarget || this.props.blocksTabVisible) {
                const converter = this.props.targetCodeToBlocks(this.props.intl);
                if (converter.result) {
                    converter.apply().then(() => {
                        modified = false;

                        if (!modified) {
                            if ((this.props.isVisible && !prevProps.isVisible) ||
                                (this.props.editingTarget && this.props.editingTarget !== prevProps.editingTarget)) {
                                this.props.updateRubyCodeTargetState(this.props.vm.editingTarget);
                            }
                        }

                        if (this.props.isVisible && !prevProps.isVisible) {
                            this.aceEditorRef.editor.renderer.updateFull();
                            this.aceEditorRef.editor.focus();
                        }
                    });
                    return;
                }
                const error = converter.errors[0];
                this.aceEditorRef.editor.moveCursorTo(error.row, error.column);
                this.aceEditorRef.editor.focus();
            }
        }

        if (!modified) {
            if ((this.props.isVisible && !prevProps.isVisible) ||
                (this.props.editingTarget && this.props.editingTarget !== prevProps.editingTarget)) {
                this.props.updateRubyCodeTargetState(this.props.vm.editingTarget);
            }
        }

        if (this.props.isVisible && !prevProps.isVisible) {
            this.aceEditorRef.editor.renderer.updateFull();
            this.aceEditorRef.editor.focus();
        }
    }

    setAceEditorRef (ref) {
        this.aceEditorRef = ref;
    }

    render () {
        const {
            onChange,
            rubyCode
        } = this.props;
        const {
            code,
            errors,
            markers
        } = rubyCode;
        return (
            <AceEditor
                annotations={errors}
                editorProps={{$blockScrolling: true}}
                fontSize={16}
                height="inherit"
                markers={markers}
                mode="ruby"
                name="ruby-editor"
                ref={this.setAceEditorRef}
                setOptions={{
                    tabSize: 2,
                    useSoftTabs: true,
                    showInvisibles: true
                }}
                style={{
                    border: '1px solid hsla(0, 0%, 0%, 0.15)',
                    borderBottomRightRadius: '0.5rem',
                    borderTopRightRadius: '0.5rem',
                    fontFamily: ['Monaco', 'Menlo', 'Consolas', 'source-code-pro', 'monospace']
                }}
                theme="clouds"
                value={code}
                width="100%"
                onChange={onChange}
            />
        );
    }
}

RubyTab.propTypes = {
    blocksTabVisible: PropTypes.bool,
    editingTarget: PropTypes.string,
    intl: intlShape.isRequired,
    isVisible: PropTypes.bool,
    onChange: PropTypes.func,
    rubyCode: rubyCodeShape,
    targetCodeToBlocks: PropTypes.func,
    updateRubyCodeTargetState: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    blocksTabVisible: state.scratchGui.editorTab.activeTabIndex === BLOCKS_TAB_INDEX,
    editingTarget: state.scratchGui.targets.editingTarget,
    rubyCode: state.scratchGui.rubyCode
});

const mapDispatchToProps = dispatch => ({
    onChange: code => dispatch(updateRubyCode(code)),
    updateRubyCodeTargetState: target => dispatch(updateRubyCodeTarget(target))
});

export default RubyToBlocksConverterHOC(injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(RubyTab)));
