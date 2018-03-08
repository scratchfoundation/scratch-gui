import {setEditingCostumeIndex} from './editing-costume-index';

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
const updateTargets_ = function (targetList) {
    return {
        type: UPDATE_TARGET_LIST,
        targets: targetList,
        meta: {
            throttle: 30
        }
    };
};
const updateTargets = function (editingTarget, targetList) {
    return function (dispatch, getState) {
        const state = getState();
        if (!editingTarget || !targetList || !state.targets || !state.targets.sprites) {
            dispatch(updateTargets_(targetList));
            return Promise.resolve();
        }

        // Detect if a costume has been deleted from the editing target.
        // If so, update the editing costume index to the target's current costume.
        let oldCostumes = 0;
        if (state.targets.stage.id === editingTarget) {
            oldCostumes = state.targets.stage.costumeCount;
        } else {
            for (const sprite in state.targets.sprites) {
                if (state.targets.sprites.hasOwnProperty(sprite) &&
                        sprite === editingTarget) {
                    oldCostumes = state.targets.sprites[sprite].costumeCount;
                    break;
                }
            }
        }
        for (const target of targetList) {
            if (target.id === editingTarget) {
                const newCostumes = target.costumeCount;
                if (newCostumes < oldCostumes) {
                    dispatch(setEditingCostumeIndex(target.currentCostume));
                }
                break;
            }
        }
        dispatch(updateTargets_(targetList));
        return Promise.resolve();
    };
};
const updateEditingTarget_ = function (editingTarget) {
    return {
        type: UPDATE_EDITING_TARGET,
        target: editingTarget,
        meta: {
            throttle: 30
        }
    };
};
/* Updates editing target and editing costume index */
const updateEditingTarget = function (editingTarget, targetList) {
    return function (dispatch, getState) {
        // No change
        if (getState().targets.editingTarget === editingTarget) {
            return Promise.resolve();
        }

        // Changing the editing target to null
        if (!editingTarget || !targetList) {
            dispatch(updateEditingTarget_(editingTarget));
            return Promise.resolve();
        }

        // When the editing target is changed, also update the editing costume index
        let index = 0;
        for (const target of targetList) {
            if (target.id === editingTarget) {
                index = target.currentCostume;
                break;
            }
        }
        dispatch(updateEditingTarget_(editingTarget));
        dispatch(setEditingCostumeIndex(index));
        return Promise.resolve();
    };
};
export {
    reducer as default,
    updateTargets,
    updateEditingTarget
};
