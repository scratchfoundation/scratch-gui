/**
 * This progress ring is like a progress bar (`<progress />`), but circular.
 * Like `<progress />`, it has a `value` prop and a `max` prop. The `value`
 * prop is the current progress, and the `max` prop is the maximum progress.
 * The `value` prop can be any number between 0 and `max`, inclusive.
 * The `max` prop can be any number greater than 0, and defaults to 1.
 * Indeterminate progress is not supported.
 * The required `sizePx` prop is the outer diameter of the ring, in pixels.
 * The optional `strokeWidthPx` prop is the width of the ring, in pixels.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import styles from './progress-ring.css';

const ProgressRingComponent = ({
    className,
    max = 1,
    sizePx,
    strokeWidthPx,
    value,
    ...props
}) => {
    if (typeof strokeWidthPx === 'undefined') {
        strokeWidthPx = sizePx / 6;
    }

    const center = sizePx / 2;
    const diameter = (sizePx - strokeWidthPx);
    const radius = diameter / 2;
    const circumference = Math.PI * diameter;
    const offset = circumference * (1 - (value / max));
    const ringSvgProps = {
        cx: center,
        cy: center,
        r: radius
    };

    return (
        <div
            className={classNames(styles.progressRing, className)}
            style={{width: sizePx, height: sizePx}}
            {...props}
        >
            <svg
                className={classNames(styles.progressRingSvg, className)}
                viewBox={`0 0 ${sizePx} ${sizePx}`}
            >
                <circle
                    className={styles.progressRingRing}
                    {...ringSvgProps}
                    style={{
                        strokeWidth: `${strokeWidthPx}px`
                    }}
                />
                <circle
                    className={styles.progressRingValue}
                    {...ringSvgProps}
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: offset,
                        strokeWidth: `${strokeWidthPx}px`
                    }}
                    transform={`rotate(-90 ${center} ${center})`}
                />
            </svg>
        </div>
    );
};

ProgressRingComponent.propTypes = {
    className: PropTypes.string,
    max: PropTypes.number, // default = 1
    sizePx: PropTypes.number.isRequired,
    strokeWidthPx: PropTypes.number, // default = sizePx/6
    value: PropTypes.number.isRequired
};

export default ProgressRingComponent;
