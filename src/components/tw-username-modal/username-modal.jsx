import {defineMessages, FormattedMessage, intlShape, injectIntl} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import styles from './username-modal.css';

const messages = defineMessages({
    title: {
        defaultMessage: 'Change Username',
        description: 'Title change username modal',
        id: 'tw.usernameModal.title'
    }
});

const UsernameModalComponent = props => (
    <Modal
        className={styles.modalContent}
        onRequestClose={props.onCancel}
        contentLabel={props.intl.formatMessage(messages.title)}
        id="usernameModal"
    >
        <Box className={styles.body}>
            <Box>
                <input
                    autoFocus
                    className={styles.textInput}
                    value={props.value}
                    onChange={props.onChange}
                    onFocus={props.onFocus}
                    onKeyPress={props.onKeyPress}
                    pattern="^[a-zA-Z0-9_-]*$"
                    maxLength="20"
                />
            </Box>
            <Box className={styles.helpText}>
                <p>
                    <FormattedMessage
                        defaultMessage="This will be stored in your browser's local storage."
                        description="Text in change username modal"
                        id="tw.usernameModal.help"
                    />
                </p>
            </Box>
            <Box className={styles.buttonRow}>
                <button
                    className={styles.cancelButton}
                    onClick={props.onReset}
                >
                    <FormattedMessage
                        defaultMessage="Reset"
                        description="Button in username modal to reset username to random"
                        id="tw.usernameModal.reset"
                    />
                </button>
                <button
                    className={styles.cancelButton}
                    onClick={props.onCancel}
                >
                    <FormattedMessage
                        defaultMessage="Cancel"
                        description="Button in prompt for cancelling the dialog"
                        id="gui.prompt.cancel"
                    />
                </button>
                <button
                    className={styles.okButton}
                    onClick={props.onOk}
                    disabled={!props.valid}
                >
                    <FormattedMessage
                        defaultMessage="OK"
                        description="Button in prompt for confirming the dialog"
                        id="gui.prompt.ok"
                    />
                </button>
            </Box>
        </Box>
    </Modal>
);

UsernameModalComponent.propTypes = {
    intl: intlShape,
    valid: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired
};

export default injectIntl(UsernameModalComponent);
