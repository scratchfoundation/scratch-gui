const SET_PROJECT_TITLE = 'projectTitle/SET_PROJECT_TITLE';

const initialState = 'Untitled-1';

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
