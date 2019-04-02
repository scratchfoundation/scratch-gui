const getBlocksFromVm = (vm, callback) => {
    const blocks = {};

    for (const key of Object.keys(vm.targets)) {
        const target = vm.targets[key];
        for (const blockKey of Object.keys(target.blocks)) {
            const block = target.blocks[blockKey];
            blocks[blockKey] = block;
        }
    }

    callback(false, blocks);
};

export {getBlocksFromVm};
