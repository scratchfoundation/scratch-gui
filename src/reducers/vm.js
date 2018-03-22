import VM from 'scratch-vm';
import storage from '../lib/storage';

const SET_VM = 'scratch-gui/vm/SET_VM';
const SET_PROJECT_ID = 'scratch-gui/vm/SET_PROJECT_ID';
const SET_PROJECT_DATA = 'scratch-gui/vm/SET_PROJECT_DATA';

const defaultVM = new VM();
defaultVM.attachStorage(storage);
const initialState = {
    vm: defaultVM,
    projectData: null,
    projectId: null // 0 means default project, null or undefined means project from local file
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_VM:
        return Object.assign({}, state, {vm: action.vm});
    case SET_PROJECT_ID:
        return Object.assign({}, state, {projectId: action.projectId});
    case SET_PROJECT_DATA:
        return Object.assign({}, state, {
            projectData: action.projectData,
            projectId: action.projectId
        });
    default:
        return state;
    }
};
const setVM = function (vm) {
    return {
        type: SET_VM,
        vm: vm
    };
};
const setProjectId = function (projectId) {
    return {
        type: SET_PROJECT_ID,
        projectId: projectId
    };
};
const setProjectData = function (projectData, projectId) {
    return {
        type: SET_PROJECT_DATA,
        projectData: projectData,
        projectId: projectId
    };
};
export {
    reducer as default,
    setVM,
    setProjectId,
    setProjectData
};
