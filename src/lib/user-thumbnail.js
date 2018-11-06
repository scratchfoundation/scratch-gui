/**
 * @user-thumbnail
 * Utility functions to return thumnail-related strings
 */

/**
 * Generate a new empty sprite. The caller should provide localized versions of the default names.
 * @param {string} userId userId for the user whose thumbnail we want
 * @param {number} width desired thumbnail width; defaults to 32
 * @param {number} height desired thumbnail height; defaults to width.
 * @returns {string} thumbnail url string
 */
const thumbnailUrl = (userId, width, height) => (
    `/get_image/user/${userId}_${width ? width : 32}x${height ? height : (width ? width : 32)}.png`
);

export {
    thumbnailUrl
};
