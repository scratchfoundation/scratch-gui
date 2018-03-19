// Controls the index of the editing target's costume shown in the paint editor.
// This doesn't always match the current costume of the editing target, as the costume
// shouldn't switch under you in the paint editor if the project is running in the background
import {UPDATE_TARGET_LIST} from './targets';

const SET_EDITING_COSTUME_INDEX = 'scratch-gui/costume-tab/SET_EDITING_COSTUME_INDEX';

const initialState = 0;

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_EDITING_COSTUME_INDEX:
        return action.index;
    // Changing the editing target or the number of costumes should trigger a costume
    // change in the paint editor
    case UPDATE_TARGET_LIST:
        return action.editingCostume;
    default:
        return state;
    }
};

const setEditingCostumeIndex = function (index) {
    return {
        type: SET_EDITING_COSTUME_INDEX,
        index: index
    };
};

export {
    reducer as default,
    setEditingCostumeIndex
};
