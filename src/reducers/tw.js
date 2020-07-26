const SET_COMPATIBILITY_STATE = 'tw/SET_COMPATIBILITY_STATE';
const SET_COMPILER_STATE = 'tw/SET_COMPILER_STATE';
const SET_USERNAME = 'tw/SET_USERNAME';

const initialState = {
    compatibility: true,
    compiler: true,
    username: ''
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
        return Object.assign({}, state, {
            username: action.username
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

export {
    reducer as default,
    initialState as twInitialState,
    setCompatibilityState,
    setCompilerState,
    setUsername
};
