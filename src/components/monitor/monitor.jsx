import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import Box from '../box/box.jsx';
import styles from './monitor.css';

const categories = {
    data: '#FF8C1A',
    sensing: '#5CB1D6',
    sound: '#CF63CF',
    looks: '#9966FF',
    motion: '#4C97FF'
};

const MonitorComponent = props => (
    <Draggable
        bounds="parent"
        defaultClassNameDragging={styles.dragging}
        defaultPosition={{
            x: props.x,
            y: props.y
        }}
        onStop={props.onDragEnd}
    >
        <Box className={styles.monitor}>
            <Box className={styles.label}>
                {props.label}
            </Box>
            <Box
                className={styles.value}
                style={{background: categories[props.category]}}
            >
                {props.value}
            </Box>
        </Box>
    </Draggable>
);

MonitorComponent.categories = categories;

MonitorComponent.propTypes = {
    category: PropTypes.oneOf(Object.keys(categories)),
    label: PropTypes.string.isRequired,
    onDragEnd: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    x: PropTypes.number,
    y: PropTypes.number
};

MonitorComponent.defaultProps = {
    category: 'data',
    x: 0,
    y: 0
};

export default MonitorComponent;
