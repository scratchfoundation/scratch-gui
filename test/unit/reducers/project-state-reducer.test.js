/* eslint-env jest */
import projectStateReducer from '../../../src/reducers/project-state';
import {
    LoadingState,
    autoUpdateProject,
    doneCreatingProject,
    doneUpdatingProject,
    manualUpdateProject,
    onFetchedProjectData,
    onLoadedProject,
    projectError,
    remixProject,
    requestNewProject,
    requestProjectUpload,
    saveProjectAsCopy,
    setProjectId
} from '../../../src/reducers/project-state';

test('initialState', () => {
    let defaultState;
    /* projectStateReducer(state, action) */
    expect(projectStateReducer(defaultState, {type: 'anything'})).toBeDefined();
    expect(projectStateReducer(defaultState, {type: 'anything'}).error).toBe(null);
    expect(projectStateReducer(defaultState, {type: 'anything'}).projectData).toBe(null);
    expect(projectStateReducer(defaultState, {type: 'anything'}).projectId).toBe(null);
    expect(projectStateReducer(defaultState, {type: 'anything'}).loadingState).toBe(LoadingState.NOT_LOADED);
});

test('doneCreatingProject for new project with projectId type string shows project with that id', () => {
    const initialState = {
        projectId: null,
        loadingState: LoadingState.CREATING_NEW
    };
    const action = doneCreatingProject('100', initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
    expect(resultState.projectId).toBe('100');
});

test('doneCreatingProject for new project with projectId type number shows project with id of type number', () => {
    const initialState = {
        projectId: null,
        loadingState: LoadingState.CREATING_NEW
    };
    const action = doneCreatingProject(100, initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
    expect(resultState.projectId).toBe(100);
});

test('doneCreatingProject for remix shows project with that id', () => {
    const initialState = {
        projectId: null,
        loadingState: LoadingState.REMIXING
    };
    const action = doneCreatingProject('100', initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
    expect(resultState.projectId).toBe('100');
});

test('doneCreatingProject for save as copy shows project with that id', () => {
    const initialState = {
        projectId: null,
        loadingState: LoadingState.CREATING_COPY
    };
    const action = doneCreatingProject('100', initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
    expect(resultState.projectId).toBe('100');
});

test('onFetchedProjectData with id loads project data into vm', () => {
    const initialState = {
        projectData: null,
        loadingState: LoadingState.FETCHING_WITH_ID
    };
    const action = onFetchedProjectData('1010101', initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.LOADING_VM_WITH_ID);
    expect(resultState.projectData).toBe('1010101');
});

test('onFetchedProjectData new loads project data into vm', () => {
    const initialState = {
        projectData: null,
        loadingState: LoadingState.FETCHING_NEW_DEFAULT
    };
    const action = onFetchedProjectData('1010101', initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.LOADING_VM_NEW_DEFAULT);
    expect(resultState.projectData).toBe('1010101');
});

test('onLoadedProject upload, with canSave false, shows without id', () => {
    const initialState = {
        loadingState: LoadingState.LOADING_VM_FILE_UPLOAD
    };
    const action = onLoadedProject(initialState.loadingState, false, true);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITHOUT_ID);
});

test('onLoadedProject upload, with canSave true, prepares to save', () => {
    const initialState = {
        loadingState: LoadingState.LOADING_VM_FILE_UPLOAD
    };
    const action = onLoadedProject(initialState.loadingState, true, true);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.AUTO_UPDATING);
});

test('onLoadedProject with id shows with id', () => {
    const initialState = {
        loadingState: LoadingState.LOADING_VM_WITH_ID
    };
    const action = onLoadedProject(initialState.loadingState, true, true);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
});

test('onLoadedProject new shows without id', () => {
    const initialState = {
        loadingState: LoadingState.LOADING_VM_NEW_DEFAULT
    };
    const action = onLoadedProject(initialState.loadingState, false, true);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITHOUT_ID);
});

test('onLoadedProject new, to save shows without id', () => {
    const initialState = {
        loadingState: LoadingState.LOADING_VM_NEW_DEFAULT
    };
    const action = onLoadedProject(initialState.loadingState, true, true);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITHOUT_ID);
});

test('onLoadedProject with success false, no project id, shows without id', () => {
    const initialState = {
        loadingState: LoadingState.LOADING_VM_WITH_ID,
        projectId: null
    };
    const action = onLoadedProject(initialState.loadingState, false, false);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITHOUT_ID);
});

test('onLoadedProject with success false, valid project id, shows with id', () => {
    const initialState = {
        loadingState: LoadingState.LOADING_VM_WITH_ID,
        projectId: '12345'
    };
    const action = onLoadedProject(initialState.loadingState, false, false);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
});

test('doneUpdatingProject with id shows with id', () => {
    const initialState = {
        loadingState: LoadingState.MANUAL_UPDATING
    };
    const action = doneUpdatingProject(initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
});

test('doneUpdatingProject with id, before copy, creates copy', () => {
    const initialState = {
        loadingState: LoadingState.UPDATING_BEFORE_COPY
    };
    const action = doneUpdatingProject(initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.CREATING_COPY);
});

test('doneUpdatingProject with id, before new, fetches default project', () => {
    const initialState = {
        loadingState: LoadingState.UPDATING_BEFORE_NEW
    };
    const action = doneUpdatingProject(initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.FETCHING_NEW_DEFAULT);
});

test('setProjectId, with same id as before, should show with id, not fetch', () => {
    const initialState = {
        projectId: '100',
        loadingState: LoadingState.SHOWING_WITH_ID
    };
    const action = setProjectId('100');
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
    expect(resultState.projectId).toBe('100');
});

test('setProjectId, with different id as before, should fetch with id, not show with id', () => {
    const initialState = {
        projectId: 99,
        loadingState: LoadingState.SHOWING_WITH_ID
    };
    const action = setProjectId('100');
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.FETCHING_WITH_ID);
    expect(resultState.projectId).toBe('100');
});

