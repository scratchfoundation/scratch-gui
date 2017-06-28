// Wrap browser AudioContext because we shouldn't create more than one
const AUDIO_CONTEXT = new (AudioContext || webkitAudioContext)();

module.exports = function () {
    return AUDIO_CONTEXT;
};
