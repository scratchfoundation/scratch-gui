import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    expectToEqualBlocks,
    convertAndExpectToEqualBlocks,
    expectToEqualRubyStatement,
    rubyToExpected
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Operators', () => {
    let converter;
    let target;

    beforeEach(() => {
        converter = new RubyToBlocksConverter(null);
        target = null;
    });

    test('operator_add', () => {
        const code = '1 + 2';
        const expected = [
            {
                opcode: 'operator_add',
                inputs: [
                    {
                        name: 'NUM1',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 1
                                }
                            ],
                            shadow: true
                        }
                    },
                    {
                        name: 'NUM2',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 2
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
            '1 + "2"',
            '1 + :symbol',
        ].forEach(s => {
            expect(converter.targetCodeToBlocks(target, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });
    });

    test('operator_subtract', () => {
        const code = '2 - 1';
        const expected = [
            {
                opcode: 'operator_subtract',
                inputs: [
                    {
                        name: 'NUM1',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 2
                                }
                            ],
                            shadow: true
                        }
                    },
                    {
                        name: 'NUM2',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 1
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
            '"2" - "1"',
            '2 - "1"',
            '"2" - 1',
        ].forEach(s => {
            expect(converter.targetCodeToBlocks(target, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });
    });

    test('operator_multiply', () => {
        const code = '1 * 2';
        const expected = [
            {
                opcode: 'operator_multiply',
                inputs: [
                    {
                        name: 'NUM1',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 1
                                }
                            ],
                            shadow: true
                        }
                    },
                    {
                        name: 'NUM2',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 2
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
            '"1" * "2"',
            '1 * "2"',
            '"1" * 2',
        ].forEach(s => {
            expect(converter.targetCodeToBlocks(target, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });
    });

    test('operator_divide', () => {
        const code = '2 / 1';
        const expected = [
            {
                opcode: 'operator_divide',
                inputs: [
                    {
                        name: 'NUM1',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 2
                                }
                            ],
                            shadow: true
                        }
                    },
                    {
                        name: 'NUM2',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 1
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
            '"2" / "1"',
            '2 / "1"',
            '"2" / 1',
        ].forEach(s => {
            expect(converter.targetCodeToBlocks(target, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });
    });

    test('operator_random', () => {
        const code = 'rand(1..10)';
        const expected = [
            {
                opcode: 'operator_random',
                inputs: [
                    {
                        name: 'FROM',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 1
                                }
                            ],
                            shadow: true
                        }
                    },
                    {
                        name: 'TO',
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
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            'random()',
            'random',
            'random(1)',
            'random(10)',
            'random(1..10, 23)',
            'random("1..10")',
        ].forEach(s => {
            expect(converter.targetCodeToBlocks(target, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });
    });

    test('operator_gt', () => {
        const code = '1 > 50';
        const expected = [
            {
                opcode: 'operator_gt',
                inputs: [
                    {
                        name: 'OPERAND1',
                        block: {
                            opcode: 'text',
                            fields: [
                                {
                                    name: 'TEXT',
                                    value: '1'
                                }
                            ],
                            shadow: true
                        }
                    },
                    {
                        name: 'OPERAND2',
                        block: {
                            opcode: 'text',
                            fields: [
                                {
                                    name: 'TEXT',
                                    value: '50'
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

    test('operator_lt', () => {
        const code = '1 < 50';
        const expected = [
            {
                opcode: 'operator_lt',
                inputs: [
                    {
                        name: 'OPERAND1',
                        block: {
                            opcode: 'text',
                            fields: [
                                {
                                    name: 'TEXT',
                                    value: '1'
                                }
                            ],
                            shadow: true
                        }
                    },
                    {
                        name: 'OPERAND2',
                        block: {
                            opcode: 'text',
                            fields: [
                                {
                                    name: 'TEXT',
                                    value: '50'
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

    test('operator_equals', () => {
        const code = '1 == 50';
        const expected = [
            {
                opcode: 'operator_equals',
                inputs: [
                    {
                        name: 'OPERAND1',
                        block: {
                            opcode: 'text',
                            fields: [
                                {
                                    name: 'TEXT',
                                    value: '1'
                                }
                            ],
                            shadow: true
                        }
                    },
                    {
                        name: 'OPERAND2',
                        block: {
                            opcode: 'text',
                            fields: [
                                {
                                    name: 'TEXT',
                                    value: '50'
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

    test('operator_and', () => {
        const code = '1 < x && x < 10';
        const expected = [
            {
                opcode: 'operator_and',
                inputs: [
                    {
                        name: 'OPERAND1',
                        block: rubyToExpected(converter, target, '1 < x')[0]
                    },
                    {
                        name: 'OPERAND2',
                        block: rubyToExpected(converter, target, 'x < 10')[0]
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);
    });

    test('operator_or', () => {
        const code = 'x == 2 || y == 3';
        const expected = [
            {
                opcode: 'operator_or',
                inputs: [
                    {
                        name: 'OPERAND1',
                        block: rubyToExpected(converter, target, 'x == 2')[0]
                    },
                    {
                        name: 'OPERAND2',
                        block: rubyToExpected(converter, target, 'y == 3')[0]
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);
    });

    test('operator_not', () => {
        const code = '!x';
        const expected = [
            {
                opcode: 'operator_not',
                inputs: [
                    {
                        name: 'OPERAND',
                        block: rubyToExpected(converter, target, 'x')[0]
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);
    });

    test('operator_join', () => {
        const code = '"apple" + "banana"';
        const expected = [
            {
                opcode: 'operator_join',
                inputs: [
                    {
                        name: 'STRING1',
                        block: {
                            opcode: 'text',
                            fields: [
                                {
                                    name: 'TEXT',
                                    value: 'apple'
                                }
                            ],
                            shadow: true
                        }
                    },
                    {
                        name: 'STRING2',
                        block: {
                            opcode: 'text',
                            fields: [
                                {
                                    name: 'TEXT',
                                    value: 'banana'
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

    test('operator_letter_of', () => {
        const code = '"apple"[0]';
        const expected = [
            {
                opcode: 'operator_letter_of',
                inputs: [
                    {
                        name: 'STRING',
                        block: {
                            opcode: 'text',
                            fields: [
                                {
                                    name: 'TEXT',
                                    value: 'apple'
                                }
                            ],
                            shadow: true
                        }
                    },
                    {
                        name: 'LETTER',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 0
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

    test('operator_length', () => {
        const code = '"apple".length';
        const expected = [
            {
                opcode: 'operator_length',
                inputs: [
                    {
                        name: 'STRING',
                        block: {
                            opcode: 'text',
                            fields: [
                                {
                                    name: 'TEXT',
                                    value: 'apple'
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

    test('operator_contains', () => {
        const code = '"apple".include?("a")';
        const expected = [
            {
                opcode: 'operator_contains',
                inputs: [
                    {
                        name: 'STRING1',
                        block: {
                            opcode: 'text',
                            fields: [
                                {
                                    name: 'TEXT',
                                    value: 'apple'
                                }
                            ],
                            shadow: true
                        }
                    },
                    {
                        name: 'STRING2',
                        block: {
                            opcode: 'text',
                            fields: [
                                {
                                    name: 'TEXT',
                                    value: 'a'
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

    test('operator_mod', () => {
        const code = '1 % 2';
        const expected = [
            {
                opcode: 'operator_mod',
                inputs: [
                    {
                        name: 'NUM1',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 1
                                }
                            ],
                            shadow: true
                        }
                    },
                    {
                        name: 'NUM2',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 2
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
            '"1" % "2"',
            '1 % "2"',
            '"1" % 2',
        ].forEach(s => {
            expect(converter.targetCodeToBlocks(target, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });
    });

    test('operator_round', () => {
        const code = '2.round';
        const expected = [
            {
                opcode: 'operator_round',
                inputs: [
                    {
                        name: 'NUM',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 2
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
            '"2".round',
            '"2".round(1)'
        ].forEach(s => {
            expect(converter.targetCodeToBlocks(target, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });
    });

    test('operator_mathop', () => {
        const code = '3.abs';
        const expected = [
            {
                opcode: 'operator_mathop',
                fields: [
                    {
                        name: 'OPERATOR',
                        value: 'abs'
                    }
                ],
                inputs: [
                    {
                        name: 'NUM',
                        block: {
                            opcode: 'math_number',
                            fields: [
                                {
                                    name: 'NUM',
                                    value: 3
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
