let _ScratchBlocks = null;

const isLoaded = () => !!_ScratchBlocks;

const get = () => {
    if (!isLoaded()) {
        _ScratchBlocks = require('scratch-blocks');
    }
    return _ScratchBlocks;
};

export default {
    isLoaded,
    get
};
