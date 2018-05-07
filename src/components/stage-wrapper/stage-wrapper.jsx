import PropTypes from 'prop-types';
import React from 'react';
import MediaQuery from 'react-responsive';
import VM from 'scratch-vm';

import Box from '../box/box.jsx';
import layout from '../../lib/layout-constants.js';
import StageHeader from '../../containers/stage-header.jsx';
import Stage from '../../containers/stage.jsx';

import styles from './stage-wrapper.css';

const StageWrapperComponent = function (props) {
    const {
        isRendererSupported,
        vm
    } = props;

    return (
        <Box className={styles.stageWrapper}>
            <Box className={styles.stageMenuWrapper}>
                <StageHeader vm={vm} />
            </Box>
            <Box className={styles.stageCanvasWrapper}>
                {/* eslint-disable arrow-body-style */}
                <MediaQuery minWidth={layout.fullSizeMinWidth}>{isFullSize => {
                    return isRendererSupported ? (
                        <Stage
                            height={isFullSize ? layout.fullStageHeight : layout.smallerStageHeight}
                            shrink={0}
                            vm={vm}
                            width={isFullSize ? layout.fullStageWidth : layout.smallerStageWidth}
                        />
                    ) : null;
                }}</MediaQuery>
                {/* eslint-enable arrow-body-style */}
            </Box>
        </Box>
    );
};

StageWrapperComponent.propTypes = {
    isRendererSupported: PropTypes.bool.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default StageWrapperComponent;
