const defaultsDeep = require('lodash.defaultsdeep');

const UPDATE_EDITING_TARGET = 'scratch-gui/targets/UPDATE_EDITING_TARGET';
const UPDATE_TARGET_LIST = 'scratch-gui/targets/UPDATE_TARGET_LIST';
const UPDATE_TARGET = 'scratch/targets/UPDATE_TARGET';

const initialState = {
    targets: {}
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case UPDATE_TARGET:
        return Object.assign({}, state, {
            targets: defaultsDeep(
                {[action.target.id]: action.target},
                state.targets
            )
        });
    case UPDATE_TARGET_LIST:
        return Object.assign({}, state, {
            targets: action.targets.reduce(
                (targets, target, listId) => defaultsDeep(
                    {[target[0]]: {name: target[1], order: listId}},
                    {[target[0]]: state.targets[target[0]]},
                    targets
                ),
                {}
            )
        });
    case UPDATE_EDITING_TARGET:
        return Object.assign({}, state, {editingTarget: action.target});
    default:
        return state;
    }
};
reducer.updateTarget = function (target) {
    return {
        type: UPDATE_TARGET,
        target: target
    };
};
reducer.updateTargets = function (targetList) {
    return {
        type: UPDATE_TARGET_LIST,
        targets: targetList
    };
};
reducer.updateEditingTarget = function (editingTarget) {
    return {
        type: UPDATE_EDITING_TARGET,
        target: editingTarget
    };
};
module.exports = reducer;
