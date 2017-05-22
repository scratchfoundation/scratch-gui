const React = require('react');
const Box = require('../box/box.jsx');
const Monitor = require('../../containers/monitor.jsx');
const PropTypes = require('prop-types');
const {Map} = require('immutable');


const styles = require('./monitor-list.css');

const MonitorList = props => (
    <Box
        className={styles.monitorList}
    >
        {props.monitors.valueSeq().map(monitorData => (
            <Monitor
                color={monitorData.get('color')}
                key={monitorData.get('id')}
                label={monitorData.get('label')}
                value={monitorData.get('value')}
                x={monitorData.get('x')}
                y={monitorData.get('y')}
                onDragEnd={props.onMonitorChange}
            />
        ))}
    </Box>
);

MonitorList.propTypes = {
    monitors: PropTypes.instanceOf(Map),
    onMonitorChange: PropTypes.func.isRequired
};

module.exports = MonitorList;
