import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    expectToEqualBlocks,
    expectToEqualRubyStatement
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Ruby', () => {
    let converter;

    beforeEach(() => {
        converter = new RubyToBlocksConverter(null);
    });

    test('ruby_range', () => {
        expect(converter.targetCodeToBlocks(null, '1..10')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

        const expected = [
            {
                opcode: 'ruby_range',
                inputs: [
                    {
                        name: 'FROM',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 1
                                }
                            ],
                            shadow: true
                        }
                    },
                    {
                        name: 'TO',
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
        ];
        expectToEqualBlocks(converter.blocks, expected);
    });

    test('ruby_exclude_range', () => {
        expect(converter.targetCodeToBlocks(null, '1...10')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

        const expected = [
            {
                opcode: 'ruby_exclude_range',
                inputs: [
                    {
                        name: 'FROM',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 1
                                }
                            ],
                            shadow: true
                        }
                    },
                    {
                        name: 'TO',
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
        ];
        expectToEqualBlocks(converter.blocks, expected);
    });

    test('ruby_statement(wait)', () => {
        [
            'wait',
            'wait()',
            'wait(  )',
            'wait(\n)'
        ].forEach(s => {
            expect(converter.targetCodeToBlocks(null, s)).toBeTruthy();
            expect(converter.errors.length).toEqual(0);
            expectToEqualRubyStatement(converter.blocks, 'wait');
        });
    });
});
