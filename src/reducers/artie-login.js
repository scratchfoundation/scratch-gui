const ACTIVATE_ARTIE_LOGIN = 'scratch-gui/artie-login/ACTIVATE_ARTIE_LOGIN';
const DEACTIVATE_ARTIE_LOGIN = 'scratch-gui/artie-login/DEACTIVATE_ARTIE_LOGIN';
const ARTIE_LOGGED = 'scratch-gui/artie-login/ARTIE_LOGGED';
const ARTIE_LOGOUT = 'scratch-gui/artie-login/ARTIE_LOGOUT';
const ARTIE_SET_STUDENTS = 'scratch-gui/artie-login/ARTIE_SET_STUDENTS';
const ARTIE_SET_CURRENT_STUDENT = 'scratch-gui/artie-login/ARTIE_SET_CURRENT_STUDENT';

const initialState = {
    active : false,
    students: [],
    user: null,
    currentStudent: null
}

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case ACTIVATE_ARTIE_LOGIN:
            return Object.assign({}, state, {
                active: true
            });
        case DEACTIVATE_ARTIE_LOGIN:
            return Object.assign({}, state, {
                active: false
            });
        case ARTIE_LOGGED:
            return Object.assign({}, state, {
                user: action.user
            });
        case ARTIE_LOGOUT:
            return Object.assign({}, state, {
                user: null,
                students: [],
                currentStudent: null
            });
        case ARTIE_SET_STUDENTS:
            return Object.assign({}, state, {
                students: action.students
            });
        case ARTIE_SET_CURRENT_STUDENT:
            return Object.assign({}, state, {
                currentStudent: action.currentStudent
            });
        default:
            return state;
    }
}


const activateArtieLogin = () =>({
    type: ACTIVATE_ARTIE_LOGIN
});

const deactivateArtieLogin = () =>({
    type: DEACTIVATE_ARTIE_LOGIN
});

const artieLogged = (user) => ({
    type: ARTIE_LOGGED,
    user: user
});

const artieSetStudents = (students) => ({
    type: ARTIE_SET_STUDENTS,
    students: students
});

const artieSetCurrentStudent = (currentStudent) => ({
    type: ARTIE_SET_CURRENT_STUDENT,
    currentStudent: currentStudent
});

const artieLogout = () => ({
    type: ARTIE_LOGOUT
});

export {
    reducer as default,
    initialState as artieLoginInitialState,
    activateArtieLogin,
    deactivateArtieLogin,
    artieLogged,
    artieSetStudents,
    artieSetCurrentStudent,
    artieLogout
};
