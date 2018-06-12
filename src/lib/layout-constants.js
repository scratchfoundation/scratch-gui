/**
 * Names for each state of the stage size toggle
 * @enum {string}
 */
const STAGE_SIZE_MODES = {
    /**
     * The "large stage" button is pressed; the user would like a large stage.
     */
    large: 'large',

    /**
     * The "small stage" button is pressed; the user would like a small stage.
     */
    small: 'small'
};

/**
 * Names for each stage render size
 * @enum {string}
 */
const STAGE_DISPLAY_SIZES = {
    /**
     * Large stage with wide browser
     */
    large: 'large',

    /**
     * Large stage with narrow browser
     */
    largeConstrained: 'largeConstrained',

    /**
     * Small stage (ignores browser width)
     */
    small: 'small'
};

const STAGE_DISPLAY_SCALES = {};
STAGE_DISPLAY_SCALES[STAGE_DISPLAY_SIZES.large] = 1; // large mode, wide browser (standard)
STAGE_DISPLAY_SCALES[STAGE_DISPLAY_SIZES.largeConstrained] = 0.85; // large mode but narrow browser
STAGE_DISPLAY_SCALES[STAGE_DISPLAY_SIZES.small] = 0.5; // small mode, regardless of browser size

export default {
    standardStageWidth: 480,
    standardStageHeight: 360,
    fullSizeMinWidth: 1096,
    fullSizePaintMinWidth: 1250
};

export {
    STAGE_DISPLAY_SCALES,
    STAGE_DISPLAY_SIZES,
    STAGE_SIZE_MODES
};
