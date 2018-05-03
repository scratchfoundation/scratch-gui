import platform from 'platform';

/**
 * Helper function to determine if the browser is supported.
 * @returns {boolean} False if the platform is definitely not supported.
 */
export default function () {
    if (platform.name === 'IE' ||
        platform.name === 'Opera' ||
        platform.name === 'Opera Mini' ||
        platform.name === 'Silk') {
        return false;
    }
    // Check for old versions of supported browsers
    if (platform.name === 'Chrome' &&
        parseInt(platform.version.split('.')[0], 10) < 55) {
        return false;
    }
    if (platform.name === 'Firefox' &&
        parseInt(platform.version.split('.')[0], 10) < 53) {
        return false;
    }
    if (platform.name === 'Safari' &&
        parseInt(platform.version.split('.')[0], 10) < 10) {
        return false;
    }
    return true;
}
