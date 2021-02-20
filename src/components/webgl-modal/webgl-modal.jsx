import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import Box from '../box/box.jsx';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';

import styles from './webgl-modal.css';

const messages = defineMessages({
    label: {
        id: 'gui.webglModal.label',
        defaultMessage: 'Your Browser Does Not Support WebGL',
        description: 'WebGL missing title'
    }
});

const WebGlModal = ({intl, ...props}) => (
    <ReactModal
        isOpen
        className={styles.modalContent}
        contentLabel={intl.formatMessage({...messages.label})}
        overlayClassName={styles.modalOverlay}
    >
        <div dir={props.isRtl ? 'rtl' : 'ltr'}>
            <Box className={styles.illustration} />

            <Box className={styles.body}>
                <h2>
                    <FormattedMessage {...messages.label} />
                </h2>
                <p>
                    { /* eslint-disable max-len */ }
                    <FormattedMessage
                        defaultMessage="Unfortunately it looks like your browser or computer {webGlLink}. This technology is needed for this site to run. Try updating your browser and graphics drivers or restarting your computer."
                        description="WebGL missing message"
                        id="tw.webglModal.description"
                        values={{
                            webGlLink: (
                                <a
                                    className={styles.faqLink}
                                    href="https://get.webgl.org/"
                                >
                                    <FormattedMessage
                                        defaultMessage="does not support WebGL"
                                        description="link part of your browser does not support WebGL message"
                                        id="gui.webglModal.webgllink"
                                    />
                                </a>
                            )
                        }}
                    />
                    { /* eslint-enable max-len */ }
                </p>
            </Box>
        </div>
    </ReactModal>
);

WebGlModal.propTypes = {
    intl: intlShape.isRequired,
    isRtl: PropTypes.bool
};

export default injectIntl(WebGlModal);
