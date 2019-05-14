import uuid from 'uuid/v1';

/**
 * Gets the current set of blocks from a JSON formatted version of the VM
 *
 * @param {object} vm A JSON formatted VM
 * @param {function} callback The callback function
 */
const getBlocksFromVm = (vm, callback) => {
    // Default the current set of blocks
    const blocks = {};

    // For each of the targets in the vm.  A target normally represents a sprite
    for (const key of Object.keys(vm.targets)) {
        // Get the current target
        const target = vm.targets[key];
        // For each block in the target
        for (const blockKey of Object.keys(target.blocks)) {
            // Get the current block
            const block = target.blocks[blockKey];
            // Add the block to the object of blocks
            blocks[blockKey] = block;
        }
    }
    // Return the current set of blocks.
    callback(false, blocks);
};

/**
 * Adds a block to the given VM
 * @param {object} vm A JSON formatted VM
 * @param {object} block A block object to add to the VM
 *
 * @returns {Promise} A promise resolving if successful, otherwise rejecting with any errors
 */
const addBlockToVm = (vm, block) => new Promise((resolve, reject) => {
    try {
        // Create a unique identifier for the block being created and format it properly
        const id = uuid().split('-')
            .join('');
        // Map the block with a key of the unique ID and a value of the new block
        vm.targets[1].blocks[id] = block;
        // Resolve
        resolve();
        // If any errors ar ecaught
    } catch (e) {
        // Reject with the error
        reject(e);
    }
});

export {getBlocksFromVm, addBlockToVm};
