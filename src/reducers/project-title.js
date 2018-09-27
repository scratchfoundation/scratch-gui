const SET_PROJECT_TITLE = 'projectTitle/SET_PROJECT_TITLE';

// we are initializing to a blank string instead of an actual title,
// because it would be hard to localize here
const initialState = '';

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_PROJECT_TITLE:
        return action.title;
    default:
        return state;
    }
};
const setProjectTitle = title => ({
    type: SET_PROJECT_TITLE,
    title: title
});

export {
    reducer as default,
    initialState as projectTitleInitialState,
    setProjectTitle
};
