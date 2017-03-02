const defaultsDeep = require('lodash.defaultsdeep');

const UPDATE_EDITING_TARGET = 'scratch-gui/targets/UPDATE_EDITING_TARGET';
const UPDATE_TARGET_LIST = 'scratch-gui/targets/UPDATE_TARGET_LIST';
const UPDATE_TARGET = 'scratch/targets/UPDATE_TARGET';

const initialState = {
    sprites: {},
    stage: {}
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case UPDATE_TARGET:
        if (action.target.id === state.stage.id) {
            return Object.assign({}, state, {
                stage: Object.assign({}, state.stage, action.target)
            });
        }
        return Object.assign({}, state, {
            sprites: defaultsDeep(
                {[action.target.id]: action.target},
                state.sprites
            )
        });
    case UPDATE_TARGET_LIST:
        return Object.assign({}, state, {
            sprites: action.targets
                .filter(target => !target.isStage)
                .reduce(
                    (targets, target, listId) => defaultsDeep(
                        {[target.id]: {order: listId, ...target}},
                        {[target.id]: state.sprites[target.id]},
                        targets
                    ),
                    {}
                ),
            stage: action.targets
                .filter(target => target.isStage)
                .reduce(
                    (stage, target) => {
                        if (target.id !== stage.id) return target;
                        return defaultsDeep(target, stage);
                    },
                    state.stage
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
        target: target,
        meta: {
            throttle: 30
        }
    };
};
reducer.updateTargets = function (targetList) {
    return {
        type: UPDATE_TARGET_LIST,
        targets: targetList,
        meta: {
            throttle: 30
        }
    };
};
reducer.updateEditingTarget = function (editingTarget) {
    return {
        type: UPDATE_EDITING_TARGET,
        target: editingTarget,
        meta: {
            throttle: 30
        }
    };
};
module.exports = reducer;
