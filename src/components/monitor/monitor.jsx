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
    motion: '#4C97FF',
    list: '#FC662C'
};

const MonitorComponent = props => (
    <Draggable
        bounds="parent"
        defaultClassNameDragging={styles.dragging}
        onStop={props.onDragEnd}
    >
        <Box
            className={styles.monitor}
            componentRef={props.componentRef}
        >
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
    componentRef: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    onDragEnd: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number])
};

MonitorComponent.defaultProps = {
    category: 'data'
};

export default MonitorComponent;
