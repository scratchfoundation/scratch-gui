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

    describe('looks_sayforsecs', () => {
        test('normal', () => {
            code = 'say("Hello!", 2)';
            expected = [
                {
                    opcode: 'looks_sayforsecs',
                    inputs: [
                        {
                            name: 'MESSAGE',
                            block: expectedInfo.makeText('Hello!')
                        },
                        {
                            name: 'SECS',
                            block: expectedInfo.makeNumber(2)
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'say(1, 2)';
            expected = [
                {
                    opcode: 'looks_sayforsecs',
                    inputs: [
                        {
                            name: 'MESSAGE',
                            block: expectedInfo.makeText('1')
                        },
                        {
                            name: 'SECS',
                            block: expectedInfo.makeNumber(2)
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'say(x, 2)';
            expected = [
                {
                    opcode: 'looks_sayforsecs',
                    inputs: [
                        {
                            name: 'MESSAGE',
                            block: rubyToExpected(converter, target, 'x')[0],
                            shadow: expectedInfo.makeText('Hello!')
                        },
                        {
                            name: 'SECS',
                            block: expectedInfo.makeNumber(2)
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'say(x, y)';
            expected = [
                {
                    opcode: 'looks_sayforsecs',
                    inputs: [
                        {
                            name: 'MESSAGE',
                            block: rubyToExpected(converter, target, 'x')[0],
                            shadow: expectedInfo.makeText('Hello!')
                        },
                        {
                            name: 'SECS',
                            block: rubyToExpected(converter, target, 'y')[0],
                            shadow: expectedInfo.makeNumber(2)
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'say("Hello!", "2")',
                'say("Hello!", 2, 3)',
                'say(false, 2)',
                'say("Hello!", false)'
            ].forEach(c => {
                convertAndExpectToEqualRubyStatement(converter, target, c, c);
            });
        });
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
