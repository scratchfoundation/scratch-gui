const React = require('react');
const Box = require('../box/box.jsx');
const Monitor = require('../../containers/monitor.jsx');
const PropTypes = require('prop-types');
const {OrderedMap} = require('immutable');


const styles = require('./monitor-list.css');

const MonitorList = props => (
    <Box
        className={styles.monitorList}
    >
        {props.monitors.valueSeq().map((monitorData, index) => (
            <Monitor
                id={monitorData.id}
                index={index}
                key={monitorData.id}
                opcode={monitorData.opcode}
                params={monitorData.params}
                value={monitorData.value}
                onDragEnd={props.onMonitorChange}
            />
        ))}
    </Box>
);

MonitorList.propTypes = {
    monitors: PropTypes.instanceOf(OrderedMap),
    onMonitorChange: PropTypes.func.isRequired
};

module.exports = MonitorList;
