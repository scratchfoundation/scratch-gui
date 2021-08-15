const SHOW_ARTIE_HELP_POPUP = 'scratch-gui/artie-help/SHOW_ARTIE_HELP_POPUP';
const ANSWER_ARTIE_HELP_POPUP = 'scratch-gui/artie-exercises/ANSWER_ARTIE_HELP_POPUP';

const initialState = {
    showHelpPopup: false,
    answerHelpPopup: null,
    lastAnswer: null
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SHOW_ARTIE_HELP_POPUP:
        return Object.assign({}, state, {
            showHelpPopup: action.showHelpPopup
        });
    case ANSWER_ARTIE_HELP_POPUP:
        return Object.assign({}, state, {
            answerHelpPopup: action.answerHelpPopup,
            lastAnswer: action.lastAnswer
        });
    default:
        return state;
    }
};

const artieShowHelpPopup = showHelpPopup => ({
    showHelpPopup: showHelpPopup
});

const artieAnswerHelpPopup = (answerHelp, lastAnswer) => ({
    answerHelp: answerHelp,
    lastAnswer: lastAnswer
});


export {
    reducer as default,
    initialState as artieHelpInitialState,
    artieShowHelpPopup,
    artieAnswerHelpPopup
};
