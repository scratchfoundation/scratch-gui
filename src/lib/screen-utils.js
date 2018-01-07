const STAGE_SIZE_DEFAULTS = {
    heightSmall: 360,
    widthSmall: 480,
    spacingBorderAdjustment: 9,
    menuHeightAdjustment: 40
};

const getStageSize = (
    isFullScreen = false,
    height = STAGE_SIZE_DEFAULTS.heightSmall,
    width = STAGE_SIZE_DEFAULTS.widthSmall) => {

    const stageSize = {
        heightDefault: height,
        widthDefault: width,
        height: height,
        width: width
    };

    if (isFullScreen) {
        stageSize.height = window.innerHeight -
                           STAGE_SIZE_DEFAULTS.menuHeightAdjustment -
                           STAGE_SIZE_DEFAULTS.spacingBorderAdjustment;

        stageSize.width = stageSize.height + (stageSize.height / 3);

        if (stageSize.width > window.innerWidth) {
            stageSize.width = window.innerWidth;
            stageSize.height = stageSize.width * .75;
        }
    }

    return stageSize;
};

export {
    getStageSize,
    STAGE_SIZE_DEFAULTS
};
