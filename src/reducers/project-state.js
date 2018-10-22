import keyMirror from 'keymirror';

const START_CREATING_NEW = 'scratch-gui/project-state/START_CREATING_NEW';
const DONE_CREATING_NEW = 'scratch-gui/project-state/DONE_CREATING_NEW';
const DONE_FETCHING_WITH_ID = 'scratch-gui/project-state/DONE_FETCHING_WITH_ID';
const DONE_FETCHING_DEFAULT = 'scratch-gui/project-state/DONE_FETCHING_DEFAULT';
const DONE_LOADING_VM_WITH_ID = 'scratch-gui/project-state/DONE_LOADING_VM_WITH_ID';
const DONE_LOADING_VM_WITHOUT_ID = 'scratch-gui/project-state/DONE_LOADING_VM_WITHOUT_ID';
const DONE_LOADING_VM_TO_SAVE = 'scratch-gui/project-state/DONE_LOADING_VM_TO_SAVE';
const DONE_SAVING_WITH_ID = 'scratch-gui/project-state/DONE_SAVING_WITH_ID';
const DONE_SAVING_WITH_ID_BEFORE_NEW = 'scratch-gui/project-state/DONE_SAVING_WITH_ID_BEFORE_NEW';
const GO_TO_ERROR_STATE = 'scratch-gui/project-state/GO_TO_ERROR_STATE';
const SET_PROJECT_ID = 'scratch-gui/project-state/SET_PROJECT_ID';
const START_FETCHING_NEW = 'scratch-gui/project-state/START_FETCHING_NEW';
const START_LOADING_VM_FILE_UPLOAD = 'scratch-gui/project-state/START_LOADING_FILE_UPLOAD';
const START_SAVING = 'scratch-gui/project-state/START_SAVING';
const START_SAVING_BEFORE_CREATING_NEW = 'scratch-gui/project-state/START_SAVING_BEFORE_CREATING_NEW';

const defaultProjectId = '0'; // hardcoded id of default project

const LoadingState = keyMirror({
    NOT_LOADED: null,
    ERROR: null,
    FETCHING_WITH_ID: null,
    FETCHING_NEW_DEFAULT: null,
    LOADING_VM_WITH_ID: null,
    LOADING_VM_FILE_UPLOAD: null,
    LOADING_VM_NEW_DEFAULT: null,
    SHOWING_WITH_ID: null,
    SHOWING_WITHOUT_ID: null,
    SAVING_WITH_ID: null,
    SAVING_WITH_ID_BEFORE_NEW: null,
    CREATING_NEW: null
});

const LoadingStates = Object.keys(LoadingState);

const getIsFetchingWithoutId = loadingState => (
    // LOADING_VM_FILE_UPLOAD is an honorary fetch, since there is no fetching step for file uploads
    loadingState === LoadingState.LOADING_VM_FILE_UPLOAD ||
    loadingState === LoadingState.FETCHING_NEW_DEFAULT
);
const getIsFetchingWithId = loadingState => (
    loadingState === LoadingState.FETCHING_WITH_ID ||
    loadingState === LoadingState.FETCHING_NEW_DEFAULT
);
const getIsLoadingWithId = loadingState => (
    loadingState === LoadingState.LOADING_VM_WITH_ID ||
    loadingState === LoadingState.LOADING_VM_NEW_DEFAULT
);
const getIsCreating = loadingState => (
    loadingState === LoadingState.CREATING_NEW
);
const getIsUpdating = loadingState => (
    loadingState === LoadingState.SAVING_WITH_ID ||
    loadingState === LoadingState.SAVING_WITH_ID_BEFORE_NEW
);
const getIsShowingProject = loadingState => (
    loadingState === LoadingState.SHOWING_WITH_ID ||
    loadingState === LoadingState.SHOWING_WITHOUT_ID
);
const getIsShowingWithId = loadingState => (
    loadingState === LoadingState.SHOWING_WITH_ID
);
const getIsShowingWithoutId = loadingState => (
    loadingState === LoadingState.SHOWING_WITHOUT_ID
);
const getIsError = loadingState => (
    loadingState === LoadingState.ERROR
);

