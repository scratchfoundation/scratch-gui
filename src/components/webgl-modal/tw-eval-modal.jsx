import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import Box from '../box/box.jsx';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';

import styles from './webgl-modal.css';

const messages = defineMessages({
    label: {
        id: 'tw.evalModal.label',
        defaultMessage: 'Browser Configuration Error',
        description: 'eval() is broken title'
    }
});

const EvalModal = ({intl, ...props}) => (
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
                        defaultMessage="A browser extension is interfering with TurboWarp's ability to compile scripts. Please try turning off your adblocker and refreshing. This site does not contain advertisements or privacy-invading analytics."
                        description="eval() is broken message"
                        id="tw.evalModal.description"
                    />
                    { /* eslint-enable max-len */ }
                </p>
            </Box>
        </div>
    </ReactModal>
);

EvalModal.propTypes = {
    intl: intlShape.isRequired,
    isRtl: PropTypes.bool
};

export default injectIntl(EvalModal);
