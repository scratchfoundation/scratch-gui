const UPDATE_EDITING_TARGET = 'scratch-gui/targets/UPDATE_EDITING_TARGET';
const UPDATE_TARGET_LIST = 'scratch-gui/targets/UPDATE_TARGET_LIST';

const initialState = {
    sprites: {},
    stage: {}
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case UPDATE_TARGET_LIST:
        return Object.assign({}, state, {
            sprites: action.targets
                .filter(target => !target.isStage)
                .reduce(
                    (targets, target, listId) => Object.assign(
                        targets,
                        {[target.id]: {order: listId, ...target}}
                    ),
                    {}
                ),
            stage: action.targets
                .filter(target => target.isStage)[0] || {}
        });
    case UPDATE_EDITING_TARGET:
        return Object.assign({}, state, {editingTarget: action.target});
    default:
        return state;
    }
};
const updateTargets = function (targetList) {
    return {
        type: UPDATE_TARGET_LIST,
        targets: targetList,
        meta: {
            throttle: 30
        }
    };
};
const updateEditingTarget = function (editingTarget) {
    return {
        type: UPDATE_EDITING_TARGET,
        target: editingTarget,
        meta: {
            throttle: 30
        }
    };
};
export {
    reducer as default,
    updateTargets,
    updateEditingTarget
};
