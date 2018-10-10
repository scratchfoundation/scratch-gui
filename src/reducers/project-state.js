import keyMirror from 'keymirror';

const DONE_CREATING_NEW = 'scratch-gui/project-state/DONE_CREATING_NEW';
const DONE_FETCHING_DEFAULT_PROJECT_DATA = 'scratch-gui/project-state/DONE_FETCHING_DEFAULT_PROJECT_DATA';
const DONE_FETCHING_DEFAULT_PROJECT_DATA_TO_SAVE = 'scratch-gui/project-state/DONE_FETCHING_DEFAULT_PROJECT_DATA_TO_SAVE';
const DONE_FETCHING_PROJECT_DATA_WITH_ID = 'scratch-gui/project-state/DONE_FETCHING_PROJECT_DATA_WITH_ID';
const DONE_LOADING_VM_FILE_UPLOAD = 'scratch-gui/project-state/DONE_LOADING_VM_FILE_UPLOAD';
const DONE_LOADING_VM_NEW_DEFAULT = 'scratch-gui/project-state/DONE_LOADING_VM_NEW_DEFAULT';
const DONE_LOADING_VM_NEW_DEFAULT_TO_SAVE = 'scratch-gui/project-state/DONE_LOADING_VM_NEW_DEFAULT_TO_SAVE';
const DONE_LOADING_VM_WITH_ID = 'scratch-gui/project-state/DONE_LOADING_VM_WITH_ID';
const DONE_SAVING_WITH_ID = 'scratch-gui/project-state/DONE_SAVING_WITH_ID';
const DONE_SAVING_WITH_ID_BEFORE_NEW = 'scratch-gui/project-state/DONE_SAVING_WITH_ID_BEFORE_NEW';
const GO_TO_ERROR_STATE = 'scratch-gui/project-state/GO_TO_ERROR_STATE';
const SET_PROJECT_ID = 'scratch-gui/project-state/SET_PROJECT_ID';
const START_FETCHING_NEW_WITHOUT_SAVING = 'scratch-gui/project-state/START_FETCHING_NEW_WITHOUT_SAVING';
const START_LOADING_VM_FILE_UPLOAD = 'scratch-gui/project-state/START_LOADING_FILE_UPLOAD';
const START_SAVING = 'scratch-gui/project-state/START_SAVING';
const START_SAVING_BEFORE_CREATING_NEW = 'scratch-gui/project-state/START_SAVING_BEFORE_CREATING_NEW';

const defaultProjectId = 0; // hardcoded id of default project

const State = keyMirror({
    NOT_LOADED: null,
    ERROR: null,
    FETCHING_WITH_ID: null,
    FETCH_WITH_ID_IF_DIFFERENT: null,
    FETCHING_NEW_DEFAULT: null,
    FETCHING_NEW_DEFAULT_TO_SAVE: null,
    LOADING_VM_WITH_ID: null,
    LOADING_VM_FILE_UPLOAD: null,
    LOADING_VM_NEW_DEFAULT: null,
    LOADING_VM_NEW_DEFAULT_TO_SAVE: null,
    SHOWING_WITH_ID: null,
    SHOWING_FILE_UPLOAD: null,
    SHOWING_NEW_DEFAULT: null,
    SAVING_WITH_ID: null,
    SAVING_WITH_ID_BEFORE_NEW: null,
    CREATING_NEW: null
});

const ProjectStates = Object.keys(State);

// NOTE: rename
const isFetchingProjectWithNoURLId = state => (
    // LOADING_FILE_UPLOAD is an honorary fetch, since there is no fetching step for file uploads
    state === State.LOADING_VM_FILE_UPLOAD ||
        state === State.FETCHING_NEW_DEFAULT ||
        state === State.FETCHING_NEW_DEFAULT_TO_SAVE
);
const isFetchingProjectWithId = state => (
    state === State.FETCHING_WITH_ID ||
        state === State.FETCHING_NEW_DEFAULT ||
        state === State.FETCHING_NEW_DEFAULT_TO_SAVE
);
const isLoadingProjectWithId = state => (
    state === State.LOADING_VM_WITH_ID ||
        state === State.LOADING_VM_NEW_DEFAULT ||
        state === State.LOADING_VM_NEW_DEFAULT_TO_SAVE
);
const isCreating = state => (
    state === State.CREATING_NEW
);
const isUpdating = state => (
    state === State.SAVING_WITH_ID ||
        state === State.SAVING_WITH_ID_BEFORE_NEW
);
const isShowingProject = state => (
    state === State.SHOWING_WITH_ID ||
        state === State.SHOWING_FILE_UPLOAD ||
        state === State.SHOWING_NEW_DEFAULT
);
const isShowingProjectWithId = state => (
    state === State.SHOWING_WITH_ID ||
        state === State.SHOWING_NEW_DEFAULT
);

