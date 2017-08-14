const AUDIO_CONTEXT = new (window.AudioContext || window.webkitAudioContext)();

/**
 * Wrap browser AudioContext because we shouldn't create more than one
 * @return {AudioContext} The singleton AudioContext
 */
export default function () {
    return AUDIO_CONTEXT;
}
