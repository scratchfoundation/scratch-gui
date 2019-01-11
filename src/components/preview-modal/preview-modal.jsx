import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import Box from '../box/box.jsx';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';

import styles from './preview-modal.css';
import catIcon from './happy-cat.png';

const messages = defineMessages({
    label: {
        id: 'gui.standaloneInfo.label',
        defaultMessage: 'Try Scratch Standalone',
        description: 'Scratch modal label - for accessibility'
    },
    previewWelcome: {
        defaultMessage: 'Welcome to the Scratch Standalone',
        description: 'Header for Standalone Info Modal',
        id: 'gui.standaloneInfo.welcome'
    },
    notNowTooltip: {
        defaultMessage: 'Not Now',
        description: 'Tooltip for Not Now button',
        id: 'gui.previewModal.notnowtooltip'
    },
    tryItTooltip: {
        defaultMessage: 'Try It',
        description: 'Tooltip for Try It button',
        id: 'gui.previewModal.tryittooltip'
    },
    viewProjectTooltip: {
        defaultMessage: 'View Online Project',
        description: 'Tooltip for View Online Project button',
        id: 'gui.standaloneModal.viewprojecttooltip'
    }
});

const PreviewModal = ({intl, ...props}) => (
    <ReactModal
        isOpen
        className={styles.modalContent}
        contentLabel={intl.formatMessage({...messages.label})}
        overlayClassName={styles.modalOverlay}
        onRequestClose={props.onTryIt}
    >
        <div dir={props.isRtl ? 'rtl' : 'ltr'} >
            <Box className={styles.illustration} />

            <Box className={styles.body}>
                <h2>
                    <FormattedMessage
                        defaultMessage="Welcome to the Scratch Standalone"
                        description="Header for Standalone Info Modal"
                        id="gui.standaloneInfo.betawelcome"
                    />
                </h2>
                <p>
                    { /* eslint-disable max-len */ }
                    <FormattedMessage
                        defaultMessage="This is the standalone version of Scratch. Let's use it for developing Scratch!"
                        description="Invitation to try Scratch Standalone"
                        id="gui.standaloneInfo.invitation"
                    />
                    { /* eslint-enable max-len */ }
                </p>

                <Box className={styles.buttonRow}>
                    <button
                        className={styles.noButton}
                        title={intl.formatMessage(messages.notNowTooltip)}
                        onClick={props.onCancel}
                    >
                        <FormattedMessage
                            defaultMessage="Not Now"
                            description="Label for button to back out of trying Scratch Standalone"
                            id="gui.previewInfo.notnow"
                        />
                    </button>
                    <button
                        className={styles.okButton}
                        title={intl.formatMessage(messages.tryItTooltip)}
                        onClick={props.onTryIt}
                    >
                        <FormattedMessage
                            defaultMessage="Try It! {caticon}"
                            description="Label for button to try Scratch Standalone"
                            id="gui.previewModal.tryit"
                            values={{
                                caticon: (
                                    <img
                                        className={styles.catIcon}
                                        src={catIcon}
                                    />
                                )
                            }}
                        />
                    </button>
                    <button
                        className={styles.viewProjectButton}
                        title={intl.formatMessage(messages.viewProjectTooltip)}
                        onClick={props.onViewProject}
                    >
                        <FormattedMessage
                            defaultMessage="View Online Project"
                            description="Label for button to import an online project"
                            id="gui.standaloneModal.viewproject"
                        />
                    </button>
                </Box>
                <Box className={styles.faqLinkText}>
                    <FormattedMessage
                        defaultMessage="To learn more, go to the {developersLink}."
                        description="Invitation to try Standalone"
                        id="gui.standaloneInfo.developers"
                        values={{
                            developersLink: (
                                <a
                                    className={styles.faqLink}
                                    href="//scratch.mit.edu/developers"
                                >
                                    <FormattedMessage
                                        defaultMessage="For Developers Page"
                                        description="link to Scratch For Developers page"
                                        id="gui.standaloneInfo.previewfaqdeveloperslinktext"
                                    />
                                </a>
                            )
                        }}
                    />
                </Box>
            </Box>
        </div>
    </ReactModal>
);

PreviewModal.propTypes = {
    intl: intlShape.isRequired,
    isRtl: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onTryIt: PropTypes.func.isRequired,
    onViewProject: PropTypes.func.isRequired
};

export default injectIntl(PreviewModal);
