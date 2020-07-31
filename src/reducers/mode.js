const SET_FULL_SCREEN = 'scratch-gui/mode/SET_FULL_SCREEN';
const SET_PLAYER = 'scratch-gui/mode/SET_PLAYER';

const initialState = {
    showBranding: false,
    isFullScreen: false,
    isPlayerOnly: false,
    hasEverEnteredEditor: true
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_FULL_SCREEN:
        return Object.assign({}, state, {
            isFullScreen: action.isFullScreen
        });
    case SET_PLAYER:
        return Object.assign({}, state, {
            isPlayerOnly: action.isPlayerOnly,
            hasEverEnteredEditor: state.hasEverEnteredEditor || !action.isPlayerOnly
        });
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
    // tw: This is a dirty hack to put "editor" in the URL when in the editor, and hide it otherwise.
    if (location.pathname === '/' || location.pathname === '/editor') {
        if (isPlayerOnly) {
            history.replaceState('', '', `/${location.search}${location.hash}`);
        } else {
            history.replaceState('', '', `/editor${location.search}${location.hash}`);
        }
    }
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
