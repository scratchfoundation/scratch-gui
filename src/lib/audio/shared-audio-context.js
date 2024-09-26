import StartAudioContext from 'startaudiocontext';
import bowser from 'bowser';

let AUDIO_CONTEXT;

if (!bowser.msie) {
    /**
     * AudioContext can be initialized only when user interaction event happens
     */
    const event =
        typeof document.ontouchstart === 'undefined' ?
            'mousedown' :
            'touchstart';
    const keyEvent = 'keydown';
    const initAudioContext = () => {
        document.removeEventListener(event, initAudioContext);
        document.removeEventListener(keyEvent, initAudioContext);
        AUDIO_CONTEXT = new (window.AudioContext ||
            window.webkitAudioContext)();
        StartAudioContext(AUDIO_CONTEXT);
    };
    document.addEventListener(event, initAudioContext);
    document.addEventListener(keyEvent, initAudioContext);
}

/**
 * Wrap browser AudioContext because we shouldn't create more than one
 * @return {AudioContext} The singleton AudioContext
 */
export default function () {
    return AUDIO_CONTEXT;
}
