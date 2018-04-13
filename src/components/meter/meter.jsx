import React from 'react';
import PropTypes from 'prop-types';
import styles from './meter.css';

const Meter = props => {
    const {
        level,
        width,
        height
    } = props;

    const nGreen = 11;
    const nYellow = 5;
    const nRed = 3;

    const nBars = nGreen + nYellow + nRed;

    const barSpacing = 2.5;
    const barRounding = 3;
    const barHeight = (height - (barSpacing * (nBars + 1))) / nBars;

    const nBarsToMask = nBars - Math.floor(level * nBars);

    return (
        <svg
            className={styles.container}
            height={height}
            width={width}
        >
            {Array(nBars).fill(0)
                .map((value, index) => (
                    <rect
                        className={index < nGreen ? styles.green :
                            (index < nGreen + nYellow ? styles.yellow : styles.red)}
                        height={barHeight}
                        key={index}
                        rx={barRounding}
                        ry={barRounding}
                        width={width - 2}
                        x={1}
                        y={height - ((barSpacing + barHeight) * (index + 1))}
                    />
                ))}
            <rect
                fill="hsla(215, 100%, 95%, 1)"
                height={(nBarsToMask * (barHeight + barSpacing)) + (barSpacing / 2)}
                opacity="0.75"
                width={width}
                x={0}
                y={0}
            />
        </svg>
    );
};

Meter.propTypes = {
    height: PropTypes.number,
    level: PropTypes.number,
    width: PropTypes.number
};

export default Meter;
