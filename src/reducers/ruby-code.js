const initialState = {
    rubyCode: `p 'hello World'`
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    return state;
};

export {
    reducer as default,
    initialState as rubyCodeInitialState
};
