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
        {props.monitors.valueSeq().filter(m => m.visible)
            .map(monitorData => (
                <Monitor
                    height={monitorData.height}
                    id={monitorData.id}
                    key={monitorData.id}
                    max={monitorData.sliderMax}
                    min={monitorData.sliderMin}
                    mode={monitorData.mode}
                    opcode={monitorData.opcode}
                    params={monitorData.params}
                    spriteName={monitorData.spriteName}
                    targetId={monitorData.targetId}
                    value={monitorData.value}
                    width={monitorData.width}
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
