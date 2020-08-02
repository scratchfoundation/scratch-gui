import React from 'react';
import PropTypes from 'prop-types';
import styles from './monitor.css';

const LargeMonitor = ({categoryColor, value}) => (
    <div className={styles.largeMonitor}>
        <div
            className={styles.largeValue}
            style={{background: categoryColor}}
        >
            {value}
        </div>
    </div>
);

LargeMonitor.propTypes = {
    categoryColor: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default LargeMonitor;
