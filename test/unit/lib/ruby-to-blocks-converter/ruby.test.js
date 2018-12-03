import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    expectToEqualRubyStatement
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Ruby', () => {
    let converter;
    let target;

    beforeEach(() => {
        converter = new RubyToBlocksConverter(null);
        target = null;
    });

    test('ruby_range', () => {
        const code = '1..10';
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
        convertAndExpectToEqualBlocks(converter, target, code, expected);
    });

    test('ruby_exclude_range', () => {
        const code = '1...10';
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
        convertAndExpectToEqualBlocks(converter, target, code, expected);
    });

    test('ruby_statement(wait)', () => {
        [
            'wait',
            'wait()',
            'wait(  )',
            'wait(\n)'
        ].forEach(s => {
            converter.targetCodeToBlocks(target, s);
            expect(converter.errors).toHaveLength(0);
            expectToEqualRubyStatement(converter, 'wait');
        });
    });
});
