/**
 * Return whether the fullscreen API is available in this environment.
 * @returns {boolean} true if the fullscreen API is available
 */
const available = () => document.fullscreenEnabled || document.webkitFullscreenEnabled;

/**
 * Return whether fullscreen is currently enabled.
 * @returns {boolean} true if in fullscreen
 */
const enabled = () => {
    if (typeof document.fullscreenElement !== 'undefined') {
        return document.fullscreenElement !== null;
    }
    if (typeof document.webkitFullscreenElement !== 'undefined') {
        return document.webkitFullscreenElement !== null;
    }
    return false;
};

/**
 * Request entering the document into fullscreen mode.
 */
const request = () => {
    if (document.body.requestFullscreen) {
        document.body.requestFullscreen();
    } else if (document.body.webkitRequestFullscreen) {
        document.body.webkitRequestFullscreen();
    }
};

/**
 * Exit fullscreen mode.
 */
const exit = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
};

export default {
    available,
    enabled,
    request,
    exit
};
