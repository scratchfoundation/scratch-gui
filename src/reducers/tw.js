const SET_COMPATIBILITY_STATE = 'tw/SET_COMPATIBILITY_STATE';
const SET_COMPILER_STATE = 'tw/SET_COMPILER_STATE';
const SET_USERNAME = 'tw/SET_USERNAME';
const SET_CLOUD = 'tw/SET_CLOUD';
const SET_HIGH_QUALITY_PEN = 'tw/SET_HIGH_QUALITY_PEN';
const SET_WINDOW_FULLSCREEN = 'tw/SET_WINDOW_FULLSCREEN';
const SET_INNERWIDTH = 'tw/SET_INNERWIDTH';

const USERNAME_KEY = 'tw:username';

const searchParams = new URLSearchParams(location.search);

const getInitialCompatibility = () => {
    if (searchParams.has('60fps')) {
        return false;
    }
    return true;
};

const getInitialUsername = () => {
    if (searchParams.has('username')) {
        return searchParams.get('username');
    }
    try {
        const result = localStorage.getItem(USERNAME_KEY);
        if ('' + result === 'null') throw new Error('Temporary username fix');
        if (result) {
            return result;
        }
    } catch (e) { /* ignore */ }
    const randomId = Math.random().toString().substr(2, 6);
    const username = `player${randomId}`;
    try {
        localStorage.setItem(USERNAME_KEY, username);
    } catch (e) { /* ignore */ }
    return username;
};

const getInitialHighQualityPen = () => {
    if (searchParams.has('hqpen')) {
        return true;
    }
    return false;
};

export const initialState = {
    compatibility: getInitialCompatibility(),
    compiler: true,
    cloud: true,
    username: getInitialUsername(),
    highQualityPen: getInitialHighQualityPen(),
    isWindowFullScreen: false,
    innerWidth: window.innerWidth
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_COMPATIBILITY_STATE:
        return Object.assign({}, state, {
            compatibility: action.compatibility
        });
    case SET_COMPILER_STATE:
        return Object.assign({}, state, {
            compiler: action.compiler
        });
    case SET_USERNAME:
        try {
            localStorage.setItem(USERNAME_KEY, action.username);
        } catch (e) { /* ignore */ }
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

const setCompatibilityState = function (compatibility) {
    return {
        type: SET_COMPATIBILITY_STATE,
        compatibility: compatibility
    };
};

const setCompilerState = function (compiler) {
    return {
        type: SET_COMPILER_STATE,
        compiler: compiler
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

const setHighQualityPen = function (highQualityPen) {
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
    setCompatibilityState,
    setCompilerState,
    setUsername,
    setCloud,
    setHighQualityPen,
    setIsWindowFullScreen,
    setInnerWidth
};
