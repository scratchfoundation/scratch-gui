import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    convertAndExpectRubyBlockError,
    rubyToExpected,
    expectedInfo
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Control', () => {
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

    describe('control_wait', () => {
        test('number', () => {
            code = 'sleep(10)';
            expected = [
                {
                    opcode: 'control_wait',
                    inputs: [
                        {
                            name: 'DURATION',
                            block: expectedInfo.makeNumber(10, 'math_positive_number')
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('value block', () => {
            code = 'sleep(x)';
            expected = [
                {
                    opcode: 'control_wait',
                    inputs: [
                        {
                            name: 'DURATION',
                            block: rubyToExpected(converter, target, 'x')[0],
                            shadow: expectedInfo.makeNumber(1, 'math_positive_number')
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('boolean block', () => {
            code = 'sleep(touching?("_edge_"))';
            expected = [
                {
                    opcode: 'control_wait',
                    inputs: [
                        {
                            name: 'DURATION',
                            block: rubyToExpected(converter, target, 'touching?("_edge_")')[0],
                            shadow: expectedInfo.makeNumber(1, 'math_positive_number')
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'sleep',
                'sleep()',
                'sleep(abc)',
                'sleep("abc")',
                'sleep(1, 2)'
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });
        });
    });

    describe('control_repeat', () => {
        test('number', () => {
            code = '10.times { move(10); wait }';
            expected = [
                {
                    opcode: 'control_repeat',
                    inputs: [
                        {
                            name: 'TIMES',
                            block: expectedInfo.makeNumber(10, 'math_whole_number')
                        }
                    ],
                    branches: [
                        rubyToExpected(converter, target, 'move(10)')[0]
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = '10.times { move(10); bounce_if_on_edge; wait }';
            expected = [
                {
                    opcode: 'control_repeat',
                    inputs: [
                        {
                            name: 'TIMES',
                            block: expectedInfo.makeNumber(10, 'math_whole_number')
                        }
                    ],
                    branches: [
                        rubyToExpected(converter, target, 'move(10); bounce_if_on_edge')[0]
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('value block', () => {
            code = 'x.times { move(10); wait }';
            expected = [
                {
                    opcode: 'control_repeat',
                    inputs: [
                        {
                            name: 'TIMES',
                            block: rubyToExpected(converter, target, 'x')[0],
                            shadow: expectedInfo.makeNumber(10, 'math_whole_number')
                        }
                    ],
                    branches: [
                        rubyToExpected(converter, target, 'move(10)')[0]
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('boolean block', () => {
            code = '(touching?("_edge_")).times { move(10); wait }';
            expected = [
                {
                    opcode: 'control_repeat',
                    inputs: [
                        {
                            name: 'TIMES',
                            block: rubyToExpected(converter, target, 'touching?("_edge_")')[0],
                            shadow: expectedInfo.makeNumber(10, 'math_whole_number')
                        }
                    ],
                    branches: [
                        rubyToExpected(converter, target, 'move(10)')[0]
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                '10.times',
                '10.times(1)'
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });

            [
                '10.times {}',
                '10.times { wait; move(10) }',
                '10.times { |i| wait }',
                '"10".times { wait }'
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });
        });

        describe('repeat', () => {
            test('number', () => {
                code = 'repeat(10) { move(10) }';
                expected = [
                    {
                        opcode: 'control_repeat',
                        inputs: [
                            {
                                name: 'TIMES',
                                block: expectedInfo.makeNumber(10, 'math_whole_number')
                            }
                        ],
                        branches: [
                            rubyToExpected(converter, target, 'move(10)')[0]
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);

                code = 'repeat(10) { move(10); bounce_if_on_edge }';
                expected = [
                    {
                        opcode: 'control_repeat',
                        inputs: [
                            {
                                name: 'TIMES',
                                block: expectedInfo.makeNumber(10, 'math_whole_number')
                            }
                        ],
                        branches: [
                            rubyToExpected(converter, target, 'move(10); bounce_if_on_edge')[0]
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('value block', () => {
                code = 'repeat(x) { move(10) }';
                expected = [
                    {
                        opcode: 'control_repeat',
                        inputs: [
                            {
                                name: 'TIMES',
                                block: rubyToExpected(converter, target, 'x')[0],
                                shadow: expectedInfo.makeNumber(10, 'math_whole_number')
                            }
                        ],
                        branches: [
                            rubyToExpected(converter, target, 'move(10)')[0]
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('boolean block', () => {
                code = 'repeat(touching?("_edge_")) { move(10) }';
                expected = [
                    {
                        opcode: 'control_repeat',
                        inputs: [
                            {
                                name: 'TIMES',
                                block: rubyToExpected(converter, target, 'touching?("_edge_")')[0],
                                shadow: expectedInfo.makeNumber(10, 'math_whole_number')
                            }
                        ],
                        branches: [
                            rubyToExpected(converter, target, 'move(10)')[0]
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('invalid', () => {
                [
                    'repeat(10)',
                    'repeat(10, 1)'
                ].forEach(c => {
                    convertAndExpectRubyBlockError(converter, target, c);
                });

                [
                    'repeat(10) { |i| }',
                    'repeat("10") { }'
                ].forEach(c => {
                    convertAndExpectRubyBlockError(converter, target, c);
                });
            });
        });
    });

    describe('control_forever', () => {
        test('loop', () => {
            code = 'loop { wait }';
            expected = [
                {
                    opcode: 'control_forever',
                    branches: []
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'loop { bounce_if_on_edge; wait }';
            expected = [
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

            code = 'loop { bounce_if_on_edge; move(10); wait }';
            expected = [
                {
                    opcode: 'control_forever',
                    branches: [
                        rubyToExpected(converter, target, 'bounce_if_on_edge; move(10)')[0]
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'loop { wait }; loop { wait }';
            expected = [
                {
                    opcode: 'control_forever',
                    branches: []
                },
                {
                    opcode: 'control_forever',
                    branches: []
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('forever', () => {
            code = 'forever { }';
            expected = [
                {
                    opcode: 'control_forever',
                    branches: []
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'forever { bounce_if_on_edge }';
            expected = [
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

            code = 'forever { bounce_if_on_edge; move(10) }';
            expected = [
                {
                    opcode: 'control_forever',
                    branches: [
                        rubyToExpected(converter, target, 'bounce_if_on_edge; move(10)')[0]
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'forever { wait }';
            convertAndExpectRubyBlockError(converter, target, code);
        });

        test('invalid', () => {
            [
                'loop()',
                'loop(1)',
                'forever()',
                'forever(1)'
            ].forEach(s => {
                convertAndExpectRubyBlockError(converter, target, s);
            });

            [
                'loop { bounce_if_on_edge }',
                'loop { |a| bounce_if_on_edge; wait }',
                'loop(1) { bounce_if_on_edge; wait }',
                'forever(1) { bounce_if_on_edge }',
                'forever(1) { |a| bounce_if_on_edge }'
            ].forEach(s => {
                convertAndExpectRubyBlockError(converter, target, s);
            });
        });
    });

    describe('control_if', () => {
        test('normal', () => {
            code = `
                if touching?("_edge_")
                  bounce_if_on_edge
                end
            `;
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

            code = `
                if (touching?("_edge_"))
                  bounce_if_on_edge
                end
            `;
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

            code = `
                if touching?("_edge_")
                  bounce_if_on_edge
                  move(10)
                end
            `;
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
                        rubyToExpected(converter, target, 'bounce_if_on_edge; move(10)')[0]
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('false', () => {
            code = `
                if false
                end
            `;
            expected = [
                {
                    opcode: 'control_if',
                    inputs: [],
                    branches: [
                        null
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('error', () => {
            code = `
                if move(10)
                end
            `;
            const res = converter.targetCodeToBlocks(target, code);
            expect(converter.errors).toHaveLength(1);
            expect(converter.errors[0].text).toMatch(/condition is not boolean: move\(10\)/);
            expect(res).toBeFalsy();
        });
    });

    describe('control_if_else', () => {
        test('normal', () => {
            code = `
                if touching?("_edge_")
                  bounce_if_on_edge
                else
                  move(10)
                end
            `;
            expected = [
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

            code = `
                if touching?("_edge_")
                  bounce_if_on_edge
                  bounce_if_on_edge
                else
                  move(10)
                  move(10)
                end
            `;
            expected = [
                {
                    opcode: 'control_if_else',
                    inputs: [
                        {
                            name: 'CONDITION',
                            block: rubyToExpected(converter, target, 'touching?("_edge_")')[0]
                        }
                    ],
                    branches: [
                        rubyToExpected(converter, target, 'bounce_if_on_edge; bounce_if_on_edge')[0],
                        rubyToExpected(converter, target, 'move(10); move(10)')[0]
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = `
                if touching?("_edge_")
                else
                  move(10)
                end
            `;
            expected = [
                {
                    opcode: 'control_if_else',
                    inputs: [
                        {
                            name: 'CONDITION',
                            block: rubyToExpected(converter, target, 'touching?("_edge_")')[0]
                        }
                    ],
                    branches: [
                        null,
                        rubyToExpected(converter, target, 'move(10)')[0]
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = `
                if touching?("_edge_")
                  bounce_if_on_edge
                else
                end
            `;
            expected = [
                {
                    opcode: 'control_if_else',
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

            code = `
                if touching?("_edge_")
                else
                end
            `;
            expected = [
                {
                    opcode: 'control_if_else',
                    inputs: [
                        {
                            name: 'CONDITION',
                            block: rubyToExpected(converter, target, 'touching?("_edge_")')[0]
                        }
                    ],
                    branches: []
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('false', () => {
            code = `
                if false
                  bounce_if_on_edge
                else
                  move(10)
                end
            `;
            expected = [
                {
                    opcode: 'control_if_else',
                    inputs: [],
                    branches: [
                        rubyToExpected(converter, target, 'bounce_if_on_edge')[0],
                        rubyToExpected(converter, target, 'move(10)')[0]
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = `
                if false
                else
                end
            `;
            expected = [
                {
                    opcode: 'control_if_else',
                    branches: []
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('unless', () => {
            code = `
                unless touching?("_edge_")
                  bounce_if_on_edge
                else
                  move(10)
                end
            `;
            expected = [
                {
                    opcode: 'control_if_else',
                    inputs: [
                        {
                            name: 'CONDITION',
                            block: rubyToExpected(converter, target, 'touching?("_edge_")')[0]
                        }
                    ],
                    branches: [
                        rubyToExpected(converter, target, 'move(10)')[0],
                        rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = `
                unless touching?("_edge_")
                  bounce_if_on_edge
                  bounce_if_on_edge
                else
                  move(10)
                  move(10)
                end
            `;
            expected = [
                {
                    opcode: 'control_if_else',
                    inputs: [
                        {
                            name: 'CONDITION',
                            block: rubyToExpected(converter, target, 'touching?("_edge_")')[0]
                        }
                    ],
                    branches: [
                        rubyToExpected(converter, target, 'move(10); move(10)')[0],
                        rubyToExpected(converter, target, 'bounce_if_on_edge; bounce_if_on_edge')[0]
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = `
                unless touching?("_edge_")
                else
                  move(10)
                end
            `;
            expected = [
                {
                    opcode: 'control_if_else',
                    inputs: [
                        {
                            name: 'CONDITION',
                            block: rubyToExpected(converter, target, 'touching?("_edge_")')[0]
                        }
                    ],
                    branches: [
                        rubyToExpected(converter, target, 'move(10)')[0]
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = `
                unless touching?("_edge_")
                  bounce_if_on_edge
                else
                end
            `;
            expected = [
                {
                    opcode: 'control_if_else',
                    inputs: [
                        {
                            name: 'CONDITION',
                            block: rubyToExpected(converter, target, 'touching?("_edge_")')[0]
                        }
                    ],
                    branches: [
                        null,
                        rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = `
                unless touching?("_edge_")
                else
                end
            `;
            expected = [
                {
                    opcode: 'control_if_else',
                    inputs: [
                        {
                            name: 'CONDITION',
                            block: rubyToExpected(converter, target, 'touching?("_edge_")')[0]
                        }
                    ],
                    branches: []
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('error', () => {
            code = `
                if move(10)
                else
                end
            `;
            const res = converter.targetCodeToBlocks(target, code);
            expect(converter.errors).toHaveLength(1);
            expect(converter.errors[0].text).toMatch(/condition is not boolean: move\(10\)/);
            expect(res).toBeFalsy();
        });
    });

    describe('control_wait_until', () => {
        test('normal', () => {
            code = 'wait until false';
            expected = [
                {
                    opcode: 'control_wait_until'
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = `
                until false
                  wait
                end
            `;
            expected = [
                {
                    opcode: 'control_wait_until'
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'wait until touching?("_edge_")';
            expected = [
                {
                    opcode: 'control_wait_until',
                    inputs: [
                        {
                            name: 'CONDITION',
                            block: rubyToExpected(converter, target, 'touching?("_edge_")')[0]
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'wait until (touching?("_edge_"))';
            expected = [
                {
                    opcode: 'control_wait_until',
                    inputs: [
                        {
                            name: 'CONDITION',
                            block: rubyToExpected(converter, target, 'touching?("_edge_")')[0]
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('error', () => {
            code = 'wait until move(10)';
            const res = converter.targetCodeToBlocks(target, code);
            expect(converter.errors).toHaveLength(1);
            expect(converter.errors[0].text).toMatch(/condition is not boolean: move\(10\)/);
            expect(res).toBeFalsy();
        });
    });

    describe('control_repeat_until', () => {
        test('normal', () => {
            code = `
                until touching?("_edge_")
                  move(10)
                  wait
                end
            `;
            expected = [
                {
                    opcode: 'control_repeat_until',
                    inputs: [
                        {
                            name: 'CONDITION',
                            block: rubyToExpected(converter, target, 'touching?("_edge_")')[0]
                        }
                    ],
                    branches: [
                        rubyToExpected(converter, target, 'move(10)')[0]
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = `
                until (touching?("_edge_"))
                  move(10)
                  wait
                end
            `;
            expected = [
                {
                    opcode: 'control_repeat_until',
                    inputs: [
                        {
                            name: 'CONDITION',
                            block: rubyToExpected(converter, target, 'touching?("_edge_")')[0]
                        }
                    ],
                    branches: [
                        rubyToExpected(converter, target, 'move(10)')[0]
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = `
                until touching?("_edge_")
                  move(10)
                  bounce_if_on_edge
                  wait
                end
            `;
            expected = [
                {
                    opcode: 'control_repeat_until',
                    inputs: [
                        {
                            name: 'CONDITION',
                            block: rubyToExpected(converter, target, 'touching?("_edge_")')[0]
                        }
                    ],
                    branches: [
                        rubyToExpected(converter, target, 'move(10); bounce_if_on_edge')[0]
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('condition is false', () => {
            code = `
                until false
                  move(10)
                  wait
                end
            `;
            expected = [
                {
                    opcode: 'control_repeat_until',
                    branches: [
                        rubyToExpected(converter, target, 'move(10)')[0]
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('error', () => {
            code = `
                until move(10)
                  bounce_if_on_edge
                  wait
                end
            `;
            const res = converter.targetCodeToBlocks(target, code);
            expect(converter.errors).toHaveLength(1);
            expect(converter.errors[0].text).toMatch(/condition is not boolean: move\(10\)/);
            expect(res).toBeFalsy();
        });
    });

    describe('control_stop', () => {
        test('normal', () => {
            [
                'all',
                'this script',
                'other scripts in sprite'
            ].forEach(option => {
                code = `stop("${option}")`;
                expected = [
                    {
                        opcode: 'control_stop',
                        fields: [
                            {
                                name: 'STOP_OPTION',
                                value: option
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            code = 'stop("all"); stop("all")';
            expected = [
                {
                    opcode: 'control_stop',
                    fields: [
                        {
                            name: 'STOP_OPTION',
                            value: 'all'
                        }
                    ]
                },
                {
                    opcode: 'control_stop',
                    fields: [
                        {
                            name: 'STOP_OPTION',
                            value: 'all'
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'stop',
                'stop()',
                'stop(1)',
                'stop("invalid option")',
                'stop("all", 1)'
            ].forEach(s => {
                convertAndExpectRubyBlockError(converter, target, s);
            });
        });
    });

    describe('control_create_clone_of', () => {
        test('normal', () => {
            code = 'create_clone("_myself_")';
            expected = [
                {
                    opcode: 'control_create_clone_of',
                    inputs: [
                        {
                            name: 'CLONE_OPTION',
                            block: {
                                opcode: 'control_create_clone_of_menu',
                                fields: [
                                    {
                                        name: 'CLONE_OPTION',
                                        value: '_myself_'
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

        test('invalid', () => {
            [
                'create_clone',
                'create_clone()',
                'create_clone(1)',
                'create_clone(move(10))',
                'create_clone("_myself_", 1)'
            ].forEach(s => {
                convertAndExpectRubyBlockError(converter, target, s);
            });
        });
    });

    describe('control_delete_this_clone', () => {
        test('normal', () => {
            code = 'delete_this_clone';
            expected = [
                {
                    opcode: 'control_delete_this_clone'
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'delete_this_clone()';
            expected = [
                {
                    opcode: 'control_delete_this_clone'
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                '12.delete_this_clone',
                'delete_this_clone(1)'
            ].forEach(s => {
                convertAndExpectRubyBlockError(converter, target, s);
            });
        });
    });

    describe('control_start_as_clone', () => {
        test('normal', () => {
            code = `
                self.when(:start_as_a_clone) do
                end
            `;
            expected = [
                {
                    opcode: 'control_start_as_clone'
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = `
                self.when(:start_as_a_clone) do
                  move(10)
                end
            `;
            expected = [
                {
                    opcode: 'control_start_as_clone',
                    next: rubyToExpected(converter, target, 'move(10)')[0]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = `
                self.when(:start_as_a_clone) do
                  move(10)
                  bounce_if_on_edge
                end
            `;
            expected = [
                {
                    opcode: 'control_start_as_clone',
                    next: rubyToExpected(converter, target, 'move(10); bounce_if_on_edge')[0]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'self.when(:start_as_a_clone)',
                'self.when(:start_as_a_clone, 1)'
            ].forEach(s => {
                convertAndExpectRubyBlockError(converter, target, s);
            });

            [
                '12.when(:start_as_a_clone) {}'
            ].forEach(s => {
                convertAndExpectRubyBlockError(converter, target, s);
            });
        });
    });
});
