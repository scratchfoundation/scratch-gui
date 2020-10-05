import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import styles from './framerate-indicator.css';

const FramerateIndicator = ({framerate}) => (
    // do not show an indicator at 30 FPS
    framerate === 30 ? null : (
        <div className={styles.framerateContainer}>
            <div className={styles.framerateLabel}>
                <FormattedMessage
                    defaultMessage="{framerate} FPS"
                    description="Label indicating project framerate"
                    id="tw.framerateIndicator"
                    values={{
                        framerate: framerate
                    }}
                />
            </div>
        </div>
    )
);

FramerateIndicator.propTypes = {
    framerate: PropTypes.number
};

export default FramerateIndicator;
