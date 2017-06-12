const OPEN_MODAL = 'scratch-gui/modals/OPEN_MODAL';
const CLOSE_MODAL = 'scratch-gui/modals/CLOSE_MODAL';

const MODAL_BACKDROP_LIBRARY = 'backdropLibrary';
const MODAL_COSTUME_LIBRARY = 'costumeLibrary';
const MODAL_SOUND_LIBRARY = 'soundLibrary';
const MODAL_SPRITE_LIBRARY = 'spriteLibrary';
const MODAL_SOUND_RECORDER = 'soundRecorder';

const initialState = {
    [MODAL_BACKDROP_LIBRARY]: false,
    [MODAL_COSTUME_LIBRARY]: false,
    [MODAL_SOUND_LIBRARY]: false,
    [MODAL_SPRITE_LIBRARY]: false,
    [MODAL_SOUND_RECORDER]: false
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
reducer.openSoundLibrary = function () {
    return reducer.openModal(MODAL_SOUND_LIBRARY);
};
reducer.openSpriteLibrary = function () {
    return reducer.openModal(MODAL_SPRITE_LIBRARY);
};
reducer.openSoundRecorder = function () {
    return reducer.openModal(MODAL_SOUND_RECORDER);
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
reducer.closeSoundLibrary = function () {
    return reducer.closeModal(MODAL_SOUND_LIBRARY);
};
reducer.closeSoundRecorder = function () {
    return reducer.closeModal(MODAL_SOUND_RECORDER);
};
module.exports = reducer;