const initialState = {
    errorMessage: null,
    projectData: null,
    projectId: null,
    loadingState: LoadingState.NOT_LOADED
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;

    switch (action.type) {
    case DONE_CREATING_NEW:
        // We need to set project id since we just created new project on the server.
        // No need to load, we should have data already in vm.
        if (state.loadingState === LoadingState.CREATING_NEW) {
            return Object.assign({}, state, {
                loadingState: LoadingState.SHOWING_WITH_ID,
                projectId: action.id
            });
        }
        return state;
    case DONE_FETCHING_WITH_ID:
        if (state.loadingState === LoadingState.FETCHING_WITH_ID) {
            return Object.assign({}, state, {
                loadingState: LoadingState.LOADING_VM_WITH_ID,
                projectData: action.projectData
            });
        }
        return state;
    case DONE_FETCHING_DEFAULT:
        if (state.loadingState === LoadingState.FETCHING_NEW_DEFAULT) {
            return Object.assign({}, state, {
                loadingState: LoadingState.LOADING_VM_NEW_DEFAULT,
                projectData: action.projectData
            });
        }
        return state;
    case DONE_LOADING_VM_WITHOUT_ID:
        if (state.loadingState === LoadingState.LOADING_VM_FILE_UPLOAD ||
            state.loadingState === LoadingState.LOADING_VM_NEW_DEFAULT) {
            return Object.assign({}, state, {
                loadingState: LoadingState.SHOWING_WITHOUT_ID
            });
        }
        return state;
    case DONE_LOADING_VM_WITH_ID:
        if (state.loadingState === LoadingState.LOADING_VM_WITH_ID) {
            return Object.assign({}, state, {
                loadingState: LoadingState.SHOWING_WITH_ID
            });
        }
        return state;
    case DONE_LOADING_VM_TO_SAVE:
        if (state.loadingState === LoadingState.LOADING_VM_FILE_UPLOAD) {
            return Object.assign({}, state, {
                loadingState: LoadingState.SAVING_WITH_ID
            });
        }
        return state;
    case DONE_SAVING_WITH_ID:
        if (state.loadingState === LoadingState.SAVING_WITH_ID) {
            return Object.assign({}, state, {
                loadingState: LoadingState.SHOWING_WITH_ID
            });
        }
        return state;
    case DONE_SAVING_WITH_ID_BEFORE_NEW:
        if (state.loadingState === LoadingState.SAVING_WITH_ID_BEFORE_NEW) {
            return Object.assign({}, state, {
                loadingState: LoadingState.FETCHING_NEW_DEFAULT,
                projectId: defaultProjectId
            });
        }
        return state;
    case SET_PROJECT_ID:
        // if setting the default project id, specifically fetch that project
        if (action.id === defaultProjectId) {
            return Object.assign({}, state, {
                loadingState: LoadingState.FETCHING_NEW_DEFAULT,
                projectId: defaultProjectId
            });
        }
        // if we were already showing a project, and a different projectId is set, only fetch that project if
        // projectId has changed. This prevents re-fetching projects unnecessarily.
        if (state.loadingState === LoadingState.SHOWING_WITH_ID) {
            if (state.projectId !== action.id) {
                return Object.assign({}, state, {
                    loadingState: LoadingState.FETCHING_WITH_ID,
                    projectId: action.id
                });
            }
        } else { // allow any other states to transition to fetching project
            return Object.assign({}, state, {
                loadingState: LoadingState.FETCHING_WITH_ID,
                projectId: action.id
            });
        }
        return state;
    case START_CREATING_NEW:
        if (state.loadingState === LoadingState.SHOWING_WITHOUT_ID) {
            return Object.assign({}, state, {
                loadingState: LoadingState.CREATING_NEW
            });
        }
        return state;
    case START_FETCHING_NEW:
        if ([
            LoadingState.SHOWING_WITH_ID,
            LoadingState.SHOWING_WITHOUT_ID
        ].includes(state.loadingState)) {
            return Object.assign({}, state, {
                loadingState: LoadingState.FETCHING_NEW_DEFAULT,
                projectId: defaultProjectId
            });
        }
        return state;
    case START_LOADING_VM_FILE_UPLOAD:
        if ([
            LoadingState.NOT_LOADED,
            LoadingState.SHOWING_WITH_ID,
            LoadingState.SHOWING_WITHOUT_ID
        ].includes(state.loadingState)) {
            return Object.assign({}, state, {
                loadingState: LoadingState.LOADING_VM_FILE_UPLOAD,
                projectId: null // clear any current projectId
            });
        }
        return state;
    case START_SAVING:
        if (state.loadingState === LoadingState.SHOWING_WITH_ID) {
            return Object.assign({}, state, {
                loadingState: LoadingState.SAVING_WITH_ID
            });
        }
        return state;
    case START_SAVING_BEFORE_CREATING_NEW:
        if (state.loadingState === LoadingState.SHOWING_WITH_ID) {
            return Object.assign({}, state, {
                loadingState: LoadingState.SAVING_WITH_ID_BEFORE_NEW
            });
        }
        return state;
    case GO_TO_ERROR_STATE:
    // NOTE: we should introduce handling in components for showing ERROR state
        if ([
            LoadingState.LOADING_VM_NEW_DEFAULT,
            LoadingState.LOADING_VM_WITH_ID,
            LoadingState.FETCHING_WITH_ID,
            LoadingState.FETCHING_NEW_DEFAULT,
            LoadingState.SAVING_WITH_ID,
            LoadingState.SAVING_WITH_ID_BEFORE_NEW,
            LoadingState.CREATING_NEW
        ].includes(state.loadingState)) {
            return Object.assign({}, state, {
                loadingState: LoadingState.ERROR,
                errorMessage: action.errorMessage
            });
        }
        return state;
    default:
        return state;
    }
};

