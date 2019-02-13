import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';

class TextEditor extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            blocks: null
        };
    }

    componentDidUpdate (prevProps) {
        if (
            this.props.blocks !== prevProps.blocks
        ) {
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
        const { blocks } = this.state;
        if (blocks && blocks.length > 0)
            return <div>{this.displayBlocks(blocks)}</div>;
        return <div>Not found</div>;
    }
}

TextEditor.propTypes = {
    blocks: PropTypes.any
};

export default injectIntl(TextEditor);
