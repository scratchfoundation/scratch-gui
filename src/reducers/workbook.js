const SET_ANSWERING_STATE = 'workbook/SET_ANSWERING_STATE';
const SET_NEXT_QUESTION = 'workbook/SET_NEXT_QUESTION';

const QUESTIONS = [
    {
        question: '正三角形をかいてください。',
        toolboxBlocks: {
            motion: { movesteps: true, turnright: true, gotoxy: true },
            control: { repeat: true },
            pen: { clear: true, penDown: true, penUp: true },
        },
        explanation: '正多角形は、辺の長さが全て等しく、角の大きさが全て等しい図形です。...'
    },
    {
        question: 'ねこをみぎに１０ぽ、うごかしてください。',
        toolboxBlocks: {
            motion: { movesteps: true, turnright: true, pointindirection: true },
        },
        explanation: 'もんだい１のせつめいです。ねこをみぎに１０ぽ、うごかせば、もんだいをとくことができます。',
    },
    {
        question: '正八角形をかいてください。',
        toolboxBlocks: {
            motion: { movesteps: true, turnright: true, setx: true, sety: true },
            control: { repeat: true },
            pen: { clear: true, penDown: true, penUp: true },
        },
        explanation: '正多角形は、辺の長さが全て等しく、角の大きさが全て等しい図形です。...'
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
