import React from 'react';
import {FormattedMessage} from 'react-intl';
import {ComingSoonTooltip} from '../coming-soon/coming-soon.jsx';
import styles from './backpack.css';

const Backpack = () => (
    <div className={styles.backpackContainer}>
        <div className={styles.backpackHeader}>
            <ComingSoonTooltip place="top">
                <FormattedMessage
                    defaultMessage="Backpack"
                    description="Button to open the backpack"
                    id="gui.backpack.header"
                />
            </ComingSoonTooltip>
        </div>
    </div>
);

export default Backpack;
