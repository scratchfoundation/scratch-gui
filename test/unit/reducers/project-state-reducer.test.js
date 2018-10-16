/* eslint-env jest */
import projectStateReducer from '../../../src/reducers/project-state';
import {
    LoadingState,
    onCreated,
    onError,
    onFetchedProjectData,
    onLoadedProject,
    onProjectUploadStarted,
    onUpdated,
    requestNewProject,
    saveProject,
    setProjectId
} from '../../../src/reducers/project-state';

test('initialState', () => {
    let defaultState;
    /* projectStateReducer(state, action) */
    expect(projectStateReducer(defaultState, {type: 'anything'})).toBeDefined();
    expect(projectStateReducer(defaultState, {type: 'anything'}).errStr).toBe(null);
    expect(projectStateReducer(defaultState, {type: 'anything'}).projectData).toBe(null);
    expect(projectStateReducer(defaultState, {type: 'anything'}).projectId).toBe(null);
    expect(projectStateReducer(defaultState, {type: 'anything'}).loadingState).toBe(LoadingState.NOT_LOADED);
});

test('onCreated with projectId type string shows project with that id', () => {
    const initialState = {
        projectId: null,
        loadingState: LoadingState.CREATING_NEW
    };
    const action = onCreated('100');
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
    expect(resultState.projectId).toBe('100');
});

test('onCreated with projectId type number shows project with id of type number', () => {
    const initialState = {
        projectId: null,
        loadingState: LoadingState.CREATING_NEW
    };
    const action = onCreated(100);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
    expect(resultState.projectId).toBe(100);
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

test('onFetchedProjectData new, to save loads project data into vm, prepares to save next', () => {
    const initialState = {
        projectData: null,
        loadingState: LoadingState.FETCHING_NEW_DEFAULT_TO_SAVE
    };
    const action = onFetchedProjectData('1010101', initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.LOADING_VM_NEW_DEFAULT_TO_SAVE);
    expect(resultState.projectData).toBe('1010101');
});

test('onLoadedProject upload shows without id', () => {
    const initialState = {
        loadingState: LoadingState.LOADING_VM_FILE_UPLOAD
    };
    const action = onLoadedProject(initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITHOUT_ID);
});

test('onLoadedProject with id shows with id', () => {
    const initialState = {
        loadingState: LoadingState.LOADING_VM_WITH_ID
    };
    const action = onLoadedProject(initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
});

test('onLoadedProject new shows without id', () => {
    const initialState = {
        loadingState: LoadingState.LOADING_VM_NEW_DEFAULT
    };
    const action = onLoadedProject(initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITHOUT_ID);
});

test('onLoadedProject new, to save shows with id', () => {
    const initialState = {
        loadingState: LoadingState.LOADING_VM_NEW_DEFAULT_TO_SAVE
    };
    const action = onLoadedProject(initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
});

test('onUpdated with id shows with id', () => {
    const initialState = {
        loadingState: LoadingState.SAVING_WITH_ID
    };
    const action = onUpdated(initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SHOWING_WITH_ID);
});

test('onUpdated with id, before new, fetches default project', () => {
    const initialState = {
        loadingState: LoadingState.SAVING_WITH_ID_BEFORE_NEW
    };
    const action = onUpdated(initialState.loadingState);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.FETCHING_NEW_DEFAULT_TO_SAVE);
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

test('requestNewProject, when can\'t save, should fetch default project without id', () => {
    const initialState = {
        loadingState: LoadingState.SHOWING_WITHOUT_ID
    };
    const action = requestNewProject(false);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.FETCHING_NEW_DEFAULT);
});

test('requestNewProject, when can save, should save and prepare to fetch default project', () => {
    const initialState = {
        loadingState: LoadingState.SHOWING_WITH_ID
    };
    const action = requestNewProject(true);
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SAVING_WITH_ID_BEFORE_NEW);
});

test('onProjectUploadStarted when project not loaded should load', () => {
    const initialState = {
        loadingState: LoadingState.NOT_LOADED
    };
    const action = onProjectUploadStarted();
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.LOADING_VM_FILE_UPLOAD);
});

test('onProjectUploadStarted when showing project with id should load', () => {
    const initialState = {
        loadingState: LoadingState.SHOWING_WITH_ID
    };
    const action = onProjectUploadStarted();
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.LOADING_VM_FILE_UPLOAD);
});

test('onProjectUploadStarted when showing project without id should load', () => {
    const initialState = {
        loadingState: LoadingState.SHOWING_WITHOUT_ID
    };
    const action = onProjectUploadStarted();
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.LOADING_VM_FILE_UPLOAD);
});

test('saveProject should prepare to save', () => {
    const initialState = {
        loadingState: LoadingState.SHOWING_WITH_ID
    };
    const action = saveProject();
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.SAVING_WITH_ID);
});

test('onError from unloaded state should show error', () => {
    const initialState = {
        errStr: null,
        loadingState: LoadingState.NOT_LOADED
    };
    const action = onError('Error string');
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.ERROR);
    expect(resultState.errStr).toBe('Error string');
});

test('onError from showing project should show error', () => {
    const initialState = {
        errStr: null,
        loadingState: LoadingState.FETCHING_WITH_ID
    };
    const action = onError('Error string');
    const resultState = projectStateReducer(initialState, action);
    expect(resultState.loadingState).toBe(LoadingState.ERROR);
    expect(resultState.errStr).toBe('Error string');
});
