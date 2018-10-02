import keyMirror from 'keymirror';

const SET_PROJECT_ID = 'scratch-gui/project-id/SET_PROJECT_ID';
const TRANSITION_STATE = 'scratch-gui/project-id/TRANSITION_STATE';

const defaultProjectId = 0; // hardcoded id of default project

const ProjectState = keyMirror({
    NOT_LOADED: null,
    ERROR: null,
    ANY: null,
    FETCHING_WITH_ID: null,
    FETCH_WITH_ID_IF_DIFFERENT: null,
    FETCHING_FILE_UPLOAD: null,
    FETCHING_NEW_DEFAULT: null,
    LOADING_VM_WITH_ID: null,
    LOADING_VM_FILE_UPLOAD: null,
    LOADING_VM_NEW_DEFAULT: null,
    SHOWING_WITH_ID: null,
    SHOWING_FILE_UPLOAD: null,
    SHOWING_NEW_DEFAULT: null,
    SAVING_WITH_ID: null,
    SAVING_WITH_ID_BEFORE_NEW: null
});

const initialState = {
    projectData: null,
    projectId: null,
    projectState: ProjectState.NOT_LOADED
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;

    switch (action.type) {
    // NOTE: delete this action entirely?
    case SET_PROJECT_ID:
        return Object.assign({}, state, {projectId: action.id});
    case TRANSITION_STATE:
        // "from" state must be either an array that includes current project state,
        // or null/undefined
        if (state.projectState in action.transitions || ProjectState.ANY in action.transitions) {
//            const resultState = action.transitions[state.projectState];
            switch (action.transitions[state.projectState] ?
                action.transitions[state.projectState] : action.transitions[ProjectState.ANY]) {
            case ProjectState.FETCHING_WITH_ID:
                return Object.assign({}, state, {
                    projectId: action.id,
                    projectState: ProjectState.FETCHING_WITH_ID
                });
            case ProjectState.FETCH_WITH_ID_IF_DIFFERENT:
                if (state.projectId === action.id) { // don't re-fetch and reload same data
                    return Object.assign({}, state, {
                        projectId: action.id,
                        projectState: ProjectState.SHOWING_WITH_ID
                    });
                }
                // else, it's a new project id, so do fetch it
                return Object.assign({}, state, {
                    projectId: action.id,
                    projectState: ProjectState.FETCHING_WITH_ID
                });
            case ProjectState.FETCHING_FILE_UPLOAD:
                // goes straight to LOADING_VM_FILE_UPLOAD
                return Object.assign({}, state, {
                    projectId: null,
                    projectState: ProjectState.LOADING_VM_FILE_UPLOAD
                });
            case ProjectState.FETCHING_NEW_DEFAULT:
                return Object.assign({}, state, {
                    projectId: defaultProjectId,
                    projectState: ProjectState.FETCHING_NEW_DEFAULT
                });
            case ProjectState.LOADING_VM_WITH_ID:
                return Object.assign({}, state, {
                    projectData: action.data,
                    projectState: ProjectState.LOADING_VM_WITH_ID
                });
            case ProjectState.LOADING_VM_FILE_UPLOAD:
                // goes straight to LOADING_VM_FILE_UPLOAD
                return Object.assign({}, state, {
                    projectData: action.data,
                    projectState: ProjectState.LOADING_VM_FILE_UPLOAD
                });
            case ProjectState.LOADING_VM_NEW_DEFAULT:
                return Object.assign({}, state, {
                    projectData: action.data,
                    projectState: ProjectState.LOADING_VM_NEW_DEFAULT
                });
            default:
                return Object.assign({}, state, {projectState: (action.transitions[state.projectState] ?
                    action.transitions[state.projectState] : action.transitions[ProjectState.ANY])});
            }
        }
        // default to requiring transitions to successfully match current state
        if (action.require || typeof action.require === 'undefined') {
            // NOTE: how to throw error right here?
            console.log(`Error: tried to transition from state ${state.projectState} to states...`);
            console.log(action.transitions);
        }
        break;
    default:
        return state;
    }
};

const setProjectId = function (id) {
    return {
        type: SET_PROJECT_ID,
        id: id
    };
};

