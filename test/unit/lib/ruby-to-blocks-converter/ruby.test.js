import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    convertAndExpectToEqualRubyStatement,
    rubyToExpected,
    expectedInfo
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
                        block: expectedInfo.makeNumber(1)
                    },
                    {
                        name: 'TO',
                        block: expectedInfo.makeNumber(10)
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
                        block: expectedInfo.makeNumber(1)
                    },
                    {
                        name: 'TO',
                        block: expectedInfo.makeNumber(10)
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
            convertAndExpectToEqualRubyStatement(converter, target, s, 'wait');
        });
    });

    test('ruby_statement_with_block', () => {
        const code = `
            method_call(1) do |arg1, arg2|
              move(arg1)
              move(arg2)
              move(10)
            end
        `;
        const expected = [
            {
                opcode: 'ruby_statement_with_block',
                inputs: [
                    {
                        name: 'STATEMENT',
                        block: expectedInfo.makeText('method_call(1)')
                    },
                    {
                        name: 'ARGS',
                        block: expectedInfo.makeText('|arg1, arg2|')
                    }
                ],
                branches: [
                    {
                        opcode: 'ruby_statement',
                        inputs: [
                            {
                                name: 'STATEMENT',
                                block: expectedInfo.makeText('move(arg1)')
                            }
                        ],
                        next: {
                            opcode: 'ruby_statement',
                            inputs: [
                                {
                                    name: 'STATEMENT',
                                    block: expectedInfo.makeText('move(arg2)')
                                }
                            ],
                            next: rubyToExpected(converter, target, 'move(10)')[0]
                        }
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);
    });
});
