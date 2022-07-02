// import { STAGE_DISPLAY_SIZES } from '../lib/layout-constants.js';

const TOGGLE_STAGE = 'scratch-gui/stage/TOGGLE_STAGE';


const initialState = {
    stageVisible: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case TOGGLE_STAGE:
            return {
                stageVisible: !state.stageVisible
            }
        default:
            return state;
    }
};

const toggleStage = function () {
    return {
        type: TOGGLE_STAGE
    };
};



export {
    reducer as default,
    initialState as stageInitialState,
    toggleStage
};
