const SHOW_ARTIE_HELP_POPUP = 'scratch-gui/artie-help/SHOW_ARTIE_HELP_POPUP';
const ANSWER_ARTIE_HELP_POPUP = 'scratch-gui/artie-exercises/ANSWER_ARTIE_HELP_POPUP';

const initialState = {
    showHelpPopup: false,
    answerHelpPopup: null,
    lastHelpRequest: null
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
            lastHelpRequest: action.lastHelpRequest
        });
    default:
        return state;
    }
};

const artieShowHelpPopup = showHelpPopup => ({
    type: SHOW_ARTIE_HELP_POPUP,
    showHelpPopup: showHelpPopup
});

const artieAnswerHelpPopup = (answerHelp, lastHelpRequest) => ({
    type: ANSWER_ARTIE_HELP_POPUP,
    answerHelp: answerHelp,
    lastHelpRequest: lastHelpRequest
});


export {
    reducer as default,
    initialState as artieHelpInitialState,
    artieShowHelpPopup,
    artieAnswerHelpPopup
};
