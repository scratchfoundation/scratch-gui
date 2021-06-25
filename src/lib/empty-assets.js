/**
 * @fileoverview
 * Utility functions to return json corresponding to default empty assets.
 */

/**
 * Generate a blank costume object for vm.addCostume with the provided name.
 * @param {string} name the name to use for the costume, caller should localize
 * @return {object} vm costume object
 */
const emptyCostume = name => ({
    name: name,
    md5: 'cd21514d0531fdffb22204e0ec5ed84a.svg',
    rotationCenterX: 0,
    rotationCenterY: 0,
    bitmapResolution: 1,
    skinId: null
});

/**
 * Generate a new empty sprite. The caller should provide localized versions of the
 * default names.
 * @param {string} name the name to use for the sprite
 * @param {string} soundName the name to use for the default sound
 * @param {string} costumeName the name to use for the default costume
 * @return {object} object expected by vm.addSprite
 */
const emptySprite = (name, soundName, costumeName) => ({
    objName: name,
    sounds: [],
    costumes: [
        {
            costumeName: costumeName,
            baseLayerID: -1,
            baseLayerMD5: 'cd21514d0531fdffb22204e0ec5ed84a.svg',
            bitmapResolution: 1,
            rotationCenterX: 0,
            rotationCenterY: 0
        }
    ],
    currentCostumeIndex: 0,
    scratchX: 36,
    scratchY: 28,
    scale: 1,
    direction: 90,
    rotationStyle: 'normal',
    isDraggable: false,
    visible: true,
    spriteInfo: {}
});

export {
    emptyCostume,
    emptySprite
};
