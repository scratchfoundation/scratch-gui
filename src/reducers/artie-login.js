const ACTIVATE_ARTIE_LOGIN = 'scratch-gui/artie-login/ACTIVATE_ARTIE_LOGIN';
const DEACTIVATE_ARTIE_LOGIN = 'scratch-gui/artie-login/DEACTIVATE_ARTIE_LOGIN';

const initialState = {
    active : false
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

export {
    reducer as default,
    initialState as artieLoginInitialState,
    activateArtieLogin,
    deactivateArtieLogin
};
