import Blocks from 'scratch-vm/src/engine/blocks';
import Variable from 'scratch-vm/src/engine/variable';

const expectToEqualFields = function (context, actualFields, expectedFieldsInfo) {
    expect(Object.keys(actualFields)).toHaveLength(expectedFieldsInfo ? expectedFieldsInfo.length : 0);
    if (expectedFieldsInfo) {
        expectedFieldsInfo.forEach(expectedField => {
            expect(actualFields).toHaveProperty(expectedField.name);
            const field = actualFields[expectedField.name];

            expect(field.name).toEqual(expectedField.name);
            if (expectedField.hasOwnProperty('variable') ||
                expectedField.hasOwnProperty('list')) {
                const s = expectedField.variable || expectedField.list;
                let varName;
                let scope;
                if (s[0] === '$') {
                    varName = s.slice(1);
                    scope = 'global';
                } else if (s[0] === '@') {
                    varName = s.slice(1);
                    scope = 'instance';
                } else {
                    varName = s;
                    scope = 'local';
                }
                let storeName;
                if (expectedField.hasOwnProperty('variable')) {
                    storeName = 'variables';
                } else {
                    storeName = 'lists';
                }
                expect(context[storeName]).toHaveProperty(varName);
                const variable = context[storeName][varName];
                expect(variable.name).toEqual(varName);
                expect(variable.scope).toEqual(scope);

                let expectedType;
                if (expectedField.hasOwnProperty('variable')) {
                    expectedType = Variable.SCALAR_TYPE;
                } else {
                    expectedType = Variable.LIST_TYPE;
                }
                expect(field).toHaveProperty('variableType', expectedType);
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
        variables: converter.variables,
        lists: converter.lists
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

const convertAndExpectToEqualRubyStatement = function (converter, target, code, expectedStatement) {
    const res = converter.targetCodeToBlocks(target, code);
    expect(converter.errors).toHaveLength(0);
    expectToEqualRubyStatement(converter, expectedStatement);
    expect(res).toBeTruthy();
};

const fieldsToExpected = function (context, fields) {
    if (!fields) {
        return null;
    }

    return Object.keys(fields).map(name => {
        const field = fields[name];
        if (field.id) {
            const varName = field.value;
            let storeName;
            if (field.variableType === Variable.SCALAR_TYPE) {
                storeName = 'variables';
            } else {
                storeName = 'lists';
            }
            const variable = context[storeName][varName];
            let scope;
            if (variable.scope === 'global') {
                scope = '$';
            } else if (variable.scope === 'instance') {
                scope = '@';
            } else {
                scope = '';
            }
            if (variable.type === Variable.SCALAR_TYPE) {
                return {
                    name: 'VARIABLE',
                    variable: `${scope}${varName}`
                };
            }
            return {
                name: 'LIST',
                list: `${scope}${varName}`
            };
        }
        return {
            name: field.name,
            value: field.value
        };
    });
};

const inputsToExpected = function (context, blocks, inputs) {
    if (!inputs) {
        return null;
    }

    return Object.keys(inputs).map(name => {
        const input = inputs[name];
        const expected = {
            name: input.name,
            /* eslint-disable no-use-before-define */
            block: blockToExpected(context, blocks, input.block)
            /* eslint-enable no-use-before-define */
        };
        if (input.shadow) {
            expected.shadow = true;
        }
        return expected;
    });
};

const branchesToExpected = function (context, blocks, block) {
    const branches = [];
    for (let i = 1; i <= 2; i++) {
        const branch = blocks.getBranch(block.id, i);
        if (branch !== null) {
            /* eslint-disable no-use-before-define */
            branches[i - 1] = blockToExpected(context, blocks, branch);
            /* eslint-enable no-use-before-define */
        }
    }
    if (branches.length === 0) {
        return null;
    }

    return branches;
};

const blockToExpected = function (context, blocks, blockId) {
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
    const fields = fieldsToExpected(context, blocks.getFields(block));
    if (fields) {
        expected.fields = fields;
    }
    const inputs = inputsToExpected(context, blocks, blocks.getInputs(block));
    if (inputs) {
        expected.inputs = inputs;
    }
    const branches = branchesToExpected(context, blocks, block);
    if (branches) {
        expected.branches = branches;
    }
    const next = blockToExpected(context, blocks, blocks.getNextBlock(block));
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

    const context = {
        converter: converter,
        blocks: blocks,
        variables: converter.variables,
        lists: converter.lists
    };

    const scripts = blocks.getScripts();
    return scripts.map(scriptId => blockToExpected(context, blocks, scriptId));
};

const expectedInfo = {
    makeText: text => ({
        opcode: 'text',
        fields: [
            {
                name: 'TEXT',
                value: text
            }
        ],
        shadow: true
    }),
    makeNumber: (num, opcode = 'math_number') => ({
        opcode: opcode,
        fields: [
            {
                name: 'NUM',
                value: num
            }
        ],
        shadow: true
    })
};

export {
    expectToEqualBlocks,
    convertAndExpectToEqualBlocks,
    expectToEqualRubyStatement,
    convertAndExpectToEqualRubyStatement,
    rubyToExpected,
    expectedInfo
};
