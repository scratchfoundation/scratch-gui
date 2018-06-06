// stage size constants
/**
 * Names for each stage size mode
 * @enum {string}
 */
const STAGE_SIZES = {
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

const STAGE_SCALES = {};
STAGE_SCALES[STAGE_SIZES.large] = 1; // large mode, wide browser (standard)
STAGE_SCALES[STAGE_SIZES.largeConstrained] = 0.85; // large mode but narrow browser
STAGE_SCALES[STAGE_SIZES.small] = 0.5; // small mode, regardless of browser size

export default {
    standardStageWidth: 480,
    standardStageHeight: 360,
    fullSizeMinWidth: 1096,
    fullSizePaintMinWidth: 1250
};

export {
    STAGE_SCALES,
    STAGE_SIZES
};
