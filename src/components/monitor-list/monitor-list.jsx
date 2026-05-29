import React from 'react';
import classNames from 'classnames';
import Box from '../box/box.jsx';
import Monitor from '../../containers/monitor.jsx';
import PropTypes from 'prop-types';
import {OrderedMap} from 'immutable';
import {stageSizeToTransform} from '../../lib/screen-utils';

import styles from './monitor-list.css';

// Use static `monitor-overlay` class for bounds of draggables
// This is just a dummy div which doesn't scale to make the
// bounds tracking play nicer with react-draggable
const MonitorOverlay = () => (
    <div
        className="monitor-overlay"
        style={{
            width: 480,
            height: 360,
            position: 'absolute',
            top: 0,
            left: 0,
            visibility: 'hidden'
        }}
    />
);

const MonitorList = props => (
    <Box
        className={styles.monitorList}
        style={{
            width: props.stageSize.width,
            height: props.stageSize.height
        }}
    >
        <MonitorOverlay />
        <Box
            className={styles.monitorListScaler}
            style={stageSizeToTransform(props.stageSize)}
        >
            {props.monitors.valueSeq().filter(m => m.visible)
                .map(monitorData => (
                    <Monitor
                        draggable={props.draggable}
                        height={monitorData.height}
                        id={monitorData.id}
                        isDiscrete={monitorData.isDiscrete}
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
                        scale={props.stageSize.scale}
                    />
                ))}
        </Box>
    </Box>
);

MonitorList.propTypes = {
    draggable: PropTypes.bool.isRequired,
    monitors: PropTypes.instanceOf(OrderedMap),
    onMonitorChange: PropTypes.func.isRequired,
    stageSize: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
        widthDefault: PropTypes.number,
        heightDefault: PropTypes.number,
        scale: PropTypes.number
    }).isRequired
};

export default MonitorList;
