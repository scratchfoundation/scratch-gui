import Blocks from '../../node_modules/scratch-vm/src/engine/blocks';

const expectToEqualFields = function (actualFields, expectedFieldsInfo) {
    expect(Object.keys(actualFields)).toHaveLength(expectedFieldsInfo ? expectedFieldsInfo.length : 0);
    if (expectedFieldsInfo) {
        expectedFieldsInfo.forEach(expectedField => {
            expect(actualFields).toHaveProperty(expectedField.name);
            const field = actualFields[expectedField.name];

            expect(field.name).toEqual(expectedField.name);
            expect(field.id).toEqual(void 0);
            expect(field.value).toEqual(expectedField.value);
        });
    }
};

const expectToEqualBranches = function (blocks, block, expectedBranchesInfo) {
    if (!expectedBranchesInfo || expectedBranchesInfo.length === 0) {
        expect(blocks.getBranch(block.id)).toEqual(null);
    } else {
        expectedBranchesInfo.forEach((expectedBranch, j) => {
            const branch = blocks.getBranch(block.id, j);
            expect(branch).not.toEqual(null);
            expectToEqualBlock(blocks, block.id, blocks.getBlock(branch), expectedBranch);
        });
    }
};

const expectToEqualInputs = function (blocks, parent, actualInputs, expectedInputsInfo) {
    expect(Object.keys(actualInputs)).toHaveLength(expectedInputsInfo ? expectedInputsInfo.length : 0);
    if (expectedInputsInfo) {
        expectedInputsInfo.forEach(expectedInput => {
            expect(actualInputs).toHaveProperty(expectedInput.name);
            const input = actualInputs[expectedInput.name];

            expect(input.name).toEqual(expectedInput.name);
            expect(input.shadow).toEqual(expectedInput.block.shadow ? input.block : null);

            /* eslint-disable no-use-before-define */
            expectToEqualBlock(blocks, parent, blocks.getBlock(input.block), expectedInput.block);
            /* eslint-enable no-use-before-define */
        });
    }
};

const expectToEqualBlock = function (blocks, parent, actualBlock, expectedBlockInfo) {
    const block = actualBlock;

    const expected = expectedBlockInfo;

    expect(blocks.getOpcode(block)).toEqual(expected.opcode);
    expect(block.parent).toEqual(parent);
    expect(block.shadow).toEqual(expected.shadow === true);
    expect(block.x).toEqual(void 0);
    expect(block.y).toEqual(void 0);

    expectToEqualFields(blocks.getFields(block), expected.fields);

    expectToEqualInputs(blocks, block.id, blocks.getInputs(block), expected.inputs);

    expectToEqualBranches(blocks, block, expected.branches);

    if (expected.next) {
        expectToEqualBlock(blocks, block.id, blocks.getBlock(blocks.getNextBlock(block.id)), expected.next);
    } else {
        expect(blocks.getNextBlock(block.id)).toEqual(null);
    }
};

const expectToEqualBlocks = function (actualBlocks, expectedBlocksInfo) {
    const blocks = new Blocks();
    Object.keys(actualBlocks).forEach(blockId => {
        blocks.createBlock(actualBlocks[blockId]);
    });

    const scripts = blocks.getScripts();
    expect(scripts).toHaveLength(expectedBlocksInfo.length);
    scripts.forEach((scriptId, i) => {
        expectToEqualBlock(blocks, null, blocks.getBlock(scriptId), expectedBlocksInfo[i]);
    });
};

const expectToEqualRubyStatement = function (actualBlocks, expectedStatement) {
    const expected = [
        {
            opcode: 'ruby_statement',
            inputs: [
                {
                    name: 'STATEMENT',
                    block: {
                        opcode: 'text',
                        fields: [
                            {
                                name: 'TEXT',
                                value: expectedStatement
                            }
                        ],
                        shadow: true
                    }
                }
            ]
        }
    ];
    expectToEqualBlocks(actualBlocks, expected);
};

export {
    expectToEqualBlocks as default,
    expectToEqualBlock,
    expectToEqualInputs,
    expectToEqualBranches,
    expectToEqualFields,
    expectToEqualRubyStatement
};
