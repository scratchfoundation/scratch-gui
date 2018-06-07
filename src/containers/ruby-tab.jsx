import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/mode/ruby';
import 'brace/theme/github';

export class RubyTab extends React.Component {
    render(){
        return(
            <AceEditor
                mode="ruby"
                theme="github"
                name="UNIQUE_ID_OF_DIV"
                editorProps={{$blockScrolling: true}}
            />
        )
    }
}