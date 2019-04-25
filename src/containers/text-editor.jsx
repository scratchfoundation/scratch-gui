import React from 'react';
import TextEditorComponent from '../components/text-editor/text-editor.jsx';
import VM from 'scratch-vm';
import PropTypes from 'prop-types';

import {getBlocksFromVm} from '../lib/text';


/**
 * The wrapper class for the text editor.
 */
class TextEditor extends React.Component {
    /**
     * Constructs the TextEditor component
     * @param {React.Props} props The properties passed in to this component
     */
    constructor (props) {
        super(props);
        this.state = {
            blocks: {}
        };
    }

    /**
     * When the component is mounted this function is called to bind
     * to the @function workspaceUpdate function in the VM
     */
    componentDidMount () {
        // Bind ot the 'workspaceUpdate' function from the VM in the props
        this.props.vm.on('workspaceUpdate', () => {
            // Convert the VM from string to JSON
            const vmJson = JSON.parse(this.props.vm.toJSON());

            // Get the current list of blocks from the VM JSON object
            getBlocksFromVm(vmJson, (err, blocks) => {
                // Handle if there are any errors
                if (err) throw err;
                // Set the current state of blocks to the retrieved value
                this.setState({blocks});
            });
        });
    }

    
    render () {
        const {blocks} = this.state;

        return <TextEditorComponent blocks={blocks} />;
    }
}

TextEditor.propTypes = {
    vm: PropTypes.instanceOf(VM).isRequired
};

export default TextEditor;