const createProject = () => ({
    type: START_CREATING_NEW
});

const onCreated = id => ({
    type: DONE_CREATING_NEW,
    id: id
});

const onFetchedProjectData = (projectData, loadingState) => {
    switch (loadingState) {
    case LoadingState.FETCHING_WITH_ID:
        return {
            type: DONE_FETCHING_WITH_ID,
            projectData: projectData
        };
    case LoadingState.FETCHING_NEW_DEFAULT:
        return {
            type: DONE_FETCHING_DEFAULT,
            projectData: projectData
        };
    default:
        break;
    }
};

const onLoadedProject = (loadingState, canSave) => {
    switch (loadingState) {
    case LoadingState.LOADING_VM_WITH_ID:
        return {
            type: DONE_LOADING_VM_WITH_ID
        };
    case LoadingState.LOADING_VM_FILE_UPLOAD:
        if (canSave) {
            return {
                type: DONE_LOADING_VM_TO_SAVE
            };
        }
        return {
            type: DONE_LOADING_VM_WITHOUT_ID
        };
    case LoadingState.LOADING_VM_NEW_DEFAULT:
        return {
            type: DONE_LOADING_VM_WITHOUT_ID
        };
    default:
        break;
    }
};

const onUpdated = loadingState => {
    switch (loadingState) {
    case LoadingState.SAVING_WITH_ID:
        return {
            type: DONE_SAVING_WITH_ID
        };
    case LoadingState.SAVING_WITH_ID_BEFORE_NEW:
        return {
            type: DONE_SAVING_WITH_ID_BEFORE_NEW
        };
    default:
        break;
    }
};

const onError = errorMessage => ({
    type: GO_TO_ERROR_STATE,
    errorMessage: errorMessage
});

const setProjectId = id => ({
    type: SET_PROJECT_ID,
    id: id
});

const requestNewProject = canSave => {
    if (canSave) return {type: START_SAVING_BEFORE_CREATING_NEW};
    return {type: START_FETCHING_NEW};
};

const onProjectUploadStarted = () => ({
    type: START_LOADING_VM_FILE_UPLOAD
});

const saveProject = () => ({
    type: START_SAVING
});

export {
    reducer as default,
    initialState as projectStateInitialState,
    LoadingState,
    LoadingStates,
    createProject,
    defaultProjectId,
    getIsCreating,
    getIsError,
    getIsFetchingWithoutId,
    getIsFetchingWithId,
    getIsLoadingWithId,
    getIsUpdating,
    getIsShowingProject,
    getIsShowingWithId,
    getIsShowingWithoutId,
    onCreated,
    onError,
    onFetchedProjectData,
    onLoadedProject,
    onProjectUploadStarted,
    onUpdated,
    requestNewProject,
    saveProject,
    setProjectId
};
