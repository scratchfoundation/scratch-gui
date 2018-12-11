import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    convertAndExpectToEqualRubyStatement,
    rubyToExpected,
    expectedInfo
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Looks', () => {
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

    describe('looks_say', () => {
        test('string', () => {
            code = 'say("Hello!")';
            expected = [
                {
                    opcode: 'looks_say',
                    inputs: [
                        {
                            name: 'MESSAGE',
                            block: expectedInfo.makeText('Hello!')
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('number', () => {
            code = 'say(1)';
            expected = [
                {
                    opcode: 'looks_say',
                    inputs: [
                        {
                            name: 'MESSAGE',
                            block: expectedInfo.makeText('1')
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('block', () => {
            code = 'say(x)';
            expected = [
                {
                    opcode: 'looks_say',
                    inputs: [
                        {
                            name: 'MESSAGE',
                            block: rubyToExpected(converter, target, 'x')[0],
                            shadow: expectedInfo.makeText('Hello!')
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'say',
                'say(false)',
                'say(true)',
                'say(1, 2, 1)'
            ].forEach(c => {
                convertAndExpectToEqualRubyStatement(converter, target, c, c);
            });
        });
    });
});
