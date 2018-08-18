const SET_FULL_SCREEN = 'scratch-gui/mode/SET_FULL_SCREEN';
const SET_PLAYER = 'scratch-gui/mode/SET_PLAYER';

const initialState = {
    isFullScreen: false,
    isPlayerOnly: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_FULL_SCREEN:
        return {
            isFullScreen: action.isFullScreen,
            isPlayerOnly: state.isPlayerOnly
        };
    case SET_PLAYER:
        return {
            isFullScreen: state.isFullScreen,
            isPlayerOnly: action.isPlayerOnly
        };
    default:
        return state;
    }
};

const setFullScreen = function (isFullScreen) {
    return {
        type: SET_FULL_SCREEN,
        isFullScreen: isFullScreen
    };
};
const setPlayer = function (isPlayerOnly) {
    return {
        type: SET_PLAYER,
        isPlayerOnly: isPlayerOnly
    };
};

export {
    reducer as default,
    initialState as modeInitialState,
    setFullScreen,
    setPlayer
};
