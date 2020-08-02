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
                    className={styles.minInput}
                    name={props.intl.formatMessage(messages.minValue)}
                    pattern="-?[0-9]*(\.[0-9]+)?"
                    type="text"
                    value={props.minValue}
                    onChange={props.onChangeMin}
                    onKeyPress={props.onKeyPress}
                />
            </Box>
            <Box className={styles.label}>
                {props.intl.formatMessage(messages.maxValue)}
            </Box>
            <Box>
                <input
                    className={styles.maxInput}
                    name={props.intl.formatMessage(messages.maxValue)}
                    pattern="-?[0-9]*(\.[0-9]+)?"
                    type="text"
                    value={props.maxValue}
                    onChange={props.onChangeMax}
                    onKeyPress={props.onKeyPress}
                />
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
    intl: intlShape,
    maxValue: PropTypes.string,
    minValue: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onChangeMax: PropTypes.func.isRequired,
    onChangeMin: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired
};

export default injectIntl(SliderPromptComponent);
