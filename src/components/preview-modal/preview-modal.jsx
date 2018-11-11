import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import Box from '../box/box.jsx';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';

import styles from './preview-modal.css';
import catIcon from './happy-cat.png';

const messages = defineMessages({
    label: {
        id: 'gui.previewInfo.label',
        defaultMessage: 'Try Scratch 3.0',
        description: 'Scratch 3.0 modal label - for accessibility'
    },
    previewWelcome: {
        defaultMessage: 'Welcome to the Scratch 3.0 Beta',
        description: 'Header for Preview Info Modal',
        id: 'gui.previewInfo.welcome'
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
        defaultMessage: 'View 2.0 Project',
        description: 'Tooltip for View 2.0 Project button',
        id: 'gui.previewModal.viewprojecttooltip'
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
                        defaultMessage="Welcome to the Scratch 3.0 Beta"
                        description="Header for Beta Info Modal"
                        id="gui.previewInfo.betawelcome"
                    />
                </h2>
                <p>
                    { /* eslint-disable max-len */ }
                    <FormattedMessage
                        defaultMessage="We're working on the next generation of Scratch. We're excited for you to try it!"
                        description="Invitation to try 3.0 Beta"
                        id="gui.previewInfo.invitation"
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
                            description="Label for button to back out of trying Scratch 3.0 Beta"
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
                            description="Label for button to try Scratch 3.0 Beta"
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
                            defaultMessage="View 2.0 Project"
                            description="Label for button to import a 2.0 project"
                            id="gui.previewModal.viewproject"
                        />
                    </button>
                </Box>
                <Box className={styles.faqLinkText}>
                    <FormattedMessage
                        defaultMessage="To learn more, go to the {previewFaqLink}."
                        description="Invitation to try 3.0 Beta"
                        id="gui.previewInfo.previewfaq"
                        values={{
                            previewFaqLink: (
                                <a
                                    className={styles.faqLink}
                                    href="//scratch.mit.edu/3faq"
                                >
                                    <FormattedMessage
                                        defaultMessage="FAQ"
                                        description="link to Scratch 3.0 FAQ page"
                                        id="gui.previewInfo.previewfaqlinktext"
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
