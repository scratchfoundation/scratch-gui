import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import styles from './framerate-indicator.css';

const FramerateIndicator = ({framerate, interpolation}) => (
    // do not show an indicator at 30 FPS with interpolation disabled
    (framerate === 30 && !interpolation) ? null : (
        <div className={styles.framerateContainer}>
            <div className={styles.framerateLabel}>
                {interpolation ? (
                    <FormattedMessage
                        defaultMessage="{framerate} FPS with interpolation"
                        description="Label indicating project framerate when interpolation is enabled"
                        id="tw.framerateIndicatorInterpolated"
                        values={{
                            framerate: framerate
                        }}
                    />
                ) : (
                    <FormattedMessage
                        defaultMessage="{framerate} FPS"
                        description="Label indicating project framerate when interpolation is disabled"
                        id="tw.framerateIndicator"
                        values={{
                            framerate: framerate
                        }}
                    />
                )}
            </div>
        </div>
    )
);

FramerateIndicator.propTypes = {
    framerate: PropTypes.number,
    interpolation: PropTypes.bool
};

export default FramerateIndicator;
