const uid = () => String(Math.floor(1000000 * Math.random()));


export default blocks => {
    const oldToNew = {};

    // First update all top-level IDs and create old-to-new mapping
    for (let i = 0; i < blocks.length; i++) {
        const newId = uid();
        const oldId = blocks[i].id;
        blocks[i].id = oldToNew[oldId] = newId;
    }

    // Then go back through and update inputs (block/shadow)
    // and next/parent properties
    for (let i = 0; i < blocks.length; i++) {
        for (const key in blocks[i].inputs) {
            const input = blocks[i].inputs[key];
            input.block = oldToNew[input.block];
            input.shadow = oldToNew[input.shadow];
        }
        if (blocks[i].parent) {
            blocks[i].parent = oldToNew[blocks[i].parent];
        }
        if (blocks[i].next) {
            blocks[i].next = oldToNew[blocks[i].next];
        }
    }

    return blocks;
};
