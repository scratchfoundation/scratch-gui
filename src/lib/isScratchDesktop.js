/**
 * @returns {boolean} - true if is seems like the GUI is running under Scratch Desktop; false otherwise.
 * This affects various things throughout the GUI. Ideally we should use some other way to check for this, but it
 * should still be possible to override it externally for testing purposes. For example, maybe this should be a
 * property on the GUI element or part of the global GUI state. Calls to this function should be taken as a
 * placeholder for a future, better approach.
 */
const isScratchDesktop = function () {
    if (isScratchDesktop.override !== null) {
        return isScratchDesktop.override;
    }
    const userAgent = navigator.userAgent.toLowerCase();
    const isElectron = (userAgent.indexOf(' electron/') > -1);
    return isElectron;
};

/**
 * Set this value to non-null to force `isScratchDesktop` to return that value for testing & dev purposes.
 */
isScratchDesktop.override = null;

export default isScratchDesktop;
