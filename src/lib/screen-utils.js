import PropTypes from 'prop-types';

import layout, {STAGE_SIZES, STAGE_SCALES} from '../lib/layout-constants';

/**
 * @typedef {object} StageDimensions
 * @property {int} height - the height to be used for the stage in the current situation.
 * @property {int} width - the width to be used for the stage in the current situation.
 * @property {number} scale - the scale factor from the stage's default size to its current size.
 * @property {int} heightDefault - the height of the stage in its default (large) size.
 * @property {int} widthDefault - the width of the stage in its default (large) size.
 */

/**
 * PropTypes.shape(...) argument for `getStageDimensions` return value structure.
 * @type {object.<PropTypes>}
 */
const StageDimensionsShape = {
    height: PropTypes.number.isRequired,
    heightDefault: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    widthDefault: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired
};

const STAGE_DIMENSION_DEFAULTS = {
    spacingBorderAdjustment: 9,
    menuHeightAdjustment: 40
};

/**
 * Resolve the current GUI and browser state to an actual stage size enum value.
 * All parameters are optional; if none are provided the result will be `STAGE_SIZES.large`.
 * @param {STAGE_SIZES} stageSizeMode - the state of the stage size toggle button.
 * @param {boolean} mediaQuerySmallSize - true if the window is too small for the large stage at its full size.
 * @return {STAGE_SIZES} - the stage size enum value we should use in this situation.
 */
const resolveStageSize = (stageSizeMode = null, mediaQuerySmallSize = false) => {
    stageSizeMode = stageSizeMode || STAGE_SIZES.large;
    if (stageSizeMode === STAGE_SIZES.large && mediaQuerySmallSize) {
        return STAGE_SIZES.largeConstrained;
    }
    return stageSizeMode;
};

/**
 * Retrieve info used to determine the actual stage size based on the current GUI and browser state.
 * @param {STAGE_SIZES} stageSize - the current fully-resolved stage size.
 * @param {boolean} isFullScreen - true if full-screen mode is enabled.
 * @return {StageDimensions} - an object describing the dimensions of the stage.
 */
const getStageDimensions = (stageSize, isFullScreen) => {
    const stageDimensions = {
        heightDefault: layout.standardStageHeight,
        widthDefault: layout.standardStageWidth,
        height: 0,
        width: 0,
        scale: 0
    };

    if (isFullScreen) {
        stageDimensions.height = window.innerHeight -
            STAGE_DIMENSION_DEFAULTS.menuHeightAdjustment -
            STAGE_DIMENSION_DEFAULTS.spacingBorderAdjustment;

        stageDimensions.width = stageDimensions.height + (stageDimensions.height / 3);

        if (stageDimensions.width > window.innerWidth) {
            stageDimensions.width = window.innerWidth;
            stageDimensions.height = stageDimensions.width * .75;
        }

        stageDimensions.scale = stageDimensions.width / stageDimensions.widthDefault;
    } else {
        stageDimensions.scale = STAGE_SCALES[stageSize];
        stageDimensions.height = stageDimensions.scale * stageDimensions.heightDefault;
        stageDimensions.width = stageDimensions.scale * stageDimensions.widthDefault;
    }

    return stageDimensions;
};

export {
    getStageDimensions,
    resolveStageSize,
    StageDimensionsShape
};
