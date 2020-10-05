const SET_FRAMERATE = 'tw/SET_FRAMERATE';
const SET_COMPILER_OPTIONS = 'tw/SET_COMPILER_OPTIONS';
const SET_USERNAME = 'tw/SET_USERNAME';
const SET_CLOUD = 'tw/SET_CLOUD';
const SET_HIGH_QUALITY_PEN = 'tw/SET_HIGH_QUALITY_PEN';
const SET_WINDOW_FULLSCREEN = 'tw/SET_WINDOW_FULLSCREEN';
const SET_INNERWIDTH = 'tw/SET_INNERWIDTH';

export const initialState = {
    framerate: 30,
    cloud: true,
    username: '',
    highQualityPen: false,
    compilerOptions: {
        enabled: true,
        warpTimer: false
    },
    isWindowFullScreen: false,
    innerWidth: window.innerWidth
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_FRAMERATE:
        return Object.assign({}, state, {
            framerate: action.framerate
        });
    case SET_COMPILER_OPTIONS:
        return Object.assign({}, state, {
            compilerOptions: action.compilerOptions
        });
    case SET_USERNAME:
        return Object.assign({}, state, {
            username: action.username
        });
    case SET_CLOUD:
        return Object.assign({}, state, {
            cloud: action.cloud
        });
    case SET_HIGH_QUALITY_PEN:
        return Object.assign({}, state, {
            highQualityPen: action.highQualityPen
        });
    case SET_WINDOW_FULLSCREEN:
        return Object.assign({}, state, {
            isWindowFullScreen: action.isWindowFullScreen
        });
    case SET_INNERWIDTH:
        return Object.assign({}, state, {
            innerWidth: action.innerWidth
        });
    default:
        return state;
    }
};

const setFramerateState = function (framerate) {
    return {
        type: SET_FRAMERATE,
        framerate: framerate
    };
};

const setCompilerOptionsState = function (compilerOptions) {
    return {
        type: SET_COMPILER_OPTIONS,
        compilerOptions: compilerOptions
    };
};

const setUsername = function (username) {
    return {
        type: SET_USERNAME,
        username: username
    };
};

const setCloud = function (cloud) {
    return {
        type: SET_CLOUD,
        cloud: cloud
    };
};

const setHighQualityPenState = function (highQualityPen) {
    return {
        type: SET_HIGH_QUALITY_PEN,
        highQualityPen: highQualityPen
    };
};

const setIsWindowFullScreen = function (isWindowFullScreen) {
    return {
        type: SET_WINDOW_FULLSCREEN,
        isWindowFullScreen: isWindowFullScreen
    };
};

const setInnerWidth = function (innerWidth) {
    return {
        type: SET_INNERWIDTH,
        innerWidth: innerWidth
    };
};

export {
    reducer as default,
    initialState as twInitialState,
    setFramerateState,
    setCompilerOptionsState,
    setUsername,
    setCloud,
    setHighQualityPenState,
    setIsWindowFullScreen,
    setInnerWidth
};
