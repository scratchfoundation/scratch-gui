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
    optInText: {
        defaultMessage: 'Share my usage data with the Scratch Team',
        description: 'Text for telemetry modal opt-in button',
        id: 'gui.telemetryOptIn.optInText'
    },
    optInTooltip: {
        defaultMessage: 'Enable telemetry',
        description: 'Tooltip for telemetry modal opt-in button',
        id: 'gui.telemetryOptIn.optInTooltip'
    },
    optOutText: {
        defaultMessage: 'Do not share my usage data with the Scratch Team',
        description: 'Text for telemetry modal opt-in button',
        id: 'gui.telemetryOptIn.optOutText'
    },
    optOutTooltip: {
        defaultMessage: 'Disable telemetry',
        description: 'Tooltip for telemetry modal opt-out button',
        id: 'gui.telemetryOptIn.optOutTooltip'
    },
    settingWasUpdated: {
        defaultMessage: 'Your setting was updated.',
        description: 'Message indicating that the telemetry setting was updated and saved',
        id: 'gui.telemetryOptIn.settingWasUpdated'
    },
    closeButton: {
        defaultMessage: 'Close',
        description: 'Text for the button which closes the telemetry modal dialog',
        id: 'gui.telemetryOptIn.buttonClose'
    }
});

// This should be at least as long as the CSS transition
const SETTING_WAS_UPDATED_DURATION_MS = 3000;

class TelemetryModal extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCancel',
            'handleOptInOutChanged'
        ]);
        this.state = {
            // if the settingWasUpdated message is displayed, this will be the ID of its removal timer
            settingWasUpdatedTimer: null
        };
    }
    componentWillUnmount () {
        if (this.state.settingWasUpdatedTimer) {
            clearTimeout(this.state.settingWasUpdatedTimer);
        }
    }
    handleCancel () {
        this.props.onRequestClose();
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }
    handleOptInOutChanged (e) {
        if (e.target.value === 'true') {
            if (this.props.onOptIn) {
                this.props.onOptIn();
                this.handleSettingWasUpdated();
            }
        } else if (e.target.value === 'false') {
            if (this.props.onOptOut) {
                this.props.onOptOut();
                this.handleSettingWasUpdated();
            }
        }
    }
    handleSettingWasUpdated () {
        if (this.state.settingWasUpdatedTimer) {
            clearTimeout(this.state.settingWasUpdatedTimer);
        }
        const newTimer = setTimeout(
            () => this.handleSettingWasUpdatedTimeout(newTimer),
            SETTING_WAS_UPDATED_DURATION_MS
        );
        this.setState({
            settingWasUpdatedTimer: newTimer
        });
    }
    handleSettingWasUpdatedTimeout (thisTimer) {
        if (thisTimer !== this.state.settingWasUpdatedTimer) {
            // some other timer has taken over
            return;
        }
        this.setState({
            settingWasUpdatedTimer: null
        });
    }
    render () {
        const isUndecided = (typeof this.props.isTelemetryEnabled !== 'boolean');
        const isOff = (this.props.isTelemetryEnabled === false);
        const isOn = (this.props.isTelemetryEnabled === true);
        const settingWasUpdated = this.state.settingWasUpdatedTimer && (
            <FormattedMessage {...messages.settingWasUpdated} />
        );
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
                                onClick={this.props.onShowPrivacyPolicy}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FormattedMessage {...messages.privacyPolicyLink} />
                            </a>)
                        }}
                    /></p>
                    <Box className={styles.radioButtons}>
                        <label className={isOn ? styles.labelSelected : null}>
                            <input
                                name="optInOut"
                                type="radio"
                                value="true"
                                title={this.props.intl.formatMessage(messages.optInTooltip)}
                                checked={this.props.isTelemetryEnabled === true}
                                onChange={this.handleOptInOutChanged}
                            />
                            <FormattedMessage {...messages.optInText} />
                        </label>
                        <label className={isOff ? styles.labelSelected : null}>
                            <input
                                name="optInOut"
                                type="radio"
                                value="false"
                                title={this.props.intl.formatMessage(messages.optOutTooltip)}
                                checked={this.props.isTelemetryEnabled === false}
                                onChange={this.handleOptInOutChanged}
                            />
                            <FormattedMessage {...messages.optOutText} />
                        </label>
                    </Box>
                    <Box className={styles.buttonRow}>
                        <span
                            className={styles.settingWasUpdated}
                            key={this.state.settingWasUpdatedTimer} // restart CSS fade when timer changes
                        >{settingWasUpdated}</span>
                        <button
                            className={styles.optIn}
                            onClick={this.props.onRequestClose}
                            disabled={isUndecided}
                        >
                            <FormattedMessage {...messages.closeButton} />
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
    isTelemetryEnabled: PropTypes.bool, // false=disabled, true=enabled, undefined=undecided
    onCancel: PropTypes.func,
    onOptIn: PropTypes.func.isRequired,
    onOptOut: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func,
    onShowPrivacyPolicy: PropTypes.func
};

export default injectIntl(TelemetryModal);
