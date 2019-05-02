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

export {getBlocksFromVm};
