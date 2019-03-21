import React from 'react';
import {injectIntl} from 'react-intl';
import MonacoEditor from 'react-monaco-editor';
import styles from './text-editor.css';

const options = {
    automaticLayout: true
};

class TextEditor extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            blocks: {}
        };
    }

    componentDidUpdate (prevProps) {
        if (this.props.blocks !== prevProps.blocks) {
            this.setState({blocks: this.props.blocks});
        }
    }

    displayBlocks (blocks) {
        let blocksText = '';
        const blocksLength = Object.keys(blocks).length;
        if (blocksLength > 0) {
            for (const blockKey in blocks) {
                const block = blocks[blockKey];
                if (block.opcode === 'motion_movesteps') {
                    const inputValue = block.inputs.STEPS[1][1];
                    blocksText += `Move (${inputValue}) steps\n`;
                } else if (block.opcode === 'motion_turnright') {
                    const inputValue = block.inputs.DEGREES[1][1];
                    blocksText += `Turn (${inputValue}) degrees right\n`;
                }
            }
        }
        return blocksText;
    }

    render () {
        const {blocks} = this.state;
        const blocksText = this.displayBlocks(blocks);

        return (
            <div className={styles.editorContainer}>
                <MonacoEditor
                    height="100%"
                    language="javascript"
                    options={options}
                    theme="vs-dark"
                    value={blocksText}
                    width="100%"
                />
            </div>
        );
    }
}

export default injectIntl(TextEditor);
