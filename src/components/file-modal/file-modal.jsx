import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';
import ReactModal from 'react-modal';
import VM from "scratch-vm";
import {handleDataFileUpload} from '../../lib/data-file-uploader'
import Box from '../box/box.jsx';
import styles from './file-modal.css';
import CloseButton from '../close-button/close-button.jsx';
import { file } from '@babel/types';

const messages = defineMessages({
    label: {
        id: 'gui.telemetryOptIn.label',
        defaultMessage: 'Report statistics to improve Scratch',
        description: 'Scratch 3.0 telemetry modal label - for accessibility'
    },
    bodyText1: {
        defaultMessage: 'This extension allows you to upload data files to help ' + 'you learn about big data!',
        description: 'First paragraph of body text for telemetry opt-in modal',
        id: 'gui.fileModal.body1'
    },
    noButton: {
        defaultMessage: 'Upload a local file',
        description: 'Text for the upload a local file button',
        id: 'gui.fileModal.buttonLocalFileUpload'
    },
    cancelButton: {
        defaultMessage: 'Go Back',
        description: 'Text for the cancelButton',
        id: 'gui.fileModal.buttonCancel'
    },
    noTooltip: {
        defaultMessage: 'Upload a data file from your computer',
        description: 'Tooltip for upload a local file button',
        id: 'gui.telemetryOptIn.buttonToolTipUploadLocalFile'
    },
    yesButton: {
        defaultMessage: "Upload a file from the web",
        description: 'Text for web upload button',
        id: 'gui.telemetryOptIn.buttonTextWebUpload'
    },
    yesTooltip: {
        defaultMessage: 'Upload a data file from anywhere on the web!',
        description: 'Tooltip for upload web file button',
        id: 'gui.telemetryOptIn.TooltipWebFile'
    }
});

class FileModal extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCancel',
            'handleLocalFile',
            'handleWebFile',
            'handleFileUpload',
            'handleCancelButton'
        ]);
        this.state = {
            uploadOption: null
        }
    }

    handleCancelButton () {
        this.setState({uploadOption: "back"});
    }
    handleLocalFile () {
        this.setState({uploadOption: "local"});
    }
    handleWebFile () {
        this.setState({uploadOption: "web"});
    }

    handleFileUpload(e) {
        handleDataFileUpload(e.target, this.props.vm.addDataFile, (msg) => alert("Error uploading file: " + msg));
        this.props.onRequestClose();
    }

    handleCancel () {
        this.props.onRequestClose();
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    render () {
        var content = "";
        switch(this.state.uploadOption) {
            case "local":
                content = (
                    <Box className={styles.buttonRow}>
                    <input type="file" accept=".csv,.xml,.json" onChange={this.handleFileUpload}/>
                    <button
                        className={styles.optIn}
                        title={this.props.intl.formatMessage(messages.noTooltip)}
                        onClick={this.handleCancelButton}
                    >
                    <FormattedMessage {...messages.cancelButton} />
                    </button>
                    </Box>);
                break;
            case "web":
                alert("This is not implemented yet...");
                content = (
                    <Box className={styles.buttonRow}>
                        <button
                            className={styles.optIn}
                            title={this.props.intl.formatMessage(messages.noTooltip)}
                            onClick={this.handleLocalFile}
                        >
                            <FormattedMessage {...messages.noButton} />
                        </button>
                        <button
                            className={styles.optIn}
                            title={this.props.intl.formatMessage(messages.yesTooltip)}
                            onClick={this.handleWebFile}
                        >
                            <FormattedMessage {...messages.yesButton} />
                        </button>
                    </Box>
                );//this will change to be what we need for the web file upload

                break;
            default: 
                content = (
                    <Box className={styles.buttonRow}>
                        <button
                            className={styles.optIn}
                            title={this.props.intl.formatMessage(messages.noTooltip)}
                            onClick={this.handleLocalFile}
                        >
                            <FormattedMessage {...messages.noButton} />
                        </button>
                        <button
                            className={styles.optIn}
                            title={this.props.intl.formatMessage(messages.yesTooltip)}
                            onClick={this.handleWebFile}
                        >
                            <FormattedMessage {...messages.yesButton} />
                        </button>
                    </Box>
                );
                break;
        }
    
        return (<ReactModal
            isOpen
            className={styles.modalContent}
            contentLabel={this.props.intl.formatMessage(messages.label)}
            overlayClassName={styles.modalOverlay}
            onRequestClose={this.handleCancel}
        >
            <div dir={this.props.isRtl ? 'rtl' : 'ltr'} >
                <Box className={styles.illustration} >
                <CloseButton
                            className={styles.closeButton}
                            size={CloseButton.SIZE_LARGE}
                            onClick={this.handleCancel}
                        />
                </Box>
                <Box className={styles.body}>
                    <p><FormattedMessage {...messages.bodyText1} /></p>
                    {content}
                </Box>
            </div>
        </ReactModal>);
    }
}

FileModal.propTypes = {
    intl: intlShape.isRequired,
    isRtl: PropTypes.bool,
    onRequestClose: PropTypes.func,//necessary to close out of the popup
    vm: PropTypes.instanceOf(VM).isRequired
};

export default injectIntl(FileModal);
