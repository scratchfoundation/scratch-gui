const SET_COMPATIBILITY_STATE = 'tw/SET_COMPATIBILITY_STATE';
const SET_COMPILER_STATE = 'tw/SET_COMPILER_STATE';

const initialState = {
    compatibility: true,
    compiler: true,
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

export {
    reducer as default,
    initialState as twInitialState,
    setCompatibilityState,
    setCompilerState,
};
