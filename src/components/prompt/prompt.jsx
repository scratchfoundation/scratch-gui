const React = require('react');
const ReactModal = require('react-modal');
const bindAll = require('lodash.bindall');
const Box = require('../box/box.jsx');

const styles = require('./prompt.css');

class PromptComponent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleOk',
            'handleKeyPress'
        ]);
    }
    handleKeyPress (event) {
        if (event.key === 'Enter') this.handleOk();
    }
    handleOk () {
        this.props.onOk(this.input.value);
    }
    render () {
        return (
            <ReactModal
                isOpen
                className={styles.modalContent}
                overlayClassName={styles.modalOverlay}
                onRequestClose={this.props.onCancel}
            >
                <Box className={styles.body}>
                    <Box className={styles.label}>
                        {this.props.label}
                    </Box>
                    <Box>
                        <input
                            autoFocus
                            className={styles.input}
                            placeholder={this.props.placeholder}
                            ref={el => (this.input = el)}
                            onKeyPress={this.handleKeyPress}
                        />
                    </Box>
                    <Box className={styles.buttonRow}>
                        <button
                            className={styles.cancelButton}
                            onClick={this.props.onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className={styles.okButton}
                            onClick={this.handleOk}
                        >
                            OK
                        </button>
                    </Box>
                </Box>
            </ReactModal>
        );
    }
}

PromptComponent.propTypes = {
    label: React.PropTypes.string.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onOk: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string
};

PromptComponent.defaultProps = {
    placeholder: '...'
};

module.exports = PromptComponent;
