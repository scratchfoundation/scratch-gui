import classNames from 'classnames';
import {defineMessages, FormattedMessage, intlShape, injectIntl} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';

import styles from './slider-prompt.css';


const messages = defineMessages({
    minValue: {
        defaultMessage: 'Minimum value',
        description: 'Label of slider modal',
        id: 'gui.sliderModal.min'
    },
    maxValue: {
        defaultMessage: 'Maximum value',
        description: 'Label of slider modal',
        id: 'gui.sliderModal.max'
    },
    title: {
        defaultMessage: 'Change slider range',
        description: 'Title of slider modal',
        id: 'gui.sliderModal.title'
    },
    decimal: {
        defaultMessage: 'Handle as decimal value',
        description: 'Label of a checkbox which is checked when it should handle decimal values.',
        id: 'gui.sliderModal.decimal'
    }
});

const SliderPromptComponent = props => (
    <Modal
        className={styles.modalContent}
        contentLabel={props.intl.formatMessage(messages.title)}
        id="sliderPrompt"
        onRequestClose={props.onCancel}
    >
        <Box className={styles.body}>
            <Box className={styles.label}>
                {props.intl.formatMessage(messages.minValue)}
            </Box>
            <Box>
                <input
                    autoFocus
                    className={styles.minInput}
                    defaultValue={props.defaultMinValue}
                    name={props.intl.formatMessage(messages.minValue)}
                    step="0.01"
                    type="number"
                    onChange={props.onChangeMin}
                    onFocus={props.onFocus}
                    onKeyPress={props.onKeyPress}
                />
            </Box>
            <Box className={styles.label}>
                {props.intl.formatMessage(messages.maxValue)}
            </Box>
            <Box>
                <input
                    className={styles.maxInput}
                    defaultValue={props.defaultMaxValue}
                    name={props.intl.formatMessage(messages.maxValue)}
                    step="0.01"
                    type="number"
                    onChange={props.onChangeMax}
                    onFocus={props.onFocus}
                    onKeyPress={props.onKeyPress}
                />
            </Box>
            <Box className={classNames(styles.decimalOption)}>
                <label
                    className={classNames({[styles.disabledLabel]: props.mustDecimal})}
                >
                    <input
                        checked={props.decimalSelected || props.mustDecimal}
                        defaultValue={props.defaultDecimal}
                        disabled={props.mustDecimal}
                        type="checkbox"
                        onChange={props.onDecimalOptionChange}
                    />
                    {props.intl.formatMessage(messages.decimal)}
                </label>
            </Box>
            <Box className={styles.buttonRow}>
                <button
                    className={styles.cancelButton}
                    onClick={props.onCancel}
                >
                    <FormattedMessage
                        defaultMessage="Cancel"
                        description="Button in prompt for cancelling the dialog"
                        id="gui.sliderPrompt.cancel"
                    />
                </button>
                <button
                    className={styles.okButton}
                    onClick={props.onOk}
                >
                    <FormattedMessage
                        defaultMessage="OK"
                        description="Button in prompt for confirming the dialog"
                        id="gui.sliderPrompt.ok"
                    />
                </button>
            </Box>
        </Box>
    </Modal>
);

SliderPromptComponent.propTypes = {
    decimalSelected: PropTypes.bool.isRequired,
    defaultDecimal: PropTypes.bool,
    defaultMaxValue: PropTypes.number,
    defaultMinValue: PropTypes.number,
    intl: intlShape,
    mustDecimal: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChangeMax: PropTypes.func.isRequired,
    onChangeMin: PropTypes.func.isRequired,
    onDecimalOptionChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired
};

export default injectIntl(SliderPromptComponent);
