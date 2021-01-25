const ACTIVATE_ARTIE_EXERCISES = 'scratch-gui/artie-exercises/ACTIVATE_ARTIE_EXERCISES';
const DEACTIVATE_ARTIE_EXERCISES = 'scratch-gui/artie-exercises/DEACTIVATE_ARTIE_EXERCISES';
const ARTIE_SET_EXERCISES = 'scratch-gui/artie-exercises/ARTIE_SET_EXERCISES';
const ARTIE_SET_CURRENT_EXERCISE = 'scratch-gui/artie-exercises/ARTIE_SET_CURRENT_EXERCISE';
const ARTIE_CLEAR_EXERCISES = 'scratch-gui/artie-exercises/ARTIE_CLEAR_EXERCISES';
const ARTIE_BLOCKS_UPDATED = 'scratch-gui/artie-exercises/ARTIE_BLOCKS_UPDATED';
const ARTIE_HELP_RECEIVED = 'scratch-gui/artie-exercises/ARTIE_HELP_RECEIVED';
const ARTIE_CLEAR_HELP = 'scratch-gui/artie-exercises/ARTIE_CLEAR_HELP';
const ARTIE_SENDING_SOLUTION = 'scratch-gui/artie-exercises/ARTIE_SENDING_SOLUTION';
const ARTIE_SOLUTION_SENT = 'scratch-gui/artie-exercises/ARTIE_SOLUTION_SENT';


const initialState = {
    exercises: [],
    currentExercise: null,
    blocks: null,
    active : false,
    help: null,
    loading: false
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
        case ARTIE_HELP_RECEIVED:
            return Object.assign({}, state, {
                help: action.help
            });
        case ARTIE_CLEAR_HELP:
            return Object.assign({}, state, {
                help: null
            });
        case ARTIE_SENDING_SOLUTION:
            return Object.assign({}, state, {
                loading: true
            });
        case ARTIE_SOLUTION_SENT:
            return Object.assign({}, state, {
                loading: false
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

const artieHelpReceived = (help) => ({
    type: ARTIE_HELP_RECEIVED,
    help: help
});

const artieClearHelp = () => ({
    type: ARTIE_CLEAR_HELP
});

const artieSendingSolution = () => ({
    type: ARTIE_SENDING_SOLUTION
});

const artieSolutionSent = () => ({
    type: ARTIE_SOLUTION_SENT
});


export {
    reducer as default,
    initialState as artieExercisesInitialState,
    activateArtieExercises,
    deactivateArtieExercises,
    artieSetExercises,
    artieSetCurrentExercise,
    artieClearExercises,
    artieBlocksUpdated,
    artieHelpReceived,
    artieClearHelp,
    artieSendingSolution,
    artieSolutionSent
};
