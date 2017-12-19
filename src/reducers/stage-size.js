const SET_STAGE_SIZE = 'scratch-gui/StageSize/SET_STAGE_SIZE';
const SET_FULL_SCREEN = 'scratch-gui/StageSize/SET_FULL_SCREEN';

const initialState = {
    isFullScreen: false,
    stageSize: 'large'
};

const STAGE_SIZES = {
    small: 'small',
    large: 'large'
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_STAGE_SIZE:
        return {
            isFullScreen: state.isFullScreen,
            stageSize: action.stageSize
        };
    case SET_FULL_SCREEN:
        return {
            isFullScreen: action.isFullScreen,
            stageSize: state.stageSize
        };
    default:
        return state;
    }
};

const setStageSize = function (stageSize) {
    return {
        type: SET_STAGE_SIZE,
        stageSize: stageSize
    };
};

const setFullScreen = function (isFullScreen) {
    return {
        type: SET_FULL_SCREEN,
        isFullScreen: isFullScreen
    };
};

export {
    reducer as default,
    setStageSize,
    setFullScreen,
    STAGE_SIZES
};
