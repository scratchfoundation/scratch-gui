import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import React from 'react';
import {getEventXY} from '../../lib/touch-utils';

import styles from './dial.css';

import dialFace from './icon--dial.svg';
import dialHandle from './icon--handle.svg';

class Dial extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleMouseDown',
            'handleMouseMove',
            'containerRef',
            'handleRef',
            'unbindMouseEvents'
        ]);
    }

    componentDidMount () {
        // Manually add touch/mouse handlers so that preventDefault can be used
        // to prevent scrolling on touch.
        // Tracked as a react issue https://github.com/facebook/react/issues/6436
        this.handleElement.addEventListener('mousedown', this.handleMouseDown);
        this.handleElement.addEventListener('touchstart', this.handleMouseDown);
    }

    componentWillUnmount () {
        this.unbindMouseEvents();
        this.handleElement.removeEventListener('mousedown', this.handleMouseDown);
        this.handleElement.removeEventListener('touchstart', this.handleMouseDown);
    }

    /**
     * Get direction from dial center to mouse move event.
     * @param {Event} e - Mouse move event.
     * @returns {number} Direction in degrees, clockwise, 90=horizontal.
     */
    directionToMouseEvent (e) {
        const {x: mx, y: my} = getEventXY(e);
        const bbox = this.containerElement.getBoundingClientRect();
        const cy = bbox.top + (bbox.height / 2);
        const cx = bbox.left + (bbox.width / 2);
        const angle = Math.atan2(my - cy, mx - cx);
        const degrees = angle * (180 / Math.PI);
        return degrees + 90; // To correspond with scratch coordinate system
    }

    /**
     * Create SVG path data string for the dial "gauge", the overlaid arc slice.
     * @param {number} radius - The radius of the dial.
     * @param {number} direction - Direction in degrees, clockwise, 90=horizontal.
     * @returns {string} Path data string for the gauge.
     */
    gaugePath (radius, direction) {
        const rads = (direction) * (Math.PI / 180);
        const path = [];
        path.push(`M ${radius} 0`);
        path.push(`L ${radius} ${radius}`);
        path.push(`L ${radius + (radius * Math.sin(rads))} ${radius - (radius * Math.cos(rads))}`);
        path.push(`A ${radius} ${radius} 0 0 ${direction < 0 ? 1 : 0} ${radius} 0`);
        path.push(`Z`);
        return path.join(' ');
    }

    handleMouseMove (e) {
        this.props.onChange(this.directionToMouseEvent(e) + this.directionOffset);
        e.preventDefault();
    }

    unbindMouseEvents () {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.unbindMouseEvents);
        window.removeEventListener('touchmove', this.handleMouseMove);
        window.removeEventListener('touchend', this.unbindMouseEvents);
    }

    handleMouseDown (e) {
        // Because the drag handle is not a single point, there is some initial
        // difference between the current sprite direction and the direction to the mouse
        // Store this offset to prevent jumping when the mouse is moved.
        this.directionOffset = this.props.direction - this.directionToMouseEvent(e);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.unbindMouseEvents);
        window.addEventListener('touchmove', this.handleMouseMove);
        window.addEventListener('touchend', this.unbindMouseEvents);
        e.preventDefault();
    }

    containerRef (el) {
        this.containerElement = el;
    }

    handleRef (el) {
        this.handleElement = el;
    }

    render () {
        const {direction, radius} = this.props;
        return (
            <div className={styles.container}>
                <div
                    className={styles.dialContainer}
                    ref={this.containerRef}
                    style={{
                        width: `${radius * 2}px`,
                        height: `${radius * 2}px`
                    }}
                >
                    <img
                        className={styles.dialFace}
                        draggable={false}
                        src={dialFace}
                    />
                    <svg
                        className={styles.gauge}
                        height={radius * 2}
                        width={radius * 2}
                    >
                        <path
                            className={styles.gaugePath}
                            d={this.gaugePath(radius, direction)}
                        />
                    </svg>
                    <img
                        className={styles.dialHandle}
                        draggable={false}
                        ref={this.handleRef}
                        src={dialHandle}
                        style={{
                            top: `${radius - (radius * Math.cos(direction * (Math.PI / 180)))}px`,
                            left: `${radius + (radius * Math.sin(direction * (Math.PI / 180)))}px`,
                            transform: `rotate(${direction}deg)`
                        }}
                    />
                </div>
            </div>
        );
    }
}

Dial.propTypes = {
    direction: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    radius: PropTypes.number
};

Dial.defaultProps = {
    direction: 90, // degrees
    radius: 56 // px
};

export default Dial;
