const SHOW_ARTIE_HELP_POPUP = 'scratch-gui/artie-help/SHOW_ARTIE_HELP_POPUP';
const ANSWER_ARTIE_HELP_POPUP = 'scratch-gui/artie-exercises/ANSWER_ARTIE_HELP_POPUP';

const initialState = {
    id: null,
    showHelpPopup: false,
    answerHelpPopup: null,
    lastHelpRequest: null
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SHOW_ARTIE_HELP_POPUP:
        return Object.assign({}, state, {
            id: action.id,
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

const artieShowHelpPopup = (id, showHelpPopup) => ({
    type: SHOW_ARTIE_HELP_POPUP,
    id: id,
    showHelpPopup: showHelpPopup
});

const artieAnswerHelpPopup = (answerHelpPopup, lastHelpRequest) => ({
    type: ANSWER_ARTIE_HELP_POPUP,
    answerHelpPopup: answerHelpPopup,
    lastHelpRequest: lastHelpRequest
});


export {
    reducer as default,
    initialState as artieHelpInitialState,
    artieShowHelpPopup,
    artieAnswerHelpPopup
};
