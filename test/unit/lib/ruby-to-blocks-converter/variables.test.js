import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    convertAndExpectRubyBlockError,
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
        describe(`${varName}`, () => {
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
                let code;
                let expected;

                code = `${varName} = 0`;
                expected = [
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

                code = `${varName} = x`;
                expected = [
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
                                block: rubyToExpected(converter, target, 'x')[0],
                                shadow: expectedInfo.makeText('0')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('data_changevariableby', () => {
                let code;
                let expected;

                code = `${varName} += 1`;
                expected = [
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
                                block: expectedInfo.makeNumber(1)
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);

                code = `${varName} += x`;
                expected = [
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
                                block: rubyToExpected(converter, target, 'x')[0],
                                shadow: expectedInfo.makeNumber(1)
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
                    convertAndExpectRubyBlockError(converter, target, s);
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
                    convertAndExpectRubyBlockError(converter, target, s);
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
                    convertAndExpectRubyBlockError(converter, target, s);
                });
            });

            test('data_listcontents', () => {
                const code = `list("${varName}")`;
                const expected = [
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
                let code;
                let expected;

                code = `list("${varName}").push("thing")`;
                expected = [
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

                code = `list("${varName}").push(1)`;
                expected = [
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
                                block: expectedInfo.makeText('1')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);

                code = `list("${varName}").push(x)`;
                expected = [
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
                                block: rubyToExpected(converter, target, 'x')[0],
                                shadow: expectedInfo.makeText('thing')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('data_deleteoflist', () => {
                let code;
                let expected;

                code = `list("${varName}").delete_at(1)`;
                expected = [
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
                                block: expectedInfo.makeNumber(1, 'math_integer')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);

                code = `list("${varName}").delete_at(x)`;
                expected = [
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
                                block: rubyToExpected(converter, target, 'x')[0],
                                shadow: expectedInfo.makeNumber(1, 'math_integer')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('data_deletealloflist', () => {
                const code = `list("${varName}").clear`;
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
                let code;
                let expected;

                code = `list("${varName}").insert(1, "thing")`;
                expected = [
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
                                block: expectedInfo.makeNumber(1, 'math_integer')
                            },
                            {
                                name: 'ITEM',
                                block: expectedInfo.makeText('thing')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);

                code = `list("${varName}").insert(1, 2)`;
                expected = [
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
                                block: expectedInfo.makeNumber(1, 'math_integer')
                            },
                            {
                                name: 'ITEM',
                                block: expectedInfo.makeText('2')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);

                code = `list("${varName}").insert(x, y)`;
                expected = [
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
                                block: rubyToExpected(converter, target, 'x')[0],
                                shadow: expectedInfo.makeNumber(1, 'math_integer')
                            },
                            {
                                name: 'ITEM',
                                block: rubyToExpected(converter, target, 'y')[0],
                                shadow: expectedInfo.makeText('thing')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('data_replaceitemoflist', () => {
                let code;
                let expected;

                code = `list("${varName}")[1] = "thing"`;
                expected = [
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
                                block: expectedInfo.makeNumber(1, 'math_integer')
                            },
                            {
                                name: 'ITEM',
                                block: expectedInfo.makeText('thing')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);

                code = `list("${varName}")[1] = 2`;
                expected = [
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
                                block: expectedInfo.makeNumber(1, 'math_integer')
                            },
                            {
                                name: 'ITEM',
                                block: expectedInfo.makeText('2')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);

                code = `list("${varName}")[x] = y`;
                expected = [
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
                                block: rubyToExpected(converter, target, 'x')[0],
                                shadow: expectedInfo.makeNumber(1, 'math_integer')
                            },
                            {
                                name: 'ITEM',
                                block: rubyToExpected(converter, target, 'y')[0],
                                shadow: expectedInfo.makeText('thing')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('data_itemoflist', () => {
                let code;
                let expected;

                code = `list("${varName}")[1]`;
                expected = [
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
                                block: expectedInfo.makeNumber(1, 'math_integer')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);

                code = `list("${varName}")[x]`;
                expected = [
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
                                block: rubyToExpected(converter, target, 'x')[0],
                                shadow: expectedInfo.makeNumber(1, 'math_integer')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('data_itemnumoflist', () => {
                let code;
                let expected;

                code = `list("${varName}").index("thing")`;
                expected = [
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

                code = `list("${varName}").index(1)`;
                expected = [
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
                                block: expectedInfo.makeText('1')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);

                code = `list("${varName}").index(x)`;
                expected = [
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
                                block: rubyToExpected(converter, target, 'x')[0],
                                shadow: expectedInfo.makeText('thing')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('data_lengthoflist', () => {
                const code = `list("${varName}").length`;
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
                let code;
                let expected;

                code = `list("${varName}").include?("thing")`;
                expected = [
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

                code = `list("${varName}").include?(1)`;
                expected = [
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
                                block: expectedInfo.makeText('1')
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);

                code = `list("${varName}").include?(x)`;
                expected = [
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
                                block: rubyToExpected(converter, target, 'x')[0],
                                shadow: expectedInfo.makeText('thing')
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
