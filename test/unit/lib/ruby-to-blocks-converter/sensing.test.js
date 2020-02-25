import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    convertAndExpectRubyBlockError,
    rubyToExpected,
    expectedInfo,
    expectNoArgsMethod
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Sensing', () => {
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

    describe('sensing_touchingobject', () => {
        test('normal', () => {
            code = 'touching?("_edge_")';
            expected = [
                {
                    opcode: 'sensing_touchingobject',
                    inputs: [
                        {
                            name: 'TOUCHINGOBJECTMENU',
                            block: {
                                opcode: 'sensing_touchingobjectmenu',
                                fields: [
                                    {
                                        name: 'TOUCHINGOBJECTMENU',
                                        value: '_edge_'
                                    }
                                ],
                                shadow: true
                            }
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'touching?(x)';
            expected = [
                {
                    opcode: 'sensing_touchingobject',
                    inputs: [
                        {
                            name: 'TOUCHINGOBJECTMENU',
                            block: rubyToExpected(converter, target, 'x')[0],
                            shadow: {
                                opcode: 'sensing_touchingobjectmenu',
                                fields: [
                                    {
                                        name: 'TOUCHINGOBJECTMENU',
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
        });

        test('value_boolean', () => {
            code = `
                bounce_if_on_edge
                touching?("_edge_")
                bounce_if_on_edge
            `;
            expected = [
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0],
                rubyToExpected(converter, target, 'touching?("_edge_")')[0],
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'touching?()',
                'touching?(1)',
                'touching?("_edge_", 1)'
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });
        });

        test('error', () => {
            code = `
                forever do
                  touching?("_edge_")
                end
            `;
            const res = converter.targetCodeToBlocks(target, code);
            expect(converter.errors).toHaveLength(1);
            expect(converter.errors[0].row).toEqual(2);
            expect(res).toBeFalsy();
        });
    });

    describe('sensing_touchingcolor', () => {
        test('normal', () => {
            code = 'touching_color?("#43066f")';
            expected = [
                {
                    opcode: 'sensing_touchingcolor',
                    inputs: [
                        {
                            name: 'COLOR',
                            block: {
                                opcode: 'colour_picker',
                                fields: [
                                    {
                                        name: 'COLOUR',
                                        value: '#43066f'
                                    }
                                ],
                                shadow: true
                            }
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'touching_color?(x)';
            expected = [
                {
                    opcode: 'sensing_touchingcolor',
                    inputs: [
                        {
                            name: 'COLOR',
                            block: rubyToExpected(converter, target, 'x')[0],
                            shadow: {
                                opcode: 'colour_picker',
                                fields: [
                                    {
                                        name: 'COLOUR',
                                        value: '#43066f'
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

        test('value_boolean', () => {
            code = `
                bounce_if_on_edge
                touching_color?("#43066f")
                bounce_if_on_edge
            `;
            expected = [
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0],
                rubyToExpected(converter, target, 'touching_color?("#43066f")')[0],
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'touching_color?()',
                'touching_color?(1)',
                'touching_color?("#0f0")',
                'touching_color?("#0")',
                'touching_color?("43066f")',
                'touching_color?("#43066f0")',
                'touching_color?("#43066f", 1)'
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });
        });

        test('error', () => {
            code = `
                forever do
                  touching_color?("#43066f")
                end
            `;
            const res = converter.targetCodeToBlocks(target, code);
            expect(converter.errors).toHaveLength(1);
            expect(converter.errors[0].row).toEqual(2);
            expect(res).toBeFalsy();
        });
    });

    describe('sensing_coloristouchingcolor', () => {
        test('normal', () => {
            code = 'color_is_touching_color?("#aad315", "#fca3bf")';
            expected = [
                {
                    opcode: 'sensing_coloristouchingcolor',
                    inputs: [
                        {
                            name: 'COLOR',
                            block: {
                                opcode: 'colour_picker',
                                fields: [
                                    {
                                        name: 'COLOUR',
                                        value: '#aad315'
                                    }
                                ],
                                shadow: true
                            }
                        },
                        {
                            name: 'COLOR2',
                            block: {
                                opcode: 'colour_picker',
                                fields: [
                                    {
                                        name: 'COLOUR',
                                        value: '#fca3bf'
                                    }
                                ],
                                shadow: true
                            }
                        }

                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'color_is_touching_color?(x, y)';
            expected = [
                {
                    opcode: 'sensing_coloristouchingcolor',
                    inputs: [
                        {
                            name: 'COLOR',
                            block: rubyToExpected(converter, target, 'x')[0],
                            shadow: {
                                opcode: 'colour_picker',
                                fields: [
                                    {
                                        name: 'COLOUR',
                                        value: '#aad315'
                                    }
                                ],
                                shadow: true
                            }
                        },
                        {
                            name: 'COLOR2',
                            block: rubyToExpected(converter, target, 'y')[0],
                            shadow: {
                                opcode: 'colour_picker',
                                fields: [
                                    {
                                        name: 'COLOUR',
                                        value: '#fca3bf'
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

        test('value_boolean', () => {
            code = `
                bounce_if_on_edge
                color_is_touching_color?("#aad315", "#fca3bf")
                bounce_if_on_edge
            `;
            expected = [
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0],
                rubyToExpected(converter, target, 'color_is_touching_color?("#aad315", "#fca3bf")')[0],
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'color_is_touching_color?()',
                'color_is_touching_color?(1)',
                'color_is_touching_color?("#0", "#fca3bf")',
                'color_is_touching_color?("aad315", "#fca3bf")',
                'color_is_touching_color?("#aad3150", "#fca3bf")',
                'color_is_touching_color?("#aad315", "#0")',
                'color_is_touching_color?("#aad315", "fca3bf")',
                'color_is_touching_color?("#aad315", "#fca3bf0")',
                'color_is_touching_color?("#aad315", "#fca3bf", 1)'
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });
        });

        test('error', () => {
            code = `
                forever do
                  color_is_touching_color?("#aad315", "#fca3bf")
                end
            `;
            const res = converter.targetCodeToBlocks(target, code);
            expect(converter.errors).toHaveLength(1);
            expect(converter.errors[0].row).toEqual(2);
            expect(res).toBeFalsy();
        });
    });

    describe('sensing_distanceto', () => {
        test('normal', () => {
            code = 'distance("_mouse_")';
            expected = [
                {
                    opcode: 'sensing_distanceto',
                    inputs: [
                        {
                            name: 'DISTANCETOMENU',
                            block: {
                                opcode: 'sensing_distancetomenu',
                                fields: [
                                    {
                                        name: 'DISTANCETOMENU',
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

            code = 'distance(x)';
            expected = [
                {
                    opcode: 'sensing_distanceto',
                    inputs: [
                        {
                            name: 'DISTANCETOMENU',
                            block: rubyToExpected(converter, target, 'x')[0],
                            shadow: {
                                opcode: 'sensing_distancetomenu',
                                fields: [
                                    {
                                        name: 'DISTANCETOMENU',
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
        });

        test('value', () => {
            code = `
                bounce_if_on_edge
                distance("_mouse_")
                bounce_if_on_edge
            `;
            expected = [
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0],
                rubyToExpected(converter, target, 'distance("_mouse_")')[0],
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'distance()',
                'distance(1)',
                'distance("_mouse_", 1)'
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });
        });

        test('error', () => {
            code = `
                forever do
                  distance("_mouse_")
                end
            `;
            const res = converter.targetCodeToBlocks(target, code);
            expect(converter.errors).toHaveLength(1);
            expect(converter.errors[0].row).toEqual(2);
            expect(res).toBeFalsy();
        });
    });

    describe('sensing_askandwait', () => {
        test('normal', () => {
            code = 'ask("What\'s your name?")';
            expected = [
                {
                    opcode: 'sensing_askandwait',
                    inputs: [
                        {
                            name: 'QUESTION',
                            block: expectedInfo.makeText('What\'s your name?')
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'ask(x)';
            expected = [
                {
                    opcode: 'sensing_askandwait',
                    inputs: [
                        {
                            name: 'QUESTION',
                            block: rubyToExpected(converter, target, 'x')[0],
                            shadow: expectedInfo.makeText('What\'s your name?')
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('statement', () => {
            code = `
                bounce_if_on_edge
                ask("What's your name?")
                bounce_if_on_edge
            `;
            expected = [
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
            ];
            expected[0].next = rubyToExpected(converter, target, 'ask("What\'s your name?")')[0];
            expected[0].next.next = rubyToExpected(converter, target, 'bounce_if_on_edge')[0];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'ask()',
                'ask(1)',
                'ask("What\'s your name?", 1)'
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });
        });
    });

    expectNoArgsMethod('sensing_answer', 'answer', 'value');

    describe('sensing_keypressed', () => {
        test('normal', () => {
            code = 'Keyboard.pressed?("space")';
            expected = [
                {
                    opcode: 'sensing_keypressed',
                    inputs: [
                        {
                            name: 'KEY_OPTION',
                            block: {
                                opcode: 'sensing_keyoptions',
                                fields: [
                                    {
                                        name: 'KEY_OPTION',
                                        value: 'space'
                                    }
                                ],
                                shadow: true
                            }
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'Keyboard.pressed?(x)';
            expected = [
                {
                    opcode: 'sensing_keypressed',
                    inputs: [
                        {
                            name: 'KEY_OPTION',
                            block: rubyToExpected(converter, target, 'x')[0],
                            shadow: {
                                opcode: 'sensing_keyoptions',
                                fields: [
                                    {
                                        name: 'KEY_OPTION',
                                        value: 'space'
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

        test('value_boolean', () => {
            code = `
                bounce_if_on_edge
                Keyboard.pressed?("space")
                bounce_if_on_edge
            `;
            expected = [
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0],
                rubyToExpected(converter, target, 'Keyboard.pressed?("space")')[0],
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'Keyboard.pressed?',
                'Keyboard.pressed?()',
                'Keyboard.pressed?(1)',
                'Keyboard.pressed?("invalid")',
                'Keyboard.pressed?("space", 1)'
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });
        });

        test('error', () => {
            code = `
                forever do
                  Keyboard.pressed?("space")
                end
            `;
            const res = converter.targetCodeToBlocks(target, code);
            expect(converter.errors).toHaveLength(1);
            expect(converter.errors[0].row).toEqual(2);
            expect(res).toBeFalsy();
        });
    });

    expectNoArgsMethod('sensing_mousedown', 'Mouse.down?', 'value_boolean');
    expectNoArgsMethod('sensing_mousex', 'Mouse.x', 'value');
    expectNoArgsMethod('sensing_mousey', 'Mouse.y', 'value');

    describe('sensing_setdragmode', () => {
        test('normal', () => {
            code = 'self.drag_mode = "draggable"';
            expected = [
                {
                    opcode: 'sensing_setdragmode',
                    fields: [
                        {
                            name: 'DRAG_MODE',
                            value: 'draggable'
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'self.drag_mode = "not draggable"';
            expected = [
                {
                    opcode: 'sensing_setdragmode',
                    fields: [
                        {
                            name: 'DRAG_MODE',
                            value: 'not draggable'
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('true/false', () => {
            code = 'self.drag_mode = true';
            expected = [
                {
                    opcode: 'sensing_setdragmode',
                    fields: [
                        {
                            name: 'DRAG_MODE',
                            value: 'draggable'
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'self.drag_mode = false';
            expected = [
                {
                    opcode: 'sensing_setdragmode',
                    fields: [
                        {
                            name: 'DRAG_MODE',
                            value: 'not draggable'
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('statement', () => {
            code = `
                bounce_if_on_edge
                self.drag_mode = "draggable"
                bounce_if_on_edge
            `;
            expected = [
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
            ];
            expected[0].next = rubyToExpected(converter, target, 'self.drag_mode = "draggable"')[0];
            expected[0].next.next = rubyToExpected(converter, target, 'bounce_if_on_edge')[0];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'self.drag_mode',
                'self.drag_mode()',
                'self.drag_mode = "invalid"',
                'self.drag_mode = 1'
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });
        });
    });

    expectNoArgsMethod('sensing_loudness', 'loudness', 'value');
    expectNoArgsMethod('sensing_timer', 'Timer.value', 'value');
    expectNoArgsMethod('sensing_resettimer', 'Timer.reset');

    describe('sensing_of', () => {
        describe('normal', () => {
            const spritePropertyToMethod = {
                'x position': 'x',
                'y position': 'y',
                'direction': 'direction',
                'costume #': 'costume_number',
                'costume name': 'costume_name',
                'size': 'size',
                'volume': 'volume',
                'local': 'variable("local")'
            };
            Object.keys(spritePropertyToMethod).forEach(property => {
                const method = spritePropertyToMethod[property];
                test(method, () => {
                    code = `sprite("Sprite1").${method}`;
                    expected = [
                        {
                            opcode: 'sensing_of',
                            fields: [
                                {
                                    name: 'PROPERTY',
                                    value: property
                                }
                            ],
                            inputs: [
                                {
                                    name: 'OBJECT',
                                    block: {
                                        opcode: 'sensing_of_object_menu',
                                        fields: [
                                            {
                                                name: 'OBJECT',
                                                value: 'Sprite1'
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
            });

            const stagePropertyToMethod = {
                'backdrop #': 'backdrop_number',
                'backdrop name': 'backdrop_name',
                'volume': 'volume',
                'global': 'variable("global")'
            };
            Object.keys(stagePropertyToMethod).forEach(property => {
                const method = stagePropertyToMethod[property];
                test(method, () => {
                    code = `stage.${method}`;
                    expected = [
                        {
                            opcode: 'sensing_of',
                            fields: [
                                {
                                    name: 'PROPERTY',
                                    value: property
                                }
                            ],
                            inputs: [
                                {
                                    name: 'OBJECT',
                                    block: {
                                        opcode: 'sensing_of_object_menu',
                                        fields: [
                                            {
                                                name: 'OBJECT',
                                                value: '_stage_'
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
            });
        });

        test('value', () => {
            code = `
                bounce_if_on_edge
                sprite("Sprite1").x
                bounce_if_on_edge
            `;
            expected = [
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0],
                rubyToExpected(converter, target, 'sprite("Sprite1").x')[0],
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = `
                bounce_if_on_edge
                stage.volume
                bounce_if_on_edge
            `;
            expected = [
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0],
                rubyToExpected(converter, target, 'stage.volume')[0],
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'sprite("Sprite1", 1).x',
                'sprite(1).x',
                'sprite(1).x(1)',
                'stage(1).x',
                'stage.x(1)'
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });
        });

        test('error', () => {
            code = `
                forever do
                  sprite("Sprite1").x
                end
            `;
            let res = converter.targetCodeToBlocks(target, code);
            expect(converter.errors).toHaveLength(1);
            expect(converter.errors[0].row).toEqual(2);
            expect(res).toBeFalsy();

            code = `
                forever do
                  stage.x
                  Time.now.year
                end
            `;
            res = converter.targetCodeToBlocks(target, code);
            expect(converter.errors).toHaveLength(1);
            expect(converter.errors[0].row).toEqual(2);
            expect(res).toBeFalsy();
        });
    });

    describe('sensing_current', () => {
        describe('normal', () => {
            const currentMenuToMethod = {
                YEAR: 'year',
                MONTH: 'month',
                DATE: 'day',
                DAYOFWEEK: 'wday + 1',
                HOUR: 'hour',
                MINUTE: 'min',
                SECOND: 'sec'
            };
            Object.keys(currentMenuToMethod).forEach(fieldValue => {
                const method = currentMenuToMethod[fieldValue];
                test(method, () => {
                    code = `Time.now.${method}`;
                    expected = [
                        {
                            opcode: 'sensing_current',
                            fields: [
                                {
                                    name: 'CURRENTMENU',
                                    value: fieldValue
                                }
                            ]
                        }
                    ];
                    convertAndExpectToEqualBlocks(converter, target, code, expected);
                });
            });
        });

        test('value', () => {
            code = `
                bounce_if_on_edge
                Time.now.year
                bounce_if_on_edge
            `;
            expected = [
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0],
                rubyToExpected(converter, target, 'Time.now.year')[0],
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'Time.now(1)',
                'Time.now.year(1)',
                'Time.now.invalid'
            ].forEach(c => {
                convertAndExpectRubyBlockError(converter, target, c);
            });
        });

        test('error', () => {
            code = `
                forever do
                  Time.now
                end
            `;
            let res = converter.targetCodeToBlocks(target, code);
            expect(converter.errors).toHaveLength(1);
            expect(converter.errors[0].row).toEqual(2);
            expect(res).toBeFalsy();

            code = `
                forever do
                  Time.now.year
                end
            `;
            res = converter.targetCodeToBlocks(target, code);
            expect(converter.errors).toHaveLength(1);
            expect(converter.errors[0].row).toEqual(2);
            expect(res).toBeFalsy();
        });
    });

    expectNoArgsMethod('sensing_dayssince2000', 'days_since_2000', 'value');
    expectNoArgsMethod('sensing_username', 'user_name', 'value');
});
