import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    rubyToExpected,
    expectedInfo
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter', () => {
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

    describe('targetCodeToBlocks', () => {
        test('can call', () => {
            expect(converter.targetCodeToBlocks(target, 'move(10)')).toBeTruthy();
            expect(Object.keys(converter.blocks)).toHaveLength(2);
            expect(converter.errors).toHaveLength(0);
            expect(Object.keys(converter.variables)).toHaveLength(0);
            expect(Object.keys(converter.lists)).toHaveLength(0);
        });

        test('empty', () => {
            expect(converter.targetCodeToBlocks(target, '')).toBeTruthy();
            expect(Object.keys(converter.blocks)).toHaveLength(0);
            expect(converter.errors).toHaveLength(0);
            expect(Object.keys(converter.variables)).toHaveLength(0);
            expect(Object.keys(converter.lists)).toHaveLength(0);
        });


        describe('top level blocks', () => {
            test('statements', () => {
                expected = [
                    rubyToExpected(converter, target, 'move(10)')[0]
                ];
                expected[0].next = rubyToExpected(converter, target, 'bounce_if_on_edge')[0];
                expected[0].next.next = rubyToExpected(converter, target, 'turn_right(180)')[0];

                code = `
                    move(10)
                    bounce_if_on_edge
                    turn_right(180)
                `;
                convertAndExpectToEqualBlocks(converter, target, code, expected);

                code = `
                    move(10)
                    (bounce_if_on_edge)
                    turn_right(180)
                `;
                convertAndExpectToEqualBlocks(converter, target, code, expected);

                code = `
                    move(10)
                    (bounce_if_on_edge; turn_right(180))
                `;
                convertAndExpectToEqualBlocks(converter, target, code, expected);

                code = `
                    (move(10); bounce_if_on_edge; turn_right(180))
                `;
                convertAndExpectToEqualBlocks(converter, target, code, expected);

                code = `
                    (move(10); bounce_if_on_edge)
                    turn_right(180)
                `;
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('values', () => {
                code = `
                    x
                    y
                    size
                `;
                expected = [
                    rubyToExpected(converter, target, 'x')[0],
                    rubyToExpected(converter, target, 'y')[0],
                    rubyToExpected(converter, target, 'size')[0]

                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('hats', () => {
                code = `
                    self.when(:flag_clicked) {}
                    self.when(:flag_clicked) {}
                    self.when(:flag_clicked) {}
                `;
                expected = [
                    rubyToExpected(converter, target, 'self.when(:flag_clicked) {}')[0],
                    rubyToExpected(converter, target, 'self.when(:flag_clicked) {}')[0],
                    rubyToExpected(converter, target, 'self.when(:flag_clicked) {}')[0]
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('terminates', () => {
                code = `
                    forever {}
                    forever {}
                    forever {}
                `;
                expected = [
                    rubyToExpected(converter, target, 'forever {}')[0],
                    rubyToExpected(converter, target, 'forever {}')[0],
                    rubyToExpected(converter, target, 'forever {}')[0]
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('mix', () => {
                code = `
                    move(10)
                    x
                    bounce_if_on_edge
                    turn_right(180)
                    y
                    size
                    move(10)
                    self.when(:flag_clicked) {}
                    bounce_if_on_edge
                    forever {}
                    move(10)
                    x
                `;
                expected = [
                    rubyToExpected(converter, target, 'move(10)')[0],
                    rubyToExpected(converter, target, 'x')[0],
                    rubyToExpected(converter, target, 'bounce_if_on_edge; turn_right(180)')[0],
                    rubyToExpected(converter, target, 'y')[0],
                    rubyToExpected(converter, target, 'size')[0],
                    rubyToExpected(converter, target, 'move(10)')[0],
                    rubyToExpected(converter, target, 'self.when(:flag_clicked) {}')[0],
                    rubyToExpected(converter, target, 'bounce_if_on_edge; forever {}')[0],
                    rubyToExpected(converter, target, 'move(10)')[0],
                    rubyToExpected(converter, target, 'x')[0]
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('mix 2', () => {
                code = `
                    move(10)
                    (forever {}; turn_right(180))
                    forever {}
                    (move(10); turn_right(180); forever {})
                    move(10)
                `;
                expected = [
                    rubyToExpected(converter, target, 'move(10); forever {}')[0],
                    rubyToExpected(converter, target, 'turn_right(180); forever {}')[0],
                    rubyToExpected(converter, target, 'move(10); turn_right(180); forever {}')[0],
                    rubyToExpected(converter, target, 'move(10)')[0]
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });

            test('error', () => {
                [
                    '1',
                    'false',
                    'true',
                    '"Hello!"',
                    ':symbol',
                    'move(10); 1',
                    'move(10); 1; bounce_if_on_edge'
                ].forEach(c => {
                    const res = converter.targetCodeToBlocks(target, c);
                    expect(converter.errors).toHaveLength(1);
                    expect(converter.errors[0].row).toEqual(0);
                    expect(res).toBeFalsy();
                });
            });
        });

        describe('bugged codes', () => {
            test('value in if', () => {
                code = `
                    if false
                      x
                    end
                `;
                const res = converter.targetCodeToBlocks(target, code);
                expect(converter.errors).toHaveLength(1);
                expect(converter.errors[0].row).toEqual(2);
                expect(res).toBeFalsy();
            });

            test('==, <, > and variable', () => {
                code = `
                    if !($global == 21)
                      bounce_if_on_edge
                    end
                `;
                expected = [
                    {
                        opcode: 'control_if',
                        inputs: [
                            {
                                name: 'CONDITION',
                                block: {
                                    opcode: 'operator_not',
                                    inputs: [
                                        {
                                            name: 'OPERAND',
                                            block: {
                                                opcode: 'operator_equals',
                                                inputs: [
                                                    {
                                                        name: 'OPERAND1',
                                                        block: {
                                                            opcode: 'data_variable',
                                                            fields: [
                                                                {
                                                                    name: 'VARIABLE',
                                                                    variable: '$global'
                                                                }
                                                            ]
                                                        },
                                                        shadow: expectedInfo.makeText('')
                                                    },
                                                    {
                                                        name: 'OPERAND2',
                                                        block: expectedInfo.makeText('21')
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }
                        ],
                        branches: [
                            rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
                        ]
                    }
                ];
                convertAndExpectToEqualBlocks(converter, target, code, expected);
            });
        });
    });
});
