import keyMirror from 'keymirror';

/**
 * Names for device programming framework types.
 * @enum {string}
 */
const DeviceType = keyMirror({
    /**
     * Arduino programming framework
     */
    arduino: null,

    /**
     * Python programming framework
     * Standerd Python
     */
    python: null,

    /**
     * MicroPython programming framework
     */
    microPython: null,

    /**
     * Microbit programming framework
     * Upload tools, etc. are different from standard MicroPython
     */
    microbit: null
});

const getLanguageFromDeviceType = deviceType => {
    if (deviceType === DeviceType.arduino) {
        return 'cpp';
    } else if (deviceType === DeviceType.microPython || deviceType === DeviceType.microbit) {
        return 'python';
    }
    return 'null';
};

export {getLanguageFromDeviceType, DeviceType};
