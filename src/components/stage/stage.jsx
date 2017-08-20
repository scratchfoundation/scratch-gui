import PropTypes from 'prop-types';
import React from 'react';

import VM from 'scratch-vm';
import Box from '../box/box.jsx';
import Controls from '../../containers/controls.jsx';
import MonitorList from '../../containers/monitor-list.jsx';
import styles from './stage.css';

import CloseButton from '../close-button/close-button.jsx';
import addIcon from '../sprite-info/icon--show.svg';


const StageComponent = props => {
    const {
        onZoomOpen,
        onZoomClose,
        isZoomed,
        vm,
        canvasRef,
        width,
        height,
        ...boxProps
    } = props;
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
            <button
                title="Zoom Stage"
                onClick={onZoomOpen} >

                <img
                    className={styles.addButton}
                    src={addIcon}
                />
            </button>
        </Box>
    ) : (
        <Box className={styles.stageWrapperOverlay}>
            <Box
                className={styles.stage}
                componentRef={canvasRef}
                element="canvas"
                height={"100%"}
                width={"100%"}
                {...boxProps}
            />
            <Box className={styles.monitorWrapper}>
                <MonitorList />
            </Box>
            <Box className={styles.stageWrapperOverlayControls}>
                <Controls vm={vm} />
            </Box>
            <Box className={styles.stageWrapperOverlayClose}>
                <CloseButton
                    size={CloseButton.SIZE_LARGE}
                    onClick={onZoomClose}
                />
            </Box>
       </Box>
    );
};

StageComponent.propTypes = {
    onZoomOpen: PropTypes.func.isRequired,
    onZoomClose: PropTypes.func.isRequired,
    isZoomed: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired,
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
