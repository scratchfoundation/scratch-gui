const ACTIVATE_ARTIE_EXERCISES = 'scratch-gui/artie-exercises/ACTIVATE_ARTIE_EXERCISES';
const DEACTIVATE_ARTIE_EXERCISES = 'scratch-gui/artie-exercises/DEACTIVATE_ARTIE_EXERCISES';
const ARTIE_SET_EXERCISES = 'scratch-gui/artie-exercises/ARTIE_SET_EXERCISES';
const ARTIE_SET_CURRENT_EXERCISE = 'scratch-gui/artie-exercises/ARTIE_SET_CURRENT_EXERCISE';
const ARTIE_CLEAR_EXERCISES = 'scratch-gui/artie-exercises/ARTIE_CLEAR_EXERCISES';
const ARTIE_BLOCKS_UPDATED = 'scratch-gui/artie-exercises/ARTIE_BLOCKS_UPDATED';
const ARTIE_BLOCKS_NEED_UPDATE = 'scratch-gui/artie-exercises/ARTIE_BLOCKS_NEED_UPDATE';

const initialState = {
    exercises: [],
    currentExercise: null,
    blocks: null,
    active : false,
    needUpdate: false
}

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {

        case ACTIVATE_ARTIE_EXERCISES:
            return Object.assign({}, state, {
                active: true
            });
        case DEACTIVATE_ARTIE_EXERCISES:
            return Object.assign({}, state, {
                active: false
            });
        case ARTIE_SET_CURRENT_EXERCISE:
            return Object.assign({}, state, {
                currentExercise: action.currentExercise
            });
        case ARTIE_SET_EXERCISES:
            return Object.assign({}, state, {
                exercises: action.exercises
            });
        case ARTIE_CLEAR_EXERCISES:
            return Object.assign({}, state, {
                exercises: [],
                currentExercise: null,
                needUpdate: false,
                blocks: null
            });
        case ARTIE_BLOCKS_UPDATED:
            return Object.assign({}, state, {
                blocks: action.blocks
            });
        case ARTIE_BLOCKS_NEED_UPDATE:
            return Object.assign({}, state, {
                needUpdate: action.needUpdate
            });
        default:
            return state;
    }
}

const activateArtieExercises= () =>({
    type: ACTIVATE_ARTIE_EXERCISES
});

const deactivateArtieExercises = () =>({
    type: DEACTIVATE_ARTIE_EXERCISES
});

const artieSetExercises = (exercises) => ({
    type: ARTIE_SET_EXERCISES,
    exercises: exercises
});

const artieSetCurrentExercise = (currentExercise) => ({
    type: ARTIE_SET_CURRENT_EXERCISE,
    currentExercise: currentExercise
});

const artieClearExercises = () => ({
    type: ARTIE_CLEAR_EXERCISES
});

const artieBlocksUpdated = (blocks) => ({
    type: ARTIE_BLOCKS_UPDATED,
    blocks: blocks,
    needUpdate: false
});

const artieBlocksNeedUpdate = () => ({
    type: ARTIE_BLOCKS_NEED_UPDATE,
    needUpdate: true
});


export {
    reducer as default,
    initialState as artieLoginInitialState,
    activateArtieExercises,
    deactivateArtieExercises,
    artieSetExercises,
    artieSetCurrentExercise,
    artieClearExercises,
    artieBlocksUpdated,
    artieBlocksNeedUpdate
};