// "initial" here refers to being invoked, usually embedded in another app, with a projectId property
const setInitialProjectId = id => ({
    type: TRANSITION_STATE,
    transitions: {
        [ProjectState.NOT_LOADED]: ProjectState.FETCHING_WITH_ID,
        // if alreadin in the middle of fetching, just start fetching over
        [ProjectState.FETCHING_WITH_ID]: ProjectState.FETCHING_WITH_ID,
        [ProjectState.SHOWING_WITH_ID]: ProjectState.FETCH_WITH_ID_IF_DIFFERENT
    },
    id: id
});

const setHashProjectId = id => {
    if (id === defaultProjectId || id === null || typeof id === 'undefined') {
        // it's ok if nothing matches, we may have just stripped the hash.
        // only transition based on seeing no hash if this is the initial load.
        return {
            type: TRANSITION_STATE,
            transitions: {
                // NOTE: add other states like show -> loading_new, check that they work and
                // hash reaction to new or upload doesn't cause this to fire
                [ProjectState.NOT_LOADED]: ProjectState.FETCHING_NEW_DEFAULT
            },
            require: false
        };
    }
    return {
        type: TRANSITION_STATE,
        transitions: {
            [ProjectState.ANY]: ProjectState.FETCHING_WITH_ID
        },
        id: id
    };
};

const fetchedProjectData = data => ({
    type: TRANSITION_STATE,
    transitions: {
        [ProjectState.FETCHING_WITH_ID]: ProjectState.LOADING_VM_WITH_ID,
        [ProjectState.FETCHING_FILE_UPLOAD]: ProjectState.LOADING_VM_FILE_UPLOAD,
        [ProjectState.FETCHING_NEW_DEFAULT]: ProjectState.LOADING_VM_NEW_DEFAULT
    },
    data: data
});


const startFetchingFileUpload = () => ({
    type: TRANSITION_STATE,
    transitions: {
        [ProjectState.NOT_LOADED]: ProjectState.FETCHING_FILE_UPLOAD,
        [ProjectState.SHOWING_WITH_ID]: ProjectState.FETCHING_FILE_UPLOAD,
        [ProjectState.SHOWING_FILE_UPLOAD]: ProjectState.FETCHING_FILE_UPLOAD,
        [ProjectState.SHOWING_NEW_DEFAULT]: ProjectState.FETCHING_FILE_UPLOAD
    }
});

const doneLoadingFileUpload = () => ({
    type: TRANSITION_STATE,
    transitions: {
        [ProjectState.LOADING_VM_FILE_UPLOAD]: ProjectState.SHOWING_FILE_UPLOAD
    }
});

const doneLoading = () => ({
    type: TRANSITION_STATE,
    transitions: {
        [ProjectState.LOADING_VM_WITH_ID]: ProjectState.SHOWING_WITH_ID,
        [ProjectState.LOADING_VM_FILE_UPLOAD]: ProjectState.SHOWING_FILE_UPLOAD,
        [ProjectState.LOADING_VM_NEW_DEFAULT]: ProjectState.SHOWING_NEW_DEFAULT
    }
});

const stepTowardsNewProject = () => ({
    type: TRANSITION_STATE,
    transitions: {
        [ProjectState.SHOWING_WITH_ID]: ProjectState.SAVING_WITH_ID_BEFORE_NEW,
        [ProjectState.SHOWING_FILE_UPLOAD]: ProjectState.FETCHING_NEW_DEFAULT,
        [ProjectState.SHOWING_NEW_DEFAULT]: ProjectState.FETCHING_NEW_DEFAULT
    }
});

const doneSavingWithId = () => ({
    type: TRANSITION_STATE,
    transitions: {
        [ProjectState.SAVING_WITH_ID]: ProjectState.SHOWING_WITH_ID,
        [ProjectState.SAVING_WITH_ID_BEFORE_NEW]: ProjectState.FETCHING_NEW_DEFAULT
    }
});

export {
    reducer as default,
    initialState as projectIdInitialState,
    ProjectState,
    defaultProjectId,
    fetchedProjectData,
    doneLoading,
    doneLoadingFileUpload,
    doneSavingWithId,
    setHashProjectId,
    setInitialProjectId,
    setProjectId,
    startFetchingFileUpload,
    stepTowardsNewProject
};
