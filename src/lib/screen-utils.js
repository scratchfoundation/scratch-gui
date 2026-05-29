import layout, {STAGE_DISPLAY_SCALES, STAGE_SIZE_MODES, STAGE_DISPLAY_SIZES} from '../lib/layout-constants';
import {useEffect, useState} from 'react';

/**
 * @typedef {object} StageDimensions
 * @property {int} height - the height to be used for the stage in the current situation.
 * @property {int} width - the width to be used for the stage in the current situation.
 * @property {number} scale - the scale factor from the stage's default size to its current size.
 * @property {int} heightDefault - the height of the stage in its default (large) size.
 * @property {int} widthDefault - the width of the stage in its default (large) size.
 */

const STAGE_DIMENSION_DEFAULTS = {
    // referencing css/units.css,
    // spacingBorderAdjustment = 2 * $full-screen-top-bottom-margin +
    //   2 * $full-screen-border-width
    fullScreenSpacingBorderAdjustment: 12,
    // referencing css/units.css,
    // menuHeightAdjustment = $stage-menu-height
    menuHeightAdjustment: 44
};

/**
 * Resolve the current GUI and browser state to an actual stage size enum value.
 * @param {STAGE_SIZE_MODES} stageSizeMode - the state of the stage size toggle button.
 * @param {boolean} isFullSize - true if the window is large enough for the large stage at its full size.
 * @return {STAGE_DISPLAY_SIZES} - the stage size enum value we should use in this situation.
 */
const resolveStageSize = (stageSizeMode, isFullSize) => {
    if (stageSizeMode === STAGE_SIZE_MODES.small) {
        return STAGE_DISPLAY_SIZES.small;
    }
    if (isFullSize) {
        return STAGE_DISPLAY_SIZES.large;
    }
    return STAGE_DISPLAY_SIZES.largeConstrained;
};

/**
 * Take a pair of sizes for the stage (a target height and width and a default height and width),
 * calculate the ratio between them, and return a CSS transform to scale to that ratio.
 * @param {object} sizeInfo An object containing dimensions of the target and default stage sizes.
 * @param {number} sizeInfo.width The target width
 * @param {number} sizeInfo.height The target height
 * @param {number} sizeInfo.widthDefault The default width
 * @param {number} sizeInfo.heightDefault The default height
 * @returns {object} the CSS transform
 */
const stageSizeToTransform = ({width, height, widthDefault, heightDefault}) => {
    const scaleX = width / widthDefault;
    const scaleY = height / heightDefault;
    if (scaleX === 1 && scaleY === 1) {
        // Do not set a transform if the scale is 1 because
        // it messes up `position: fixed` elements like the context menu.
        return;
    }
    return {transform: `scale(${scaleX},${scaleY})`};
};

/**
 * React hook that monitors a canvas element's dimensions and returns stage sizing information.
 * @param {HTMLCanvasElement} canvas - The canvas element to monitor
 * @returns {object} Stage dimension information
 * @property {number} heightDefault - The default stage height (standardStageHeight)
 * @property {number} widthDefault - The default stage width (standardStageWidth) 
 * @property {number} height - The current height of the canvas in pixels
 * @property {number} width - The current width of the canvas in pixels
 * @property {number} scale - Scale factor between current width and default width
 */
const useCanvasSize = canvas => {
    const [stageDimensions, setStageDimensions] = useState({
        heightDefault: layout.standardStageHeight,
        widthDefault: layout.standardStageWidth,
        height: canvas?.clientHeight || layout.standardStageHeight,
        width: canvas?.clientWidth || layout.standardStageWidth,
        scale: (canvas?.clientWidth || layout.standardStageWidth) / layout.standardStageWidth
    });

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                setStageDimensions({
                    heightDefault: layout.standardStageHeight,
                    widthDefault: layout.standardStageWidth,
                    height: entry.contentRect.height,
                    width: entry.contentRect.width,
                    scale: entry.contentRect.width / layout.standardStageWidth
                });
            }
        });

        if (canvas) {
            resizeObserver.observe(canvas);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [canvas]);

    return stageDimensions;
};

export {resolveStageSize, stageSizeToTransform, useCanvasSize};
