import React from "react";
import { injectIntl } from "react-intl";
import MonacoEditor from "react-monaco-editor";
import PropTypes from "prop-types";
import styles from "./text-editor.css";

class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blocks: null
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.blocks !== prevProps.blocks) {
            this.setState({ blocks: this.props.blocks });
        }
    }

    displayBlocks(blocks) {
        if (blocks && blocks.length > 0) {
            blocks.forEach(block => {
                if (block.type === "motion_movesteps") {
                    let value = "nothing";
                    block.values.forEach(blockValue => {
                        value = blockValue.value;
                    });
                    blocks = `Move (${value}) steps`;
                }
            });
        }
        return blocks;
    }

    render() {
        return (
            <MonacoEditor
                height="600"
                language="javascript"
                theme="vs-dark"
                width="800"
            />
        );
    }
}

TextEditor.propTypes = {
    blocks: PropTypes.any
};

export default injectIntl(TextEditor);
