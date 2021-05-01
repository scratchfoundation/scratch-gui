const ACTIVATE_ARTIE_LOGIN = 'scratch-gui/artie-login/ACTIVATE_ARTIE_LOGIN';
const DEACTIVATE_ARTIE_LOGIN = 'scratch-gui/artie-login/DEACTIVATE_ARTIE_LOGIN';
const ARTIE_LOGGED = 'scratch-gui/artie-login/ARTIE_LOGGED';
const ARTIE_LOGOUT = 'scratch-gui/artie-login/ARTIE_LOGOUT';
const ARTIE_SET_STUDENTS = 'scratch-gui/artie-login/ARTIE_SET_STUDENTS';
const ARTIE_SET_CURRENT_STUDENT = 'scratch-gui/artie-login/ARTIE_SET_CURRENT_STUDENT';
const ARTIE_ERROR = 'scratch-gui/artie-login/ARTIE_ERROR';

const initialState = {
    active: false,
    students: [],
    user: null,
    currentStudent: null,
    error: null,
    lastLogin: null
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
                user: action.user,
                lastLogin: action.lastLogin,
                error: null
            });
        case ARTIE_LOGOUT:
            return Object.assign({}, state, {
                user: null,
                students: [],
                currentStudent: null,
                error: null
            });
        case ARTIE_SET_STUDENTS:
            return Object.assign({}, state, {
                students: action.students,
                error: null
            });
        case ARTIE_SET_CURRENT_STUDENT:
            return Object.assign({}, state, {
                currentStudent: action.currentStudent,
                error: null
            });
        case ARTIE_ERROR:
            return Object.assign({}, state, {
                error: action.error
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

const artieLogged = (user, date) => ({
    type: ARTIE_LOGGED,
    user: user,
    lastLogin: date
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

const artieError = (error) => ({
    type: ARTIE_ERROR,
    error: error
});

export {
    reducer as default,
    initialState as artieLoginInitialState,
    activateArtieLogin,
    deactivateArtieLogin,
    artieLogged,
    artieSetStudents,
    artieSetCurrentStudent,
    artieLogout,
    artieError
};
