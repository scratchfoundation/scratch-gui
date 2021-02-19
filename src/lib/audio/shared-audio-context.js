import StartAudioContext from 'startaudiocontext';
import bowser from 'bowser';

let AUDIO_CONTEXT;

if (!bowser.msie) {
    /**
     * AudioContext can be initialized only when user interaction event happens
     */
    const initAudioContext = () => {
        document.removeEventListener('mousedown', initAudioContext);
        document.removeEventListener('touchstart', initAudioContext);
        if (AUDIO_CONTEXT) return;

        AUDIO_CONTEXT = new (window.AudioContext ||
            window.webkitAudioContext)();
        StartAudioContext(AUDIO_CONTEXT);
    };
    document.addEventListener('mousedown', initAudioContext);
    document.addEventListener('touchstart', initAudioContext);
}

/**
 * Wrap browser AudioContext because we shouldn't create more than one
 * @return {AudioContext} The singleton AudioContext
 */
export default function () {
    return AUDIO_CONTEXT;
}
