import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    convertAndExpectRubyBlockError,
    rubyToExpected,
    expectedInfo,
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
        describe(`${info.opcode}`, () => {
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
                    convertAndExpectRubyBlockError(converter, target, c);
                });
            });
        });
    });

    expectNoArgsMethod('sound_stopallsounds', 'stop_all_sounds');

    [
        {
            opcode: 'sound_changeeffectby',
            methodName: 'change_sound_effect_by',
            value: 10
        },
        {
            opcode: 'sound_seteffectto',
            methodName: 'set_sound_effect',
            value: 100
        }
    ].forEach(info => {
        describe(`${info.opcode}`, () => {
            test('normal', () => {
                code = `${info.methodName}("PITCH", ${info.value})`;
                expected = [
                    {
                        opcode: info.opcode,
                        fields: [
                            {
                                name: 'EFFECT',
                                value: 'PITCH'
                            }
                        ],
                        inputs: [
                            {
                                name: 'VALUE',
                                block: expectedInfo.makeNumber(info.value)
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);

                code = `${info.methodName}("PITCH", x)`;
                expected = [
                    {
                        opcode: info.opcode,
                        fields: [
                            {
                                name: 'EFFECT',
                                value: 'PITCH'
                            }
                        ],
                        inputs: [
                            {
                                name: 'VALUE',
                                block: rubyToExpected(converter, target, 'x')[0],
                                shadow: expectedInfo.makeNumber(info.value)
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('statement', () => {
                code = `
                  bounce_if_on_edge
                  ${info.methodName}("PITCH", ${info.value})
                  bounce_if_on_edge
                `;
                expected = [
                    rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
                ];
                expected[0].next = rubyToExpected(converter, target, `${info.methodName}("PITCH", ${info.value})`)[0];
                expected[0].next.next = rubyToExpected(converter, target, 'bounce_if_on_edge')[0];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('invalid', () => {
                [
                    `${info.methodName}`,
                    `${info.methodName}()`,
                    `${info.methodName}("PITCH")`,
                    `${info.methodName}(${info.value}, "PITCH")`,
                    `${info.methodName}("invalid", ${info.value})`,
                    `${info.methodName}("PITCH", ${info.value}, 1)`
                ].forEach(c => {
                    convertAndExpectRubyBlockError(converter, target, c);
                });
            });
        });
    });

    expectNoArgsMethod('sound_cleareffects', 'clear_sound_effects');

    describe('sound_changevolumeby', () => {
        test('normal', () => {
            code = 'self.volume += -10';
            expected = [
                {
                    opcode: 'sound_changevolumeby',
                    inputs: [
                        {
                            name: 'VOLUME',
                            block: expectedInfo.makeNumber(-10)
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'self.volume += x';
            expected = [
                {
                    opcode: 'sound_changevolumeby',
                    inputs: [
                        {
                            name: 'VOLUME',
                            block: rubyToExpected(converter, target, 'x')[0],
                            shadow: expectedInfo.makeNumber(-10)
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('statement', () => {
            code = `
                bounce_if_on_edge
                self.volume += -10
                bounce_if_on_edge
            `;
            expected = [
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
            ];
            expected[0].next = rubyToExpected(converter, target, 'self.volume += -10')[0];
            expected[0].next.next = rubyToExpected(converter, target, 'bounce_if_on_edge')[0];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'self.volume += "10"',
                'self.volume += :symbol',
                'self.volume += abc'
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });
        });
    });

    describe('sound_setvolumeto', () => {
        test('normal', () => {
            code = 'self.volume = 100';
            expected = [
                {
                    opcode: 'sound_setvolumeto',
                    inputs: [
                        {
                            name: 'VOLUME',
                            block: expectedInfo.makeNumber(100)
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'self.volume = x';
            expected = [
                {
                    opcode: 'sound_setvolumeto',
                    inputs: [
                        {
                            name: 'VOLUME',
                            block: rubyToExpected(converter, target, 'x')[0],
                            shadow: expectedInfo.makeNumber(100)
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('statement', () => {
            code = `
                bounce_if_on_edge
                self.volume = 100
                bounce_if_on_edge
            `;
            expected = [
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
            ];
            expected[0].next = rubyToExpected(converter, target, 'self.volume = 100')[0];
            expected[0].next.next = rubyToExpected(converter, target, 'bounce_if_on_edge')[0];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'self.volume = "100"',
                'self.volume = :symbol',
                'self.volume = abc'
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });
        });
    });

    expectNoArgsMethod('sound_volume', 'volume', 'value');
});
