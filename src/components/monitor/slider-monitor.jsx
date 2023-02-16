import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './monitor.css';

const SliderMonitor = ({categoryColor, isDiscrete, label, min, max, value, onSliderUpdate}) => (
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
        <div className={styles.row}>
            <input
                className={classNames(styles.slider, 'no-drag')} // Class used on parent Draggable to prevent drags
                max={max}
                min={min}
                step={isDiscrete ? 1 : 0.01}
                type="range"
                value={value}
                onChange={onSliderUpdate}
            />
        </div>

    </div>
);

SliderMonitor.propTypes = {
    categoryColor: PropTypes.shape({
        background: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired,
    isDiscrete: PropTypes.bool,
    label: PropTypes.string.isRequired,
    max: PropTypes.number,
    min: PropTypes.number,
    onSliderUpdate: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

SliderMonitor.defaultProps = {
    isDiscrete: true,
    min: 0,
    max: 100
};

export default SliderMonitor;
