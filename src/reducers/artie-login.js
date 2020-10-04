const ACTIVATE_ARTIE_LOGIN = 'scratch-gui/artie-login/ACTIVATE_ARTIE_LOGIN';
const DEACTIVATE_ARTIE_LOGIN = 'scratch-gui/artie-login/DEACTIVATE_ARTIE_LOGIN';
const ARTIE_LOGGED = 'scratch-gui/artie-login/ARTIE_LOGGED';

const initialState = {
    active : false,
    students: [],
    user: null
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
    user: user,
});

export {
    reducer as default,
    initialState as artieLoginInitialState,
    activateArtieLogin,
    deactivateArtieLogin,
    artieLogged
};