const initialState = {
    errStr: null,
    projectData: null,
    projectId: null,
    state: State.NOT_LOADED
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;

    switch (action.type) {
    case DONE_CREATING_NEW:
        // We need to set project id since we just created new project on the server.
        // No need to load, we should have data already in vm.
        if (state.state === State.CREATING_NEW) {
            return Object.assign({}, state, {
                state: State.SHOWING_WITH_ID,
                id: action.id
            });
        }
        return state;
    case DONE_FETCHING_PROJECT_DATA_WITH_ID:
        if (state.state === State.FETCHING_WITH_ID) {
            return Object.assign({}, state, {
                state: State.LOADING_VM_WITH_ID,
                projectData: action.projectData
            });
        }
        return state;
    case DONE_FETCHING_DEFAULT_PROJECT_DATA:
        if (state.state === State.FETCHING_NEW_DEFAULT) {
            return Object.assign({}, state, {
                state: State.LOADING_VM_NEW_DEFAULT,
                projectData: action.projectData
            });
        }
        return state;
    case DONE_FETCHING_DEFAULT_PROJECT_DATA_TO_SAVE:
        if (state.state === State.FETCHING_NEW_DEFAULT_TO_SAVE) {
            return Object.assign({}, state, {
                state: State.LOADING_VM_NEW_DEFAULT_TO_SAVE,
                projectData: action.projectData
            });
        }
        return state;
    case DONE_LOADING_VM_FILE_UPLOAD:
        // note that we don't need to explicitly set projectData, because it is loaded
        // into the vm directly in file-loader-from-local
        if (state.state === State.LOADING_VM_FILE_UPLOAD) {
            return Object.assign({}, state, {
                state: State.SHOWING_FILE_UPLOAD
            });
        }
        return state;
    case DONE_LOADING_VM_WITH_ID:
        if (state.state === State.LOADING_VM_WITH_ID) {
            return Object.assign({}, state, {
                state: State.SHOWING_WITH_ID
            });
        }
        return state;
    case DONE_LOADING_VM_NEW_DEFAULT:
        if (state.state === State.LOADING_VM_NEW_DEFAULT) {
            return Object.assign({}, state, {
                state: State.SHOWING_NEW_DEFAULT
            });
        }
        return state;
    case DONE_LOADING_VM_NEW_DEFAULT_TO_SAVE:
        if (state.state === State.LOADING_VM_NEW_DEFAULT_TO_SAVE) {
            return Object.assign({}, state, {
                // NOTE: this is set to skip over sending a POST to create the new project
                // on the server, until we can get that working on the backend.
                // state: State.CREATING_NEW
                state: State.SHOWING_WITH_ID
            });
        }
        return state;
    case DONE_SAVING_WITH_ID:
        if (state.state === State.SAVING_WITH_ID) {
            return Object.assign({}, state, {
                state: State.SHOWING_WITH_ID
            });
        }
        return state;
    case DONE_SAVING_WITH_ID_BEFORE_NEW:
        if (state.state === State.SAVING_WITH_ID_BEFORE_NEW) {
            return Object.assign({}, state, {
                state: State.FETCHING_NEW_DEFAULT_TO_SAVE,
                projectId: defaultProjectId
            });
        }
        return state;
    case SET_PROJECT_ID:
        // if we were already showing something, only fetch project if the
        // project id has changed. This prevents re-fetching projects unnecessarily.
        if (state.state === State.SHOWING_WITH_ID) {
            if (state.projectId !== action.id) {
                return Object.assign({}, state, {
                    state: State.FETCHING_WITH_ID,
                    projectId: action.id
                });
            }
        } else { // allow any other states to transition to fetching project
            return Object.assign({}, state, {
                state: State.FETCHING_WITH_ID,
                projectId: action.id
            });
        }
        return state;
    case START_FETCHING_NEW_WITHOUT_SAVING:
        if ([
            State.SHOWING_WITH_ID,
            State.SHOWING_FILE_UPLOAD,
            State.SHOWING_NEW_DEFAULT
        ].includes(state.state)) {
            return Object.assign({}, state, {
                state: State.FETCHING_NEW_DEFAULT,
                projectId: defaultProjectId
            });
        }
        return state;
    case START_LOADING_VM_FILE_UPLOAD:
        if ([
            State.NOT_LOADED,
            State.SHOWING_WITH_ID,
            State.SHOWING_FILE_UPLOAD,
            State.SHOWING_NEW_DEFAULT
        ].includes(state.state)) {
            return Object.assign({}, state, {
                state: State.LOADING_VM_FILE_UPLOAD,
                projectId: null // clear any current projectId
            });
        }
        return state;
    case START_SAVING:
        if (state.state === State.SHOWING_WITH_ID) {
            return Object.assign({}, state, {
                state: State.SAVING_WITH_ID
            });
        }
        return state;
    case START_SAVING_BEFORE_CREATING_NEW:
        if (state.state === State.SHOWING_WITH_ID) {
            return Object.assign({}, state, {
                state: State.SAVING_WITH_ID_BEFORE_NEW
            });
        }
        return state;
    case GO_TO_ERROR_STATE:
    // NOTE: we should introduce handling in components for showing ERROR state
        if ([
            State.NOT_LOADED,
            State.FETCHING_WITH_ID,
            State.FETCHING_NEW_DEFAULT,
            State.FETCHING_NEW_DEFAULT_TO_SAVE
        ].includes(state.state)) {
            return Object.assign({}, state, {
                state: State.ERROR,
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

const onFetchedProjectData = (projectData, state) => {
    switch (state) {
    case State.FETCHING_WITH_ID:
        return {
            type: DONE_FETCHING_PROJECT_DATA_WITH_ID,
            projectData: projectData
        };
    case State.FETCHING_NEW_DEFAULT:
        return {
            type: DONE_FETCHING_DEFAULT_PROJECT_DATA,
            projectData: projectData
        };
    case State.FETCHING_NEW_DEFAULT_TO_SAVE:
        return {
            type: DONE_FETCHING_DEFAULT_PROJECT_DATA_TO_SAVE,
            projectData: projectData
        };
    default:
        break;
    }
};

const doneLoadingFileUpload = () => ({
    type: DONE_LOADING_VM_FILE_UPLOAD
});

const doneLoading = state => {
    switch (state) {
    case State.LOADING_VM_WITH_ID:
        return {
            type: DONE_LOADING_VM_WITH_ID
        };
    case State.LOADING_VM_FILE_UPLOAD:
        return {
            type: DONE_LOADING_VM_FILE_UPLOAD
        };
    case State.LOADING_VM_NEW_DEFAULT:
        return {
            type: DONE_LOADING_VM_NEW_DEFAULT
        };
    case State.LOADING_VM_NEW_DEFAULT_TO_SAVE:
        return {
            type: DONE_LOADING_VM_NEW_DEFAULT_TO_SAVE
        };
    default:
        break;
    }
};

const onUpdated = state => {
    switch (state) {
    case State.SAVING_WITH_ID:
        return {
            type: DONE_SAVING_WITH_ID
        };
    case State.SAVING_WITH_ID_BEFORE_NEW:
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

const newProjectRequested = canSave => {
    if (canSave) return {type: START_SAVING_BEFORE_CREATING_NEW};
    return {type: START_FETCHING_NEW_WITHOUT_SAVING};
};

const startLoadingFileUpload = () => ({
    type: START_LOADING_VM_FILE_UPLOAD
});

const saveRequested = () => ({
    type: START_SAVING
});

export {
    reducer as default,
    initialState as projectIdInitialState,
    State as ProjectState,
    ProjectStates,
    defaultProjectId,
    onCreated,
    doneLoading,
    doneLoadingFileUpload,
    isCreating,
    isFetchingProjectWithNoURLId,
    isFetchingProjectWithId,
    isLoadingProjectWithId,
    isUpdating,
    isShowingProject,
    isShowingProjectWithId,
    newProjectRequested,
    onError,
    onFetchedProjectData,
    onUpdated,
    setProjectId,
    startLoadingFileUpload,
    saveRequested
};
