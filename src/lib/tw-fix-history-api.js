import log from './log';

const originalReplaceState = history.replaceState;
history.replaceState = function (...args) {
    try {
        return originalReplaceState.call(this, ...args);
    } catch (e) {
        log.error(e);
    }
};

const originalPushState = history.pushState;
history.pushState = function (...args) {
    try {
        return originalPushState.call(this, ...args);
    } catch (e) {
        log.error(e);
    }
};
