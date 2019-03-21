import React from 'react';
import {injectIntl} from 'react-intl';
import MonacoEditor from 'react-monaco-editor';
import styles from './text-editor.css';
const options = {
    automaticLayout: true
};
const hello = 'When green flag clicked show variable [myvar]' +
'if <myvar < 50> then move 100 steps if edge bounce set [myvar] to (myvar+1)else stop all';

class TextEditor extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            blocks: null
        };
    }

    componentDidUpdate (prevProps) {
        if (this.props.blocks !== prevProps.blocks) {
            this.setState({blocks: this.props.blocks});
        }
    }

    displayBlocks (blocks) {
        if (blocks && blocks.length > 0) {
            blocks.forEach(block => {
                if (block.type === 'motion_movesteps') {
                    let value = 'nothing';
                    block.values.forEach(blockValue => {
                        value = blockValue.value;
                    });
                    blocks = `Move (${value}) steps`;
                }
            });
        }
        return blocks;
    }

    render () {
        return (
            <div className={styles.editorContainer}>
                <MonacoEditor
                    height="100%"
                    language="javascript"
                    options={options}
                    theme="vs-dark"
                    value={hello}
                    width="100%"
                />
            </div>
        );
    }
}

export default injectIntl(TextEditor);
