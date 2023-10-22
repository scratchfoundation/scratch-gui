const SET_ANSWERING_STATE = 'workbook/SET_ANSWERING_STATE';
const SET_NEXT_QUESTION = 'workbook/SET_NEXT_QUESTION';

const QUESTIONS = [
    {
        question: '正三角形をかいてみよう。',
        toolboxBlocks: {
            motion: { movesteps: true, turnright: true, gotoxy: true },
            control: { repeat: true },
            pen: { clear: true, penDown: true, penUp: true },
        },
        explanation: '正三角形は、３本の辺の長さがすべておなじで、３つの角の大きさがすべて６０度の図形です。「長さ１００すすむ（線をひく）」、「左に１２０度まがる」を３回くり返すと正三角形がかけます。'
    },
    {
        question: '正四角形をかいてみよう。',
        toolboxBlocks: {
            motion: { movesteps: true, turnright: true, setx: true, sety: true },
            control: { repeat: true },
            pen: { clear: true, penDown: true, penUp: true },
        },
        explanation: '正三角形は、４本の辺の長さがすべておなじで、４つの角の大きさがすべて９０度の図形です。「長さ１００すすむ（線をひく）」、「左に９０度まがる」を４回くり返すと正四角形がかけます。'
    }, 
    // {
    //     question: 'ねこをみぎに１０ぽ、うごかしてください。',
    //     toolboxBlocks: {
    //         motion: { movesteps: true, turnright: true, pointindirection: true },
    //     },
    //     explanation: 'もんだい１のせつめいです。ねこをみぎに１０ぽ、うごかせば、もんだいをとくことができます。',
    // },
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
