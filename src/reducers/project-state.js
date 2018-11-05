import keyMirror from 'keymirror';

const DONE_CREATING_COPY = 'scratch-gui/project-state/DONE_CREATING_COPY';
const DONE_CREATING_NEW = 'scratch-gui/project-state/DONE_CREATING_NEW';
const DONE_FETCHING_DEFAULT = 'scratch-gui/project-state/DONE_FETCHING_DEFAULT';
const DONE_FETCHING_WITH_ID = 'scratch-gui/project-state/DONE_FETCHING_WITH_ID';
const DONE_LOADING_VM_TO_SAVE = 'scratch-gui/project-state/DONE_LOADING_VM_TO_SAVE';
const DONE_LOADING_VM_WITH_ID = 'scratch-gui/project-state/DONE_LOADING_VM_WITH_ID';
const DONE_LOADING_VM_WITHOUT_ID = 'scratch-gui/project-state/DONE_LOADING_VM_WITHOUT_ID';
const DONE_REMIXING = 'scratch-gui/project-state/DONE_REMIXING';
const DONE_UPDATING = 'scratch-gui/project-state/DONE_UPDATING';
const DONE_UPDATING_BEFORE_NEW = 'scratch-gui/project-state/DONE_UPDATING_BEFORE_NEW';
const SET_PROJECT_ID = 'scratch-gui/project-state/SET_PROJECT_ID';
const START_CREATING_COPY = 'scratch-gui/project-state/START_CREATING_COPY';
const START_CREATING_NEW = 'scratch-gui/project-state/START_CREATING_NEW';
const START_ERROR = 'scratch-gui/project-state/START_ERROR';
const START_FETCHING_NEW = 'scratch-gui/project-state/START_FETCHING_NEW';
const START_LOADING_VM_FILE_UPLOAD = 'scratch-gui/project-state/START_LOADING_FILE_UPLOAD';
const START_REMIXING = 'scratch-gui/project-state/START_REMIXING';
const START_UPDATING = 'scratch-gui/project-state/START_UPDATING';
const START_UPDATING_BEFORE_CREATING_NEW = 'scratch-gui/project-state/START_UPDATING_BEFORE_CREATING_NEW';

const defaultProjectId = '0'; // hardcoded id of default project

