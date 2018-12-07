import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    convertAndExpectToEqualRubyStatement,
    rubyToExpected,
    expectedInfo
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Control', () => {
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

    describe('control_wait', () => {
        test('number', () => {
            code = 'sleep(10)';
            expected = [
                {
                    opcode: 'control_wait',
                    inputs: [
                        {
                            name: 'DURATION',
                            block: expectedInfo.makeNumber(10, 'math_positive_number')
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('value block', () => {
            code = 'sleep(x)';
            expected = [
                {
                    opcode: 'control_wait',
                    inputs: [
                        {
                            name: 'DURATION',
                            block: rubyToExpected(converter, target, 'x')[0],
                            shadow: expectedInfo.makeNumber(1, 'math_positive_number')
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('boolean block', () => {
            code = 'sleep(touching?("_edge_"))';
            expected = [
                {
                    opcode: 'control_wait',
                    inputs: [
                        {
                            name: 'DURATION',
                            block: rubyToExpected(converter, target, 'touching?("_edge_")')[0],
                            shadow: expectedInfo.makeNumber(1, 'math_positive_number')
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'sleep',
                'sleep()',
                'sleep(abc)',
                'sleep("abc")',
                'sleep(1, 2)'
            ].forEach(c => {
                convertAndExpectToEqualRubyStatement(converter, target, c, c);
            });
        });
    });

    describe('control_repeat', () => {
        test('number', () => {
            code = '10.times { move(10); wait }';
            expected = [
                {
                    opcode: 'control_repeat',
                    inputs: [
                        {
                            name: 'TIMES',
                            block: expectedInfo.makeNumber(10, 'math_whole_number')
                        }
                    ],
                    branches: [
                        rubyToExpected(converter, target, 'move(10)')[0]
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = '10.times { move(10); bounce_if_on_edge; wait }';
            expected = [
                {
                    opcode: 'control_repeat',
                    inputs: [
                        {
                            name: 'TIMES',
                            block: expectedInfo.makeNumber(10, 'math_whole_number')
                        }
                    ],
                    branches: [
                        rubyToExpected(converter, target, 'move(10); bounce_if_on_edge')[0]
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('value block', () => {
            code = 'x.times { move(10); wait }';
            expected = [
                {
                    opcode: 'control_repeat',
                    inputs: [
                        {
                            name: 'TIMES',
                            block: rubyToExpected(converter, target, 'x')[0],
                            shadow: expectedInfo.makeNumber(10, 'math_whole_number')
                        }
                    ],
                    branches: [
                        rubyToExpected(converter, target, 'move(10)')[0]
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('boolean block', () => {
            code = '(touching?("_edge_")).times { move(10); wait }';
            expected = [
                {
                    opcode: 'control_repeat',
                    inputs: [
                        {
                            name: 'TIMES',
                            block: rubyToExpected(converter, target, 'touching?("_edge_")')[0],
                            shadow: expectedInfo.makeNumber(10, 'math_whole_number')
                        }
                    ],
                    branches: [
                        rubyToExpected(converter, target, 'move(10)')[0]
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                '10.times',
                '10.times(1)'
            ].forEach(c => {
                convertAndExpectToEqualRubyStatement(converter, target, c, c);
            });

            [
                '10.times {}',
                '10.times { wait; move(10) }',
                '10.times { |i| wait }',
                '"10".times { wait }'
            ].forEach(c => {
                const res = converter.targetCodeToBlocks(target, c);
                expect(converter.errors).toHaveLength(0);
                const scriptIds = Object.keys(converter.blocks).filter(id => converter.blocks[id].topLevel);
                expect(scriptIds).toHaveLength(1);
                expect(converter.blocks[scriptIds[0]]).toHaveProperty('opcode', 'ruby_statement_with_block');
                expect(res).toBeTruthy();
            });
        });
    });

    test('control_forever', () => {
        code = 'loop { bounce_if_on_edge; wait }';
        expected = [
            {
                opcode: 'control_forever',
                branches: [
                    {
                        opcode: 'motion_ifonedgebounce'
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'loop { bounce_if_on_edge; move(10); wait }';
        expected = [
            {
                opcode: 'control_forever',
                branches: [
                    rubyToExpected(converter, target, 'bounce_if_on_edge; move(10)')[0]
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            'loop()',
            'loop(1)'
        ].forEach(s => {
            convertAndExpectToEqualRubyStatement(converter, target, s, s);
        });

        [
            'loop { bounce_if_on_edge }'
        ].forEach(s => {
            expect(converter.targetCodeToBlocks(target, s)).toBeTruthy();
            const blockId = Object.keys(converter.blocks).filter(id => converter.blocks[id].topLevel)[0];
            expect(converter.blocks[blockId].opcode).toEqual('ruby_statement_with_block');
        });
    });

    test('control_if', () => {
        code = 'if touching?("_edge_"); bounce_if_on_edge; end';
        expected = [
            {
                opcode: 'control_if',
                inputs: [
                    {
                        name: 'CONDITION',
                        block: rubyToExpected(converter, target, 'touching?("_edge_")')[0]
                    }
                ],
                branches: [
                    rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'if touching?("_edge_"); bounce_if_on_edge; move(10); end';
        expected = [
            {
                opcode: 'control_if',
                inputs: [
                    {
                        name: 'CONDITION',
                        block: rubyToExpected(converter, target, 'touching?("_edge_")')[0]
                    }
                ],
                branches: [
                    rubyToExpected(converter, target, 'bounce_if_on_edge; move(10)')[0]
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'if move(10); end';
        expected = [
            {
                opcode: 'control_if',
                inputs: [
                    {
                        name: 'CONDITION',
                        block: {
                            opcode: 'ruby_expression',
                            inputs: [
                                {
                                    name: 'EXPRESSION',
                                    block: {
                                        opcode: 'text',
                                        fields: [
                                            {
                                                name: 'TEXT',
                                                value: 'move(10)'
                                            }
                                        ],
                                        shadow: true
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'if false; end';
        expected = [
            {
                opcode: 'control_if',
                branches: [
                    null
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'if touching?("_edge_"); else; end';
        expected = [
            {
                opcode: 'control_if',
                inputs: [
                    {
                        name: 'CONDITION',
                        block: rubyToExpected(converter, target, 'touching?("_edge_")')[0]
                    }
                ],
                branches: []
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);
    });

    test('control_if_else', () => {
        code = 'if touching?("_edge_"); bounce_if_on_edge; else; move(10); end';
        expected = [
            {
                opcode: 'control_if_else',
                inputs: [
                    {
                        name: 'CONDITION',
                        block: rubyToExpected(converter, target, 'touching?("_edge_")')[0]
                    }
                ],
                branches: [
                    rubyToExpected(converter, target, 'bounce_if_on_edge')[0],
                    rubyToExpected(converter, target, 'move(10)')[0]
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'if touching?("_edge_"); bounce_if_on_edge; bounce_if_on_edge; else; move(10); move(10); end';
        expected = [
            {
                opcode: 'control_if_else',
                inputs: [
                    {
                        name: 'CONDITION',
                        block: rubyToExpected(converter, target, 'touching?("_edge_")')[0]
                    }
                ],
                branches: [
                    rubyToExpected(converter, target, 'bounce_if_on_edge; bounce_if_on_edge')[0],
                    rubyToExpected(converter, target, 'move(10); move(10)')[0]
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);
    });
});
