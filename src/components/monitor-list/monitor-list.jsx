import React from 'react';
import classNames from 'classnames';
import Box from '../box/box.jsx';
import Monitor from '../../containers/monitor.jsx';
import PropTypes from 'prop-types';
import {OrderedMap} from 'immutable';

import styles from './monitor-list.css';

const MonitorList = props => (
    <Box
        // Use static `monitor-overlay` class for bounds of draggables
        className={classNames(styles.monitorList, 'monitor-overlay')}
    >
        {props.monitors.valueSeq().map(monitorData => (
            <Monitor
                id={monitorData.id}
                key={monitorData.id}
                mode={monitorData.mode}
                opcode={monitorData.opcode}
                params={monitorData.params}
                spriteName={monitorData.spriteName}
                value={monitorData.value}
                x={monitorData.x}
                y={monitorData.y}
                onDragEnd={props.onMonitorChange}
            />
        ))}
    </Box>
);

MonitorList.propTypes = {
    monitors: PropTypes.instanceOf(OrderedMap),
    onMonitorChange: PropTypes.func.isRequired
};

export default MonitorList;
