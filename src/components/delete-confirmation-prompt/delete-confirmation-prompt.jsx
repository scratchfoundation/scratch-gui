import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Box from '../box/box.jsx';
import ReactModal from 'react-modal';
import deleteIcon from './icon--delete.svg';
import undoIcon from './icon--undo.svg';
import arrowLeftIcon from './icon--arrow-left.svg';
import arrowRightIcon from './icon--arrow-right.svg';

import styles from './delete-confirmation-prompt.css';

const messages = defineMessages({
    shouldDeleteSpriteMessage: {
        defaultMessage: 'Are you sure you want to delete this sprite?',
        description: 'Message to indicate whether selected sprite should be deleted.',
        id: 'gui.gui.shouldDeleteSprite'
    },
    shouldDeleteCostumeMessage: {
        defaultMessage: 'Are you sure you want to delete this costume?',
        description: 'Message to indicate whether selected costume should be deleted.',
        id: 'gui.gui.shouldDeleteCostume'
    },
    shouldDeleteSoundMessage: {
        defaultMessage: 'Are you sure you want to delete this sound?',
        description: 'Message to indicate whether selected sound should be deleted.',
        id: 'gui.gui.shouldDeleteSound'
    },
    confirmOption: {
        defaultMessage: 'yes',
        description: 'Yes - should delete the sprite',
        id: 'gui.gui.confirm'
    },
    cancelOption: {
        defaultMessage: 'no',
        description: 'No - cancel deletion',
        id: 'gui.gui.cancel'
    },
    confirmDeletionHeading: {
        defaultMessage: 'Confirm Asset Deletion',
        description: 'Heading of confirmation prompt to delete asset',
        id: 'gui.gui.deleteAssetHeading'
    }
});

const modalWidth = 300;
const calculateModalPosition = (relativeElemRef, modalPosition, isRTL) => {
    const refPosition = relativeElemRef.getBoundingClientRect();

    if (isRTL) {
        return {
            top: refPosition.top - refPosition.height,
            left: refPosition.right + 25
        };
    }

    if (modalPosition === 'left') {
        return {
            top: refPosition.top - refPosition.height,
            left: refPosition.left - modalWidth - 25
        };
    }

    if (modalPosition === 'right') {
        return {
            top: refPosition.top - refPosition.height,
            left: refPosition.right + 25
        };
    }

    return {};
};

const getMessage = entityType => {
    if (entityType === 'COSTUME') {
        return messages.shouldDeleteCostumeMessage;
    }
    if (entityType === 'SOUND') {
        return messages.shouldDeleteSoundMessage;
    }
    return messages.shouldDeleteSpriteMessage;
};

const DeleteConfirmationPrompt = ({
    intl,
    onCancel,
    onOk,
    modalPosition,
    entityType,
    relativeElemRef
}) => {
    const isRTL = document.querySelector('[dir="rtl"]') !== null;
    const modalPositionValues = calculateModalPosition(relativeElemRef, modalPosition, isRTL);

    return (<ReactModal
        isOpen
        style={{
            content: {
                ...modalPositionValues,
                width: modalWidth,
                border: 'none',
                height: 'fit-content',
                backgroundColor: 'transparent',
                padding: 0,
                margin: 0,
                position: 'absolute',
                overflow: 'visible',
                zIndex: 1000,
                direction: isRTL ? 'rtl' : 'ltr'
            },
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 510,
                backgroundColor: 'transparent'
            }
        }}
        contentLabel={intl.formatMessage(messages.confirmDeletionHeading)}
        onRequestClose={onCancel}
    >
        <Box className={styles.modalContainer}>
            <Box
                className={classNames(
                    styles.arrowContainer,
                    isRTL ? styles.arrowContainerRight : styles.arrowContainerLeft
                )}
                style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    [isRTL ? 'left' : 'right']: '-10px'
                }}
            >
                <img
                    className={styles.deleteIcon}
                    src={isRTL ? arrowLeftIcon : arrowRightIcon}
                />
            </Box>
            <Box className={styles.body}>
                <Box className={styles.label}>
                    <FormattedMessage {...getMessage(entityType)} />
                </Box>
                <Box className={styles.buttonRow}>
                    <button
                        className={styles.okButton}
                        onClick={onOk}
                        role="button"
                    >
                        <img
                            className={styles.deleteIcon}
                            src={deleteIcon}
                        />
                        <div className={styles.message}>
                            <FormattedMessage {...messages.confirmOption} />
                        </div>
                    </button>
                    <button
                        className={styles.cancelButton}
                        onClick={onCancel}
                        role="button"
                    >
                        <img
                            className={styles.deleteIcon}
                            src={undoIcon}
                        />
                        <div className={styles.message}>
                            <FormattedMessage {...messages.cancelOption} />
                        </div>
                    </button>
                </Box>
            </Box>
        </Box>
    </ReactModal>);
};

DeleteConfirmationPrompt.propTypes = {
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    relativeElemRef: PropTypes.object,
    entityType: PropTypes.string,
    modalPosition: PropTypes.string,
    intl: intlShape.isRequired
};

const DeleteConfirmationPromptIntl = injectIntl(DeleteConfirmationPrompt);

export default DeleteConfirmationPromptIntl;
