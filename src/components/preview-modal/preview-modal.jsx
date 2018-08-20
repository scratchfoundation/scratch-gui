import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import Box from '../box/box.jsx';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';

import styles from './preview-modal.css';
import hattiIcon from './hatti.png';

const messages = defineMessages({
    label: {
        id: 'gui.smalruby3.previewInfo.label',
        defaultMessage: 'スモウルビー3.0を試してみる"',
        description: 'Smalruby 3.0 modal label - for accessibility'
    },
    previewWelcome: {
        defaultMessage: 'スモウルビー3.0 プレビュー版にようこそ!',
        description: 'Header for Preview Info Modal',
        id: 'gui.smalruby3.previewInfo.welcome'
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
        <Box className={styles.illustration} />

        <Box className={styles.body}>
            <h2>
                <FormattedMessage
                    defaultMessage="スモウルビー3.0 プレビュー版にようこそ!"
                    description="Header for Preview Info Modal"
                    id="gui.smalruby3.previewInfo.welcome"
                />
            </h2>
            <p>
                <FormattedMessage
                    defaultMessage="私たちは次世代のスモウルビーを開発中です。お試しください!"
                    description="Invitation to try 3.0 preview"
                    id="gui.smalruby3.previewInfo.invitation"
                />
            </p>

            <Box className={styles.buttonRow}>
                <button
                    className={styles.noButton}
                    title={intl.formatMessage({
                        defaultMessage: 'Not Now',
                        description: 'Tooltip for Not Now button',
                        id: 'gui.previewModal.notnowtooltip'
                    })}
                    onClick={props.onCancel}
                >
                    <FormattedMessage
                        defaultMessage="Not Now"
                        description="Label for button to back out of trying Smalruby 3.0 preview"
                        id="gui.previewInfo.notnow"
                    />
                </button>
                <button
                    className={styles.okButton}
                    title={intl.formatMessage({
                        defaultMessage: 'Try It',
                        description: 'Tooltip for Try It button',
                        id: 'gui.previewModal.tryittooltip'
                    })}
                    onClick={props.onTryIt}
                >
                    <FormattedMessage
                        defaultMessage="Try It! {caticon}"
                        description="Label for button to try Smalruby 3.0 Beta"
                        id="gui.previewModal.tryit"
                        values={{
                            caticon: (
                                <img
                                    className={styles.catIcon}
                                    src={hattiIcon}
                                />
                            )
                        }}
                    />
                </button>
                <button
                    className={styles.viewProjectButton}
                    title={intl.formatMessage({
                        defaultMessage: 'View 2.0 Project',
                        description: 'Tooltip for View 2.0 Project button',
                        id: 'gui.previewModal.viewprojecttooltip'
                    })}
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
    </ReactModal>
);

PreviewModal.propTypes = {
    intl: intlShape.isRequired,
    onCancel: PropTypes.func.isRequired,
    onTryIt: PropTypes.func.isRequired,
    onViewProject: PropTypes.func.isRequired
};

export default injectIntl(PreviewModal);
