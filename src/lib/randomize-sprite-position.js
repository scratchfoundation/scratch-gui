const randomizeSpritePosition = spriteObject => {
    // https://github.com/LLK/scratch-flash/blob/689f3c79a7e8b2e98f5be80056d877f303a8d8ba/src/Scratch.as#L1385
    const randomX = Math.floor((200 * Math.random()) - 100);
    const randomY = Math.floor((100 * Math.random()) - 50);
    if (Object.prototype.hasOwnProperty.call(spriteObject, 'name')) {
        // Scratch 3 sprite
        spriteObject.x = randomX;
        spriteObject.y = randomY;
    } else if (Object.prototype.hasOwnProperty.call(spriteObject, 'objName')) {
        // Scratch 2 sprite (for empty sprites)
        spriteObject.scratchX = randomX;
        spriteObject.scratchY = randomY;
    }
};

export default randomizeSpritePosition;
