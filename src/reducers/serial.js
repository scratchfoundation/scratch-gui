const UPDATE_WRITER = 'SCRATCH-GUI/SERIAL/UPDATE_WRITER';
const UPDATE_MESSAGE = 'scratch-gui/serial/UPDATE_MESSAGE';

const initialState = {
    message: {
        value: '',
        timestamp: Date.now()
    },
    writer: null
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case UPDATE_WRITER:
        return Object.assign({}, state, {
            writer: action.writer
        });
    case UPDATE_MESSAGE:
        return Object.assign({}, state, {
            message: {
                value: action.message,
                timestamp: Date.now()
            }
        });
    default:
        return state;
    }
};

const updateWriter = function (writer) {
    return {
        type: UPDATE_WRITER,
        writer: writer
    };
};

const updateMessage = function (message) {
    return {
        type: UPDATE_MESSAGE,
        message: message
    };
};

export {
    reducer as default,
    initialState as serialInitialState,
    updateMessage,
    updateWriter
};
