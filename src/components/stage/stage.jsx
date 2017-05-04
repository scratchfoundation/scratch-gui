const PropTypes = require('prop-types');
const React = require('react');

const Box = require('../box/box.jsx');
const MonitorList = require('../../containers/monitor-list.jsx');
const styles = require('./stage.css');

const StageComponent = props => {
    const {
        canvasRef,
        width,
        height,
        ...boxProps
    } = props;
    return (
        <Box className={styles.stageWrapper}>
            <Box
                className={styles.stage}
                componentRef={canvasRef}
                element="canvas"
                height={height}
                width={width}
                {...boxProps}
            />
            <Box className={styles.monitorWrapper}>
                <MonitorList />
            </Box>
        </Box>
    );
};
StageComponent.propTypes = {
    canvasRef: PropTypes.func,
    height: PropTypes.number,
    width: PropTypes.number
};
StageComponent.defaultProps = {
    canvasRef: () => {},
    width: 480,
    height: 360
};
module.exports = StageComponent;
