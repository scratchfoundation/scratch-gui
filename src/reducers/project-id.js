import keyMirror from 'keymirror';

const TRANSITION_STATE = 'scratch-gui/project-id/TRANSITION_STATE';

const defaultProjectId = 0; // hardcoded id of default project

const ProjectState = keyMirror({
    NOT_LOADED: null,
    ERROR: null,
    ANY: null,
    FETCHING_WITH_ID: null,
    FETCH_WITH_ID_IF_DIFFERENT: null, // NOTE: revisit this. is it doing anything?
    FETCHING_FILE_UPLOAD: null,
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

// Note that FETCHING_NEW_DEFAULT has an id (0), but that id should not show in
// any URL.
const isFetchingProjectWithNoURLId = projectState => (
    projectState === ProjectState.FETCHING_FILE_UPLOAD ||
        projectState === ProjectState.FETCHING_NEW_DEFAULT ||
        projectState === ProjectState.FETCHING_NEW_DEFAULT_TO_SAVE
);
const isFetchingProjectWithId = projectState => (
    projectState === ProjectState.FETCHING_WITH_ID ||
        projectState === ProjectState.FETCHING_NEW_DEFAULT
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
    // Why can't this state machine be handled by separate actions?
    // e.g., couldn't we do something like:
    //
    // case DONE_CREATING_NEW:
    //     return Object.assign({}, state, {
    //         projectId: action.id,
    //         projectState: state.projectState in [ProjectState.CREATING_NEW] ?
    //             ProjectState.SHOWING_WITH_ID : ProjectState.ERROR
    //     });
    // ???
    //
    // Yes, we could. But for more complex transitions, we'd have to do something ugly and repetitive like:
    // case STEP_TOWARDS_NEW_PROJECT:
    //     return Object.assign({}, state, {
    //         projectId: state.projectState in [ProjectState.SHOWING_FILE_UPLOAD, ProjectState.SHOWING_NEW_DEFAULT]
    //            ? action.id : state.projectId,
    //         projectState: state.projectState in
    //             {
    //                 [
    //                  ProjectState.SHOWING_WITH_ID,
    //                  ProjectState.SHOWING_FILE_UPLOAD,
    //                  ProjectState.SHOWING_NEW_DEFAULT
    //                 ]
    //             } ? {
    //                 [ProjectState.SHOWING_WITH_ID]: ProjectState.SAVING_WITH_ID_BEFORE_NEW,
    //                 [ProjectState.SHOWING_FILE_UPLOAD]: ProjectState.FETCHING_NEW_DEFAULT,
    //                 [ProjectState.SHOWING_NEW_DEFAULT]: ProjectState.FETCHING_NEW_DEFAULT
    //             }[state.projectState] : ProjectState.ERROR
    //     });
    case TRANSITION_STATE:
        // projectState must match a "from" state in the set of transitions, or there
        // can be an "ANY" state that will always match
        if (state.projectState in action.transitions || ProjectState.ANY in action.transitions) {
            switch (action.transitions[state.projectState] ?
                action.transitions[state.projectState] : action.transitions[ProjectState.ANY]) {
            // NOTE: have folks listen for error
            case ProjectState.ERROR:
                return Object.assign({}, state, {
                    errStr: action.errStr,
                    projectState: ProjectState.ERROR
                });
            case ProjectState.FETCHING_WITH_ID:
                return Object.assign({}, state, {
                    projectId: action.id,
                    projectState: ProjectState.FETCHING_WITH_ID
                });
            case ProjectState.FETCH_WITH_ID_IF_DIFFERENT:
                // don't re-fetch and reload same data
                if (state.projectId === action.id) {
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
            case ProjectState.SHOWING_WITH_ID:
                // we may need to set project id, e.g. if we just created new project
                if (typeof action.id !== 'undefined') {
                    return Object.assign({}, state, {
                        projectId: action.id,
                        projectState: ProjectState.SHOWING_WITH_ID
                    });
                }
                return Object.assign({}, state, {
                    projectState: ProjectState.SHOWING_WITH_ID
                });
            default:
                return Object.assign({}, state, {projectState: (action.transitions[state.projectState] ?
                    action.transitions[state.projectState] : action.transitions[ProjectState.ANY])});
            }
        }
        // default to requiring transitions to successfully match current state
        if (action.require || typeof action.require === 'undefined') {
            return Object.assign({}, state, {
                errStr: `transition called from state ${state.projectState} with transions ${action.transitions}`,
                projectState: ProjectState.ERROR
            });
        }
        break;
    default:
        return state;
    }
};

const goToErrorState = errStr => ({
    type: TRANSITION_STATE,
    transitions: {
        [ProjectState.ANY]: ProjectState.ERROR
    },
    errStr: errStr
});

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
        [ProjectState.FETCHING_NEW_DEFAULT]: ProjectState.LOADING_VM_NEW_DEFAULT,
        [ProjectState.FETCHING_NEW_DEFAULT_TO_SAVE]: ProjectState.LOADING_VM_NEW_DEFAULT_TO_SAVE
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
        [ProjectState.LOADING_VM_NEW_DEFAULT]: ProjectState.SHOWING_NEW_DEFAULT,
        [ProjectState.LOADING_VM_NEW_DEFAULT_TO_SAVE]: ProjectState.CREATING_NEW
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
        [ProjectState.SAVING_WITH_ID_BEFORE_NEW]: ProjectState.FETCHING_NEW_DEFAULT_TO_SAVE
    }
});

const doneCreatingNew = id => ({
    type: TRANSITION_STATE,
    transitions: {
        // no need to load, we should always have data already in vm
        [ProjectState.CREATING_NEW]: ProjectState.SHOWING_WITH_ID
    },
    id: id
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
    fetchedProjectData,
    goToErrorState,
    isFetchingProjectWithNoURLId,
    isFetchingProjectWithId,
    isLoadingProjectWithId,
    isSavingWithId,
    isShowingProject,
    isShowingProjectWithId,
    setHashProjectId,
    setInitialProjectId,
    startFetchingFileUpload,
    stepTowardsNewProject
};
