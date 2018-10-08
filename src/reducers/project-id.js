import keyMirror from 'keymirror';

const DONE_CREATING_NEW = 'scratch-gui/project-id/DONE_CREATING_NEW';
const DONE_FETCHING_DEFAULT_PROJECT_DATA = 'scratch-gui/project-id/DONE_FETCHING_DEFAULT_PROJECT_DATA';
const DONE_FETCHING_DEFAULT_PROJECT_DATA_TO_SAVE = 'scratch-gui/project-id/DONE_FETCHING_DEFAULT_PROJECT_DATA_TO_SAVE';
const DONE_FETCHING_PROJECT_DATA_WITH_ID = 'scratch-gui/project-id/DONE_FETCHING_PROJECT_DATA_WITH_ID';
const DONE_LOADING_VM_FILE_UPLOAD = 'scratch-gui/project-id/DONE_LOADING_VM_FILE_UPLOAD';
const DONE_LOADING_VM_NEW_DEFAULT = 'scratch-gui/project-id/DONE_LOADING_VM_NEW_DEFAULT';
const DONE_LOADING_VM_NEW_DEFAULT_TO_SAVE = 'scratch-gui/project-id/DONE_LOADING_VM_NEW_DEFAULT_TO_SAVE';
const DONE_LOADING_VM_WITH_ID = 'scratch-gui/project-id/DONE_LOADING_VM_WITH_ID';
const DONE_SAVING_WITH_ID = 'scratch-gui/project-id/DONE_SAVING_WITH_ID';
const DONE_SAVING_WITH_ID_BEFORE_NEW = 'scratch-gui/project-id/DONE_SAVING_WITH_ID_BEFORE_NEW';
const GO_TO_ERROR_STATE = 'scratch-gui/project-id/GO_TO_ERROR_STATE';
const SET_HASH_PROJECT_ID = 'scratch-gui/project-id/SET_HASH_PROJECT_ID';
const SET_INITIAL_PROJECT_ID = 'scratch-gui/project-id/SET_INITIAL_PROJECT_ID';
const START_FETCHING_NEW_WITHOUT_SAVING = 'scratch-gui/project-id/START_FETCHING_NEW_WITHOUT_SAVING';
const START_LOADING_VM_FILE_UPLOAD = 'scratch-gui/project-id/START_LOADING_FILE_UPLOAD';
const START_SAVING = 'scratch-gui/project-id/START_SAVING';
const START_SAVING_BEFORE_CREATING_NEW = 'scratch-gui/project-id/START_SAVING_BEFORE_CREATING_NEW';

const defaultProjectId = 0; // hardcoded id of default project

