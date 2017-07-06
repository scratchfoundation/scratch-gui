const PropTypes = require('prop-types');
const React = require('react');
const Modal = require('../modal/modal.jsx');
const Box = require('../box/box.jsx');

const styles = require('./prompt.css');

const AssetDeleteComponent = props => (
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

AssetDeleteComponent.propTypes = {
    label: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

module.exports = AssetDeleteComponent;
