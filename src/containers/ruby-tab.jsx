import PropTypes from 'prop-types';
import React from 'react';
import AceEditor from 'react-ace';
import VM from 'scratch-vm';
import {rubyCodesShape} from '../reducers/ruby-codes.js';

import 'brace/mode/ruby';
import 'brace/theme/clouds';

const RubyTab = function (props) {
    const rubyCode = props.rubyCodes.rubyCode[props.vm.editingTarget.id];
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
            value={rubyCode ? rubyCode.code : ''}
            width="100%"
        />
    );
};

RubyTab.propTypes = {
    rubyCodes: rubyCodesShape,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default RubyTab;
