const OPEN_MENU = 'scratch-gui/menus/OPEN_MENU';
const CLOSE_MENU = 'scratch-gui/menus/CLOSE_MENU';

const MENU_FILE = 'fileMenu';


const initialState = {
    [MENU_FILE]: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case OPEN_MENU:
        return Object.assign({}, state, {
            [action.menu]: true
        });
    case CLOSE_MENU:
        return Object.assign({}, state, {
            [action.menu]: false
        });
    default:
        return state;
    }
};
const openMenu = function (menu) {
    return {
        type: OPEN_MENU,
        menu: menu
    };
};
const closeMenu = function (menu) {
    return {
        type: CLOSE_MENU,
        menu: menu
    };
};
const openFileMenu = function () {
    return openMenu(MENU_FILE);
};
const closeFileMenu = function () {
    return closeMenu(MENU_FILE);
};

export {
    reducer as default,
    openFileMenu,
    closeFileMenu,
    MENU_FILE
};
