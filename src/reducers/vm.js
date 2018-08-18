import VM from 'scratch-vm';
import storage from '../lib/storage';

const SET_VM = 'scratch-gui/vm/SET_VM';
const defaultVM = new VM();
defaultVM.attachStorage(storage);
const initialState = defaultVM;

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_VM:
        return action.vm;
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
export {
    reducer as default,
    initialState as vmInitialState,
    setVM
};
