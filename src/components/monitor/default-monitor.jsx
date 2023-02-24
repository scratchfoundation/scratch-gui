import React from 'react';
import PropTypes from 'prop-types';
import styles from './monitor.css';

const DefaultMonitor = ({categoryColor, label, value}) => (
    <div className={styles.defaultMonitor}>
        <div className={styles.row}>
            <div className={styles.label}>
                {label}
            </div>
            <div
                className={styles.value}
                style={{
                    background: categoryColor.background,
                    color: categoryColor.text
                }}
            >
                {value}
            </div>
        </div>
    </div>
);

DefaultMonitor.propTypes = {
    categoryColor: PropTypes.shape({
        background: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default DefaultMonitor;
