/**
 * Internal stored state. Not valid until after at least one call to `setIsScratchDesktop()`.
 * @type {boolean}
 */
let _isScratchDesktop; // undefined = not ready yet

/**
 * Tell the `isScratchDesktop()` whether or not the GUI is running under Scratch Desktop.
 * @param {boolean} value - the new value which `isScratchDesktop()` should return in the future.
 */
const setIsScratchDesktop = function (value) {
    _isScratchDesktop = value;
};

/**
 * @returns {boolean} - true if it seems like the GUI is running under Scratch Desktop; false otherwise.
 */
const isScratchDesktop = function () {
    if (typeof _isScratchDesktop === 'undefined') {
        throw new Error('isScratchDesktop is not ready yet');
    }
    return _isScratchDesktop;
};

/**
 * @returns {boolean} - false if it seems like the GUI is running under Scratch Desktop; true otherwise.
 */
const notScratchDesktop = function () {
    return !isScratchDesktop();
};

export default isScratchDesktop;
export {
    isScratchDesktop,
    notScratchDesktop,
    setIsScratchDesktop
};
