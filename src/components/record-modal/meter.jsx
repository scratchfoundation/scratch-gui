const React = require('react');
const PropTypes = require('prop-types');

const Meter = props => {
    const level = Math.min(1, Math.max(0, props.level || 0));
    const {
        width,
        height
    } = props;

    const nGreen = 11;
    const nYellow = 5;
    const nRed = 3;

    const nBars = nGreen + nYellow + nRed;

    const barSpacing = 2.5;
    const barRounding = 3;
    const barHeight = (height + barSpacing / 2 - barSpacing * nBars) / nBars;
    const barWidth = width;

    const greenFill = 'rgb(171, 220, 170)';
    const yellowFill = 'rgb(251, 219, 130)';
    const redFill = 'rgb(251, 194, 142)';

    const indexToFill = index => {
        if (index < nGreen) return greenFill;
        if (index < nGreen + nYellow) return yellowFill;
        return redFill;
    };

    const greenStroke = 'rgb(174, 211, 168)';
    const yellowStroke = 'rgb(239, 212, 134)';
    const redStroke = 'rgb(235, 189, 142)';

    const indexToStroke = index => {
        if (index < nGreen) return greenStroke;
        if (index < nGreen + nYellow) return yellowStroke;
        return redStroke;
    };

    const bars = Array(nBars).fill(0)
        .map((value, index) => (
            <rect
                fill={indexToFill(index)}
                height={barHeight}
                key={index}
                rx={barRounding}
                ry={barRounding}
                stroke={indexToStroke(index)}
                width={barWidth}
                x={0}
                y={height - barHeight - index * (barHeight + barSpacing)}
            />
        ));

    const maskHeight = Math.floor(nBars * (1 - level)) * (barHeight + barSpacing);
    const mask = (
        <rect
            fill="white"
            height={maskHeight + 2}
            opacity="0.75"
            width={width + 4}
            x={-2}
            y={-2}
        />
    );

    return (
        <svg
            height={height}
            style={{overflow: 'visible'}}
            width={width}
        >
            {bars}
            {mask}
        </svg>
    );
};

Meter.propTypes = {
    height: PropTypes.number,
    level: PropTypes.number,
    width: PropTypes.number
};

module.exports = Meter;
