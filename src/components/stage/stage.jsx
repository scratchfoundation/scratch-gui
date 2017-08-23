import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import MonitorList from '../../containers/monitor-list.jsx';
import styles from './stage.css';

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
export default StageComponent;
