import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import Box from '../box/box.jsx';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';
import classNames from 'classnames';

import CloseButton from '../close-button/close-button.jsx';

import styles from './import-modal.css';

const messages = defineMessages({
    title: {
        id: 'gui.importInfo.title',
        defaultMessage: 'View a Scratch 2.0 Project',
        description: 'Scratch 2.0 import modal label - for accessibility'
    },
    formDescription: {
        defaultMessage:
            'Enter a link to one of your shared Scratch projects. Changes made in this 3.0 Beta will not be saved.',
        description: 'Import project message',
        id: 'gui.importInfo.betamessage'
    },
    previewFormDescription: {
        defaultMessage:
            'Enter a link to one of your shared Scratch projects. Changes made in this 3.0 Preview will not be saved.',
        description: 'Import project message',
        id: 'gui.importInfo.message'
    },
    invalidFormatError: {
        id: 'gui.importInfo.invalidFormatError',
        defaultMessage: 'Uh oh, that project link or id doesn\'t look quite right.',
        description: 'Invalid project link or id message'
    }
});

const ImportModal = ({intl, ...props}) => (
    <ReactModal
        isOpen
        className={styles.modalContent}
        contentLabel={intl.formatMessage({...messages.title})}
        overlayClassName={styles.modalOverlay}
        onRequestClose={props.onCancel}
    >
        <Box>
            <div className={styles.header}>
                <div
                    className={classNames(
                        styles.headerItem,
                        styles.headerItemClose
                    )}
                >
                    <CloseButton
                        buttonType="back"
                        size={CloseButton.SIZE_LARGE}
                        onClick={props.onGoBack}
                    />
                </div>
                <div
                    className={classNames(
                        styles.headerItem,
                        styles.headerItemTitle
                    )}
                >
                    <h2>
                        {intl.formatMessage({...messages.title})}
                    </h2>
                </div>
                <div className={classNames(styles.headerItem, styles.headerItemFilter)}>
                    {null}
                </div>
            </div>
        </Box>

        <Box className={styles.body}>
            <p>
                {intl.formatMessage({...messages.formDescription})}
            </p>
            <Box
                className={classNames(styles.inputRow,
                    (props.hasValidationError ? styles.badInputContainer : styles.okInputContainer))
                }
            >
                <input
                    autoFocus
                    placeholder={props.placeholder}
                    value={props.inputValue}
                    onChange={props.onChange}
                    onKeyPress={props.onKeyPress}
                />
                <button
                    className={styles.okButton}
                    title="viewproject"
                    onClick={props.onViewProject}
                >
                    <FormattedMessage
                        defaultMessage="View"
                        description="Label for button to load a scratch 2.0 project"
                        id="gui.importModal.viewproject"
                    />
                </button>
            </Box>
            {props.hasValidationError ?
                <Box className={styles.errorRow}>
                    <p>
                        <FormattedMessage
                            {...messages[`${props.errorMessage}`]}
                        />
                    </p>
                </Box> : null
            }
            <Box className={styles.buttonRow}>
                <button
                    onClick={props.onGoBack}
                >
                    <FormattedMessage
                        defaultMessage="Go Back"
                        description="Label for button to back out of importing a project"
                        id="gui.importInfo.goback"
                    />
                </button>
            </Box>
            <Box className={styles.faqLinkText}>
                <FormattedMessage
                    defaultMessage="To learn more, go to the {previewFaqLink}."
                    description="Invitation to try 3.0 preview"
                    id="gui.importInfo.previewfaq"
                    values={{
                        previewFaqLink: (
                            <a
                                className={styles.faqLink}
                                href="//scratch.mit.edu/3faq"
                            >
                                <FormattedMessage
                                    defaultMessage="FAQ"
                                    description="link to Scratch 3.0 FAQ page"
                                    id="gui.importInfo.previewfaqlinktext"
                                />
                            </a>
                        )
                    }}
                />
            </Box>
        </Box>
    </ReactModal>
);

ImportModal.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    hasValidationError: PropTypes.bool.isRequired,
    inputValue: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onGoBack: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onViewProject: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

export default injectIntl(ImportModal);
