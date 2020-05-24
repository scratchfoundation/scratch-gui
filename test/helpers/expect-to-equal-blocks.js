import Blocks from 'scratch-vm/src/engine/blocks';
import Variable from 'scratch-vm/src/engine/variable';
import RubyToBlocksConverter from '../../src/lib/ruby-to-blocks-converter';

// for debug
const toJson = function (o) {
    return JSON.stringify(o, undefined, 2); // eslint-disable-line no-undefined
};

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
                expect(field).toHaveProperty('id', variable.id);
            } else if (expectedField.hasOwnProperty('broadcastMsg')) {
                expect(context.broadcastMsgs).toHaveProperty(expectedField.broadcastMsg);
                const broadcastMsg = context.broadcastMsgs[expectedField.broadcastMsg];
                expect(broadcastMsg.name).toEqual(expectedField.broadcastMsg);
                expect(field).toHaveProperty('id', broadcastMsg.id);
                expect(field).toHaveProperty('variableType', 'broadcast_msg');
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
            // eslint-disable-next-line no-use-before-define
            expectToEqualBlock(context, block.id, blocks.getBlock(branch), expectedBranch);
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
            if (expectedInput.shadow) {
                // eslint-disable-next-line no-use-before-define
                expectToEqualBlock(context, parent, blocks.getBlock(input.shadow), expectedInput.shadow);
            } else {
                expect(input.shadow).toEqual(expectedInput.block.shadow ? input.block : null);
            }

            // eslint-disable-next-line no-use-before-define
            expectToEqualBlock(context, parent, blocks.getBlock(input.block), expectedInput.block);
        });
    }
};

const expectToEqualMutation = function (context, block, actualMutation, expectedMutationInfo) {
    if (!actualMutation && !expectedMutationInfo) {
        return;
    }

    const blocks = context.blocks;
    Object.keys(expectedMutationInfo).forEach(key => {
        switch (key) {
        case 'arguments': {
            const expectedArguments = expectedMutationInfo[key];

            const argumentNames = expectedArguments.map(a => a.name);
            expect(actualMutation).toHaveProperty('argumentnames', JSON.stringify(argumentNames));

            const actualArgInputIds = JSON.parse(actualMutation.argumentids);
            expect(actualArgInputIds).toHaveLength(expectedArguments.length);

            const expectedArgDefaults = [];
            actualArgInputIds.forEach((actualArgInputId, i) => {
                const actualArgInput = block.inputs[actualArgInputId];
                const expectedArgBlock = {
                    opcode: `argument_reporter_${expectedArguments[i].type}`,
                    fields: [
                        {
                            name: 'VALUE',
                            value: expectedArguments[i].name
                        }
                    ],
                    shadow: true
                };
                if (expectedArguments[i].type === 'string_number') {
                    expectedArgDefaults.push('');
                } else {
                    expectedArgDefaults.push('false');
                }
                // eslint-disable-next-line no-use-before-define
                expectToEqualBlock(context, block.id, blocks.getBlock(actualArgInput.block), expectedArgBlock);
            });

            expect(actualMutation).toHaveProperty('argumentdefaults', JSON.stringify(expectedArgDefaults));
            break;
        }
        case 'argument_blocks': {
            const actualArgInputIds = JSON.parse(actualMutation.argumentids);
            actualArgInputIds.forEach((actualArgInputId, i) => {
                const actualArgInput = block.inputs[actualArgInputId];
                const expectedArgBlock = expectedMutationInfo[key][i];

                expect(actualArgInput).toHaveProperty('name', actualArgInputId);
                if (expectedArgBlock === false) {
                    expect(actualArgInput.block).toEqual(null);
                    expect(actualArgInput.shadow).toEqual(null);
                } else {
                    const actualArgBlock = blocks.getBlock(actualArgInput.block);
                    // eslint-disable-next-line no-use-before-define
                    expectToEqualBlock(context, block.id, actualArgBlock, expectedArgBlock);
                }
            });
            expect(actualArgInputIds).toHaveLength(expectedMutationInfo[key].length);
            break;
        }
        default:
            expect(actualMutation).toHaveProperty(key, expectedMutationInfo[key]);
        }
    });
    expect(actualMutation).toHaveProperty('tagName', 'mutation');
    expect(actualMutation).toHaveProperty('warp', 'false');
    expect(actualMutation.children).toHaveLength(0);
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

    if (!expected.hasOwnProperty('mutation')) {
        expectToEqualInputs(context, block.id, blocks.getInputs(block), expected.inputs);
    }

    expectToEqualMutation(context, block, blocks.getMutation(block), expected.mutation);

    expectToEqualBranches(context, block, expected.branches);

    if (expected.next) {
        expectToEqualBlock(context, block.id, blocks.getBlock(blocks.getNextBlock(block.id)), expected.next);
    } else {
        expect(blocks.getNextBlock(block.id)).toEqual(null);
    }
};

