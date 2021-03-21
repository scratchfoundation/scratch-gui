import React from 'react';
import {FormattedMessage} from 'react-intl';
import cloudIcon from './clouddata.svg';
import styles from './cloud-variable-badge.css';

const CloudVariableBadge = () => (
    <div className={styles.badge}>
        <div className={styles.icon}>
            <img
                src={cloudIcon}
                alt="Cloud"
                width="32"
                height="32"
            />
        </div>
        <div className={styles.text}>
            <FormattedMessage
                // eslint-disable-next-line max-len
                defaultMessage="This project uses cloud variables. TurboWarp uses its own cloud variable server independent of Scratch. Note that users may not be who their username says they are."
                description="Cloud variable badge under the project"
                id="tw.cloudVariableBadge"
            />
        </div>
    </div>
);

export default CloudVariableBadge;
