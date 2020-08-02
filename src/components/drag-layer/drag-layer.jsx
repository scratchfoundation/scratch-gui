import React from 'react';
import PropTypes from 'prop-types';
import styles from './drag-layer.css';

/* eslint no-confusing-arrow: ["error", {"allowParens": true}] */
const DragLayer = ({dragging, img, currentOffset}) => (dragging ? (
    <div className={styles.dragLayer}>
        <div
            className={styles.imageWrapper}
            style={{
                transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`
            }}
        >
            <img
                className={styles.image}
                src={img}
            />
        </div>
    </div>
) : null);

DragLayer.propTypes = {
    currentOffset: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }),
    dragging: PropTypes.bool.isRequired,
    img: PropTypes.string
};

export default DragLayer;
