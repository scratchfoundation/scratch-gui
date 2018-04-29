const SET_MODE = 'scratch-gui/mode/SET_MODE';

const initialState = {
    mode: 'editor'
};

const MODES = {
    editor: 'editor',
    player: 'player'
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_MODE:
        return {
            mode: action.mode
        };
    default:
        return state;
    }
};

const setMode = function (mode) {
    return {
        type: SET_MODE,
        mode: mode
    };
};

export {
    reducer as default,
    initialState,
    setMode,
    MODES
};
