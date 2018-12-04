import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    convertAndExpectToEqualRubyStatement,
    rubyToExpected
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
        let code;
        let expected;

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
    });
});
