import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import Box from '../box/box.jsx';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';

import styles from './browser-modal.css';
import unhappyBrowser from './unsupported-browser.svg';

const messages = defineMessages({
    label: {
        id: 'gui.unsupportedBrowser.label',
        defaultMessage: 'Browser is not supported',
        description: ''
    },
    error: {
        id: 'gui.unsupportedBrowser.errorLabel',
        defaultMessage: 'An Error Occurred',
        description: 'Heading shown when there is an unhandled exception in an unsupported browser'
    }
});

const BrowserModal = ({intl, ...props}) => {
    const label = props.error ? messages.error : messages.label;
    return (
        <ReactModal
            isOpen
            className={styles.modalContent}
            contentLabel={intl.formatMessage({...messages.label})}
            overlayClassName={styles.modalOverlay}
            onRequestClose={props.onBack}
        >
            <div dir={props.isRtl ? 'rtl' : 'ltr'} >
                <Box className={styles.illustration}>
                    <img src={unhappyBrowser} />
                </Box>

                <Box className={styles.body}>
                    <h2>
                        <FormattedMessage {...label} />
                    </h2>
                    <p>
                        { /* eslint-disable max-len */ }
                        {
                            props.error ? <FormattedMessage
                                defaultMessage="We are very sorry, but it looks like you are using a browser version that Scratch does not support. We recommend updating to the latest version of a supported browser such as Google Chrome, Mozilla Firefox, Microsoft Edge, or Apple Safari. "
                                description="Error message when the browser does not meet our minimum requirements"
                                id="gui.unsupportedBrowser.notRecommended"
                            /> : <FormattedMessage
                                defaultMessage="We are very sorry, but Scratch does not support this browser. We recommend updating to the latest version of a supported browser such as Google Chrome, Mozilla Firefox, Microsoft Edge, or Apple Safari."
                                description="Error message when the browser does not work at all (IE)"
                                id="gui.unsupportedBrowser.description"
                            />
                        }
                        { /* eslint-enable max-len */ }
                    </p>

                    <Box className={styles.buttonRow}>
                        <button
                            className={styles.backButton}
                            onClick={props.onBack}
                        >
                            <FormattedMessage
                                defaultMessage="Back"
                                description="Button to go back in unsupported browser modal"
                                id="gui.unsupportedBrowser.back"
                            />
                        </button>

                    </Box>
                    <div className={styles.faqLinkText}>
                        <FormattedMessage
                            defaultMessage="To learn more, go to the {previewFaqLink}."
                            description="Invitation to try 3.0 preview"
                            id="gui.unsupportedBrowser.previewfaq"
                            values={{
                                previewFaqLink: (
                                    <a
                                        className={styles.faqLink}
                                        href="//scratch.mit.edu/3faq"
                                    >
                                        <FormattedMessage
                                            defaultMessage="FAQ"
                                            description="link to Scratch 3.0 FAQ page"
                                            id="gui.unsupportedBrowser.previewfaqlinktext"
                                        />
                                    </a>
                                )
                            }}
                        />
                    </div>
                </Box>
            </div>
        </ReactModal>
    );
};

BrowserModal.propTypes = {
    error: PropTypes.bool,
    intl: intlShape.isRequired,
    isRtl: PropTypes.bool,
    onBack: PropTypes.func.isRequired
};

BrowserModal.defaultProps = {
    error: false
};

const WrappedBrowserModal = injectIntl(BrowserModal);

WrappedBrowserModal.setAppElement = ReactModal.setAppElement;

export default WrappedBrowserModal;
