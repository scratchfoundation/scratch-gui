import Blocks from 'scratch-vm/src/engine/blocks';
import Variable from 'scratch-vm/src/engine/variable';

const expectToEqualFields = function (context, actualFields, expectedFieldsInfo) {
    expect(Object.keys(actualFields)).toHaveLength(expectedFieldsInfo ? expectedFieldsInfo.length : 0);
    if (expectedFieldsInfo) {
        expectedFieldsInfo.forEach(expectedField => {
            expect(actualFields).toHaveProperty(expectedField.name);
            const field = actualFields[expectedField.name];

            expect(field.name).toEqual(expectedField.name);
            if (expectedField.hasOwnProperty('variable')) {
                let varName;
                let store;
                if (expectedField.variable[0] === '$') {
                    varName = expectedField.variable.slice(1);
                    store = context.globalVariables;
                } else if (expectedField.variable[0] === '@') {
                    varName = expectedField.variable.slice(1);
                    store = context.instanceVariables;
                } else {
                    varName = expectedField.variable;
                    store = context.localVariables;
                }
                expect(store).toHaveProperty(varName);
                const variable = store[varName];
                expect(variable.name).toEqual(varName);
                let expectedType = Variable.SCALAR_TYPE;
                if (expectedField.hasOwnProperty('type')) {
                    expectedType = Variable[expectedField.type];
                }
                expect(variable.type).toEqual(expectedType);
            } else {
                expect(field.id).toEqual(void 0);
                expect(field.value).toEqual(expectedField.value);
            }
        });
    }
};

const expectToEqualBranches = function (context, block, expectedBranchesInfo) {
    const blocks = context.blocks;
    if (!expectedBranchesInfo || expectedBranchesInfo.length === 0) {
        expect(blocks.getBranch(block.id)).toEqual(null);
    } else {
        expectedBranchesInfo.forEach((expectedBranch, j) => {
            const branch = blocks.getBranch(block.id, j + 1);
            if (expectedBranch === null) {
                expect(branch).toEqual(null);
                return;
            }
            expect(branch).not.toEqual(null);
            /* eslint-disable no-use-before-define */
            expectToEqualBlock(context, block.id, blocks.getBlock(branch), expectedBranch);
            /* eslint-enable no-use-before-define */
        });
    }
};

const expectToEqualInputs = function (context, parent, actualInputs, expectedInputsInfo) {
    const blocks = context.blocks;
    expect(Object.keys(actualInputs)).toHaveLength(expectedInputsInfo ? expectedInputsInfo.length : 0);
    if (expectedInputsInfo) {
        expectedInputsInfo.forEach(expectedInput => {
            expect(actualInputs).toHaveProperty(expectedInput.name);
            const input = actualInputs[expectedInput.name];

            expect(input.name).toEqual(expectedInput.name);
            expect(input.shadow).toEqual(expectedInput.block.shadow ? input.block : null);

            /* eslint-disable no-use-before-define */
            expectToEqualBlock(context, parent, blocks.getBlock(input.block), expectedInput.block);
            /* eslint-enable no-use-before-define */
        });
    }
};

const expectToEqualBlock = function (context, parent, actualBlock, expectedBlockInfo) {
    const blocks = context.blocks;
    const block = actualBlock;

    const expected = expectedBlockInfo;

    expect(blocks.getOpcode(block)).toEqual(expected.opcode);
    expect(block.parent).toEqual(parent);
    expect(block.shadow).toEqual(expected.shadow === true);
    expect(block.x).toEqual(void 0);
    expect(block.y).toEqual(void 0);

    expectToEqualFields(context, blocks.getFields(block), expected.fields);

    expectToEqualInputs(context, block.id, blocks.getInputs(block), expected.inputs);

    expectToEqualBranches(context, block, expected.branches);

    if (expected.next) {
        expectToEqualBlock(context, block.id, blocks.getBlock(blocks.getNextBlock(block.id)), expected.next);
    } else {
        expect(blocks.getNextBlock(block.id)).toEqual(null);
    }
};

const expectToEqualBlocks = function (converter, expectedBlocksInfo) {
    const blocks = new Blocks();
    Object.keys(converter.blocks).forEach(blockId => {
        blocks.createBlock(converter.blocks[blockId]);
    });

    const context = {
        converter: converter,
        blocks: blocks,
        localVariables: converter.localVariables,
        instanceVariables: converter.instanceVariables,
        globalVariables: converter.globalVariables
    };

    const scripts = blocks.getScripts();
    expect(scripts).toHaveLength(expectedBlocksInfo.length);
    scripts.forEach((scriptId, i) => {
        expectToEqualBlock(context, null, blocks.getBlock(scriptId), expectedBlocksInfo[i]);
    });
};

const convertAndExpectToEqualBlocks = function (converter, target, code, expectedBlocksInfo) {
    const res = converter.targetCodeToBlocks(target, code);
    expect(converter.errors).toHaveLength(0);
    expectToEqualBlocks(converter, expectedBlocksInfo);
    expect(res).toBeTruthy();
};

const expectToEqualRubyStatement = function (converter, expectedStatement) {
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
    expectToEqualBlocks(converter, expected);
};

const fieldsToExpected = function (fields) {
    if (!fields) {
        return null;
    }

    return Object.keys(fields).map(name => {
        const field = fields[name];
        if (fields.id) {
            // TODO: 変数への参照を解決する
        }
        return {
            name: field.name,
            value: field.value
        };
    });
};

const inputsToExpected = function (blocks, inputs) {
    if (!inputs) {
        return null;
    }

    return Object.keys(inputs).map(name => {
        const input = inputs[name];
        const expected = {
            name: input.name,
            /* eslint-disable no-use-before-define */
            block: blockToExpected(blocks, input.block)
            /* eslint-enable no-use-before-define */
        };
        if (input.shadow) {
            expected.shadow = true;
        }
        return expected;
    });
};

const branchesToExpected = function (blocks, block) {
    const branches = [];
    for (let i = 1; i <= 2; i++) {
        const branch = blocks.getBranch(block.id, i);
        if (branch !== null) {
            /* eslint-disable no-use-before-define */
            branches[i - 1] = blockToExpected(blocks, branch);
            /* eslint-enable no-use-before-define */
        }
    }
    if (branches.length === 0) {
        return null;
    }

    return branches;
};

const blockToExpected = function (blocks, blockId) {
    if (!blockId) {
        return null;
    }

    const block = blocks.getBlock(blockId);
    const expected = {
        opcode: blocks.getOpcode(block)
    };
    if (block.shadow) {
        expected.shadow = true;
    }
    const fields = fieldsToExpected(blocks.getFields(block));
    if (fields) {
        expected.fields = fields;
    }
    const inputs = inputsToExpected(blocks, blocks.getInputs(block));
    if (inputs) {
        expected.inputs = inputs;
    }
    const branches = branchesToExpected(blocks, block);
    if (branches) {
        expected.branches = branches;
    }
    const next = blockToExpected(blocks, blocks.getNextBlock(block));
    if (next) {
        expected.next = next;
    }

    return expected;
};

const rubyToExpected = function (converter, target, code) {
    converter.targetCodeToBlocks(target, code);
    expect(converter.errors).toHaveLength(0);

    const blocks = new Blocks();
    Object.keys(converter.blocks).forEach(blockId => {
        blocks.createBlock(converter.blocks[blockId]);
    });

    const scripts = blocks.getScripts();
    return scripts.map(scriptId => blockToExpected(blocks, scriptId));
};

export {
    expectToEqualBlocks,
    convertAndExpectToEqualBlocks,
    expectToEqualRubyStatement,
    rubyToExpected
};
