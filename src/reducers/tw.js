const SET_COMPATIBILITY_STATE = 'tw/SET_COMPATIBILITY_STATE';
const SET_COMPILER_STATE = 'tw/SET_COMPILER_STATE';
const SET_USERNAME = 'tw/SET_USERNAME';
const SET_CLOUD = 'tw/SET_CLOUD';
const SET_HIGH_QUALITY_PEN = 'tw/SET_HIGH_QUALITY_PEN';

const USERNAME_KEY = 'tw:username';

let initialUsername;
try {
    initialUsername = localStorage.getItem(USERNAME_KEY);
} catch (e) { /* ignore */ }
if (!initialUsername) {
    initialUsername = `player${Math.random().toString().substr(2, 6)}`;
    try {
        localStorage.setItem(USERNAME_KEY, initialUsername);
    } catch (e) { /* ignore */ }
}

export const initialState = {
    compatibility: true,
    compiler: true,
    cloud: true,
    username: initialUsername,
    highQualityPen: false
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
        if (action.persistent) {
            try {
                localStorage.setItem(USERNAME_KEY, action.username);
            } catch (e) { /* ignore */ }
        }
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

const setUsername = function (username, persistent) {
    return {
        type: SET_USERNAME,
        username: username,
        persistent: persistent
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

export {
    reducer as default,
    initialState as twInitialState,
    setCompatibilityState,
    setCompilerState,
    setUsername,
    setCloud,
    setHighQualityPen
};
