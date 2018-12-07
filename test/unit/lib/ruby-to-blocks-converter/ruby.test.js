import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    convertAndExpectToEqualRubyStatement,
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
});
