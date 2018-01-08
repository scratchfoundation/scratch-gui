import PropTypes from 'prop-types';
import React from 'react';
import Modal from '../modal/modal.jsx';
import Box from '../box/box.jsx';
import {FormattedMessage} from 'react-intl';

import booleanInputIcon from './icon--boolean-input.svg';
import textInputIcon from './icon--text-input.svg';
import labelIcon from './icon--label.svg';

import styles from './custom-procedures.css';

const CustomProcedures = props => (
    <Modal
        className={styles.modalContent}
        contentLabel="Make a Block"
        onRequestClose={props.onCancel}
    >
        <Box
            className={styles.workspace}
            componentRef={props.componentRef}
        />
        <Box className={styles.body}>
            <div className={styles.optionsRow}>
                <div
                    className={styles.optionCard}
                    role="button"
                    tabIndex="0"
                    onClick={props.onAddTextNumber}
                >
                    <img
                        className={styles.optionIcon}
                        src={textInputIcon}
                    />
                    <div className={styles.optionTitle}>
                        <FormattedMessage
                            defaultMessage="Add an input"
                            description="Label for button to add a number/text input"
                            id="gui.customProcedures.addAnInputNumberText"
                        />
                    </div>
                    <div className={styles.optionDescription}>
                        <FormattedMessage
                            defaultMessage="number or text"
                            description="Description of the number/text input type"
                            id="gui.customProcedures.numberTextType"
                        />
                    </div>
                </div>
                <div
                    className={styles.optionCard}
                    role="button"
                    tabIndex="0"
                    onClick={props.onAddBoolean}
                >
                    <img
                        className={styles.optionIcon}
                        src={booleanInputIcon}
                    />
                    <div className={styles.optionTitle}>
                        <FormattedMessage
                            defaultMessage="Add an input"
                            description="Label for button to add a boolean input"
                            id="gui.customProcedures.addAnInputBoolean"
                        />
                    </div>
                    <div className={styles.optionDescription}>
                        <FormattedMessage
                            defaultMessage="boolean"
                            description="Description of the boolean input type"
                            id="gui.customProcedures.booleanType"
                        />
                    </div>
                </div>
                <div
                    className={styles.optionCard}
                    role="button"
                    tabIndex="0"
                    onClick={props.onAddLabel}
                >
                    <img
                        className={styles.optionIcon}
                        src={labelIcon}
                    />
                    <div className={styles.optionTitle}>
                        <FormattedMessage
                            defaultMessage="Add a label"
                            description="Label for button to add a label"
                            id="gui.customProcedures.addALabel"
                        />
                    </div>
                </div>
            </div>
            <div className={styles.checkboxRow}>
                <label>
                    <input
                        checked={props.warp}
                        type="checkbox"
                        onChange={props.onToggleWarp}
                    />
                    <FormattedMessage
                        defaultMessage="Run without screen refresh"
                        description="Label for checkbox to run without screen refresh"
                        id="gui.customProcedures.runWithoutScreenRefresh"
                    />
                </label>
            </div>
            <Box className={styles.buttonRow}>
                <button
                    className={styles.cancelButton}
                    onClick={props.onCancel}
                >
                    <FormattedMessage
                        defaultMessage="Cancel"
                        description="Label for button to cancel custom procedure edits"
                        id="gui.customProcedures.cancel"
                    />
                </button>
                <button
                    className={styles.okButton}
                    onClick={props.onOk}
                >
                    <FormattedMessage
                        defaultMessage="OK"
                        description="Label for button to save new custom procedure"
                        id="gui.customProcedures.ok"
                    />
                </button>
            </Box>
        </Box>
    </Modal>
);

CustomProcedures.propTypes = {
    componentRef: PropTypes.func.isRequired,
    onAddBoolean: PropTypes.func.isRequired,
    onAddLabel: PropTypes.func.isRequired,
    onAddTextNumber: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    onToggleWarp: PropTypes.func.isRequired,
    warp: PropTypes.bool.isRequired
};

export default CustomProcedures;
