import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    convertAndExpectRubyBlockError,
    rubyToExpected,
    expectedInfo
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Motion', () => {
    let converter;
    let target;

    beforeEach(() => {
        converter = new RubyToBlocksConverter(null);
        target = null;
    });

    test('motion_movesteps', () => {
        let code;
        let expected;

        code = 'move(10)';
        expected = [
            {
                opcode: 'motion_movesteps',
                inputs: [
                    {
                        name: 'STEPS',
                        block: expectedInfo.makeNumber(10)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'move(x)';
        expected = [
            {
                opcode: 'motion_movesteps',
                inputs: [
                    {
                        name: 'STEPS',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeNumber(10)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            'move()',
            'move(10, 10)',
            'move("10")',
            'move(abc)'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('motion_turn_right', () => {
        let code;
        let expected;

        code = 'turn_right(180)';
        expected = [
            {
                opcode: 'motion_turnright',
                inputs: [
                    {
                        name: 'DEGREES',
                        block: expectedInfo.makeNumber(180)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'turn_right(x)';
        expected = [
            {
                opcode: 'motion_turnright',
                inputs: [
                    {
                        name: 'DEGREES',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeNumber(15)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            'turn_right()',
            'turn_right(180, 0)',
            'turn_right("180")',
            'turn_right(abc)'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('motion_turn_left', () => {
        let code;
        let expected;

        code = 'turn_left(180)';
        expected = [
            {
                opcode: 'motion_turnleft',
                inputs: [
                    {
                        name: 'DEGREES',
                        block: expectedInfo.makeNumber(180)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'turn_left(x)';
        expected = [
            {
                opcode: 'motion_turnleft',
                inputs: [
                    {
                        name: 'DEGREES',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeNumber(15)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            'turn_left()',
            'turn_left(180, 0)',
            'turn_left("180")',
            'turn_left(abc)'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('motion_goto', () => {
        const code = 'go_to("_mouse_")';
        const expected = [
            {
                opcode: 'motion_goto',
                inputs: [
                    {
                        name: 'TO',
                        block: {
                            opcode: 'motion_goto_menu',
                            fields: [
                                {
                                    name: 'TO',
                                    value: '_mouse_'
                                }
                            ],
                            shadow: true
                        }
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            'go_to(10)',
            'go_to()',
            'go_to("_mouse_", secs: 5)'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('motion_gotoxy', () => {
        let code;
        let expected;

        code = 'go_to([12, 34])';
        expected = [
            {
                opcode: 'motion_gotoxy',
                inputs: [
                    {
                        name: 'X',
                        block: expectedInfo.makeNumber(12)
                    },
                    {
                        name: 'Y',
                        block: expectedInfo.makeNumber(34)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'go_to([x, y])';
        expected = [
            {
                opcode: 'motion_gotoxy',
                inputs: [
                    {
                        name: 'X',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeNumber(0)
                    },
                    {
                        name: 'Y',
                        block: rubyToExpected(converter, target, 'y')[0],
                        shadow: expectedInfo.makeNumber(0)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            'go_to([])',
            'go_to([12])',
            'go_to([12, 34, 56])',
            'go_to([12, 34], secs: 5)',
            'go_to(["12", "34"])',
            'go_to([abc, abc])'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('motion_glideto', () => {
        let code;
        let expected;

        code = 'glide("_mouse_", secs: 5)';
        expected = [
            {
                opcode: 'motion_glideto',
                inputs: [
                    {
                        name: 'TO',
                        block: {
                            opcode: 'motion_glideto_menu',
                            fields: [
                                {
                                    name: 'TO',
                                    value: '_mouse_'
                                }
                            ],
                            shadow: true
                        }
                    },
                    {
                        name: 'SECS',
                        block: expectedInfo.makeNumber(5)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'glide("_mouse_", secs: x)';
        expected = [
            {
                opcode: 'motion_glideto',
                inputs: [
                    {
                        name: 'TO',
                        block: {
                            opcode: 'motion_glideto_menu',
                            fields: [
                                {
                                    name: 'TO',
                                    value: '_mouse_'
                                }
                            ],
                            shadow: true
                        }
                    },
                    {
                        name: 'SECS',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeNumber(1)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            'glide()',
            'glide(10, secs: 5)',
            'glide("_mouse_")',
            'glide("_mouse_", 5)',
            'glide("_mouse_", secs: abc)'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('motion_glidesecstoxy', () => {
        let code;
        let expected;

        code = 'glide([12, 34], secs: 5)';
        expected = [
            {
                opcode: 'motion_glidesecstoxy',
                inputs: [
                    {
                        name: 'X',
                        block: expectedInfo.makeNumber(12)
                    },
                    {
                        name: 'Y',
                        block: expectedInfo.makeNumber(34)
                    },
                    {
                        name: 'SECS',
                        block: expectedInfo.makeNumber(5)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'glide([x, y], secs: x)';
        expected = [
            {
                opcode: 'motion_glidesecstoxy',
                inputs: [
                    {
                        name: 'X',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeNumber(0)
                    },
                    {
                        name: 'Y',
                        block: rubyToExpected(converter, target, 'y')[0],
                        shadow: expectedInfo.makeNumber(0)
                    },
                    {
                        name: 'SECS',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeNumber(1)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            'glide([], secs: 5)',
            'glide([12, 34])',
            'glide([12, 34], 5)',
            'glide([abc, abc], secs: abc)'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('motion_pointindirection', () => {
        let code;
        let expected;

        code = 'self.direction = 90';
        expected = [
            {
                opcode: 'motion_pointindirection',
                inputs: [
                    {
                        name: 'DIRECTION',
                        block: expectedInfo.makeNumber(90, 'math_angle')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'self.direction = x';
        expected = [
            {
                opcode: 'motion_pointindirection',
                inputs: [
                    {
                        name: 'DIRECTION',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeNumber(90, 'math_angle')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            'self.direction = "90"',
            'self.direction = :symbol',
            'self.direction = abc'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('motion_pointtowards', () => {
        const code = 'point_towards("_mouse_")';
        const expected = [
            {
                opcode: 'motion_pointtowards',
                inputs: [
                    {
                        name: 'TOWARDS',
                        block: {
                            opcode: 'motion_pointtowards_menu',
                            fields: [
                                {
                                    name: 'TOWARDS',
                                    value: '_mouse_'
                                }
                            ],
                            shadow: true
                        }
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            'point_towards()',
            'point_towards(1)',
            'point_towards("_mouse_", secs: 1)'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('motion_ifonedgebounce', () => {
        const expected = [
            {
                opcode: 'motion_ifonedgebounce'
            }
        ];
        [
            'bounce_if_on_edge',
            'bounce_if_on_edge()'
        ].forEach(code => convertAndExpectToEqualBlocks(converter, target, code, expected));

        [
            'bounce_if_on_edge(1)'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('motion_setrotationstyle', () => {
        [
            'left-right',
            "don't rotate",
            'all around'
        ].forEach(style => {
            const code = `self.rotation_style = "${style}"`;
            const expected = [
                {
                    opcode: 'motion_setrotationstyle',
                    fields: [
                        {
                            name: 'STYLE',
                            value: style
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        [
            'self.rotation_style = 1',
            'self.rotation_style = "invalid"'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('motion_changexby', () => {
        let code;
        let expected;

        code = 'self.x += 10';
        expected = [
            {
                opcode: 'motion_changexby',
                inputs: [
                    {
                        name: 'DX',
                        block: expectedInfo.makeNumber(10)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'self.x += y';
        expected = [
            {
                opcode: 'motion_changexby',
                inputs: [
                    {
                        name: 'DX',
                        block: rubyToExpected(converter, target, 'y')[0],
                        shadow: expectedInfo.makeNumber(10)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            'self.x += "10"',
            'self.x += :symbol',
            'self.x += abc'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('motion_setx', () => {
        let code;
        let expected;

        code = 'self.x = 10';
        expected = [
            {
                opcode: 'motion_setx',
                inputs: [
                    {
                        name: 'X',
                        block: expectedInfo.makeNumber(10)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'self.x = y';
        expected = [
            {
                opcode: 'motion_setx',
                inputs: [
                    {
                        name: 'X',
                        block: rubyToExpected(converter, target, 'y')[0],
                        shadow: expectedInfo.makeNumber(0)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            'self.x = "10"',
            'self.x = :symbol',
            'self.x = abc'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('motion_changeyby', () => {
        let code;
        let expected;

        code = 'self.y += 10';
        expected = [
            {
                opcode: 'motion_changeyby',
                inputs: [
                    {
                        name: 'DY',
                        block: expectedInfo.makeNumber(10)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'self.y += x';
        expected = [
            {
                opcode: 'motion_changeyby',
                inputs: [
                    {
                        name: 'DY',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeNumber(10)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            'self.y += "10"',
            'self.y += :symbol',
            'self.y += abc'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('motion_sety', () => {
        let code;
        let expected;

        code = 'self.y = 10';
        expected = [
            {
                opcode: 'motion_sety',
                inputs: [
                    {
                        name: 'Y',
                        block: expectedInfo.makeNumber(10)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'self.y = x';
        expected = [
            {
                opcode: 'motion_sety',
                inputs: [
                    {
                        name: 'Y',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeNumber(0)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            'self.y = "10"',
            'self.y = :symbol',
            'self.y = abc'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    [
        'x',
        'y'
    ].forEach(xy => {
        test(`motion_${xy}position`, () => {
            const code = xy;
            const expected = [
                {
                    opcode: `motion_${xy}position`
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });
    });

    test('motion_direction', () => {
        const code = 'direction';
        const expected = [
            {
                opcode: 'motion_direction'
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);
    });
});
