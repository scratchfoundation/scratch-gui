import PropTypes from 'prop-types';
import React from 'react';
import Modal from '../modal/modal.jsx';
import Box from '../box/box.jsx';

import styles from './prompt.css';

import SpriteSelectorItemComponent from '../sprite-selector-item/sprite-selector-item.jsx';

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
                className={styles.label}
                justifyContent="center"
                style={{display: 'flex'}}
            >
                <SpriteSelectorItemComponent
                    costumeURL={props.assetURL}
                    name={props.assetName}
                    selected={false}
                    width="20%"
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
    assetName: PropTypes.string.isRequired,
    assetURL: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

module.exports = AssetDeleteComponent;
