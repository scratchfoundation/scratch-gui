const SET_ANSWERING_STATE = 'workbook/SET_ANSWERING_STATE';
const SET_NEXT_QUESTION = 'workbook/SET_NEXT_QUESTION';

const QUESTIONS = [
    {
        question: 'もんだい１です。ねこをみぎに１０ぽ、うごかしてください。',
        explanation: 'もんだい１のせつめいです。ねこをみぎに１０ぽ、うごかせば、もんだいをとくことができます。',
    },
    {
        question: 'もんだい２です。ねこをみぎに２０ぽ、うごかしてください。',
        explanation: 'もんだい２のせつめいです。ねこをみぎに２０ぽ、うごかせば、もんだいをとくことができます。',
    },
]

const initialState = {
    answering: true,
    questionIndex: 0,
    question: QUESTIONS[0],
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_ANSWERING_STATE:
        return Object.assign({}, state, {
            answering: action.answering
        });
    case SET_NEXT_QUESTION:
        const nextQuestionIndex = state.questionIndex + 1;
        return Object.assign({}, state, {
            answering: true,
            questionIndex: nextQuestionIndex,
            question: QUESTIONS[nextQuestionIndex % QUESTIONS.length],
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
        type: SET_NEXT_QUESTION,
    };
}

export {
    reducer as default,
    initialState as workbookInitialState,
    surrender,
    answer,
    next,
};
