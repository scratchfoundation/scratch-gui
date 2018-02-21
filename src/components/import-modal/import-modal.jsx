import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import Box from '../box/box.jsx';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';
import classNames from 'classnames';

import CloseButton from '../close-button/close-button.jsx';
import ImportInput from '../import-input/import-input.jsx';

import styles from './import-modal.css';

const messages = defineMessages({
    title: {
        id: 'gui.importInfo.title',
        defaultMessage: 'View a Scratch 2.0 Project',
        description: 'Scratch 2.0 import modal label - for accessibility'
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
                        size={CloseButton.SIZE_LARGE}
                        onClick={props.onCancel}
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
                <FormattedMessage
                    defaultMessage="Enter a link to one of your shared Scratch projects. Changes made in this 3.0 Preview will not be saved."
                    description="Import project message"
                    id="gui.importInfo.message"
                />
            </p>

            <Box className={styles.inputRow}>
                <ImportInput
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    onKeyPress={props.onKeyPress}
                    errorMessage={props.errorMessage}
                    hasValidationError={props.hasValidationError}
                    inputValue={props.inputValue}
                    okClassName={styles.okInput}
                    badClassName={styles.badInput}
                    errorDivClassName={styles.errorDiv}
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
            <Box className={styles.buttonRow}>
                <button
                    className={styles.noButton}
                    onClick={props.onCancel}
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
                                href="//scratch.mit.edu/preview-faq"
                            >
                                <FormattedMessage
                                    defaultMessage="Preview FAQ"
                                    description="link to Scratch 3.0 preview FAQ page"
                                    id="gui.importInfo.previewfaqlink"
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
    intl: intlShape.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onViewProject: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    hasValidationError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired
};

export default injectIntl(ImportModal);
