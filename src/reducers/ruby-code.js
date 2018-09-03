const UPDATE_RUBYCODE = 'smalruby3-gui/navigation/UPDATE_RUBYCODE';

const initialState = {
    rubyCode: ''
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case UPDATE_RUBYCODE:
        return {
            rubyCode: action.rubyCode
        };
    default:
        return state;
    }
};

const updateRubyCode = function (code) {
    return {
        type: UPDATE_RUBYCODE,
        rubyCode: code
    };
};

export {
    reducer as default,
    initialState as rubyCodeInitialState,
    updateRubyCode
};
