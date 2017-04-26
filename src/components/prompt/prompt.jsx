const React = require('react');
const ReactModal = require('react-modal');
const Box = require('../box/box.jsx');

const styles = require('./prompt.css');

const PromptComponent = props => (
    <ReactModal
        isOpen
        className={styles.modalContent}
        contentLabel={props.title}
        overlayClassName={styles.modalOverlay}
        onRequestClose={props.onCancel}
    >
        <Box className={styles.header}>
            {props.title}
        </Box>
        <Box className={styles.body}>
            <Box className={styles.label}>
                {props.label}
            </Box>
            <Box>
                <input
                    autoFocus
                    className={styles.input}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    onKeyPress={props.onKeyPress}
                />
            </Box>
            <Box className={styles.buttonRow}>
                <button
                    className={styles.cancelButton}
                    onClick={props.onCancel}
                >
                    Cancel
                </button>
                <button
                    className={styles.okButton}
                    onClick={props.onOk}
                >
                    OK
                </button>
            </Box>
        </Box>
    </ReactModal>
);

PromptComponent.propTypes = {
    label: React.PropTypes.string.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onKeyPress: React.PropTypes.func.isRequired,
    onOk: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    title: React.PropTypes.string.isRequired
};

PromptComponent.defaultProps = {
    placeholder: '...'
};

module.exports = PromptComponent;
