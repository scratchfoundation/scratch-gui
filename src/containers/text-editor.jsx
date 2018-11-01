import React from 'react';
import TextEditorComponent from '../components/text-editor/text-editor.jsx';
import VM from 'scratch-vm';
import PropTypes from 'prop-types';
import {convertXMLBlocksToJSON} from '../lib/text/text-util';

class TextEditor extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            blocksJSON: null
        };
    }

    componentDidMount () {
        this.props.vm.on('workspaceUpdate', data => {
            convertXMLBlocksToJSON(data.xml, (err, results) => {
                this.setState({blocksJSON: results});
            });
        });
    }

    render () {
        return (
            <div>
                <TextEditorComponent />
            </div>
        );
    }
}

TextEditor.propTypes = {
    vm: PropTypes.instanceOf(VM).isRequired
};

export default TextEditor;
