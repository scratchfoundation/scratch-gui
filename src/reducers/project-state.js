import keyMirror from 'keymirror';

const DONE_CREATING_NEW = 'scratch-gui/project-state/DONE_CREATING_NEW';
const DONE_FETCHING_WITH_ID = 'scratch-gui/project-state/DONE_FETCHING_WITH_ID';
const DONE_FETCHING_DEFAULT = 'scratch-gui/project-state/DONE_FETCHING_DEFAULT';
const DONE_FETCHING_DEFAULT_TO_SAVE = 'scratch-gui/project-state/DONE_FETCHING_DEFAULT_TO_SAVE';
const DONE_LOADING_VM_WITH_ID = 'scratch-gui/project-state/DONE_LOADING_VM_WITH_ID';
const DONE_LOADING_VM_NEW_DEFAULT = 'scratch-gui/project-state/DONE_LOADING_VM_NEW_DEFAULT';
const DONE_LOADING_VM_NEW_DEFAULT_TO_SAVE = 'scratch-gui/project-state/DONE_LOADING_VM_NEW_DEFAULT_TO_SAVE';
const DONE_LOADING_VM_FILE_UPLOAD = 'scratch-gui/project-state/DONE_LOADING_VM_FILE_UPLOAD';
const DONE_SAVING_WITH_ID = 'scratch-gui/project-state/DONE_SAVING_WITH_ID';
const DONE_SAVING_WITH_ID_BEFORE_NEW = 'scratch-gui/project-state/DONE_SAVING_WITH_ID_BEFORE_NEW';
const GO_TO_ERROR_STATE = 'scratch-gui/project-state/GO_TO_ERROR_STATE';
const SET_PROJECT_ID = 'scratch-gui/project-state/SET_PROJECT_ID';
const START_FETCHING_NEW_WITHOUT_SAVING = 'scratch-gui/project-state/START_FETCHING_NEW_WITHOUT_SAVING';
const START_LOADING_VM_FILE_UPLOAD = 'scratch-gui/project-state/START_LOADING_FILE_UPLOAD';
const START_SAVING = 'scratch-gui/project-state/START_SAVING';
const START_SAVING_BEFORE_CREATING_NEW = 'scratch-gui/project-state/START_SAVING_BEFORE_CREATING_NEW';

const defaultProjectId = '0'; // hardcoded id of default project

const LoadingState = keyMirror({
    NOT_LOADED: null,
    ERROR: null,
    FETCHING_WITH_ID: null,
    FETCHING_NEW_DEFAULT: null,
    FETCHING_NEW_DEFAULT_TO_SAVE: null,
    LOADING_VM_WITH_ID: null,
    LOADING_VM_FILE_UPLOAD: null,
    LOADING_VM_NEW_DEFAULT: null,
    LOADING_VM_NEW_DEFAULT_TO_SAVE: null,
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
    loadingState === LoadingState.FETCHING_NEW_DEFAULT ||
    loadingState === LoadingState.FETCHING_NEW_DEFAULT_TO_SAVE
);
const getIsFetchingWithId = loadingState => (
    loadingState === LoadingState.FETCHING_WITH_ID ||
    loadingState === LoadingState.FETCHING_NEW_DEFAULT ||
    loadingState === LoadingState.FETCHING_NEW_DEFAULT_TO_SAVE
);
const getIsLoadingWithId = loadingState => (
    loadingState === LoadingState.LOADING_VM_WITH_ID ||
    loadingState === LoadingState.LOADING_VM_NEW_DEFAULT ||
    loadingState === LoadingState.LOADING_VM_NEW_DEFAULT_TO_SAVE
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

const initialState = {
    errStr: null,
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
    case DONE_FETCHING_DEFAULT_TO_SAVE:
        if (state.loadingState === LoadingState.FETCHING_NEW_DEFAULT_TO_SAVE) {
            return Object.assign({}, state, {
                loadingState: LoadingState.LOADING_VM_NEW_DEFAULT_TO_SAVE,
                projectData: action.projectData
            });
        }
        return state;
    case DONE_LOADING_VM_FILE_UPLOAD:
        // note that we don't need to explicitly set projectData, because it is loaded
        // into the vm directly in file-loader-from-local
        if (state.loadingState === LoadingState.LOADING_VM_FILE_UPLOAD) {
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
    case DONE_LOADING_VM_NEW_DEFAULT:
        if (state.loadingState === LoadingState.LOADING_VM_NEW_DEFAULT) {
            return Object.assign({}, state, {
                loadingState: LoadingState.SHOWING_WITHOUT_ID
            });
        }
        return state;
    case DONE_LOADING_VM_NEW_DEFAULT_TO_SAVE:
        if (state.loadingState === LoadingState.LOADING_VM_NEW_DEFAULT_TO_SAVE) {
            return Object.assign({}, state, {
                // NOTE: this is set to skip over sending a POST to create the new project
                // on the server, until we can get that working on the backend.
                // loadingState: LoadingState.CREATING_NEW
                loadingState: LoadingState.SHOWING_WITH_ID
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
                loadingState: LoadingState.FETCHING_NEW_DEFAULT_TO_SAVE,
                projectId: defaultProjectId
            });
        }
        return state;
    case SET_PROJECT_ID:
        // if we were already showing a project, and a different projectId is set, only fetch that project if
        // projectId is a valid id, and projectId has changed. This prevents re-fetching projects unnecessarily.
        if (action.id !== null && action.id !== '' && typeof action.id !== 'undefined') {
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
        }
        return state;
    case START_FETCHING_NEW_WITHOUT_SAVING:
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
            LoadingState.NOT_LOADED,
            LoadingState.FETCHING_WITH_ID,
            LoadingState.FETCHING_NEW_DEFAULT,
            LoadingState.FETCHING_NEW_DEFAULT_TO_SAVE
        ].includes(state.loadingState)) {
            return Object.assign({}, state, {
                loadingState: LoadingState.ERROR,
                errStr: action.errStr
            });
        }
        return state;
    default:
        return state;
    }
};

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
    case LoadingState.FETCHING_NEW_DEFAULT_TO_SAVE:
        return {
            type: DONE_FETCHING_DEFAULT_TO_SAVE,
            projectData: projectData
        };
    default:
        break;
    }
};

const onLoadedProject = loadingState => {
    switch (loadingState) {
    case LoadingState.LOADING_VM_WITH_ID:
        return {
            type: DONE_LOADING_VM_WITH_ID
        };
    case LoadingState.LOADING_VM_FILE_UPLOAD:
        return {
            type: DONE_LOADING_VM_FILE_UPLOAD
        };
    case LoadingState.LOADING_VM_NEW_DEFAULT:
        return {
            type: DONE_LOADING_VM_NEW_DEFAULT
        };
    case LoadingState.LOADING_VM_NEW_DEFAULT_TO_SAVE:
        return {
            type: DONE_LOADING_VM_NEW_DEFAULT_TO_SAVE
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

const onError = errStr => ({
    type: GO_TO_ERROR_STATE,
    errStr: errStr
});

const setProjectId = id => ({
    type: SET_PROJECT_ID,
    id: id
});

const requestNewProject = canSave => {
    if (canSave) return {type: START_SAVING_BEFORE_CREATING_NEW};
    return {type: START_FETCHING_NEW_WITHOUT_SAVING};
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
    defaultProjectId,
    getIsCreating,
    getIsFetchingWithoutId,
    getIsFetchingWithId,
    getIsLoadingWithId,
    getIsUpdating,
    getIsShowingProject,
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
