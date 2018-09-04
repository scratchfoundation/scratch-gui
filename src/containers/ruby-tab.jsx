import PropTypes from 'prop-types';
import React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/ruby';
import 'brace/theme/clouds';

const RubyTab = ({rubyCode}) => (
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
        theme="clouds"
        value={rubyCode.rubyCode}
        width="100%"
    />
);

RubyTab.propTypes = {
    rubyCode: PropTypes.string
};

export default RubyTab;
