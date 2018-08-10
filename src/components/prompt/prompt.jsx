import {defineMessages, FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import {ComingSoonTooltip} from '../coming-soon/coming-soon.jsx';
import Modal from '../../containers/modal.jsx';

import styles from './prompt.css';

import dropdownIcon from './icon--dropdown-caret.svg';

const messages = defineMessages({
    forAllSpritesMessage: {
        defaultMessage: 'For all sprites',
        description: 'Option message when creating a variable for making it available to all sprites',
        id: 'gui.gui.variableScopeOptionAllSprites'
    },
    forThisSpriteMessage: {
        defaultMessage: 'For this sprite only',
        description: 'Option message when creating a varaible for making it only available to the current sprite',
        id: 'gui.gui.variableScopeOptionSpriteOnly'
    },
    moreOptionsMessage: {
        defaultMessage: 'More Options',
        description: 'Dropdown message for variable/list options',
        id: 'gui.gui.variablePrompt'
    },
    availableToAllSpritesMessage: {
        defaultMessage: 'This variable will be available to all sprites.',
        description: 'A message that displays in a variable modal when the stage is selected indicating ' +
            'that the variable being created will available to all sprites.',
        id: 'gui.gui.variablePromptAllSpritesMessage'
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
                    className={styles.variableNameTextInput}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    onKeyPress={props.onKeyPress}
                />
            </Box>
            {props.showMoreOptions ?
                <div>
                    {props.isStage ?
                        <div className={styles.infoMessage}>
                            <FormattedMessage
                                {...messages.availableToAllSpritesMessage}
                            />
                        </div> :
                        <Box className={styles.optionsRow}>
                            <label>
                                <input
                                    defaultChecked
                                    name="variableScopeOption"
                                    type="radio"
                                    value="global"
                                    onChange={props.onOptionSelection}
                                />
                                <FormattedMessage
                                    {...messages.forAllSpritesMessage}
                                />
                            </label>
                            <label>
                                <input
                                    name="variableScopeOption"
                                    type="radio"
                                    value="local"
                                    onChange={props.onOptionSelection}
                                />
                                <FormattedMessage
                                    {...messages.forThisSpriteMessage}
                                />
                            </label>
                        </Box>}
                    <Box className={styles.moreOptions}>
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
                </div> : null}

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
    isStage: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    onOptionSelection: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    showMoreOptions: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
};

export default PromptComponent;
