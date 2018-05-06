import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import Box from '../box/box.jsx';
import DefaultMonitor from './default-monitor.jsx';
import LargeMonitor from './large-monitor.jsx';

import styles from './monitor.css';

const categories = {
    data: '#FF8C1A',
    sensing: '#5CB1D6',
    sound: '#CF63CF',
    looks: '#9966FF',
    motion: '#4C97FF',
    list: '#FC662C'
};

const types = {
    default: DefaultMonitor,
    large: LargeMonitor
};

const MonitorComponent = props => (
    <Draggable
        bounds="parent"
        defaultClassNameDragging={styles.dragging}
        onStop={props.onDragEnd}
    >
        <Box
            className={styles.monitorContainer}
            componentRef={props.componentRef}
        >
            {types[props.type]({
                categoryColor: categories[props.category],
                label: props.label,
                value: props.value
            })}
        </Box>
    </Draggable>
);

MonitorComponent.categories = categories;

MonitorComponent.propTypes = {
    category: PropTypes.oneOf(Object.keys(categories)),
    componentRef: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    onDragEnd: PropTypes.func.isRequired,
    type: PropTypes.oneOf(Object.keys(types)),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number])
};

MonitorComponent.defaultProps = {
    category: 'data',
    type: 'default'
};

export default MonitorComponent;
