import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    convertAndExpectToEqualRubyStatement,
    rubyToExpected,
    expectedInfo
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Variables', () => {
    let converter;
    let target;

    beforeEach(() => {
        converter = new RubyToBlocksConverter(null);
        target = null;
    });

    [
        {
            scope: '@',
            name: 'a'
        },
        {
            scope: '$',
            name: 'a'
        }
    ].forEach(variable => {
        const varName = `${variable.scope}${variable.name}`;
        describe(varName, () => {
            test('data_variable', () => {
                const code = varName;
                const expected = [
                    {
                        opcode: 'data_variable',
                        fields: [
                            {
                                name: 'VARIABLE',
                                variable: varName
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('data_setvariableto', () => {
                const code = `${varName} = 0`;
                const expected = [
                    {
                        opcode: 'data_setvariableto',
                        fields: [
                            {
                                name: 'VARIABLE',
                                variable: varName
                            }
                        ],
                        inputs: [
                            {
                                name: 'VALUE',
                                block: expectedInfo.makeText('0')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('data_changevariableby', () => {
                const code = `${varName} += 1`;
                const expected = [
                    {
                        opcode: 'data_changevariableby',
                        fields: [
                            {
                                name: 'VARIABLE',
                                variable: varName
                            }
                        ],
                        inputs: [
                            {
                                name: 'VALUE',
                                block: expectedInfo.makeText('1')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);

                [
                    `${varName} -= 1`,
                    `${varName} *= 1`,
                    `${varName} /= 1`,
                    `${varName} %= 1`
                ].forEach(s => {
                    convertAndExpectToEqualRubyStatement(converter, target, s, s);
                });
            });

            test('data_showvariable', () => {
                const code = `show_variable("${varName}")`;
                const expected = [
                    {
                        opcode: 'data_showvariable',
                        fields: [
                            {
                                name: 'VARIABLE',
                                variable: varName
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);

                [
                    `show_variable("${variable.name}")`,
                    'show_variable(1)',
                    `show_variable("&${variable.name}")`
                ].forEach(s => {
                    convertAndExpectToEqualRubyStatement(converter, target, s, s);
                });
            });

            test('data_hidevariable', () => {
                const code = `hide_variable("${varName}")`;
                const expected = [
                    {
                        opcode: 'data_hidevariable',
                        fields: [
                            {
                                name: 'VARIABLE',
                                variable: varName
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);

                [
                    `hide_variable("${variable.name}")`,
                    'hide_variable(1)',
                    `hide_variable("&${variable.name}")`
                ].forEach(s => {
                    convertAndExpectToEqualRubyStatement(converter, target, s, s);
                });
            });

            test('data_listcontents', () => {
                const code = `${varName}[1]; ${varName}`;
                const expected = [
                    rubyToExpected(converter, target, `${varName}[1]`)[0],
                    {
                        opcode: 'data_listcontents',
                        fields: [
                            {
                                name: 'LIST',
                                list: varName
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('data_addtolist', () => {
                const code = `${varName}.push("thing")`;
                const expected = [
                    {
                        opcode: 'data_addtolist',
                        fields: [
                            {
                                name: 'LIST',
                                list: varName
                            }
                        ],
                        inputs: [
                            {
                                name: 'ITEM',
                                block: expectedInfo.makeText('thing')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('data_deleteoflist', () => {
                const code = `${varName}.delete_at(1)`;
                const expected = [
                    {
                        opcode: 'data_deleteoflist',
                        fields: [
                            {
                                name: 'LIST',
                                list: varName
                            }
                        ],
                        inputs: [
                            {
                                name: 'INDEX',
                                block: expectedInfo.makeNumber(1)
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('data_deletealloflist', () => {
                const code = `${varName}.clear`;
                const expected = [
                    {
                        opcode: 'data_deletealloflist',
                        fields: [
                            {
                                name: 'LIST',
                                list: varName
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('data_insertatlist', () => {
                const code = `${varName}.insert(1, "thing")`;
                const expected = [
                    {
                        opcode: 'data_insertatlist',
                        fields: [
                            {
                                name: 'LIST',
                                list: varName
                            }
                        ],
                        inputs: [
                            {
                                name: 'INDEX',
                                block: expectedInfo.makeNumber(1)
                            },
                            {
                                name: 'ITEM',
                                block: expectedInfo.makeText('thing')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('data_replaceitemoflist', () => {
                const code = `${varName}[1] = "thing"`;
                const expected = [
                    {
                        opcode: 'data_replaceitemoflist',
                        fields: [
                            {
                                name: 'LIST',
                                list: varName
                            }
                        ],
                        inputs: [
                            {
                                name: 'INDEX',
                                block: expectedInfo.makeNumber(1)
                            },
                            {
                                name: 'ITEM',
                                block: expectedInfo.makeText('thing')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('data_itemoflist', () => {
                const code = `${varName}[1]`;
                const expected = [
                    {
                        opcode: 'data_itemoflist',
                        fields: [
                            {
                                name: 'LIST',
                                list: varName
                            }
                        ],
                        inputs: [
                            {
                                name: 'INDEX',
                                block: expectedInfo.makeNumber(1)
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('data_itemnumoflist', () => {
                const code = `${varName}.index("thing")`;
                const expected = [
                    {
                        opcode: 'data_itemnumoflist',
                        fields: [
                            {
                                name: 'LIST',
                                list: varName
                            }
                        ],
                        inputs: [
                            {
                                name: 'ITEM',
                                block: expectedInfo.makeText('thing')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('data_lengthoflist', () => {
                const code = `${varName}.length`;
                const expected = [
                    {
                        opcode: 'data_lengthoflist',
                        fields: [
                            {
                                name: 'LIST',
                                list: varName
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('data_listcontainsitem', () => {
                const code = `${varName}.include?("thing")`;
                const expected = [
                    {
                        opcode: 'data_listcontainsitem',
                        fields: [
                            {
                                name: 'LIST',
                                list: varName
                            }
                        ],
                        inputs: [
                            {
                                name: 'ITEM',
                                block: expectedInfo.makeText('thing')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('data_showlist', () => {
                const code = `show_list("${varName}")`;
                const expected = [
                    {
                        opcode: 'data_showlist',
                        fields: [
                            {
                                name: 'LIST',
                                list: varName
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('data_hidelist', () => {
                const code = `hide_list("${varName}")`;
                const expected = [
                    {
                        opcode: 'data_hidelist',
                        fields: [
                            {
                                name: 'LIST',
                                list: varName
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });
        });
    });
});
