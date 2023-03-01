import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Box from '../box/box.jsx';
import DOMElementRenderer from '../../containers/dom-element-renderer.jsx';
import {STAGE_DISPLAY_SIZES} from '../../lib/layout-constants.js';
import {getStageDimensions} from '../../lib/screen-utils.js';

import styles from './serial-monitor.css';

const SerialMonitorComponent = props => {
    const {
        terminal,
        isFullScreen,
        stageSize,
        ...boxProps
    } = props;

    const stageDimensions = getStageDimensions(stageSize, isFullScreen);

    let height = window.innerHeight - 92 - 368;
    if (isFullScreen) {
        height = stageDimensions.height;
    }

    return (
        <React.Fragment>
            <Box className={styles.serialMonitorWrapper}>
                <Box
                    className={classNames(
                        styles.serialMonitor,
                        {[styles.fullScreen]: isFullScreen}
                    )}
                    style={{
                        height: height,
                        width: stageDimensions.width
                    }}
                >
                    <DOMElementRenderer
                        domElement={terminal}
                        style={{
                            height: height,
                            width: stageDimensions.width
                        }}
                        {...boxProps}
                    />
                </Box>
            </Box>
        </React.Fragment>
    );
};
SerialMonitorComponent.propTypes = {
    terminal: PropTypes.instanceOf(Element).isRequired,
    isFullScreen: PropTypes.bool.isRequired,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired
};
export default SerialMonitorComponent;
