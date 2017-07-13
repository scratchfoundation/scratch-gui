require('@mohayonao/web-audio-api-shim/light');

// Wrap browser AudioContext because we shouldn't create more than one
const AUDIO_CONTEXT = new (window.AudioContext || window.webkitAudioContext)();

module.exports = function () {
    return AUDIO_CONTEXT;
};
