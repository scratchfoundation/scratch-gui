const SET_RUNNING_STATE = "scratch-gui/vm-status/SET_RUNNING_STATE";
const SET_TURBO_STATE = "scratch-gui/vm-status/SET_TURBO_STATE";
const SET_STARTED_STATE = "scratch-gui/vm-status/SET_STARTED_STATE";
const SET_FLAG_CLICKED_STATE = "scratch-gui/vm-status/SET_FLAG_CLICKED_STATE";
const SET_GREENFLAG_CLICKED_STATE =
    "scratch-gui/vm-status/SET_GREENFLAG_CLICKED_STATE";
const SET_IS_SAVING_STATE = "scratch-gui/vm-status/SET_IS_SAVING_STATE";
const SET_IS_SAVING_STATE_STATUS =
    "scratch-gui/vm-status/SET_IS_SAVING_STATE_STATUS";
const SET_IS_FIRST_STATE = "scratch-gui/vm-status/SET_IS_FIRST_STATE";
const SET_IS_SCRATCH_DATA = "scratch-gui/vm-status/SET_IS_SCRATCH_DATA";
const SET_IS_LOADING_STATE = "scratch-gui/vm-status/SET_IS_LOADING_STATE";
const SET_SPRITE_CLICKED_STATE =
    "scratch-gui/vm-status/SET_SPRITE_CLICKED_STATE";
const SET_COSTUME_URL_STATE = "scratch-gui/vm-status/SET_COSTUME_URL_STATE";
const SET_AUTO_SAVE_STATE = "scratch-gui/vm-status/SET_AUTO_SAVE_STATE";
const SET_PROJECT_NAME = "scratch-gui/vm-status/SET_PROJECT_NAME";
const SET_IS_PENDING_STATE = "scratch-gui/vm-status/SET_IS_PENDING_STATE";
const ADD_NOTIFICATION = "scratch-gui/vm-status/ADD_NOTIFICATION";
const REMOVE_NOTIFICATION = "scratch-gui/vm-status/REMOVE_NOTIFICATION";
const POSITION_MODAL = "scratch-gui/vm-status/POSITION_MODAL";
const SET_ISEDITABLE_PROJECT = "scratch-gui/vm-status/SET_ISEDITABLE_PROJECT";
const SET_IS_CLONED = "scratch-gui/vm-status/SET_IS_CLONED";
const SET_CURRENT_LAYOUT = "scratch-gui/vm-status/SET_CURRENT_LAYOUT";
const PUSH_PROJECT_HISTORY = "scratch-gui/vm-status/PUSH_PROJECT_HISTORY";
const UNDO_HISTORY = "scratch-gui/vm-status/UNDO_HISTORY";
const REDO_HISTORY = "scratch-gui/vm-status/REDO_HISTORY";
const SET_MY_PROJECTS_GET_PENDING =
    "scratch-gui/vm-status/SET_MY_PROJECTS_GET_PENDING";

const initialState = {
    running: false,
    started: false,
    turbo: false,
    flagClicked: false,
    spriteClicked: false,
    greenFlagClicked: false,
    autoSave: false,
    costumeURLFax: "",
    isSaving: false,
    isSavingStatus: "",
    isFirst: true,
    isScratchData: "",
    isLoading: false,
    projectName: "",
    isPendingState: false,
    notifications: [],
    positionModal: false,
    isEditableProject: null,
    isCloned: null,
    currentLayout: "studentChallenge",
    projectHistory: [],
    currentHistoryIndex: 0,
    isMyProjectsGetPending: false,
};

const reducer = function (state, action) {
    if (typeof state === "undefined") state = initialState;
    switch (action.type) {
        case SET_STARTED_STATE:
            return Object.assign({}, state, {
                started: action.started,
            });
        case SET_RUNNING_STATE:
            return Object.assign({}, state, {
                running: action.running,
            });
        case SET_TURBO_STATE:
            return Object.assign({}, state, {
                turbo: action.turbo,
            });
        case SET_FLAG_CLICKED_STATE:
            return Object.assign({}, state, {
                flagClicked: action.flagClicked,
            });
        case SET_IS_SAVING_STATE:
            return Object.assign({}, state, {
                isSaving: action.isSaving,
            });
        case SET_IS_SAVING_STATE_STATUS:
            return Object.assign({}, state, {
                isSavingStatus: action.isSavingStatus,
            });
        case SET_IS_FIRST_STATE:
            return Object.assign({}, state, {
                isFirst: action.isFirst,
            });
        case SET_IS_SCRATCH_DATA:
            return Object.assign({}, state, {
                isScratchData: action.isScratchData,
            });
        case SET_IS_LOADING_STATE:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
            });
        case SET_SPRITE_CLICKED_STATE:
            return Object.assign({}, state, {
                spriteClicked: action.spriteClicked,
            });
        case SET_AUTO_SAVE_STATE:
            return Object.assign({}, state, {
                autoSave: action.autoSave,
            });
        case SET_COSTUME_URL_STATE:
            return Object.assign({}, state, {
                costumeURLFax: action.costumeURLFax,
            });
        case SET_PROJECT_NAME:
            return Object.assign({}, state, {
                projectName: action.projectName,
            });
        case SET_IS_PENDING_STATE:
            return Object.assign({}, state, {
                isPendingState: action.isPendingState,
            });
        case SET_GREENFLAG_CLICKED_STATE:
            return {
                ...state,
                greenFlagClicked: !state.greenFlagClicked,
            };
        case ADD_NOTIFICATION:
            return {
                ...state,
                notifications: [...state.notifications, action.notification],
            };
        case POSITION_MODAL:
            return {
                ...state,
                positionModal: action.positionModal,
            };
        case REMOVE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter(
                    (n) => n.id !== action.id
                ),
            };
        case SET_ISEDITABLE_PROJECT:
            return {
                ...state,
                isEditableProject: action.isEditableProject,
            };
        case SET_IS_CLONED:
            return {
                ...state,
                isCloned: action.isCloned,
            };
        case SET_CURRENT_LAYOUT:
            return {
                ...state,
                currentLayout: action.currentLayout,
            };
        case PUSH_PROJECT_HISTORY:
            return {
                ...state,
                projectHistory: [
                    action.historyEntry,
                    ...state.projectHistory,
                ].slice(0, 10),
                currentHistoryIndex: 0,
            };
        case UNDO_HISTORY:
            return {
                ...state,
                currentHistoryIndex: Math.min(
                    state.currentHistoryIndex + 1,
                    state.projectHistory.length - 1
                ),
            };
        case REDO_HISTORY:
            return {
                ...state,
                currentHistoryIndex: Math.max(state.currentHistoryIndex - 1, 0),
            };
        case SET_MY_PROJECTS_GET_PENDING:
            return {
                ...state,
                isMyProjectsGetPending: action.isMyProjectsGetPending,
            };
        default:
            return state;
    }
};

