const OPEN_MODAL = 'scratch-gui/modals/OPEN_MODAL';
const CLOSE_MODAL = 'scratch-gui/modals/CLOSE_MODAL';

const MODAL_COSTUME_EDIT = 'costumeEdit';
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

const initialState = {
    [MODAL_COSTUME_EDIT]: false,
    [MODAL_BACKDROP_LIBRARY]: false,
    [MODAL_COSTUME_LIBRARY]: false,
    [MODAL_EXTENSION_LIBRARY]: false,
    [MODAL_LOADING_PROJECT]: false,
    [MODAL_TELEMETRY]: false,
    [MODAL_SOUND_LIBRARY]: false,
    [MODAL_SPRITE_LIBRARY]: true,
    [MODAL_SOUND_RECORDER]: false,
    [MODAL_CONNECTION]: false,
    [MODAL_TIPS_LIBRARY]: false,
    data: null
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case OPEN_MODAL:
        console.log({
            [action.modal]: true,
            data: action.data
        }, 'open_modal')
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
    console.log(modal, data)
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
    console.log("hello");
    return openModal(MODAL_SPRITE_LIBRARY);
};
const openSoundRecorder = function () {
    return openModal(MODAL_SOUND_RECORDER);
};
const openConnectionModal = function () {
    return openModal(MODAL_CONNECTION);
};
const openTipsLibrary = function () {
    console.log("hi")
    return openModal(MODAL_TIPS_LIBRARY);
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
}

export {
    reducer as default,
    initialState as modalsInitialState,
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
    closeCostumeEdit
};
