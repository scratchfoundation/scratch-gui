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
                .filter(target => target.isStage)[0] || {},
            editingTarget: action.editingTarget
        });
    default:
        return state;
    }
};
const updateTargets = function (targetList, editingTarget) {
    return {
        type: UPDATE_TARGET_LIST,
        targets: targetList,
        editingTarget: editingTarget,
        meta: {
            throttle: 30
        }
    };
};
export {
    reducer as default,
    initialState as targetsInitialState,
    updateTargets
};
