import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    convertAndExpectRubyBlockError,
    rubyToExpected,
    expectedInfo
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Event', () => {
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

    describe('event_whenflagclicked', () => {
        test('normal', () => {
            code = 'self.when(:flag_clicked) { bounce_if_on_edge }';
            expected = [
                {
                    opcode: 'event_whenflagclicked',
                    next: {
                        opcode: 'motion_ifonedgebounce'
                    }
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'self.when(:flag_clicked) { bounce_if_on_edge; move(10) }';
            expected = [
                {
                    opcode: 'event_whenflagclicked',
                    next: rubyToExpected(converter, target, 'bounce_if_on_edge; move(10)')[0]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('hat', () => {
            code = `
                bounce_if_on_edge
                self.when(:flag_clicked) do
                end
                bounce_if_on_edge
            `;
            expected = [
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0],
                {
                    opcode: 'event_whenflagclicked'
                },
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'self.when(:flag_clicked)'
            ].forEach(s => {
                convertAndExpectRubyBlockError(converter, target, s);
            });

            [
                'self.when(:flag_clicked, 1) { bounce_if_on_edge }',
                'self.when(:flag_click) { bounce_if_on_edge }'
            ].forEach(s => {
                convertAndExpectRubyBlockError(converter, target, s);
            });
        });

        test('error', () => {
            code = `
                forever do
                  self.when(:flag_clicked) do
                  end
                end
            `;
            const res = converter.targetCodeToBlocks(target, code);
            expect(converter.errors).toHaveLength(1);
            expect(converter.errors[0].row).toEqual(2);
            expect(res).toBeFalsy();
        });
    });

    describe('event_whenkeypressed', () => {
        test('normal', () => {
            code = 'self.when(:key_pressed, "space") { bounce_if_on_edge }';
            expected = [
                {
                    opcode: 'event_whenkeypressed',
                    fields: [
                        {
                            name: 'KEY_OPTION',
                            value: 'space'
                        }
                    ],
                    next: {
                        opcode: 'motion_ifonedgebounce'
                    }
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'self.when(:key_pressed, "space") { bounce_if_on_edge; move(10) }';
            expected = [
                {
                    opcode: 'event_whenkeypressed',
                    fields: [
                        {
                            name: 'KEY_OPTION',
                            value: 'space'
                        }
                    ],
                    next: rubyToExpected(converter, target, 'bounce_if_on_edge; move(10)')[0]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('hat', () => {
            code = `
                bounce_if_on_edge
                self.when(:key_pressed, "space") do
                end
                bounce_if_on_edge
            `;
            expected = [
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0],
                {
                    opcode: 'event_whenkeypressed',
                    fields: [
                        {
                            name: 'KEY_OPTION',
                            value: 'space'
                        }
                    ]
                },
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'self.when(:key_pressed)',
                'self.when("space")',
                'self.when(:key_pressed, "space", 1)',
                'self.when(:key_pressed, "invalid key")'
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });

            [
                'self.when(:key_pressed) { bounce_if_on_edge }',
                'self.when(:key_pressed, "space", 1) { bounce_if_on_edge }',
                'self.when(:key_pressed, "invalid key") { bounce_if_on_edge }'
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });
        });

        test('error', () => {
            code = `
                forever do
                  self.when(:key_pressed, "space") do
                  end
                end
            `;
            const res = converter.targetCodeToBlocks(target, code);
            expect(converter.errors).toHaveLength(1);
            expect(converter.errors[0].row).toEqual(2);
            expect(res).toBeFalsy();
        });
    });

    [
        {
            opcode: 'event_whenthisspriteclicked',
            isStage: false
        },
        {
            opcode: 'event_whenstageclicked',
            isStage: true
        }
    ].forEach(info => {
        describe(`${info.opcode}`, () => {
            beforeEach(() => {
                target = {
                    isStage: info.isStage
                };
            });

            test('normal', () => {
                code = 'self.when(:clicked) { }';
                expected = [
                    {
                        opcode: info.opcode
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);

                code = 'self.when(:clicked) { bounce_if_on_edge }';
                expected = [
                    {
                        opcode: info.opcode,
                        next: {
                            opcode: 'motion_ifonedgebounce'
                        }
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);

                code = 'self.when(:clicked) { bounce_if_on_edge; move(10) }';
                expected = [
                    {
                        opcode: info.opcode,
                        next: rubyToExpected(converter, target, 'bounce_if_on_edge; move(10)')[0]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('hat', () => {
                code = `
                    bounce_if_on_edge
                    self.when(:clicked) do
                    end
                    bounce_if_on_edge
                `;
                expected = [
                    rubyToExpected(converter, target, 'bounce_if_on_edge')[0],
                    {
                        opcode: info.opcode
                    },
                    rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('invalid', () => {
                [
                    'self.when(:clicked)'
                ].forEach(s => {
                    convertAndExpectRubyBlockError(converter, target, s);
                });

                [
                    'self.when(:clicked, 1) { bounce_if_on_edge }',
                    'self.when(:click) { bounce_if_on_edge }'
                ].forEach(s => {
                    convertAndExpectRubyBlockError(converter, target, s);
                });
            });

            test('error', () => {
                code = `
                    forever do
                      self.when(:clicked) do
                      end
                    end
                `;
                const res = converter.targetCodeToBlocks(target, code);
                expect(converter.errors).toHaveLength(1);
                expect(converter.errors[0].row).toEqual(2);
                expect(res).toBeFalsy();
            });
        });
    });

    describe('event_whenbackdropswitchesto', () => {
        test('normal', () => {
            code = 'self.when(:backdrop_switches, "backdrop1") { bounce_if_on_edge }';
            expected = [
                {
                    opcode: 'event_whenbackdropswitchesto',
                    fields: [
                        {
                            name: 'BACKDROP',
                            value: 'backdrop1'
                        }
                    ],
                    next: {
                        opcode: 'motion_ifonedgebounce'
                    }
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'self.when(:backdrop_switches, "backdrop1") { bounce_if_on_edge; move(10) }';
            expected = [
                {
                    opcode: 'event_whenbackdropswitchesto',
                    fields: [
                        {
                            name: 'BACKDROP',
                            value: 'backdrop1'
                        }
                    ],
                    next: rubyToExpected(converter, target, 'bounce_if_on_edge; move(10)')[0]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('hat', () => {
            code = `
                bounce_if_on_edge
                self.when(:backdrop_switches, "backdrop1") do
                end
                bounce_if_on_edge
            `;
            expected = [
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0],
                {
                    opcode: 'event_whenbackdropswitchesto',
                    fields: [
                        {
                            name: 'BACKDROP',
                            value: 'backdrop1'
                        }
                    ]
                },
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'self.when(:backdrop_switches)',
                'self.when("backdrop1")',
                'self.when(:backdrop_switches, "backdrop1", 1)'
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });

            [
                'self.when(:backdrop_switches) { bounce_if_on_edge }',
                'self.when(:backdrop_switches, "backdrop1", 1) { bounce_if_on_edge }'
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });
        });

        test('error', () => {
            code = `
                forever do
                  self.when(:backdrop_switches, "backdrop1") do
                  end
                end
            `;
            const res = converter.targetCodeToBlocks(target, code);
            expect(converter.errors).toHaveLength(1);
            expect(converter.errors[0].row).toEqual(2);
            expect(res).toBeFalsy();
        });
    });

    describe('event_whengreaterthan', () => {
        test('normal', () => {
            code = 'self.when(:greater_than, "loudness", 10) { }';
            expected = [
                {
                    opcode: 'event_whengreaterthan',
                    fields: [
                        {
                            name: 'WHENGREATERTHANMENU',
                            value: 'LOUDNESS'
                        }
                    ],
                    inputs: [
                        {
                            name: 'VALUE',
                            block: expectedInfo.makeNumber(10)
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'self.when(:greater_than, "LOUDNESS", 10) { }';
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'self.when(:greater_than, "timer", 10) { }';
            expected = [
                {
                    opcode: 'event_whengreaterthan',
                    fields: [
                        {
                            name: 'WHENGREATERTHANMENU',
                            value: 'TIMER'
                        }
                    ],
                    inputs: [
                        {
                            name: 'VALUE',
                            block: expectedInfo.makeNumber(10)
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'self.when(:greater_than, "loudness", x) { }';
            expected = [
                {
                    opcode: 'event_whengreaterthan',
                    fields: [
                        {
                            name: 'WHENGREATERTHANMENU',
                            value: 'LOUDNESS'
                        }
                    ],
                    inputs: [
                        {
                            name: 'VALUE',
                            block: rubyToExpected(converter, target, 'x')[0],
                            shadow: expectedInfo.makeNumber(10)
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'self.when(:greater_than, "loudness", 10) { bounce_if_on_edge }';
            expected = [
                {
                    opcode: 'event_whengreaterthan',
                    fields: [
                        {
                            name: 'WHENGREATERTHANMENU',
                            value: 'LOUDNESS'
                        }
                    ],
                    inputs: [
                        {
                            name: 'VALUE',
                            block: expectedInfo.makeNumber(10)
                        }
                    ],
                    next: {
                        opcode: 'motion_ifonedgebounce'
                    }
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'self.when(:greater_than, "loudness", 10) { bounce_if_on_edge; move(10) }';
            expected = [
                {
                    opcode: 'event_whengreaterthan',
                    fields: [
                        {
                            name: 'WHENGREATERTHANMENU',
                            value: 'LOUDNESS'
                        }
                    ],
                    inputs: [
                        {
                            name: 'VALUE',
                            block: expectedInfo.makeNumber(10)
                        }
                    ],
                    next: rubyToExpected(converter, target, 'bounce_if_on_edge; move(10)')[0]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('hat', () => {
            code = `
                bounce_if_on_edge
                self.when(:greater_than, "loudness", 10) do
                end
                bounce_if_on_edge
            `;
            expected = [
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0],
                {
                    opcode: 'event_whengreaterthan',
                    fields: [
                        {
                            name: 'WHENGREATERTHANMENU',
                            value: 'LOUDNESS'
                        }
                    ],
                    inputs: [
                        {
                            name: 'VALUE',
                            block: expectedInfo.makeNumber(10)
                        }
                    ]
                },
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'self.when(:greater_than)',
                'self.when("loudness")',
                'self.when(:greater_than, "loudness")',
                'self.when(:greater_than, "loudness", 10, 11)'
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });

            [
                'self.when(:greater_than) { bounce_if_on_edge }',
                'self.when(:greater_than, "loudness") { bounce_if_on_edge }',
                'self.when(:greater_than, "invalid", 10) { bounce_if_on_edge }',
                'self.when(:greater_than, "loudness", 10, 11) { bounce_if_on_edge }'
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });
        });

        test('error', () => {
            code = `
                forever do
                  self.when(:greater_than, "loudness", 10) do
                  end
                end
            `;
            const res = converter.targetCodeToBlocks(target, code);
            expect(converter.errors).toHaveLength(1);
            expect(converter.errors[0].row).toEqual(2);
            expect(res).toBeFalsy();
        });
    });

    describe('event_whenbroadcastreceived', () => {
        test('normal', () => {
            code = 'self.when(:receive, "message1") { }';
            expected = [
                {
                    opcode: 'event_whenbroadcastreceived',
                    fields: [
                        {
                            name: 'BROADCAST_OPTION',
                            broadcastMsg: 'message1'
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'self.when(:receive, "message1") { bounce_if_on_edge }';
            expected = [
                {
                    opcode: 'event_whenbroadcastreceived',
                    fields: [
                        {
                            name: 'BROADCAST_OPTION',
                            broadcastMsg: 'message1'
                        }
                    ],
                    next: {
                        opcode: 'motion_ifonedgebounce'
                    }
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'self.when(:receive, "message1") { bounce_if_on_edge; move(10) }';
            expected = [
                {
                    opcode: 'event_whenbroadcastreceived',
                    fields: [
                        {
                            name: 'BROADCAST_OPTION',
                            broadcastMsg: 'message1'
                        }
                    ],
                    next: rubyToExpected(converter, target, 'bounce_if_on_edge; move(10)')[0]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('hat', () => {
            code = `
                bounce_if_on_edge
                self.when(:receive, "message1") do
                end
                bounce_if_on_edge
            `;
            expected = [
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0],
                {
                    opcode: 'event_whenbroadcastreceived',
                    fields: [
                        {
                            name: 'BROADCAST_OPTION',
                            broadcastMsg: 'message1'
                        }
                    ]
                },
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'self.when(:receive)',
                'self.when("message1")',
                'self.when(:receive, "message1")'
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });

            [
                'self.when(:receive) { bounce_if_on_edge }',
                'self.when(:receive, "message1", 1) { bounce_if_on_edge }'
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });
        });

        test('error', () => {
            code = `
                forever do
                  self.when(:receive, "message1") do
                  end
                end
            `;
            const res = converter.targetCodeToBlocks(target, code);
            expect(converter.errors).toHaveLength(1);
            expect(converter.errors[0].row).toEqual(2);
            expect(res).toBeFalsy();
        });
    });

    [
        {
            opcode: 'event_broadcast',
            methodName: 'broadcast'
        },
        {
            opcode: 'event_broadcastandwait',
            methodName: 'broadcast_and_wait'
        }
    ].forEach(info => {
        describe(`${info.opcode}`, () => {
            test('normal', () => {
                code = `${info.methodName}("message1")`;
                expected = [
                    {
                        opcode: info.opcode,
                        inputs: [
                            {
                                name: 'BROADCAST_INPUT',
                                block: {
                                    opcode: 'event_broadcast_menu',
                                    fields: [
                                        {
                                            name: 'BROADCAST_OPTION',
                                            broadcastMsg: 'message1'
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
                                name: 'BROADCAST_INPUT',
                                block: rubyToExpected(converter, target, 'x')[0],
                                shadow: {
                                    opcode: 'event_broadcast_menu',
                                    fields: [
                                        {
                                            name: 'BROADCAST_OPTION',
                                            broadcastMsg: 'message1'
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
                  ${info.methodName}("message1")
                  bounce_if_on_edge
                `;
                expected = [
                    rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
                ];
                expected[0].next = rubyToExpected(converter, target, `${info.methodName}("message1")`)[0];
                expected[0].next.next = rubyToExpected(converter, target, 'bounce_if_on_edge')[0];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('invalid', () => {
                [
                    `${info.methodName}`,
                    `${info.methodName}()`,
                    `${info.methodName}(1)`,
                    `${info.methodName}("message1", 1)`
                ].forEach(c => {
                    convertAndExpectRubyBlockError(converter, target, c);
                });
            });
        });
    });
});
