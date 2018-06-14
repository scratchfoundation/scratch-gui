import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/mode/ruby';
import 'brace/theme/clouds';

export class RubyTab extends React.Component {
    render(){
        return(
            <AceEditor
                mode="ruby"
                theme="clouds"
                name="ruby-editor"
                fontSize={16}
                width="100%"
                height="inherit"
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                  tabSize: 2,
                  useSoftTabs: true,
                  showInvisibles: true
                }}
            />
        )
    }
}