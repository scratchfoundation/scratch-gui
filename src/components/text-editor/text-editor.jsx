import React from 'react';
import {injectIntl} from 'react-intl';
import MonacoEditor from 'react-monaco-editor';
import styles from './text-editor.css';
import PropTypes from 'prop-types';

/**
 * This is the component for displaying the text tab.  The monaco editor is displayed
 * and the blocks are converted to a text format and put into the monaco editor.
 */
class TextEditor extends React.Component {

    /**
     * Intializes the TextEditor class
     *
     * @param {PropTypes} props The props passed in to the TextEditor
     */
    constructor (props) {
        super(props);
        this.state = {
            blocks: {}
        };
    }

    /**
     * Updates the current set of blocks.  This is called after the VM is rendered and
     * there are changes to the blocks.
     *
     * @param {React.Props} prevProps The old props
     */
    componentDidUpdate (prevProps) {
        if (this.props.blocks !== prevProps.blocks) {
            this.updateBlocks(this.props.blocks);
        }
    }

    /**
     * Sets the current state of the blocks to the passed in blocks object.
     *
     * @param {object} blocks The object of blocks to update the current state to
     */
    updateBlocks (blocks) {
        this.setState({blocks});
    }

    /**
     * Converts the current list of blocks into a text string
     *
     * @param {object} blocks The current list of blocks
     *
     * @returns {string} A string of the object of blocks converted to text.
     */
    displayBlocks (blocks) {
        // Defaults the text string ofblocks
        let blocksText = '';
        // Gets the number of blocks in the blocks object
        const blocksLength = Object.keys(blocks).length;
        // If there are blocks
        if (blocksLength > 0) {
            // For each block
            for (const blockKey in blocks) {
                // Get the current block
                const block = blocks[blockKey];
                // Check if the current block is a movesteps block
                if (block.opcode === 'motion_movesteps') {
                    // Get the input value of the steps to move
                    const inputValue = block.inputs.STEPS[1][1];
                    // Add the proper outputted string to the blocks text with the input value
                    blocksText += `Move (${inputValue}) steps\n`;
                // If the block is a turnright block
                } else if (block.opcode === 'motion_turnright') {
                    // Get the input value
                    const inputValue = block.inputs.DEGREES[1][1];
                    // Add the properly formatted string to the string of converted blocks
                    blocksText += `Turn (${inputValue}) degrees right\n`;
                }
            }
        }
        // Return the formatted string of blocks
        return blocksText;
    }

    render () {
        // Gets the current list of blocks in the state
        const {blocks} = this.state;
        // Converts the current list of blocks into a formatted string
        const blocksText = this.displayBlocks(blocks);

        // Create the monaco editor passing in the converted string of blocks to be defaulted
        return (
            <div className={styles.editorContainer}>
                <MonacoEditor
                    height="100%"
                    language="javascript"
                    options={{automaticLayout: true}}
                    theme="vs-dark"
                    value={blocksText}
                    width="100%"
                />
            </div>
        );
    }
}

TextEditor.propTypes = {
    blocks: PropTypes.object
};

export default injectIntl(TextEditor);
