import analytics from '../lib/analytics';

const OPEN_MODAL = 'scratch-gui/modals/OPEN_MODAL';
const CLOSE_MODAL = 'scratch-gui/modals/CLOSE_MODAL';

const MODAL_BACKDROP_LIBRARY = 'backdropLibrary';
const MODAL_COSTUME_LIBRARY = 'costumeLibrary';
const MODAL_EXTENSION_LIBRARY = 'extensionLibrary';
const MODAL_FEEDBACK_FORM = 'feedbackForm';
const MODAL_PREVIEW_INFO = 'previewInfo';
const MODAL_SOUND_LIBRARY = 'soundLibrary';
const MODAL_SPRITE_LIBRARY = 'spriteLibrary';
const MODAL_SOUND_RECORDER = 'soundRecorder';
// 固件升级模态框
const MODAL_FIRMWARE = 'firmware';
// connect serial
const MODAL_CONNECT = 'connect';
// connect serial
const MODAL_SETTING = 'setting';
const MODAL_MYAI = 'myai';
// 自动升级
const MODAL_UPDATE = 'update';

const initialState = {
    // 固件升级模态框
    [MODAL_FIRMWARE]: false,
    // set模态框
    [MODAL_SETTING]: false,
    [MODAL_MYAI]: false,
    // connect serial
    [MODAL_CONNECT]: false,
    // 自动升级
    [MODAL_UPDATE]: false,
    [MODAL_BACKDROP_LIBRARY]: false,
    [MODAL_COSTUME_LIBRARY]: false,
    [MODAL_EXTENSION_LIBRARY]: false,
    [MODAL_FEEDBACK_FORM]: false,
    [MODAL_PREVIEW_INFO]: true,
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
const openModal = function (modal) {
    return {
        type: OPEN_MODAL,
        modal: modal
    };
};
const closeModal = function (modal) {
    return {
        type: CLOSE_MODAL,
        modal: modal
    };
};
const openBackdropLibrary = function () {
    analytics.pageview('/libraries/backdrops');
    return openModal(MODAL_BACKDROP_LIBRARY);
};
const openCostumeLibrary = function () {
    analytics.pageview('/libraries/costumes');
    return openModal(MODAL_COSTUME_LIBRARY);
};
const openExtensionLibrary = function () {
    analytics.pageview('/libraries/extensions');
    return openModal(MODAL_EXTENSION_LIBRARY);
};
const openFeedbackForm = function () {
    analytics.pageview('/modals/feedback');
    return openModal(MODAL_FEEDBACK_FORM);
};
const openSoundLibrary = function () {
    analytics.pageview('/libraries/sounds');
    return openModal(MODAL_SOUND_LIBRARY);
};
const openSpriteLibrary = function () {
    analytics.pageview('/libraries/sprites');
    return openModal(MODAL_SPRITE_LIBRARY);
};
const openSoundRecorder = function () {
    analytics.pageview('/modals/microphone');
    return openModal(MODAL_SOUND_RECORDER);
};
const openPreviewInfo = function () {
    analytics.pageview('/modals/preview');
    return openModal(MODAL_PREVIEW_INFO);
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
const closeFeedbackForm = function () {
    return closeModal(MODAL_FEEDBACK_FORM);
};
const closePreviewInfo = function () {
    return closeModal(MODAL_PREVIEW_INFO);
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

// 打开固件升级模态框
const openFirmware = function () {
    return openModal(MODAL_FIRMWARE);
};
// 关闭固件升级模态框
const closeFirmware = function () {
    return closeModal(MODAL_FIRMWARE);
};
// 打开自动升级模态框
const openUpdate = function () {
    return openModal(MODAL_UPDATE);
};
// 关闭自动升级模态框
const closeUpdate = function () {
    return closeModal(MODAL_UPDATE);
};
// 打开连接页面
const openConnect = function () {
    return openModal(MODAL_CONNECT);
};
// 关闭连接页面
const closeConnect = function () {
    return closeModal(MODAL_CONNECT);
};
// 打开 set 页面
const openSetting = function () {
    return openModal(MODAL_SETTING);
};
// 关闭 set 页面
const closeSetting = function () {
    return closeModal(MODAL_SETTING);
};
// 打开 set 页面
const openMyai = function () {
    return openModal(MODAL_MYAI);
};
// 关闭 set 页面
const closeMyai = function () {
    return closeModal(MODAL_MYAI);
};

export {
    reducer as default,
    openBackdropLibrary,
    openCostumeLibrary,
    openExtensionLibrary,
    openFeedbackForm,
    openPreviewInfo,
    openSoundLibrary,
    openSpriteLibrary,
    openSoundRecorder,
    closeBackdropLibrary,
    closeCostumeLibrary,
    closeExtensionLibrary,
    closeFeedbackForm,
    closePreviewInfo,
    closeSpriteLibrary,
    closeSoundLibrary,
    closeSoundRecorder
};
