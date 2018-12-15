import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    convertAndExpectToEqualRubyStatement,
    rubyToExpected,
    expectNoArgsMethod
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Sound', () => {
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

    [
        {
            opcode: 'sound_playuntildone',
            methodName: 'play_until_done'
        },
        {
            opcode: 'sound_play',
            methodName: 'play'
        }
    ].forEach(info => {
        describe(info.opcode, () => {
            test('normal', () => {
                code = `${info.methodName}("Meow")`;
                expected = [
                    {
                        opcode: info.opcode,
                        inputs: [
                            {
                                name: 'SOUND_MENU',
                                block: {
                                    opcode: 'sound_sounds_menu',
                                    fields: [
                                        {
                                            name: 'SOUND_MENU',
                                            value: 'Meow'
                                        }
                                    ],
                                    shadow: true
                                }
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);

                code = `${info.methodName}(x)`;
                expected = [
                    {
                        opcode: info.opcode,
                        inputs: [
                            {
                                name: 'SOUND_MENU',
                                block: rubyToExpected(converter, target, 'x')[0],
                                shadow: {
                                    opcode: 'sound_sounds_menu',
                                    fields: [
                                        {
                                            name: 'SOUND_MENU',
                                            value: ''
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

            test('statement', () => {
                code = `
                  bounce_if_on_edge
                  ${info.methodName}("Meow")
                  bounce_if_on_edge
                `;
                expected = [
                    rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
                ];
                expected[0].next = rubyToExpected(converter, target, `${info.methodName}("Meow")`)[0];
                expected[0].next.next = rubyToExpected(converter, target, 'bounce_if_on_edge')[0];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('invalid', () => {
                [
                    `${info.methodName}`,
                    `${info.methodName}()`,
                    `${info.methodName}(1)`,
                    `${info.methodName}("Meow", 1)`
                ].forEach(c => {
                    convertAndExpectToEqualRubyStatement(converter, target, c, c);
                });
            });
        });
    });

    expectNoArgsMethod('sound_stopallsounds', 'stop_all_sounds');
});
