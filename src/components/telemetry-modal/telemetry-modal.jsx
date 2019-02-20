import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';
import ReactModal from 'react-modal';

import Box from '../box/box.jsx';

import styles from './telemetry-modal.css';

const messages = defineMessages({
    label: {
        id: 'gui.telemetryOptIn.label',
        defaultMessage: 'Report statistics to improve Scratch',
        description: 'Scratch 3.0 telemetry modal label - for accessibility'
    },
    bodyText1: {
        defaultMessage: 'The Scratch Team is always looking to better understand how Scratch is used around the ' +
            'world. To help support this effort, you can allow Scratch to automatically send usage information to ' +
            'the Scratch Team.',
        description: 'First paragraph of body text for telemetry opt-in modal',
        id: 'gui.telemetryOptIn.body1'
    },
    bodyText2: {
        defaultMessage: 'The information we collect includes language selection, blocks usage, and some events like ' +
            'saving, loading, and uploading a project. We DO NOT collect any personal information. Please see our ' +
            '{privacyPolicyLink} for more information.',
        description: 'First paragraph of body text for telemetry opt-in modal',
        id: 'gui.telemetryOptIn.body2'
    },
    privacyPolicyLink: {
        defaultMessage: 'Privacy Policy',
        description: 'Link to the Scratch privacy policy',
        id: 'gui.telemetryOptIn.privacyPolicyLink'
    },
    noButton: {
        defaultMessage: 'No, thanks',
        description: 'Text for telemetry modal opt-out button',
        id: 'gui.telemetryOptIn.buttonTextNo'
    },
    noTooltip: {
        defaultMessage: 'Disable telemetry',
        description: 'Tooltip for telemetry modal opt-out button',
        id: 'gui.telemetryOptIn.buttonTooltipNo'
    },
    yesButton: {
        defaultMessage: "Yes, I'd like to help improve Scratch",
        description: 'Text for telemetry modal opt-in button',
        id: 'gui.telemetryOptIn.buttonTextYes'
    },
    yesTooltip: {
        defaultMessage: 'Enable telemetry',
        description: 'Tooltip for telemetry modal opt-in button',
        id: 'gui.telemetryOptIn.buttonTooltipYes'
    }
});

class TelemetryModal extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCancel',
            'handleOptIn',
            'handleOptOut'
        ]);
    }
    handleCancel () {
        this.props.onRequestClose();
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }
    handleOptIn () {
        this.props.onRequestClose();
        if (this.props.onOptIn) {
            this.props.onOptIn();
        }
    }
    handleOptOut () {
        this.props.onRequestClose();
        if (this.props.onOptOut) {
            this.props.onOptOut();
        }
    }
    render () {
        return (<ReactModal
            isOpen
            className={styles.modalContent}
            contentLabel={this.props.intl.formatMessage(messages.label)}
            overlayClassName={styles.modalOverlay}
            onRequestClose={this.handleCancel}
        >
            <div dir={this.props.isRtl ? 'rtl' : 'ltr'} >
                <Box className={styles.illustration} />

                <Box className={styles.body}>
                    <p><FormattedMessage {...messages.bodyText1} /></p>
                    <p><FormattedMessage
                        {...messages.bodyText2}
                        values={{
                            privacyPolicyLink: (<a
                                className={styles.privacyPolicyLink}
                                href="https://scratch.mit.edu/privacy_policy/"
                            >
                                <FormattedMessage {...messages.privacyPolicyLink} />
                            </a>)
                        }}
                    /></p>
                    <Box className={styles.buttonRow}>
                        <button
                            className={styles.optOut}
                            title={this.props.intl.formatMessage(messages.noTooltip)}
                            onClick={this.handleOptOut}
                        >
                            <FormattedMessage {...messages.noButton} />
                        </button>
                        <button
                            className={styles.optIn}
                            title={this.props.intl.formatMessage(messages.yesTooltip)}
                            onClick={this.handleOptIn}
                        >
                            <FormattedMessage {...messages.yesButton} />
                        </button>
                    </Box>
                </Box>
            </div>
        </ReactModal>);
    }
}

TelemetryModal.propTypes = {
    intl: intlShape.isRequired,
    isRtl: PropTypes.bool,
    onCancel: PropTypes.func,
    onOptIn: PropTypes.func.isRequired,
    onOptOut: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func
};

export default injectIntl(TelemetryModal);