const setPositionModal = function (positionModal) {
    return {
        type: POSITION_MODAL,
        positionModal: positionModal,
    };
};

const setStartedState = function (started) {
    return {
        type: SET_STARTED_STATE,
        started: started,
    };
};

const setRunningState = function (running) {
    return {
        type: SET_RUNNING_STATE,
        running: running,
    };
};

const setTurboState = function (turbo) {
    return {
        type: SET_TURBO_STATE,
        turbo: turbo,
    };
};

const setFlagClickedState = function (flagClicked) {
    return {
        type: SET_FLAG_CLICKED_STATE,
        flagClicked: flagClicked,
    };
};

const setIsSavingState = function (isSaving) {
    return {
        type: SET_IS_SAVING_STATE,
        isSaving: isSaving,
    };
};

const setIsSavingStateStatus = function (isSavingStatus) {
    return {
        type: SET_IS_SAVING_STATE_STATUS,
        isSavingStatus: isSavingStatus,
    };
};

const setIsFirstState = function (isFirst) {
    return {
        type: SET_IS_FIRST_STATE,
        isFirst: isFirst,
    };
};

const setIsScratchData = function (isScratchData) {
    return {
        type: SET_IS_SCRATCH_DATA,
        isScratchData: isScratchData,
    };
};

const setIsLoadingState = function (isLoading) {
    return {
        type: SET_IS_LOADING_STATE,
        isLoading: isLoading,
    };
};

const setIsEditable = function (isEditableProject) {
    return {
        type: SET_ISEDITABLE_PROJECT,
        isEditableProject: isEditableProject,
    };
};

const setIsCloned = function (isCloned) {
    return {
        type: SET_IS_CLONED,
        isCloned: isCloned,
    };
};

const setSpriteClickedState = function (spriteClicked) {
    return {
        type: SET_SPRITE_CLICKED_STATE,
        spriteClicked: spriteClicked,
    };
};

const setAutoSaveState = function (autoSave) {
    return {
        type: SET_AUTO_SAVE_STATE,
        autoSave: autoSave,
    };
};

const setCostumeClickedState = function (costumeURLFax) {
    return {
        type: SET_COSTUME_URL_STATE,
        costumeURLFax: costumeURLFax,
    };
};

const setProjectName = function (projectName) {
    return {
        type: SET_PROJECT_NAME,
        projectName: projectName,
    };
};

const setIsPendingState = function (isPendingState) {
    return {
        type: SET_IS_PENDING_STATE,
        isPendingState: isPendingState,
    };
};

const addNotification = function (notification) {
    return {
        type: ADD_NOTIFICATION,
        notification: {
            ...notification,
            id: notification.id || Date.now(), // Ensure unique ID
        },
    };
};

const removeNotification = function (id) {
    return {
        type: REMOVE_NOTIFICATION,
        id,
    };
};

const greenFlagClicked = function () {
    return {
        type: SET_GREENFLAG_CLICKED_STATE,
    };
};

const setCurrentLayout = function (currentLayout) {
    return {
        type: SET_CURRENT_LAYOUT,
        currentLayout: currentLayout,
    };
};

const pushProjectHistory = function (historyEntry) {
    return {
        type: PUSH_PROJECT_HISTORY,
        historyEntry: historyEntry,
    };
};

const undoHistory = function () {
    return {
        type: UNDO_HISTORY,
    };
};

const redoHistory = function () {
    return {
        type: REDO_HISTORY,
    };
};

const setMyProjectsGetPending = function (isMyProjectsGetPending) {
    return {
        type: SET_MY_PROJECTS_GET_PENDING,
        isMyProjectsGetPending: isMyProjectsGetPending,
    };
};

export {
    reducer as default,
    initialState as vmStatusInitialState,
    setRunningState,
    setStartedState,
    setTurboState,
    setFlagClickedState,
    setIsSavingState,
    setIsSavingStateStatus,
    setIsFirstState,
    setIsScratchData,
    setIsLoadingState,
    setSpriteClickedState,
    setCostumeClickedState,
    setAutoSaveState,
    setProjectName,
    setIsPendingState,
    addNotification,
    removeNotification,
    greenFlagClicked,
    setPositionModal,
    setIsEditable,
    setIsCloned,
    setCurrentLayout,
    pushProjectHistory,
    undoHistory,
    redoHistory,
    setMyProjectsGetPending,
};
