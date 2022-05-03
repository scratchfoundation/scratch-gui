const OPEN_MODAL = 'scratch-gui/modals/OPEN_MODAL';
const CLOSE_MODAL = 'scratch-gui/modals/CLOSE_MODAL';

const MODAL_COSTUME_EDIT = 'costumeEdit';
const MODAL_SOUND_EDIT = 'soundEdit';
const MODAL_BACKDROP_LIBRARY = 'backdropLibrary';
const MODAL_COSTUME_LIBRARY = 'costumeLibrary';
const MODAL_EXTENSION_LIBRARY = 'extensionLibrary';
const MODAL_LOADING_PROJECT = 'loadingProject';
const MODAL_TELEMETRY = 'telemetryModal';
const MODAL_SOUND_LIBRARY = 'soundLibrary';
const MODAL_SPRITE_LIBRARY = 'spriteLibrary';
const MODAL_SOUND_RECORDER = 'soundRecorder';
const MODAL_CONNECTION = 'connectionModal';
const MODAL_TIPS_LIBRARY = 'tipsLibrary';
const MODAL_SPRITE_SETTINGS = 'spriteSettings';
const MODAL_FULLSCREEN_PREVIEW = 'fullScreenPreview';
const MODAL_BACKDROP_SETTINGS = 'backdropSettings';

const initialState = {
    [MODAL_COSTUME_EDIT]: false,
    [MODAL_BACKDROP_LIBRARY]: false,
    [MODAL_COSTUME_LIBRARY]: false,
    [MODAL_EXTENSION_LIBRARY]: false,
    [MODAL_LOADING_PROJECT]: false,
    [MODAL_TELEMETRY]: false,
    [MODAL_SOUND_LIBRARY]: false,
    [MODAL_SPRITE_LIBRARY]: false,
    [MODAL_SOUND_RECORDER]: false,
    [MODAL_CONNECTION]: false,
    [MODAL_TIPS_LIBRARY]: false,
    [MODAL_SPRITE_SETTINGS]: false,
    [MODAL_FULLSCREEN_PREVIEW]: false,
    [MODAL_BACKDROP_SETTINGS]: false,
    data: null
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case OPEN_MODAL:
        return Object.assign({}, state, {
            [action.modal]: true,
            data: action.data
        });
    case CLOSE_MODAL:
        return Object.assign({}, state, {
            [action.modal]: false,
            data: null
        });
    default:
        return state;
    }
};
const openModal = function (modal, data = null) {
    return {
        type: OPEN_MODAL,
        modal: modal,
        data
    };
};
const closeModal = function (modal) {
    return {
        type: CLOSE_MODAL,
        modal: modal
    };
};

const openSoundEdit = function (soundIndex) {
    return openModal(MODAL_SOUND_EDIT, { soundIndex })
}
const openCostumeEdit = function (costumeIndex) {
    return openModal(MODAL_COSTUME_EDIT, { costumeIndex })
}
const openBackdropLibrary = function () {
    return openModal(MODAL_BACKDROP_LIBRARY);
};
const openCostumeLibrary = function () {
    return openModal(MODAL_COSTUME_LIBRARY);
};
const openExtensionLibrary = function () {
    return openModal(MODAL_EXTENSION_LIBRARY);
};
const openLoadingProject = function () {
    return openModal(MODAL_LOADING_PROJECT);
};
const openTelemetryModal = function () {
    return openModal(MODAL_TELEMETRY);
};
const openSoundLibrary = function () {
    return openModal(MODAL_SOUND_LIBRARY);
};
const openSpriteLibrary = function () {
    return openModal(MODAL_SPRITE_LIBRARY);
};
const openSoundRecorder = function () {
    return openModal(MODAL_SOUND_RECORDER);
};
const openConnectionModal = function () {
    return openModal(MODAL_CONNECTION);
};
const openTipsLibrary = function () {
    return openModal(MODAL_TIPS_LIBRARY);
};
const openSpriteSettings = function () {
    return openModal(MODAL_SPRITE_SETTINGS)
};
const openfullScreenPreview = function () {
    return openModal(MODAL_FULLSCREEN_PREVIEW)
};
const openBackdropSettings = function () {
    return openModal(MODAL_BACKDROP_SETTINGS)
};
const closeBackdropLibrary = function () {
    return closeModal(MODAL_BACKDROP_LIBRARY);
};
const closeCostumeLibrary = function () {
    return closeModal(MODAL_COSTUME_LIBRARY);
};
const closeExtensionLibrary = function () {
    return closeModal(MODAL_EXTENSION_LIBRARY);
};
const closeLoadingProject = function () {
    return closeModal(MODAL_LOADING_PROJECT);
};
const closeTelemetryModal = function () {
    return closeModal(MODAL_TELEMETRY);
};
const closeSpriteLibrary = function () {
    return closeModal(MODAL_SPRITE_LIBRARY);
};
const closeSoundLibrary = function () {
    return closeModal(MODAL_SOUND_LIBRARY);
};
const closeSoundRecorder = function () {
    return closeModal(MODAL_SOUND_RECORDER);
};
const closeTipsLibrary = function () {
    return closeModal(MODAL_TIPS_LIBRARY);
};
const closeConnectionModal = function () {
    return closeModal(MODAL_CONNECTION);
};
const closeCostumeEdit = function () {
    return closeModal(MODAL_COSTUME_EDIT)
};
const closeSpriteSettings = function () {
    return closeModal(MODAL_SPRITE_SETTINGS)
};
const closeFullScreenPreview = function () {
    return closeModal(MODAL_FULLSCREEN_PREVIEW)
};
const closeBackdropSettings = function () {
    return closeModal(MODAL_BACKDROP_SETTINGS)
};
const closeSoundEdit = function () {
    return closeModal(MODAL_SOUND_EDIT)
};

export {
    reducer as default,
    initialState as modalsInitialState,
    openSoundEdit,
    openCostumeEdit,
    openBackdropLibrary,
    openCostumeLibrary,
    openExtensionLibrary,
    openLoadingProject,
    openSoundLibrary,
    openSpriteLibrary,
    openSoundRecorder,
    openTelemetryModal,
    openTipsLibrary,
    openConnectionModal,
    openSpriteSettings,
    openfullScreenPreview,
    openBackdropSettings,
    closeBackdropLibrary,
    closeCostumeLibrary,
    closeExtensionLibrary,
    closeLoadingProject,
    closeSpriteLibrary,
    closeSoundLibrary,
    closeSoundRecorder,
    closeTelemetryModal,
    closeTipsLibrary,
    closeConnectionModal,
    closeCostumeEdit,
    closeSpriteSettings,
    closeFullScreenPreview,
    closeBackdropSettings,
    closeSoundEdit
};
