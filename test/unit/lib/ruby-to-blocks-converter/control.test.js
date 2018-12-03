import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    expectToEqualRubyStatement
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Control', () => {
    let converter;
    let target;

    beforeEach(() => {
        converter = new RubyToBlocksConverter(null);
        target = null;
    });

    test('control_forever', () => {
        const code = 'loop { bounce_if_on_edge; wait }';
        const expected = [
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

        ['loop()', 'loop(1)'].forEach(s => {
            expect(converter.targetCodeToBlocks(target, s)).toBeTruthy();
            expectToEqualRubyStatement(converter, s);
        });

        ['loop { bounce_if_on_edge }'].forEach(s => {
            expect(converter.targetCodeToBlocks(target, s)).toBeTruthy();
            const blockId = Object.keys(converter.blocks).filter(id => converter.blocks[id].topLevel)[0];
            expect(converter.blocks[blockId].opcode).toEqual('ruby_statement_with_block');
        });
    });

    test('control_if', () => {
        let code;
        let expected;

        code = 'if touching?("_edge_"); bounce_if_on_edge; end';
        expected = [
            {
                opcode: 'control_if',
                inputs: [
                    {
                        name: 'CONDITION',
                        block: {
                            opcode: 'sensing_touchingobject',
                            inputs: [
                                {
                                    name: 'TOUCHINGOBJECTMENU',
                                    block: {
                                        opcode: 'sensing_touchingobjectmenu',
                                        fields: [
                                            {
                                                name: 'TOUCHINGOBJECTMENU',
                                                value: '_edge_'
                                            }
                                        ],
                                        shadow: true
                                    }
                                }
                            ]
                        }
                    }
                ],
                branches: [
                    {
                        opcode: 'motion_ifonedgebounce'
                    }
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
    });

    test('control_if_else', () => {
        const code = 'if touching?("_edge_"); bounce_if_on_edge; else; move(10); end';
        const expected = [
            {
                opcode: 'control_if_else',
                inputs: [
                    {
                        name: 'CONDITION',
                        block: {
                            opcode: 'sensing_touchingobject',
                            inputs: [
                                {
                                    name: 'TOUCHINGOBJECTMENU',
                                    block: {
                                        opcode: 'sensing_touchingobjectmenu',
                                        fields: [
                                            {
                                                name: 'TOUCHINGOBJECTMENU',
                                                value: '_edge_'
                                            }
                                        ],
                                        shadow: true
                                    }
                                }
                            ]
                        }
                    }
                ],
                branches: [
                    {
                        opcode: 'motion_ifonedgebounce'
                    },
                    {
                        opcode: 'motion_movesteps',
                        inputs: [
                            {
                                name: 'STEPS',
                                block: {
                                    opcode: 'math_number',
                                    fields: [
                                        {
                                            name: 'NUM',
                                            value: 10
                                        }
                                    ],
                                    shadow: true
                                }
                            }
                        ]
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);
    });
});
