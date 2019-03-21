import React from 'react';
import TextEditorComponent from '../components/text-editor/text-editor.jsx';
import VM from 'scratch-vm';
import PropTypes from 'prop-types';

import {getBlocksFromVm} from '../lib/text';

class TextEditor extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            blocks: {}
        };
    }

    componentDidMount () {
        this.props.vm.on('workspaceUpdate', () => {
            const vmJson = JSON.parse(this.props.vm.toJSON());

            getBlocksFromVm(vmJson, (err, blocks) => {
                if (err) throw err;
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
