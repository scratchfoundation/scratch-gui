import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import expectToEqualBlocks, {
    expectToEqualRubyStatement
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Control', () => {
    let converter;

    beforeEach(() => {
        converter = new RubyToBlocksConverter(null);
    });

    test('control_forever', () => {
        expect(converter.targetCodeToBlocks(null, 'loop { bounce_if_on_edge; wait }')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

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
        expectToEqualBlocks(converter.blocks, expected);

        ['loop()', 'loop(1)'].forEach(s => {
            expect(converter.targetCodeToBlocks(null, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });

        ['loop { bounce_if_on_edge }'].forEach(s => {
            expect(converter.targetCodeToBlocks(null, s)).toBeTruthy();
            const blockId = Object.keys(converter.blocks).filter(id => converter.blocks[id].topLevel)[0];
            expect(converter.blocks[blockId].opcode).toEqual('ruby_statement_with_block');
        });
    });

    test('control_if', () => {
        expect(converter.targetCodeToBlocks(null, 'if touching?("_edge_"); bounce_if_on_edge; end')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

        const expected = [
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
        expectToEqualBlocks(converter.blocks, expected);
    });

    test('control_if_else', () => {
        const code = 'if touching?("_edge_"); bounce_if_on_edge; else; move(10); end';
        expect(converter.targetCodeToBlocks(null, code)).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

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
        expectToEqualBlocks(converter.blocks, expected);
    });
});
