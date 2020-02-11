const randomizeSpritePosition = spriteObject => {
    // https://github.com/LLK/scratch-flash/blob/689f3c79a7e8b2e98f5be80056d877f303a8d8ba/src/Scratch.as#L1385
    spriteObject.x = Math.floor((200 * Math.random()) - 100);
    spriteObject.y = Math.floor((100 * Math.random()) - 50);
};

export default randomizeSpritePosition;