test('setProjectId, with same id as before, but not same type, should fetch because not ===', () => {
    const initialState = {
        projectId: '100',
        loadingState: LoadingState.SHOWING_WITH_ID
    };
    const action = setProjectId(100);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.FETCHING_WITH_ID);
    expect(resultState.projectId).toBe(100);
});

test('requestNewProject, when can\'t create new, should fetch default project without id', () => {
    const initialState = {
        loadingState: LoadingState.SHOWING_WITHOUT_ID
    };
    const action = requestNewProject(false);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.FETCHING_NEW_DEFAULT);
});

test('requestNewProject, when can create new, should save and prepare to fetch default project', () => {
    const initialState = {
        loadingState: LoadingState.SHOWING_WITH_ID
    };
    const action = requestNewProject(true);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.UPDATING_BEFORE_NEW);
});

test('requestProjectUpload when project not loaded should load', () => {
    const initialState = {
        loadingState: LoadingState.NOT_LOADED
    };
    const action = requestProjectUpload(initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.LOADING_VM_FILE_UPLOAD);
});

test('requestProjectUpload when showing project with id should load', () => {
    const initialState = {
        loadingState: LoadingState.SHOWING_WITH_ID
    };
    const action = requestProjectUpload(initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.LOADING_VM_FILE_UPLOAD);
});

test('requestProjectUpload when showing project without id should load', () => {
    const initialState = {
        loadingState: LoadingState.SHOWING_WITHOUT_ID
    };
    const action = requestProjectUpload(initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.LOADING_VM_FILE_UPLOAD);
});

test('manualUpdateProject should prepare to update', () => {
    const initialState = {
        loadingState: LoadingState.SHOWING_WITH_ID
    };
    const action = manualUpdateProject();
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.MANUAL_UPDATING);
});

test('autoUpdateProject should prepare to update', () => {
    const initialState = {
        loadingState: LoadingState.SHOWING_WITH_ID
    };
    const action = autoUpdateProject();
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.AUTO_UPDATING);
});

test('saveProjectAsCopy should save, before preparing to save as a copy', () => {
    const initialState = {
        loadingState: LoadingState.SHOWING_WITH_ID
    };
    const action = saveProjectAsCopy();
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.UPDATING_BEFORE_COPY);
});

test('remixProject should prepare to remix', () => {
    const initialState = {
        loadingState: LoadingState.SHOWING_WITH_ID
    };
    const action = remixProject();
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.REMIXING);
});

test('projectError from various states should show error', () => {
    const startStates = [
        LoadingState.AUTO_UPDATING,
        LoadingState.CREATING_NEW,
        LoadingState.FETCHING_NEW_DEFAULT,
        LoadingState.FETCHING_WITH_ID,
        LoadingState.LOADING_VM_NEW_DEFAULT,
        LoadingState.LOADING_VM_WITH_ID,
        LoadingState.MANUAL_UPDATING,
        LoadingState.REMIXING,
        LoadingState.CREATING_COPY,
        LoadingState.UPDATING_BEFORE_NEW
    ];
    for (const startState of startStates) {
        const initialState = {
            error: null,
            loadingState: startState
        };
        const action = projectError('Error string');
        const resultState = projectStateReducer(initialState, action);
        expect(resultState.error).toEqual('Error string');
    }
});

test('fatal projectError should show error state', () => {
    const startStates = [
        LoadingState.FETCHING_NEW_DEFAULT,
        LoadingState.FETCHING_WITH_ID,
        LoadingState.LOADING_VM_NEW_DEFAULT,
        LoadingState.LOADING_VM_WITH_ID
    ];
    for (const startState of startStates) {
        const initialState = {
            error: null,
            loadingState: startState
        };
        const action = projectError('Error string');
        const resultState = projectStateReducer(initialState, action);
        expect(resultState.loadingState).toBe(LoadingState.ERROR);
    }
});

test('non-fatal projectError should show normal state', () => {
    const startStates = [
        LoadingState.AUTO_UPDATING,
        LoadingState.CREATING_COPY,
        LoadingState.MANUAL_UPDATING,
        LoadingState.REMIXING,
        LoadingState.UPDATING_BEFORE_NEW
    ];
    for (const startState of startStates) {
        const initialState = {
            error: null,
            loadingState: startState
        };
        const action = projectError('Error string');
        const resultState = projectStateReducer(initialState, action);
        expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
    }
});

test('projectError when creating new while viewing project with id should show project with id', () => {
    const initialState = {
        error: null,
        loadingState: LoadingState.CREATING_NEW,
        projectId: '12345'
    };
    const action = projectError('Error string');
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
});

test('projectError when creating new while logged out, looking at default project should show default project', () => {
    const initialState = {
        error: null,
        loadingState: LoadingState.CREATING_NEW,
        projectId: '0'
    };
    const action = projectError('Error string');
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITHOUT_ID);
});

test('projectError from showing project should show error', () => {
    const initialState = {
        error: null,
        loadingState: LoadingState.FETCHING_WITH_ID
    };
    const action = projectError('Error string');
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.ERROR);
    expect(resultState.error).toEqual('Error string');
});
