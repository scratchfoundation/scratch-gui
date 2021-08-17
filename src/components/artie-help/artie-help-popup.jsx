import React from 'react';
import Modal from '../../containers/modal.jsx';
import {defineMessages, FormattedMessage, injectIntl} from 'react-intl';
import styles from './artie-help-popup.css';
import Box from '../box/box.jsx';
import PropTypes from 'prop-types';

const messages = defineMessages({
    artieHelpModalTitle: {
        defaultMessage: 'ARTIE Help',
        description: 'ARTIE Help.',
        id: 'gui.menuBar.artie.help.modalTitle'
    }
});

const ArtieHelpPopupComponent = props => (
    <Modal
        className={styles.modalContent}
        onRequestClose={props.onNoClick}
        id="ArtieHelpPopup"
        contentLabel={props.intl.formatMessage(messages.artieHelpModalTitle)}
    >
        <Box className={styles.body}>
            <Box
                className={styles.label}
            >
                <FormattedMessage
                    defaultMessage="Do you need help?"
                    description="Do you need help?"
                    id="gui.artie.help.question"
                />
            </Box>
            <Box className={styles.buttonRow}>
                <button
                    className={styles.yesButton}
                    onClick={props.onYesClick}
                >
                    <FormattedMessage
                        defaultMessage="Yes"
                        description="Yes"
                        id="gui.artie.yes"
                    />
                </button>
                <button
                    className={styles.noButton}
                    onClick={props.onNoClick}
                >
                    <FormattedMessage
                        defaultMessage="No"
                        description="No"
                        id="gui.artie.no"
                    />
                </button>
            </Box>
        </Box>
    </Modal>
);

ArtieHelpPopupComponent.propTypes = {
    onYesClick: PropTypes.func,
    onNoClick: PropTypes.func.isRequired
};

export default injectIntl(ArtieHelpPopupComponent);