const ProjectState = keyMirror({
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

const isFetchingProjectWithNoURLId = projectState => (
    // LOADING_FILE_UPLOAD is an honorary fetch, since there is no fetching step for file uploads
    projectState === ProjectState.LOADING_VM_FILE_UPLOAD ||
        projectState === ProjectState.FETCHING_NEW_DEFAULT ||
        projectState === ProjectState.FETCHING_NEW_DEFAULT_TO_SAVE
);
const isFetchingProjectWithId = projectState => (
    projectState === ProjectState.FETCHING_WITH_ID ||
        projectState === ProjectState.FETCHING_NEW_DEFAULT ||
        projectState === ProjectState.FETCHING_NEW_DEFAULT_TO_SAVE
);
const isLoadingProjectWithId = projectState => (
    projectState === ProjectState.LOADING_VM_WITH_ID ||
        projectState === ProjectState.LOADING_VM_NEW_DEFAULT ||
        projectState === ProjectState.LOADING_VM_NEW_DEFAULT_TO_SAVE
);
const isSavingWithId = projectState => (
    projectState === ProjectState.SAVING_WITH_ID ||
        projectState === ProjectState.SAVING_WITH_ID_BEFORE_NEW
);
const isShowingProject = projectState => (
    projectState === ProjectState.SHOWING_WITH_ID ||
        projectState === ProjectState.SHOWING_FILE_UPLOAD ||
        projectState === ProjectState.SHOWING_NEW_DEFAULT
);
const isShowingProjectWithId = projectState => (
    projectState === ProjectState.SHOWING_WITH_ID ||
        projectState === ProjectState.SHOWING_NEW_DEFAULT
);

const initialState = {
    errStr: null,
    projectData: null,
    projectId: null,
    projectState: ProjectState.NOT_LOADED
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;

    switch (action.type) {
    case DONE_CREATING_NEW:
        // We need to set project id since we just created new project on the server.
        // No need to load, we should have data already in vm.
        if (state.projectState === ProjectState.CREATING_NEW) {
            return Object.assign({}, state, {
                projectState: ProjectState.SHOWING_WITH_ID,
                id: action.id
            });
        }
        return state;
    case DONE_FETCHING_PROJECT_DATA_WITH_ID:
        if (state.projectState === ProjectState.FETCHING_WITH_ID) {
            return Object.assign({}, state, {
                projectState: ProjectState.LOADING_VM_WITH_ID,
                projectData: action.projectData
            });
        }
        return state;
    case DONE_FETCHING_DEFAULT_PROJECT_DATA:
        if (state.projectState === ProjectState.FETCHING_NEW_DEFAULT) {
            return Object.assign({}, state, {
                projectState: ProjectState.LOADING_VM_NEW_DEFAULT,
                projectData: action.projectData
            });
        }
        return state;
    case DONE_FETCHING_DEFAULT_PROJECT_DATA_TO_SAVE:
        if (state.projectState === ProjectState.FETCHING_NEW_DEFAULT_TO_SAVE) {
            return Object.assign({}, state, {
                projectState: ProjectState.LOADING_VM_NEW_DEFAULT_TO_SAVE,
                projectData: action.projectData
            });
        }
        return state;
    case DONE_LOADING_VM_FILE_UPLOAD:
        // note that we don't need to explicitly set projectData, because it is loaded
        // into the vm directly in sb3-loader-from-local
        if (state.projectState === ProjectState.LOADING_VM_FILE_UPLOAD) {
            return Object.assign({}, state, {
                projectState: ProjectState.SHOWING_FILE_UPLOAD
            });
        }
        return state;
    case DONE_LOADING_VM_WITH_ID:
        if (state.projectState === ProjectState.LOADING_VM_WITH_ID) {
            return Object.assign({}, state, {
                projectState: ProjectState.SHOWING_WITH_ID
            });
        }
        return state;
    case DONE_LOADING_VM_NEW_DEFAULT:
        if (state.projectState === ProjectState.LOADING_VM_NEW_DEFAULT) {
            return Object.assign({}, state, {
                projectState: ProjectState.SHOWING_NEW_DEFAULT
            });
        }
        return state;
    case DONE_LOADING_VM_NEW_DEFAULT_TO_SAVE:
        if (state.projectState === ProjectState.LOADING_VM_NEW_DEFAULT_TO_SAVE) {
            return Object.assign({}, state, {
                // NOTE: this is set to skip over sending a POST to create the new project
                // on the server, until we can get that working on the backend.
                // projectState: ProjectState.CREATING_NEW
                projectState: ProjectState.SHOWING_WITH_ID
            });
        }
        return state;
    case DONE_SAVING_WITH_ID:
        if (state.projectState === ProjectState.SAVING_WITH_ID) {
            return Object.assign({}, state, {
                projectState: ProjectState.SHOWING_WITH_ID
            });
        }
        return state;
    case DONE_SAVING_WITH_ID_BEFORE_NEW:
        if (state.projectState === ProjectState.SAVING_WITH_ID_BEFORE_NEW) {
            return Object.assign({}, state, {
                projectState: ProjectState.FETCHING_NEW_DEFAULT_TO_SAVE,
                projectId: defaultProjectId
            });
        }
        return state;
    case SET_HASH_PROJECT_ID:
        // We purposely do not transition if we are currently in a fetching or loading state,
        // which may have changed the hash automatically, e.g. if we have moved from a hash url
        // to loading a project from local.
        if ([
            ProjectState.NOT_LOADED,
            ProjectState.SHOWING_WITH_ID,
            ProjectState.SHOWING_FILE_UPLOAD,
            ProjectState.SHOWING_NEW_DEFAULT
        ].includes(state.projectState)) {
            return Object.assign({}, state, {
                projectState: ProjectState.FETCHING_WITH_ID,
                projectId: action.id
            });
        }
        return state;
    case SET_INITIAL_PROJECT_ID:
        // if we havnen't loaded anything, fetch the project
        if (state.projectState === ProjectState.NOT_LOADED) {
            return Object.assign({}, state, {
                projectId: action.id,
                projectState: ProjectState.FETCHING_WITH_ID
            });
        }
        // if we were already showing something, only fetch project if the
        // project id has changed
        // NOTE: test this to see if it works when switching between project page and editor.
        if (state.projectState === ProjectState.SHOWING_WITH_ID && state.projectId !== action.id) {
            return Object.assign({}, state, {
                projectId: action.id,
                projectState: ProjectState.FETCHING_WITH_ID
            });
        }
        // if neither of the cases above applies, don't change the state
        return state;
    case START_FETCHING_NEW_WITHOUT_SAVING:
        if ([
            ProjectState.SHOWING_WITH_ID,
            ProjectState.SHOWING_FILE_UPLOAD,
            ProjectState.SHOWING_NEW_DEFAULT
        ].includes(state.projectState)) {
            return Object.assign({}, state, {
                projectState: ProjectState.FETCHING_NEW_DEFAULT,
                projectId: defaultProjectId
            });
        }
        return state;
    case START_LOADING_VM_FILE_UPLOAD:
        if ([
            ProjectState.NOT_LOADED,
            ProjectState.SHOWING_WITH_ID,
            ProjectState.SHOWING_FILE_UPLOAD,
            ProjectState.SHOWING_NEW_DEFAULT
        ].includes(state.projectState)) {
            return Object.assign({}, state, {
                projectState: ProjectState.LOADING_VM_FILE_UPLOAD,
                projectId: null // clear any current projectId
            });
        }
        return state;
    case START_SAVING:
        if (state.projectState === ProjectState.SHOWING_WITH_ID) {
            return Object.assign({}, state, {
                projectState: ProjectState.SAVING_WITH_ID
            });
        }
        return state;
    case START_SAVING_BEFORE_CREATING_NEW:
        if (state.projectState === ProjectState.SHOWING_WITH_ID) {
            return Object.assign({}, state, {
                projectState: ProjectState.SAVING_WITH_ID_BEFORE_NEW
            });
        }
        return state;
    case GO_TO_ERROR_STATE:
    // NOTE: we should introduce handling in components for showing ERROR state
        if ([
            ProjectState.NOT_LOADED,
            ProjectState.FETCHING_WITH_ID,
            ProjectState.FETCHING_NEW_DEFAULT,
            ProjectState.FETCHING_NEW_DEFAULT_TO_SAVE
        ].includes(state.projectState)) {
            return Object.assign({}, state, {
                projectState: ProjectState.ERROR,
                errStr: action.errStr
            });
        }
        return state;
    default:
        return state;
    }
};

const doneCreatingNew = id => ({
    type: DONE_CREATING_NEW,
    id: id
});

const doneFetchingProjectData = (projectData, projectState) => {
    switch (projectState) {
    case ProjectState.FETCHING_WITH_ID:
        return {
            type: DONE_FETCHING_PROJECT_DATA_WITH_ID,
            projectData: projectData
        };
    case ProjectState.FETCHING_NEW_DEFAULT:
        return {
            type: DONE_FETCHING_DEFAULT_PROJECT_DATA,
            projectData: projectData
        };
    case ProjectState.FETCHING_NEW_DEFAULT_TO_SAVE:
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

const doneLoading = projectState => {
    switch (projectState) {
    case ProjectState.LOADING_VM_WITH_ID:
        return {
            type: DONE_LOADING_VM_WITH_ID
        };
    case ProjectState.LOADING_VM_FILE_UPLOAD:
        return {
            type: DONE_LOADING_VM_FILE_UPLOAD
        };
    case ProjectState.LOADING_VM_NEW_DEFAULT:
        return {
            type: DONE_LOADING_VM_NEW_DEFAULT
        };
    case ProjectState.LOADING_VM_NEW_DEFAULT_TO_SAVE:
        return {
            type: DONE_LOADING_VM_NEW_DEFAULT_TO_SAVE
        };
    default:
        break;
    }
};

const doneSavingWithId = projectState => {
    switch (projectState) {
    case ProjectState.SAVING_WITH_ID:
        return {
            type: DONE_SAVING_WITH_ID
        };
    case ProjectState.SAVING_WITH_ID_BEFORE_NEW:
        return {
            type: DONE_SAVING_WITH_ID_BEFORE_NEW
        };
    default:
        break;
    }
};

const goToErrorState = errStr => ({
    type: GO_TO_ERROR_STATE,
    errStr: errStr
});

const setHashProjectId = id => ({
    type: SET_HASH_PROJECT_ID,
    id: id
});

const setInitialProjectId = id => ({
    type: SET_INITIAL_PROJECT_ID,
    id: id
});

const stepTowardsCreatingNewProject = () => ({
    type: START_SAVING_BEFORE_CREATING_NEW
});

const stepTowardsNewProjectWithoutSaving = () => ({
    type: START_FETCHING_NEW_WITHOUT_SAVING
});

const startLoadingFileUpload = () => ({
    type: START_LOADING_VM_FILE_UPLOAD
});

const startSaving = () => ({
    type: START_SAVING
});

export {
    reducer as default,
    initialState as projectIdInitialState,
    ProjectState,
    defaultProjectId,
    doneCreatingNew,
    doneLoading,
    doneLoadingFileUpload,
    doneSavingWithId,
    doneFetchingProjectData,
    goToErrorState,
    isFetchingProjectWithNoURLId,
    isFetchingProjectWithId,
    isLoadingProjectWithId,
    isSavingWithId,
    isShowingProject,
    isShowingProjectWithId,
    setHashProjectId,
    setInitialProjectId,
    startLoadingFileUpload,
    startSaving,
    stepTowardsCreatingNewProject,
    stepTowardsNewProjectWithoutSaving
};
