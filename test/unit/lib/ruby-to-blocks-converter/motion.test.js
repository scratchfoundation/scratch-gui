import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    expectToEqualBlocks,
    expectToEqualRubyStatement
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Motion', () => {
    let converter;

    beforeEach(() => {
        converter = new RubyToBlocksConverter(null);
    });

    test('motion_movesteps', () => {
        expect(converter.targetCodeToBlocks(null, 'move(10)')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

        const expected = [
            {
                opcode: 'motion_movesteps',
                inputs: [
                    {
                        name: 'STEPS',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 10
                                }
                            ],
                            shadow: true
                        }
                    }
                ]
            }
        ];
        expectToEqualBlocks(converter.blocks, expected);

        ['move()', 'move(10, 10)', 'move("10")'].forEach(s => {
            expect(converter.targetCodeToBlocks(null, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });
    });

    test('motion_turn_right', () => {
        expect(converter.targetCodeToBlocks(null, 'turn_right(180)')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

        const expected = [
            {
                opcode: 'motion_turnright',
                inputs: [
                    {
                        name: 'DEGREES',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 180
                                }
                            ],
                            shadow: true
                        }
                    }
                ]
            }
        ];
        expectToEqualBlocks(converter.blocks, expected);

        ['turn_right()', 'turn_right(180, 0)', 'turn_right("180")'].forEach(s => {
            expect(converter.targetCodeToBlocks(null, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });
    });

    test('motion_turn_left', () => {
        expect(converter.targetCodeToBlocks(null, 'turn_left(180)')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

        const expected = [
            {
                opcode: 'motion_turnleft',
                inputs: [
                    {
                        name: 'DEGREES',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 180
                                }
                            ],
                            shadow: true
                        }
                    }
                ]
            }
        ];
        expectToEqualBlocks(converter.blocks, expected);

        ['turn_left()', 'turn_left(180, 0)', 'turn_left("180")'].forEach(s => {
            expect(converter.targetCodeToBlocks(null, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });
    });

    test('motion_goto', () => {
        expect(converter.targetCodeToBlocks(null, 'go_to("_mouse_")')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

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
        expectToEqualBlocks(converter.blocks, expected);

        ['go_to(10)', 'go_to()', 'go_to("_mouse_", secs: 5)'].forEach(s => {
            expect(converter.targetCodeToBlocks(null, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });
    });

    test('motion_gotoxy', () => {
        expect(converter.targetCodeToBlocks(null, 'go_to([12, 34])')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

        const expected = [
            {
                opcode: 'motion_gotoxy',
                inputs: [
                    {
                        name: 'X',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 12
                                }
                            ],
                            shadow: true
                        }
                    },
                    {
                        name: 'Y',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 34
                                }
                            ],
                            shadow: true
                        }
                    }
                ]
            }
        ];
        expectToEqualBlocks(converter.blocks, expected);

        [
            'go_to([])', 'go_to([12])', 'go_to([12, 34, 56])', 'go_to([12, 34], secs: 5)',
            'go_to(["12", "34"])'
        ].forEach(s => {
            expect(converter.targetCodeToBlocks(null, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });
    });

    test('motion_glideto', () => {
        expect(converter.targetCodeToBlocks(null, 'glide("_mouse_", secs: 5)')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

        const expected = [
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
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 5
                                }
                            ],
                            shadow: true
                        }
                    }
                ]
            }
        ];
        expectToEqualBlocks(converter.blocks, expected);

        ['glide()', 'glide(10, secs: 5)', 'glide("_mouse_")', 'glide("_mouse_", 5)'].forEach(s => {
            expect(converter.targetCodeToBlocks(null, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });
    });

    test('motion_glidesecstoxy', () => {
        expect(converter.targetCodeToBlocks(null, 'glide([12, 34], secs: 5)')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

        const expected = [
            {
                opcode: 'motion_glidesecstoxy',
                inputs: [
                    {
                        name: 'X',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 12
                                }
                            ],
                            shadow: true
                        }
                    },
                    {
                        name: 'Y',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 34
                                }
                            ],
                            shadow: true
                        }
                    },
                    {
                        name: 'SECS',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 5
                                }
                            ],
                            shadow: true
                        }
                    }
                ]
            }
        ];
        expectToEqualBlocks(converter.blocks, expected);

        ['glide([], secs: 5)', 'glide([12, 34])', 'glide([12, 34], 5)'].forEach(s => {
            expect(converter.targetCodeToBlocks(null, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });
    });

    test('motion_pointindirection', () => {
        expect(converter.targetCodeToBlocks(null, 'self.direction = 90')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

        const expected = [
            {
                opcode: 'motion_pointindirection',
                inputs: [
                    {
                        name: 'DIRECTION',
                        block: {
                            opcode: 'math_angle',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 90
                                }
                            ],
                            shadow: true
                        }
                    }
                ]
            }
        ];
        expectToEqualBlocks(converter.blocks, expected);

        ['self.direction = "90"', 'self.direction = :symbol'].forEach(s => {
            expect(converter.targetCodeToBlocks(null, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });
    });

    test('motion_pointtowards', () => {
        expect(converter.targetCodeToBlocks(null, 'point_towards("_mouse_")')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

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
        expectToEqualBlocks(converter.blocks, expected);

        ['point_towards()', 'point_towards(1)', 'point_towards("_mouse_", secs: 1)'].forEach(s => {
            expect(converter.targetCodeToBlocks(null, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });
    });

    test('motion_ifonedgebounce', () => {
        expect(converter.targetCodeToBlocks(null, 'bounce_if_on_edge')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

        const expected = [
            {
                opcode: 'motion_ifonedgebounce'
            }
        ];
        expectToEqualBlocks(converter.blocks, expected);

        ['bounce_if_on_edge(1)'].forEach(s => {
            expect(converter.targetCodeToBlocks(null, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });
    });

    test('motion_setrotationstyle', () => {
        expect(converter.targetCodeToBlocks(null, 'self.rotation_style = "left-right"')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

        const expected = [
            {
                opcode: 'motion_setrotationstyle',
                fields: [
                    {
                        name: 'STYLE',
                        value: 'left-right'
                    }
                ]
            }
        ];
        expectToEqualBlocks(converter.blocks, expected);

        ['self.rotation_style = 1', 'self.rotation_style = "invalid"'].forEach(s => {
            expect(converter.targetCodeToBlocks(null, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });
    });

    test('motion_setx', () => {
        expect(converter.targetCodeToBlocks(null, 'self.x = 10')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

        const expected = [
            {
                opcode: 'motion_setx',
                inputs: [
                    {
                        name: 'X',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 10
                                }
                            ],
                            shadow: true
                        }
                    }
                ]
            }
        ];
        expectToEqualBlocks(converter.blocks, expected);

        ['self.x = "10"', 'self.x = :symbol'].forEach(s => {
            expect(converter.targetCodeToBlocks(null, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });
    });

    test('motion_sety', () => {
        expect(converter.targetCodeToBlocks(null, 'self.y = 10')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

        const expected = [
            {
                opcode: 'motion_sety',
                inputs: [
                    {
                        name: 'Y',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 10
                                }
                            ],
                            shadow: true
                        }
                    }
                ]
            }
        ];
        expectToEqualBlocks(converter.blocks, expected);

        ['self.y = "10"', 'self.y = :symbol'].forEach(s => {
            expect(converter.targetCodeToBlocks(null, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });
    });

    test('motion_xposition', () => {
        expect(converter.targetCodeToBlocks(null, 'x')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

        const expected = [
            {
                opcode: 'motion_xposition'
            }
        ];
        expectToEqualBlocks(converter.blocks, expected);
    });

    test('motion_yposition', () => {
        expect(converter.targetCodeToBlocks(null, 'y')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

        const expected = [
            {
                opcode: 'motion_yposition'
            }
        ];
        expectToEqualBlocks(converter.blocks, expected);
    });

    test('motion_direction', () => {
        expect(converter.targetCodeToBlocks(null, 'direction')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

        const expected = [
            {
                opcode: 'motion_direction'
            }
        ];
        expectToEqualBlocks(converter.blocks, expected);
    });
});
