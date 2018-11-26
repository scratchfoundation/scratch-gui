const SET_PROJECT_TITLE = 'projectInfo/SET_PROJECT_TITLE';
const SET_PROJECT_HAS_CLOUD_DATA = 'projectInfo/SET_PROJECT_HAS_CLOUD_DATA';

// we are initializing to a blank string instead of an actual title,
// because it would be hard to localize here
const initialState = {
    projectTitle: '',
    projectHasCloudData: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_PROJECT_TITLE:
        return Object.assign({}, state, {
            projectTitle: action.title
        });
    case SET_PROJECT_HAS_CLOUD_DATA:
        return Object.assign({}, state, {
            projectHasCloudData: action.projectHasCloudData
        });
    default:
        return state;
    }
};
const setProjectTitle = title => ({
    type: SET_PROJECT_TITLE,
    title: title
});

const setProjectHasCloudData = hasCloudData => ({
    type: SET_PROJECT_HAS_CLOUD_DATA,
    projectHasCloudData: hasCloudData
});

export {
    reducer as default,
    initialState as projectInfoInitialState,
    setProjectTitle,
    setProjectHasCloudData
};
