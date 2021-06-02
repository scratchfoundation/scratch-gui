const SET_FRAMERATE = 'tw/SET_FRAMERATE';
const SET_INTERPOLATION = 'tw/SET_INTERPOLATION';
const SET_COMPILER_OPTIONS = 'tw/SET_COMPILER_OPTIONS';
const SET_RUNTIME_OPTIONS = 'tw/SET_RUNTIME_OPTIONS';
const SET_USERNAME = 'tw/SET_USERNAME';
const SET_CLOUD = 'tw/SET_CLOUD';
const SET_HIGH_QUALITY_PEN = 'tw/SET_HIGH_QUALITY_PEN';
const SET_WINDOW_FULLSCREEN = 'tw/SET_WINDOW_FULLSCREEN';
const SET_DIMENSIONS = 'tw/SET_DIMENSIONS';
const SET_AUTHOR = 'tw/SET_AUTHOR';
const SET_DESCRIPTION = 'tw/SET_DESCRIPTION';
const ADD_COMPILE_ERROR = 'tw/ADD_COMPILE_ERROR';
const CLEAR_COMPILE_ERRORS = 'tw/CLEAR_COMPILE_ERRORS';
const SET_FILE_HANDLE = 'tw/SET_FILE_HANDLE';
const SET_USERNAME_INVALID = 'tw/SET_USERNAME_INVALID';
const SET_HAS_CLOUD_VARIABLES = 'tw/SET_HAS_CLOUD_VARIABLES';

export const initialState = {
    framerate: 30,
    interpolation: false,
    cloud: true,
    username: '',
    highQualityPen: false,
    compilerOptions: {
        enabled: true,
        warpTimer: false
    },
    runtimeOptions: {
        maxClones: 300,
        miscLimits: true,
        fencing: true
    },
    isWindowFullScreen: false,
    dimensions: [0, 0],
    author: {
        username: '',
        thumbnail: ''
    },
    description: {
        instructions: '',
        credits: ''
    },
    compileErrors: [],
    fileHandle: null,
    usernameInvalid: false,
    hasCloudVariables: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_FRAMERATE:
        return Object.assign({}, state, {
            framerate: action.framerate
        });
    case SET_INTERPOLATION:
        return Object.assign({}, state, {
            interpolation: action.interpolation
        });
    case SET_COMPILER_OPTIONS:
        return Object.assign({}, state, {
            compilerOptions: action.compilerOptions
        });
    case SET_RUNTIME_OPTIONS:
        return Object.assign({}, state, {
            runtimeOptions: action.runtimeOptions
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
    case SET_DIMENSIONS:
        return Object.assign({}, state, {
            dimensions: action.dimensions
        });
    case SET_AUTHOR:
        return Object.assign({}, state, {
            author: action.author
        });
    case SET_DESCRIPTION:
        return Object.assign({}, state, {
            description: action.description
        });
    case ADD_COMPILE_ERROR:
        return Object.assign({}, state, {
            compileErrors: [
                action.error,
                ...state.compileErrors.slice(0, 4)
            ]
        });
    case CLEAR_COMPILE_ERRORS:
        return Object.assign({}, state, {
            compileErrors: []
        });
    case SET_FILE_HANDLE:
        return Object.assign({}, state, {
            fileHandle: action.fileHandle
        });
    case SET_USERNAME_INVALID:
        return Object.assign({}, state, {
            usernameInvalid: action.usernameInvalid
        });
    case SET_HAS_CLOUD_VARIABLES:
        return Object.assign({}, state, {
            hasCloudVariables: action.hasCloudVariables
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

const setInterpolationState = function (interpolation) {
    return {
        type: SET_INTERPOLATION,
        interpolation: interpolation
    };
};

const setCompilerOptionsState = function (compilerOptions) {
    return {
        type: SET_COMPILER_OPTIONS,
        compilerOptions: compilerOptions
    };
};

const setRuntimeOptionsState = function (runtimeOptions) {
    return {
        type: SET_RUNTIME_OPTIONS,
        runtimeOptions: runtimeOptions
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

const setDimensions = function (dimensions) {
    return {
        type: SET_DIMENSIONS,
        dimensions: dimensions
    };
};

const setAuthor = function (author) {
    return {
        type: SET_AUTHOR,
        author: author
    };
};

const setDescription = function (description) {
    return {
        type: SET_DESCRIPTION,
        description: description
    };
};

const addCompileError = function (error) {
    return {
        type: ADD_COMPILE_ERROR,
        error: error
    };
};

const clearCompileErrors = function () {
    return {
        type: CLEAR_COMPILE_ERRORS
    };
};

const setFileHandle = function (fileHandle) {
    return {
        type: SET_FILE_HANDLE,
        fileHandle: fileHandle
    };
};

const setUsernameInvalid = function (usernameInvalid) {
    return {
        type: SET_USERNAME_INVALID,
        usernameInvalid: usernameInvalid
    };
};

const setHasCloudVariables = function (hasCloudVariables) {
    return {
        type: SET_HAS_CLOUD_VARIABLES,
        hasCloudVariables: hasCloudVariables
    };
};

export {
    reducer as default,
    initialState as twInitialState,
    setFramerateState,
    setInterpolationState,
    setCompilerOptionsState,
    setRuntimeOptionsState,
    setUsername,
    setCloud,
    setHighQualityPenState,
    setIsWindowFullScreen,
    setDimensions,
    setAuthor,
    setDescription,
    addCompileError,
    clearCompileErrors,
    setFileHandle,
    setUsernameInvalid,
    setHasCloudVariables
};
