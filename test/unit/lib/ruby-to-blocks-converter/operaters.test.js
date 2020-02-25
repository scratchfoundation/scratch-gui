import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    convertAndExpectRubyBlockError,
    rubyToExpected,
    expectedInfo
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Operators', () => {
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

    describe('operator_add', () => {
        test('normal', () => {
            code = '1 + 2';
            expected = [
                {
                    opcode: 'operator_add',
                    inputs: [
                        {
                            name: 'NUM1',
                            block: expectedInfo.makeNumber(1)
                        },
                        {
                            name: 'NUM2',
                            block: expectedInfo.makeNumber(2)
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'x + y';
            expected = [
                {
                    opcode: 'operator_add',
                    inputs: [
                        {
                            name: 'NUM1',
                            block: rubyToExpected(converter, target, 'x')[0],
                            shadow: expectedInfo.makeNumber('')
                        },
                        {
                            name: 'NUM2',
                            block: rubyToExpected(converter, target, 'y')[0],
                            shadow: expectedInfo.makeNumber('')
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = '$global + y';
            expected = [
                {
                    opcode: 'operator_add',
                    inputs: [
                        {
                            name: 'NUM1',
                            block: rubyToExpected(converter, target, '$global')[0],
                            shadow: expectedInfo.makeNumber('')
                        },
                        {
                            name: 'NUM2',
                            block: rubyToExpected(converter, target, 'y')[0],
                            shadow: expectedInfo.makeNumber('')
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('bug, 180 + (1)', () => {
            code = '180 + (1)';
            expected = [
                {
                    opcode: 'operator_add',
                    inputs: [
                        {
                            name: 'NUM1',
                            block: expectedInfo.makeNumber(180)
                        },
                        {
                            name: 'NUM2',
                            block: expectedInfo.makeNumber(1)
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });
    });

    test('operator_subtract', () => {
        code = '2 - 1';
        expected = [
            {
                opcode: 'operator_subtract',
                inputs: [
                    {
                        name: 'NUM1',
                        block: expectedInfo.makeNumber(2)
                    },
                    {
                        name: 'NUM2',
                        block: expectedInfo.makeNumber(1)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = '2 - (1)';
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'x - y';
        expected = [
            {
                opcode: 'operator_subtract',
                inputs: [
                    {
                        name: 'NUM1',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeNumber('')
                    },
                    {
                        name: 'NUM2',
                        block: rubyToExpected(converter, target, 'y')[0],
                        shadow: expectedInfo.makeNumber('')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = '$global - y';
        expected = [
            {
                opcode: 'operator_subtract',
                inputs: [
                    {
                        name: 'NUM1',
                        block: rubyToExpected(converter, target, '$global')[0],
                        shadow: expectedInfo.makeNumber('')
                    },
                    {
                        name: 'NUM2',
                        block: rubyToExpected(converter, target, 'y')[0],
                        shadow: expectedInfo.makeNumber('')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            '"2" - "1"',
            '2 - "1"',
            '"2" - 1'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('operator_multiply', () => {
        code = '1 * 2';
        expected = [
            {
                opcode: 'operator_multiply',
                inputs: [
                    {
                        name: 'NUM1',
                        block: expectedInfo.makeNumber(1)
                    },
                    {
                        name: 'NUM2',
                        block: expectedInfo.makeNumber(2)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = '1 * (2)';
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'x * y';
        expected = [
            {
                opcode: 'operator_multiply',
                inputs: [
                    {
                        name: 'NUM1',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeNumber('')
                    },
                    {
                        name: 'NUM2',
                        block: rubyToExpected(converter, target, 'y')[0],
                        shadow: expectedInfo.makeNumber('')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = '$global * y';
        expected = [
            {
                opcode: 'operator_multiply',
                inputs: [
                    {
                        name: 'NUM1',
                        block: rubyToExpected(converter, target, '$global')[0],
                        shadow: expectedInfo.makeNumber('')
                    },
                    {
                        name: 'NUM2',
                        block: rubyToExpected(converter, target, 'y')[0],
                        shadow: expectedInfo.makeNumber('')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            '"1" * "2"',
            '1 * "2"',
            '"1" * 2'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('operator_divide', () => {
        code = '2 / 1';
        expected = [
            {
                opcode: 'operator_divide',
                inputs: [
                    {
                        name: 'NUM1',
                        block: expectedInfo.makeNumber(2)
                    },
                    {
                        name: 'NUM2',
                        block: expectedInfo.makeNumber(1)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = '2 / (1)';
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'x / y';
        expected = [
            {
                opcode: 'operator_divide',
                inputs: [
                    {
                        name: 'NUM1',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeNumber('')
                    },
                    {
                        name: 'NUM2',
                        block: rubyToExpected(converter, target, 'y')[0],
                        shadow: expectedInfo.makeNumber('')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = '$global / y';
        expected = [
            {
                opcode: 'operator_divide',
                inputs: [
                    {
                        name: 'NUM1',
                        block: rubyToExpected(converter, target, '$global')[0],
                        shadow: expectedInfo.makeNumber('')
                    },
                    {
                        name: 'NUM2',
                        block: rubyToExpected(converter, target, 'y')[0],
                        shadow: expectedInfo.makeNumber('')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            '"2" / "1"',
            '2 / "1"',
            '"2" / 1'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('operator_random', () => {
        code = 'rand(1..10)';
        expected = [
            {
                opcode: 'operator_random',
                inputs: [
                    {
                        name: 'FROM',
                        block: expectedInfo.makeNumber(1)
                    },
                    {
                        name: 'TO',
                        block: expectedInfo.makeNumber(10)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'rand(x..y)';
        expected = [
            {
                opcode: 'operator_random',
                inputs: [
                    {
                        name: 'FROM',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeNumber(1)
                    },
                    {
                        name: 'TO',
                        block: rubyToExpected(converter, target, 'y')[0],
                        shadow: expectedInfo.makeNumber(10)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'rand($global..y)';
        expected = [
            {
                opcode: 'operator_random',
                inputs: [
                    {
                        name: 'FROM',
                        block: rubyToExpected(converter, target, '$global')[0],
                        shadow: expectedInfo.makeNumber(1)
                    },
                    {
                        name: 'TO',
                        block: rubyToExpected(converter, target, 'y')[0],
                        shadow: expectedInfo.makeNumber(10)
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
            'random("1..10")'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('operator_gt', () => {
        code = '1 > 50';
        expected = [
            {
                opcode: 'operator_gt',
                inputs: [
                    {
                        name: 'OPERAND1',
                        block: expectedInfo.makeText('1')
                    },
                    {
                        name: 'OPERAND2',
                        block: expectedInfo.makeText('50')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = '1 > (50)';
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'x > y';
        expected = [
            {
                opcode: 'operator_gt',
                inputs: [
                    {
                        name: 'OPERAND1',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeText('')
                    },
                    {
                        name: 'OPERAND2',
                        block: rubyToExpected(converter, target, 'y')[0],
                        shadow: expectedInfo.makeText('50')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = '$global > y';
        expected = [
            {
                opcode: 'operator_gt',
                inputs: [
                    {
                        name: 'OPERAND1',
                        block: rubyToExpected(converter, target, '$global')[0],
                        shadow: expectedInfo.makeText('')
                    },
                    {
                        name: 'OPERAND2',
                        block: rubyToExpected(converter, target, 'y')[0],
                        shadow: expectedInfo.makeText('50')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);
    });

    test('operator_lt', () => {
        code = '1 < 50';
        expected = [
            {
                opcode: 'operator_lt',
                inputs: [
                    {
                        name: 'OPERAND1',
                        block: expectedInfo.makeText('1')
                    },
                    {
                        name: 'OPERAND2',
                        block: expectedInfo.makeText('50')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = '1 < (50)';
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'x < y';
        expected = [
            {
                opcode: 'operator_lt',
                inputs: [
                    {
                        name: 'OPERAND1',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeText('')
                    },
                    {
                        name: 'OPERAND2',
                        block: rubyToExpected(converter, target, 'y')[0],
                        shadow: expectedInfo.makeText('50')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = '$global < y';
        expected = [
            {
                opcode: 'operator_lt',
                inputs: [
                    {
                        name: 'OPERAND1',
                        block: rubyToExpected(converter, target, '$global')[0],
                        shadow: expectedInfo.makeText('')
                    },
                    {
                        name: 'OPERAND2',
                        block: rubyToExpected(converter, target, 'y')[0],
                        shadow: expectedInfo.makeText('50')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);
    });

    test('operator_equals', () => {
        code = '1 == 50';
        expected = [
            {
                opcode: 'operator_equals',
                inputs: [
                    {
                        name: 'OPERAND1',
                        block: expectedInfo.makeText('1')
                    },
                    {
                        name: 'OPERAND2',
                        block: expectedInfo.makeText('50')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = '1 == (50)';
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'x == y';
        expected = [
            {
                opcode: 'operator_equals',
                inputs: [
                    {
                        name: 'OPERAND1',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeText('')
                    },
                    {
                        name: 'OPERAND2',
                        block: rubyToExpected(converter, target, 'y')[0],
                        shadow: expectedInfo.makeText('50')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = '$global == 21';
        expected = [
            {
                opcode: 'operator_equals',
                inputs: [
                    {
                        name: 'OPERAND1',
                        block: rubyToExpected(converter, target, '$global')[0],
                        shadow: expectedInfo.makeText('')
                    },
                    {
                        name: 'OPERAND2',
                        block: expectedInfo.makeText('21')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);
    });

    test('operator_and', () => {
        code = '1 < x && x < 10';
        expected = [
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

        code = '1 < x && (x < 10)';
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = '1 < $global && $global < 10';
        expected = [
            {
                opcode: 'operator_and',
                inputs: [
                    {
                        name: 'OPERAND1',
                        block: rubyToExpected(converter, target, '1 < $global')[0]
                    },
                    {
                        name: 'OPERAND2',
                        block: rubyToExpected(converter, target, '$global < 10')[0]
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'false && false';
        expected = [
            {
                opcode: 'operator_and'
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);
    });

    test('operator_or', () => {
        code = 'x == 2 || y == 3';
        expected = [
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

        code = 'x == 2 || (y == 3)';
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = '$global == 2 || $global == 3';
        expected = [
            {
                opcode: 'operator_or',
                inputs: [
                    {
                        name: 'OPERAND1',
                        block: rubyToExpected(converter, target, '$global == 2')[0]
                    },
                    {
                        name: 'OPERAND2',
                        block: rubyToExpected(converter, target, '$global == 3')[0]
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'false || false';
        expected = [
            {
                opcode: 'operator_or'
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);
    });

    test('operator_not', () => {
        code = '!touching?("_edge_")';
        expected = [
            {
                opcode: 'operator_not',
                inputs: [
                    {
                        name: 'OPERAND',
                        block: rubyToExpected(converter, target, 'touching?("_edge_")')[0]
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = '!($global == 1)';
        expected = [
            {
                opcode: 'operator_not',
                inputs: [
                    {
                        name: 'OPERAND',
                        block: rubyToExpected(converter, target, '$global == 1')[0]
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = '!false';
        expected = [
            {
                opcode: 'operator_not'
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);
    });

    test('operator_join', () => {
        code = '"apple" + "banana"';
        expected = [
            {
                opcode: 'operator_join',
                inputs: [
                    {
                        name: 'STRING1',
                        block: expectedInfo.makeText('apple')
                    },
                    {
                        name: 'STRING2',
                        block: expectedInfo.makeText('banana')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = '"apple" + x';
        expected = [
            {
                opcode: 'operator_join',
                inputs: [
                    {
                        name: 'STRING1',
                        block: expectedInfo.makeText('apple')
                    },
                    {
                        name: 'STRING2',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeText('banana')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'x + "banana"';
        expected = [
            {
                opcode: 'operator_join',
                inputs: [
                    {
                        name: 'STRING1',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeText('apple')
                    },
                    {
                        name: 'STRING2',
                        block: expectedInfo.makeText('banana')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);
    });

    test('operator_letter_of', () => {
        code = '"apple"[0]';
        expected = [
            {
                opcode: 'operator_letter_of',
                inputs: [
                    {
                        name: 'STRING',
                        block: expectedInfo.makeText('apple')
                    },
                    {
                        name: 'LETTER',
                        block: expectedInfo.makeNumber(0)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'x[y]';
        expected = [
            {
                opcode: 'operator_letter_of',
                inputs: [
                    {
                        name: 'STRING',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeText('apple')
                    },
                    {
                        name: 'LETTER',
                        block: rubyToExpected(converter, target, 'y')[0],
                        shadow: expectedInfo.makeNumber(1)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);
    });

    test('operator_length', () => {
        code = '"apple".length';
        expected = [
            {
                opcode: 'operator_length',
                inputs: [
                    {
                        name: 'STRING',
                        block: expectedInfo.makeText('apple')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'x.length';
        expected = [
            {
                opcode: 'operator_length',
                inputs: [
                    {
                        name: 'STRING',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeText('apple')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);
    });

    test('operator_contains', () => {
        code = '"apple".include?("a")';
        expected = [
            {
                opcode: 'operator_contains',
                inputs: [
                    {
                        name: 'STRING1',
                        block: expectedInfo.makeText('apple')
                    },
                    {
                        name: 'STRING2',
                        block: expectedInfo.makeText('a')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'x.include?(y)';
        expected = [
            {
                opcode: 'operator_contains',
                inputs: [
                    {
                        name: 'STRING1',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeText('apple')
                    },
                    {
                        name: 'STRING2',
                        block: rubyToExpected(converter, target, 'y')[0],
                        shadow: expectedInfo.makeText('a')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);
    });

    test('operator_mod', () => {
        code = '1 % 2';
        expected = [
            {
                opcode: 'operator_mod',
                inputs: [
                    {
                        name: 'NUM1',
                        block: expectedInfo.makeNumber(1)
                    },
                    {
                        name: 'NUM2',
                        block: expectedInfo.makeNumber(2)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = '1 % (2)';
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'x % y';
        expected = [
            {
                opcode: 'operator_mod',
                inputs: [
                    {
                        name: 'NUM1',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeNumber('')
                    },
                    {
                        name: 'NUM2',
                        block: rubyToExpected(converter, target, 'y')[0],
                        shadow: expectedInfo.makeNumber('')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            '"1" % "2"',
            '1 % "2"',
            '"1" % 2'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('operator_round', () => {
        code = '2.round';
        expected = [
            {
                opcode: 'operator_round',
                inputs: [
                    {
                        name: 'NUM',
                        block: expectedInfo.makeNumber(2)
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        code = 'x.round';
        expected = [
            {
                opcode: 'operator_round',
                inputs: [
                    {
                        name: 'NUM',
                        block: rubyToExpected(converter, target, 'x')[0],
                        shadow: expectedInfo.makeNumber('')
                    }
                ]
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            '"2".round',
            '"2".round(1)'
        ].forEach(s => {
            convertAndExpectRubyBlockError(converter, target, s);
        });
    });

    test('operator_mathop', () => {
        let operatorCodes;

        ['3', '(3)'].forEach(three => {
            operatorCodes = {
                'abs': `${three}.abs`,
                'floor': `${three}.floor`,
                'ceiling': `${three}.ceil`,
                'sqrt': `Math.sqrt(${three})`,
                'sin': `Math.sin(${three})`,
                'cos': `Math.cos(${three})`,
                'tan': `Math.tan(${three})`,
                'asin': `Math.asin(${three})`,
                'acos': `Math.acos(${three})`,
                'atan': `Math.atan(${three})`,
                'ln': `Math.log(${three})`,
                'log': `Math.log10(${three})`,
                'e ^': `Math::E ** ${three}`,
                '10 ^': `10 ** ${three}`
            };
            Object.keys(operatorCodes).forEach(operator => {
                code = operatorCodes[operator];
                expected = [
                    {
                        opcode: 'operator_mathop',
                        fields: [
                            {
                                name: 'OPERATOR',
                                value: operator
                            }
                        ],
                        inputs: [
                            {
                                name: 'NUM',
                                block: expectedInfo.makeNumber(3)
                            }
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });
        });

        operatorCodes = {
            'abs': 'x.abs',
            'floor': 'x.floor',
            'ceiling': 'x.ceil',
            'sqrt': 'Math.sqrt(x)',
            'sin': 'Math.sin(x)',
            'cos': 'Math.cos(x)',
            'tan': 'Math.tan(x)',
            'asin': 'Math.asin(x)',
            'acos': 'Math.acos(x)',
            'atan': 'Math.atan(x)',
            'ln': 'Math.log(x)',
            'log': 'Math.log10(x)',
            'e ^': 'Math::E ** x',
            '10 ^': '10 ** x'
        };
        Object.keys(operatorCodes).forEach(operator => {
            code = operatorCodes[operator];
            expected = [
                {
                    opcode: 'operator_mathop',
                    fields: [
                        {
                            name: 'OPERATOR',
                            value: operator
                        }
                    ],
                    inputs: [
                        {
                            name: 'NUM',
                            block: rubyToExpected(converter, target, 'x')[0],
                            shadow: expectedInfo.makeNumber('')
                        }
                    ]
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });
    });
});
