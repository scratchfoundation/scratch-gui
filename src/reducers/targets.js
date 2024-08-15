const UPDATE_TARGET_LIST = 'scratch-gui/targets/UPDATE_TARGET_LIST';
const HIGHLIGHT_TARGET = 'scratch-gui/targets/HIGHLIGHT_TARGET';

const initialState = {
    sprites: {},
    stage: {},
    highlightedTargetId: null,
    highlightedTargetTime: null
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
    case HIGHLIGHT_TARGET:
        return Object.assign({}, state, {
            highlightedTargetId: action.targetId,
            highlightedTargetTime: action.updateTime
        });
    default:
        return state;
    }
};
const updateTargets = function (targetList, editingTarget) {
    return {
        type: UPDATE_TARGET_LIST,
        targets: targetList,
        editingTarget: editingTarget
    };
};
const highlightTarget = function (targetId) {
    return {
        type: HIGHLIGHT_TARGET,
        targetId: targetId,
        updateTime: Date.now()
    };
};
export {
    reducer as default,
    initialState as targetsInitialState,
    updateTargets,
    highlightTarget
};
