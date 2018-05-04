import {defineMessages, FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import {ComingSoonTooltip} from '../coming-soon/coming-soon.jsx';
import Modal from '../modal/modal.jsx';

import styles from './prompt.css';

import dropdownIcon from './icon--dropdown-caret.svg';

const messages = defineMessages({
    moreOptionsMessage: {
        defaultMessage: 'More Options',
        description: 'Dropdown message for variable/list options',
        id: 'gui.gui.variablePrompt'
    }
});

const PromptComponent = props => (
    <Modal
        className={styles.modalContent}
        contentLabel={props.title}
        onRequestClose={props.onCancel}
    >
        <Box className={styles.body}>
            <Box className={styles.label}>
                {props.label}
            </Box>
            <Box>
                <input
                    autoFocus
                    className={styles.input}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    onKeyPress={props.onKeyPress}
                />
            </Box>
            <Box className={props.showMoreOptions ? styles.moreOptions : styles.hideMoreOptions}>
                <ComingSoonTooltip
                    className={styles.moreOptionsAccordion}
                    place="right"
                    tooltipId="variable-options-accordion"
                >
                    <div className={styles.moreOptionsText}>
                        <FormattedMessage
                            {...messages.moreOptionsMessage}
                        />
                        <img
                            className={styles.moreOptionsIcon}
                            src={dropdownIcon}
                        />
                    </div>
                </ComingSoonTooltip>
            </Box>
            <Box className={styles.buttonRow}>
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

PromptComponent.propTypes = {
    label: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    showMoreOptions: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
};

export default PromptComponent;
