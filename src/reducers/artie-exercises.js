const ACTIVATE_ARTIE_EXERCISES = 'scratch-gui/artie-exercises/ACTIVATE_ARTIE_EXERCISES';
const DEACTIVATE_ARTIE_EXERCISES = 'scratch-gui/artie-exercises/DEACTIVATE_ARTIE_EXERCISES';
const ARTIE_SET_EXERCISES = 'scratch-gui/artie-exercises/ARTIE_SET_EXERCISES';
const ARTIE_SET_CURRENT_EXERCISE = 'scratch-gui/artie-exercises/ARTIE_SET_CURRENT_EXERCISE';
const ARTIE_CLEAR_EXERCISES = 'scratch-gui/artie-exercises/ARTIE_CLEAR_EXERCISES';
const ARTIE_BLOCKS_UPDATED = 'scratch-gui/artie-exercises/ARTIE_BLOCKS_UPDATED';
const ARTIE_HELP_RECEIVED = 'scratch-gui/artie-exercises/ARTIE_HELP_RECEIVED';
const ARTIE_CLEAR_HELP = 'scratch-gui/artie-exercises/ARTIE_CLEAR_HELP';
const ARTIE_RESET_SECONDS_HELP_OPEN = 'scratch-gui/artie-exercises/ARTIE_RESET_SECONDS_HELP_OPEN';

const ARTIE_SENDING_SOLUTION = 'scratch-gui/artie-exercises/ARTIE_SENDING_SOLUTION';
const ARTIE_SENDING_EXERCISE = 'scratch-gui/artie-exercises/ARTIE_SENDING_EXERCISE';
const ARTIE_SENDING_HELP = 'scratch-gui/artie-exercises/ARTIE_SENDING_HELP';
const ARTIE_POPUP_SENT_SOLUTION = 'scratch-gui/artie-exercises/ARTIE_POPUP_SENT_SOLUTION';
const ARTIE_POPUP_SENT_EXERCISE = 'scratch-gui/artie-exercises/ARTIE_POPUP_SENT_EXERCISE';
const ARTIE_POPUP_EVALUATION = 'scratch-gui/artie-exercises/ARTIE_POPUP_EVALUATION';
const ARTIE_POPUP_STATEMENT = 'scratch-gui/artie-exercises/ARTIE_POPUP_STATEMENT';

const ARTIE_EVALUATION_STOP = 'scratch-gui/artie-exercises/ARTIE_EVALUATION_STOP';


const initialState = {
    exercises: [],
    currentExercise: null,
    blocks: null,
    active : false,
    help: null,
    timeHelpReceived: null,
    secondsHelpOpen: 0,
    loadingSolution: false,
    loadingExercise: false,
    loadingHelp: false,
    informationSent: false,
    popupSolution: false,
    popupExercise: false,
    popupEvaluation: false,
    popupStatement: false,
    evaluationStop: false
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
        case ARTIE_RESET_SECONDS_HELP_OPEN:
            return Object.assign({}, state, {
                secondsHelpOpen: 0
            });
        case ARTIE_BLOCKS_UPDATED:
            return Object.assign({}, state, {
                blocks: action.blocks
            });
        case ARTIE_HELP_RECEIVED:
            return Object.assign({}, state, {
                help: action.help,
                timeHelpReceived: action.timeHelpReceived,
                secondsHelpOpen: 0
            });
        case ARTIE_CLEAR_HELP:
            return Object.assign({}, state, {
                help: null,
                secondsHelpOpen: (action.timeHelpClosed - state.timeHelpReceived) / 1000,
                timeHelpReceived: null,
            });
        case ARTIE_SENDING_SOLUTION:
            return Object.assign({}, state, {
                loadingSolution: action.loadingSolution,
                informationSent: action.informationSent
            });
        case ARTIE_SENDING_EXERCISE:
            return Object.assign({}, state, {
                loadingExercise: action.loadingExercise,
                informationSent: action.informationSent
            });
        case ARTIE_SENDING_HELP:
            return Object.assign({}, state, {
                loadingHelp: action.loadingHelp
            });
        case ARTIE_POPUP_SENT_SOLUTION:
            return Object.assign({}, state, {
                popupSolution: action.popupSolution
            });
        case ARTIE_POPUP_SENT_EXERCISE:
            return Object.assign({}, state, {
                popupExercise: action.popupExercise
            });
        case ARTIE_EVALUATION_STOP:
            return Object.assign({}, state, {
                evaluationStop: action.evaluationStop
            });
        case ARTIE_POPUP_EVALUATION:
            return Object.assign({}, state, {
                popupEvaluation: action.popupEvaluation
            });
        case ARTIE_POPUP_STATEMENT:
            return Object.assign({}, state, {
                popupStatement: action.popupStatement
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

const artieResetSecondsHelpOpen = () => ({
   type: ARTIE_RESET_SECONDS_HELP_OPEN
});

const artieBlocksUpdated = (blocks) => ({
    type: ARTIE_BLOCKS_UPDATED,
    blocks: blocks,
    needUpdate: false
});

const artieHelpReceived = (help, date) => ({
    type: ARTIE_HELP_RECEIVED,
    help: help,
    timeHelpReceived: date
});

const artieClearHelp = (timeHelpClosed) => ({
    type: ARTIE_CLEAR_HELP,
    timeHelpClosed: timeHelpClosed
});

const artieLoadingSolution = (loading, informationSent) => ({
    type: ARTIE_SENDING_SOLUTION,
    loadingSolution: loading,
    informationSent: informationSent
});

const artieLoadingExercise = (loading, informationSent) => ({
    type: ARTIE_SENDING_EXERCISE,
    loadingExercise: loading,
    informationSent: informationSent
});

const artieLoadingHelp = (loading) => ({
    type: ARTIE_SENDING_HELP,
    loadingHelp: loading
});

const artiePopupSolution = (active) => ({
    type: ARTIE_POPUP_SENT_SOLUTION,
    popupSolution: active
});

const artiePopupExercise = (active) => ({
    type: ARTIE_POPUP_SENT_EXERCISE,
    popupExercise: active
});

const artiePopupEvaluation = (active) => ({
    type: ARTIE_POPUP_EVALUATION,
    popupEvaluation: active
});

const artiePopupStatement = (active) => ({
    type: ARTIE_POPUP_STATEMENT,
    popupStatement: active
});

const artieEvaluationStop = (stop) => ({
    type: ARTIE_EVALUATION_STOP,
    evaluationStop: stop
});

export {
    reducer as default,
    initialState as artieExercisesInitialState,
    activateArtieExercises,
    deactivateArtieExercises,
    artieSetExercises,
    artieSetCurrentExercise,
    artieClearExercises,
    artieResetSecondsHelpOpen,
    artieBlocksUpdated,
    artieHelpReceived,
    artieClearHelp,
    artieLoadingSolution,
    artieLoadingExercise,
    artieLoadingHelp,
    artiePopupSolution,
    artiePopupExercise,
    artiePopupEvaluation,
    artiePopupStatement,
    artieEvaluationStop
};
