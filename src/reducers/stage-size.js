import { STAGE_DISPLAY_SIZES } from '../lib/layout-constants.js';

const SET_STAGE_SIZE = 'scratch-gui/StageSize/SET_STAGE_SIZE';
const TOGGLE_STAGE = 'scratch-gui/StageSize/TOGGLE_STAGE';

const initialState = {
    stageSize: STAGE_DISPLAY_SIZES.large,
    stageVisible: true
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case SET_STAGE_SIZE:
            return {
                ...state,
                stageSize: action.stageSize
            };
        case TOGGLE_STAGE:
            if (state.stageSize === STAGE_DISPLAY_SIZES.large) {
                return {
                    stageVisible: false,
                    stageSize: STAGE_DISPLAY_SIZES.small
                };
            } else {
                return {
                    stageVisible: true,
                    stageSize: STAGE_DISPLAY_SIZES.large
                };
            }
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

const toggleStage = function () {
    return {
        type: TOGGLE_STAGE
    };
};



export {
    reducer as default,
    initialState as stageSizeInitialState,
    setStageSize,
    toggleStage
};
