import React from 'react';
import Modal from '../../containers/modal.jsx';
import {defineMessages, FormattedMessage, injectIntl} from 'react-intl';
import styles from './artie-help.css';
import Box from '../box/box';
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
        onRequestClose={props.onNo}
        id="ArtieHelp"
        contentLabel={props.intl.formatMessage(messages.artieHelpModalTitle)}
    >
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
                onClick={props.onYes}
            >
                <FormattedMessage
                    defaultMessage="Yes"
                    description="Yes"
                    id="gui.artie.yes"
                />
            </button>
            <button
                className={styles.noButton}
                onClick={props.onNo}
            >
                <FormattedMessage
                    defaultMessage="No"
                    description="No"
                    id="gui.artie.no"
                />
            </button>
        </Box>
    </Modal>
);

ArtieHelpPopupComponent.propTypes = {
    onYes: PropTypes.func,
    onNo: PropTypes.func
};

export default injectIntl(ArtieHelpPopupComponent);
