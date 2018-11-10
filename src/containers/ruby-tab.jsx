import PropTypes from 'prop-types';
import React from 'react';
import AceEditor from 'react-ace';
import VM from 'scratch-vm';

import 'brace/mode/ruby';
import 'brace/theme/clouds';

class RubyTab extends React.Component {
    render () {
        const vm = this.props.vm;
        const rubyCodes = this.props.rubyCodes;
        const rubyCode = rubyCodes.rubyCode[vm.editingTarget.id];
        const code = rubyCode ? rubyCode.code : '';
        return (
            <AceEditor
                readOnly
                editorProps={{$blockScrolling: true}}
                fontSize={16}
                height="inherit"
                mode="ruby"
                name="ruby-editor"
                setOptions={{
                    tabSize: 2,
                    useSoftTabs: true,
                    showInvisibles: true
                }}
                style={{
                    fontFamily: ['Monaco', 'Menlo', 'Consolas', 'source-code-pro', 'monospace'],
                    borderTopRightRadius: '0.5rem',
                    borderBottomRightRadius: '0.5rem',
                    border: '1px solid hsla(0, 0%, 0%, 0.15)'
                }}
                theme="clouds"
                value={code}
                width="100%"
            />
        );
    }
}

RubyTab.propTypes = {
    vm: PropTypes.instanceOf(VM).isRequired,
    rubyCodes: PropTypes.shape({
        rubyCode: PropTypes.object
    })
};

export default RubyTab;
