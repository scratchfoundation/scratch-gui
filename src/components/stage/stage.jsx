import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import MonitorList from '../../containers/monitor-list.jsx';
import styles from './stage.css';

const StageComponent = props => {
    const {
        canvasRef,
        height,
        isZoomed,
        width,
        ...boxProps
    } = props;
    let heightCorrectedAspect = window.innerHeight - 40;
    let widthCorrectedAspect = heightCorrectedAspect + (heightCorrectedAspect / 3);
    if (widthCorrectedAspect > window.innerWidth) {
        widthCorrectedAspect = window.innerWidth;
        heightCorrectedAspect = widthCorrectedAspect * .75;
    }
    return isZoomed === false ? (
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
    ) : (
        <Box className={styles.stageWrapperOverlay}>
            <Box
                className={classNames(styles.stage, styles.stageOverlayContent)}
                componentRef={canvasRef}
                element="canvas"
                height={heightCorrectedAspect}
                width={widthCorrectedAspect}
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
    isZoomed: PropTypes.bool.isRequired,
    width: PropTypes.number
};
StageComponent.defaultProps = {
    canvasRef: () => {},
    width: 480,
    height: 360
};
export default StageComponent;
