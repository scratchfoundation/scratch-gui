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
        {props.monitors.valueSeq().map(monitorData => (
            <Monitor
                category={monitorData.category}
                key={monitorData.id}
                label={monitorData.label}
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

module.exports = MonitorList;
