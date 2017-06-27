const PropTypes = require('prop-types');
const React = require('react');
const Modal = require('../modal/modal.jsx');
const Box = require('../box/box.jsx');

const styles = require('./prompt.css');

const PromptComponent = props => (
    <Modal
        visible
        className={styles.modalContent}
        contentLabel={props.title}
        onRequestClose={props.onCancel}
    >
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
    </Modal>
);

PromptComponent.propTypes = {
    label: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    title: PropTypes.string.isRequired
};

module.exports = PromptComponent;
