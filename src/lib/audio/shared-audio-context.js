// Wrap browser AudioContext because we shouldn't create more than one
const AUDIO_CONTEXT = new (window.AudioContext || window.webkitAudioContext)();

export default function () {
    return AUDIO_CONTEXT;
}
