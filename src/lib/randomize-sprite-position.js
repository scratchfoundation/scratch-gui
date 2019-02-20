const randomizeSpritePosition = spriteObject => {
    // https://github.com/LLK/scratch-flash/blob/689f3c79a7e8b2e98f5be80056d877f303a8d8ba/src/Scratch.as#L1385
    const randomX = Math.floor((200 * Math.random()) - 100);
    const randomY = Math.floor((100 * Math.random()) - 50);
    if (spriteObject.hasOwnProperty('json')) {
        // Library sprite object
        spriteObject.json.scratchX = randomX;
        spriteObject.json.scratchY = randomY;
    } else if (spriteObject.hasOwnProperty('x') && spriteObject.hasOwnProperty('y')) {
        // Scratch 3 sprite object
        spriteObject.x = randomX;
        spriteObject.y = randomY;
    }
};

export default randomizeSpritePosition;