const expectToEqualBlocks = function (converter, expectedBlocksInfo) {
    const blocks = new Blocks();
    blocks.forceNoGlow = true;
    Object.keys(converter.blocks).forEach(blockId => {
        blocks.createBlock(converter.blocks[blockId]);
    });

    const context = {
        converter: converter,
        blocks: blocks,
        variables: converter.variables,
        lists: converter.lists,
        broadcastMsgs: converter.broadcastMsgs
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

const convertAndExpectRubyBlockError = function (converter, target, code) {
    converter.targetCodeToBlocks(target, code);
    expect(converter.errors).toHaveLength(1);
    expect(converter.errors[0].text).toMatch(/ is the wrong instruction./);
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
            let varName = field.value;
            let storeName;
            if (field.variableType === Variable.SCALAR_TYPE) {
                storeName = 'variables';
            } else if (field.variableType === Variable.BROADCAST_MESSAGE_TYPE) {
                storeName = 'broadcastMsgs';
                varName = varName.toLowerCase();
            } else {
                storeName = 'lists';
            }
            const variable = context[storeName][varName];
            if (field.variableType === Variable.BROADCAST_MESSAGE_TYPE) {
                return {
                    name: field.name,
                    broadcastMsg: field.value
                };
            }
            let scope;
            if (variable.scope === 'global') {
                scope = '$';
            } else if (variable.scope === 'instance') {
                scope = '@';
            } else {
                scope = '';
            }
            if (field.variableType === Variable.SCALAR_TYPE) {
                return {
                    name: field.name,
                    variable: `${scope}${varName}`
                };
            }
            return {
                name: field.name,
                list: `${scope}${varName}`
            };
        }
        return {
            name: field.name,
            value: field.value
        };
    });
};

const inputsToExpected = function (context, inputs) {
    if (!inputs) {
        return null;
    }

    return Object.keys(inputs).map(name => {
        const input = inputs[name];
        const expected = {
            name: input.name,
            block: blockToExpected(context, input.block) // eslint-disable-line no-use-before-define
        };
        if (input.shadow !== null && input.shadow !== input.block) {
            expected.shadow = blockToExpected(context, input.shadow); // eslint-disable-line no-use-before-define
        }
        return expected;
    });
};

const branchesToExpected = function (context, block) {
    const blocks = context.blocks;
    const branches = [];
    for (let i = 1; i <= 2; i++) {
        const branch = blocks.getBranch(block.id, i);
        if (branch !== null) {
            branches[i - 1] = blockToExpected(context, branch); // eslint-disable-line no-use-before-define
        }
    }
    if (branches.length === 0) {
        return null;
    }

    return branches;
};

const blockToExpected = function (context, blockId) {
    if (!blockId) {
        return null;
    }

    const blocks = context.blocks;
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
    const inputs = inputsToExpected(context, blocks.getInputs(block));
    if (inputs) {
        expected.inputs = inputs;
    }
    const branches = branchesToExpected(context, block);
    if (branches) {
        expected.branches = branches;
    }
    const next = blockToExpected(context, blocks.getNextBlock(block.id));
    if (next) {
        expected.next = next;
    }

    return expected;
};

const rubyToExpected = function (converter, target, code) {
    converter.targetCodeToBlocks(target, code);
    expect(converter.errors).toHaveLength(0);

    const blocks = new Blocks();
    blocks.forceNoGlow = true;
    Object.keys(converter.blocks).forEach(blockId => {
        blocks.createBlock(converter.blocks[blockId]);
    });

    const context = {
        converter: converter,
        blocks: blocks,
        variables: converter.variables,
        lists: converter.lists,
        broadcastMsgs: converter.broadcastMsgs
    };

    const scripts = blocks.getScripts();
    return scripts.map(scriptId => blockToExpected(context, scriptId));
};

const expectedInfo = {
    makeText: text => ({
        opcode: 'text',
        fields: [
            {
                name: 'TEXT',
                value: text.toString()
            }
        ],
        shadow: true
    }),
    makeNumber: (num, opcode = 'math_number') => ({
        opcode: opcode,
        fields: [
            {
                name: 'NUM',
                value: num.toString()
            }
        ],
        shadow: true
    })
};

const expectNoArgsMethod = function (opcode, methodName, blockType = 'statement') {
    let converter;
    let target;
    let code;
    let expected;

    beforeEach(() => {
        converter = new RubyToBlocksConverter(null);
        target = null;
        code = null;
        expected = null;
    });

    describe(`${opcode}`, () => {
        test('normal', () => {
            code = methodName;
            expected = [
                {
                    opcode: opcode
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = `${methodName}()`;
            expected = [
                {
                    opcode: opcode
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        if (blockType === 'statement') {
            test(blockType, () => {
                code = `
                    bounce_if_on_edge
                    ${methodName}
                    bounce_if_on_edge
                `;
                expected = [
                    rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
                ];
                expected[0].next = rubyToExpected(converter, target, `${methodName}`)[0];
                expected[0].next.next = rubyToExpected(converter, target, 'bounce_if_on_edge')[0];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });
        } else if (blockType === 'value' || blockType === 'value_boolean') {
            test(blockType, () => {
                code = `
                    bounce_if_on_edge
                    ${methodName}
                    bounce_if_on_edge
                `;
                expected = [
                    rubyToExpected(converter, target, 'bounce_if_on_edge')[0],
                    rubyToExpected(converter, target, `${methodName}`)[0],
                    rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });
        }

        test('invalid', () => {
            [
                `${methodName}(false)`,
                `${methodName}(true)`,
                `${methodName}(1)`,
                `${methodName}("backdrop2")`,
                `${methodName}(x)`
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });
        });
    });
};

export {
    toJson,
    expectToEqualBlocks,
    convertAndExpectToEqualBlocks,
    convertAndExpectRubyBlockError,
    expectToEqualRubyStatement,
    convertAndExpectToEqualRubyStatement,
    rubyToExpected,
    expectedInfo,
    expectNoArgsMethod
};