const LoadingState = keyMirror({
    NOT_LOADED: null,
    ERROR: null,
    FETCHING_WITH_ID: null,
    FETCHING_NEW_DEFAULT: null,
    LOADING_VM_WITH_ID: null,
    LOADING_VM_FILE_UPLOAD: null,
    LOADING_VM_NEW_DEFAULT: null,
    REMIXING: null,
    SHOWING_WITH_ID: null,
    SHOWING_WITHOUT_ID: null,
    CREATING_COPY: null,
    UPDATING: null,
    UPDATING_BEFORE_NEW: null,
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
const getIsCreatingNew = loadingState => (
    loadingState === LoadingState.CREATING_NEW
);
const getIsCreatingCopy = loadingState => (
    loadingState === LoadingState.CREATING_COPY
);
const getIsRemixing = loadingState => (
    loadingState === LoadingState.REMIXING
);
const getIsUpdating = loadingState => (
    loadingState === LoadingState.UPDATING ||
    loadingState === LoadingState.UPDATING_BEFORE_NEW
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
    error: null,
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
                projectId: action.projectId
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
                loadingState: LoadingState.UPDATING
            });
        }
        return state;
    case DONE_REMIXING:
        // We need to set project id since we just created new project on the server.
        // No need to load, we should have data already in vm.
        if (state.loadingState === LoadingState.REMIXING) {
            return Object.assign({}, state, {
                loadingState: LoadingState.SHOWING_WITH_ID,
                projectId: action.projectId
            });
        }
        return state;
    case DONE_CREATING_COPY:
        // We need to set project id since we just created new project on the server.
        // No need to load, we should have data already in vm.
        if (state.loadingState === LoadingState.CREATING_COPY) {
            return Object.assign({}, state, {
                loadingState: LoadingState.SHOWING_WITH_ID,
                projectId: action.projectId
            });
        }
        return state;
    case DONE_UPDATING:
        if (state.loadingState === LoadingState.UPDATING) {
            return Object.assign({}, state, {
                loadingState: LoadingState.SHOWING_WITH_ID
            });
        }
        return state;
    case DONE_UPDATING_BEFORE_NEW:
        if (state.loadingState === LoadingState.UPDATING_BEFORE_NEW) {
            return Object.assign({}, state, {
                loadingState: LoadingState.FETCHING_NEW_DEFAULT,
                projectId: defaultProjectId
            });
        }
        return state;
    case SET_PROJECT_ID:
        // if the projectId hasn't actually changed do nothing
        if (state.projectId === action.projectId) {
            return state;
        }
        // if setting the default project id, specifically fetch that project
        if (action.projectId === defaultProjectId) {
            return Object.assign({}, state, {
                loadingState: LoadingState.FETCHING_NEW_DEFAULT,
                projectId: defaultProjectId
            });
        }
        // if we were already showing a project, and a different projectId is set, only fetch that project if
        // projectId has changed. This prevents re-fetching projects unnecessarily.
        if (state.loadingState === LoadingState.SHOWING_WITH_ID) {
            if (state.projectId !== action.projectId) {
                return Object.assign({}, state, {
                    loadingState: LoadingState.FETCHING_WITH_ID,
                    projectId: action.projectId
                });
            }
        } else { // allow any other states to transition to fetching project
            return Object.assign({}, state, {
                loadingState: LoadingState.FETCHING_WITH_ID,
                projectId: action.projectId
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
    case START_REMIXING:
        // do not set projectId to null, because we nay reference it in creating project
        if (state.loadingState === LoadingState.SHOWING_WITH_ID) {
            return Object.assign({}, state, {
                loadingState: LoadingState.REMIXING
            });
        }
        return state;
    case START_UPDATING:
        if (state.loadingState === LoadingState.SHOWING_WITH_ID) {
            return Object.assign({}, state, {
                loadingState: LoadingState.UPDATING
            });
        }
        return state;
    case START_CREATING_COPY:
        // do not set projectId to null, because we nay reference it in creating project
        if (state.loadingState === LoadingState.SHOWING_WITH_ID) {
            return Object.assign({}, state, {
                loadingState: LoadingState.CREATING_COPY
            });
        }
        return state;
    case START_UPDATING_BEFORE_CREATING_NEW:
        if (state.loadingState === LoadingState.SHOWING_WITH_ID) {
            return Object.assign({}, state, {
                loadingState: LoadingState.UPDATING_BEFORE_NEW
            });
        }
        return state;
    case START_ERROR:
    // NOTE: we should introduce handling in components for showing ERROR state
        if ([
            LoadingState.CREATING_NEW,
            LoadingState.FETCHING_NEW_DEFAULT,
            LoadingState.FETCHING_WITH_ID,
            LoadingState.LOADING_VM_NEW_DEFAULT,
            LoadingState.LOADING_VM_WITH_ID,
            LoadingState.REMIXING,
            LoadingState.CREATING_COPY,
            LoadingState.UPDATING_BEFORE_NEW,
            LoadingState.UPDATING
        ].includes(state.loadingState)) {
            return Object.assign({}, state, {
                loadingState: LoadingState.ERROR,
                error: action.error
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

const doneCreatingProject = (id, loadingState) => {
    switch (loadingState) {
    case LoadingState.CREATING_NEW:
        return {
            type: DONE_CREATING_NEW,
            projectId: id
        };
    case LoadingState.CREATING_COPY:
        return {
            type: DONE_CREATING_COPY,
            projectId: id
        };
    case LoadingState.REMIXING:
        return {
            type: DONE_REMIXING,
            projectId: id
        };
    default:
        break;
    }
};

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

const doneUpdatingProject = loadingState => {
    switch (loadingState) {
    case LoadingState.UPDATING:
        return {
            type: DONE_UPDATING
        };
    case LoadingState.UPDATING_BEFORE_NEW:
        return {
            type: DONE_UPDATING_BEFORE_NEW
        };
    default:
        break;
    }
};

const projectError = error => ({
    type: START_ERROR,
    error: error
});

const setProjectId = id => ({
    type: SET_PROJECT_ID,
    projectId: id
});

const requestNewProject = needSave => {
    if (needSave) return {type: START_UPDATING_BEFORE_CREATING_NEW};
    return {type: START_FETCHING_NEW};
};

const onProjectUploadStarted = () => ({
    type: START_LOADING_VM_FILE_UPLOAD
});

const updateProject = () => ({
    type: START_UPDATING
});

const saveProjectAsCopy = () => ({
    type: START_CREATING_COPY
});

const remixProject = () => ({
    type: START_REMIXING
});

export {
    reducer as default,
    initialState as projectStateInitialState,
    LoadingState,
    LoadingStates,
    createProject,
    defaultProjectId,
    doneCreatingProject,
    doneUpdatingProject,
    getIsCreatingCopy,
    getIsCreatingNew,
    getIsError,
    getIsFetchingWithId,
    getIsFetchingWithoutId,
    getIsLoadingWithId,
    getIsRemixing,
    getIsShowingProject,
    getIsShowingWithId,
    getIsShowingWithoutId,
    getIsUpdating,
    onFetchedProjectData,
    onLoadedProject,
    onProjectUploadStarted,
    projectError,
    remixProject,
    requestNewProject,
    saveProjectAsCopy,
    setProjectId,
    updateProject
};
