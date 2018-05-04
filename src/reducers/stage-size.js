const SET_STAGE_SIZE = 'scratch-gui/StageSize/SET_STAGE_SIZE';

const initialState = {
    stageSize: 'large'
};

// stage size constants
const STAGE_SIZES = {
    small: 'small',
    large: 'large'
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_STAGE_SIZE:
        return {
            stageSize: action.stageSize
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

export {
    reducer as default,
    setStageSize,
    STAGE_SIZES
};
