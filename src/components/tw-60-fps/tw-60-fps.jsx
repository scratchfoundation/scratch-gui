import React from 'react';
import {FormattedMessage} from 'react-intl';

import styles from './tw-60-fps.css';

const SixtyFPS = () => (
    <div className={styles.sixtyContainer}>
        <div className={styles.sixtyLabel}>
            <FormattedMessage
                defaultMessage="60 FPS"
                description="Label indicating project is running at 60 FPS"
                id="tw.60fps"
            />
        </div>
    </div>
);

export default SixtyFPS;
