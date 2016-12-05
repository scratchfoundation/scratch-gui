const OPEN_MODAL = 'scratch-gui/modals/OPEN_MODAL';
const CLOSE_MODAL = 'scratch-gui/modals/CLOSE_MODAL';

const MODAL_BACKDROP_LIBRARY = 'backdropLibrary';
const MODAL_COSTUME_LIBRARY = 'costumeLibrary';
const MODAL_SPRITE_LIBRARY = 'spriteLibrary';

const initialState = {
    [MODAL_BACKDROP_LIBRARY]: false,
    [MODAL_COSTUME_LIBRARY]: false,
    [MODAL_SPRITE_LIBRARY]: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case OPEN_MODAL:
        return Object.assign({}, state, {
            [action.modal]: true
        });
    case CLOSE_MODAL:
        return Object.assign({}, state, {
            [action.modal]: false
        });
    default:
        return state;
    }
};
reducer.openModal = function (modal) {
    return {
        type: OPEN_MODAL,
        modal: modal
    };
};
reducer.closeModal = function (modal) {
    return {
        type: CLOSE_MODAL,
        modal: modal
    };
};
reducer.openBackdropLibrary = function () {
    return reducer.openModal(MODAL_BACKDROP_LIBRARY);
};
reducer.openCostumeLibrary = function () {
    return reducer.openModal(MODAL_COSTUME_LIBRARY);
};
reducer.openSpriteLibrary = function () {
    return reducer.openModal(MODAL_SPRITE_LIBRARY);
};
reducer.closeBackdropLibrary = function () {
    return reducer.closeModal(MODAL_BACKDROP_LIBRARY);
};
reducer.closeCostumeLibrary = function () {
    return reducer.closeModal(MODAL_COSTUME_LIBRARY);
};
reducer.closeSpriteLibrary = function () {
    return reducer.closeModal(MODAL_SPRITE_LIBRARY);
};
module.exports = reducer;
