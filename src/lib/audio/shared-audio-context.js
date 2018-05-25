import StartAudioContext from 'startaudiocontext';
import bowser from 'bowser';

let AUDIO_CONTEXT;
if (!bowser.msie) {
    AUDIO_CONTEXT = new (window.AudioContext || window.webkitAudioContext)();

    StartAudioContext(AUDIO_CONTEXT);
}

/**
 * Wrap browser AudioContext because we shouldn't create more than one
 * @return {AudioContext} The singleton AudioContext
 */
export default function () {
    return AUDIO_CONTEXT;
}
