const SET_ANSWERING_STATE = 'workbook/SET_ANSWERING_STATE';

const initialState = {
    answering: true,
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_ANSWERING_STATE:
        return Object.assign({}, state, {
            answering: action.answering
        });
    default:
        return state;
    }
}

const surrender = function () {
    return {
        type: SET_ANSWERING_STATE,
        answering: false    
    };
}

const answer = function () {
    return {
        type: SET_ANSWERING_STATE,
        answering: false
    };
}

const next = function () {
    return {
        type: SET_ANSWERING_STATE,
        answering: true
    };
}

export {
    reducer as default,
    initialState as workbookInitialState,
    surrender,
    answer,
    next,
};
