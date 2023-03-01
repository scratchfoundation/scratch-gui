import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import VM from 'scratch-vm';

import Box from '../box/box.jsx';
import {STAGE_DISPLAY_SIZES} from '../../lib/layout-constants.js';
import StageHeader from '../../containers/stage-header.jsx';
import Stage from '../../containers/stage.jsx';
import Analyser from '../../containers/analyser.jsx';
import SerialMonitor from '../../containers/serial-monitor.jsx';
import Loader from '../loader/loader.jsx';

import styles from './stage-wrapper.css';

const StageWrapperComponent = function (props) {
    const {
        analyserVisible,
        isFullScreen,
        isRtl,
        isRendererSupported,
        loading,
        serialMonitorVisible,
        stageSize,
        vm
    } = props;

    return (
        <Box
            className={classNames(
                styles.stageWrapper,
                {[styles.fullScreen]: isFullScreen}
            )}
            dir={isRtl ? 'rtl' : 'ltr'}
        >
            <Box className={styles.stageMenuWrapper}>
                <StageHeader
                    stageSize={stageSize}
                    vm={vm}
                />
            </Box>
            <Box className={styles.stageCanvasWrapper}>
                {
                    isRendererSupported && !(analyserVisible || serialMonitorVisible) ?
                        <Stage
                            stageSize={stageSize}
                            vm={vm}
                        /> :
                        null
                }
                {
                    analyserVisible ?
                        <Analyser
                            stageSize={stageSize}
                            vm={vm}
                        /> :
                        null
                }
                {
                    serialMonitorVisible ?
                        <SerialMonitor
                            stageSize={stageSize}
                            vm={vm}
                        /> :
                        null
                }
            </Box>
            {loading ? (
                <Loader isFullScreen={isFullScreen} />
            ) : null}
        </Box>
    );
};

StageWrapperComponent.propTypes = {
    analyserVisible: PropTypes.bool,
    isFullScreen: PropTypes.bool,
    isRendererSupported: PropTypes.bool.isRequired,
    isRtl: PropTypes.bool.isRequired,
    loading: PropTypes.bool,
    serialMonitorVisible: PropTypes.bool,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default StageWrapperComponent;
