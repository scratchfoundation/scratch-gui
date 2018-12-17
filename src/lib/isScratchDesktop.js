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

/**
 * Parse an HREF string and extract an `isScratchDesktop` override value if present.
 * The value is set in `isScratchDesktop.override`.
 * Activate this by adding "?isScratchDesktop=1" or similar to the URL.
 * @param {string} href - the `window.location.href` value (or equivalent) to parse
 */
const setIsScratchDesktopOverrideFromHref = function (href) {
    const scratchDesktopMatches = href.match(/[?&]isScratchDesktop=([^&]+)/);
    if (scratchDesktopMatches) {
        try {
            // parse 'true' into `true`, 'false' into `false`, etc.
            isScratchDesktop.override = JSON.parse(scratchDesktopMatches[1]);
        } catch {
            // it's not JSON so just use the string
            // note that a typo like "falsy" will be treated as true
            isScratchDesktop.override = scratchDesktopMatches[1];
        }
    }
};

export default isScratchDesktop;
export {setIsScratchDesktopOverrideFromHref};
