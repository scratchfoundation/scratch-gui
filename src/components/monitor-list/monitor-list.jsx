const React = require('react');
const Box = require('../box/box.jsx');
const Monitor = require('../../containers/monitor.jsx');
const PropTypes = require('prop-types');

const styles = require('./monitor-list.css');

const MonitorList = props => (
    <Box
        className={styles.monitorList}
    >
        {props.monitors.map(monitorData => (
            <Monitor
                {...monitorData}
                key={monitorData.id}
                onDragEnd={props.onMonitorChange}
            />
        ))}
    </Box>
);

MonitorList.propTypes = {
    monitors: PropTypes.arrayOf(PropTypes.shape({
        color: PropTypes.string,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        x: PropTypes.number,
        y: PropTypes.number
    })),
    onMonitorChange: PropTypes.func.isRequired
};

module.exports = MonitorList;
