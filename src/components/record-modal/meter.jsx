const React = require('react');
const PropTypes = require('prop-types');
const styles = require('./meter.css');

const Meter = props => {
    const {
        width,
        height
    } = props;
    
    const level = Math.min(1, Math.max(0, props.level || 0));

    const nGreen = 11;
    const nYellow = 5;
    const nRed = 3;

    const nBars = nGreen + nYellow + nRed;

    const barSpacing = 2.5;
    const barRounding = 3;
    const barHeight = (height + barSpacing / 2 - barSpacing * nBars) / nBars;
    const barWidth = width;

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
                        width={barWidth}
                        x={0}
                        y={height - barHeight - index * (barHeight + barSpacing)}
                    />
                ))}
            <rect
                fill="white"
                height={Math.floor(nBars * (1 - level)) * (barHeight + barSpacing) + 2}
                opacity="0.75"
                width={width + 4}
                x={-2}
                y={-2}
            />
        </svg>
    );
};

Meter.propTypes = {
    height: PropTypes.number,
    level: PropTypes.number,
    width: PropTypes.number
};

module.exports = Meter;
