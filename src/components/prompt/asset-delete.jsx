const PropTypes = require('prop-types');
const React = require('react');
const Modal = require('../modal/modal.jsx');
const Box = require('../box/box.jsx');

const styles = require('./prompt.css');

const SpriteSelectorItem = require('../../containers/sprite-selector-item.jsx');

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
            <Box
                alignItems="center"
                width="100%"
            >
                <SpriteSelectorItem
                    costumeURL={props.assetURL}
                    name={props.assetName}
                    selected={false}
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

AssetDeleteComponent.propTypes = {
    assetURL: PropTypes.string.isRequired,
    assetName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

module.exports = AssetDeleteComponent;
