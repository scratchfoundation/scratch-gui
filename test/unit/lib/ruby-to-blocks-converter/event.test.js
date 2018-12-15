import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    convertAndExpectToEqualRubyStatement,
    rubyToExpected
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
                convertAndExpectToEqualRubyStatement(converter, target, s, s);
            });

            [
                'self.when(:flag_clicked, 1) { bounce_if_on_edge }',
                'self.when(:flag_click) { bounce_if_on_edge }'
            ].forEach(s => {
                expect(converter.targetCodeToBlocks(target, s)).toBeTruthy();
                const blockId = Object.keys(converter.blocks).filter(id => converter.blocks[id].topLevel)[0];
                expect(converter.blocks[blockId].opcode).toEqual('ruby_statement_with_block');
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
                convertAndExpectToEqualRubyStatement(converter, target, c, c);
            });

            [
                'self.when(:key_pressed) { bounce_if_on_edge }',
                'self.when(:key_pressed, "space", 1) { bounce_if_on_edge }',
                'self.when(:key_pressed, "invalid key") { bounce_if_on_edge }'
            ].forEach(c => {
                expect(converter.targetCodeToBlocks(target, c)).toBeTruthy();
                const blockId = Object.keys(converter.blocks).filter(id => converter.blocks[id].topLevel)[0];
                expect(converter.blocks[blockId].opcode).toEqual('ruby_statement_with_block');
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

    describe('event_whenthisspriteclicked', () => {
        test('normal', () => {
            code = 'self.when(:clicked) { bounce_if_on_edge }';
            expected = [
                {
                    opcode: 'event_whenthisspriteclicked',
                    next: {
                        opcode: 'motion_ifonedgebounce'
                    }
                }
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);

            code = 'self.when(:clicked) { bounce_if_on_edge; move(10) }';
            expected = [
                {
                    opcode: 'event_whenthisspriteclicked',
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
                    opcode: 'event_whenthisspriteclicked'
                },
                rubyToExpected(converter, target, 'bounce_if_on_edge')[0]
            ];
            convertAndExpectToEqualBlocks(converter, target, code, expected);
        });

        test('invalid', () => {
            [
                'self.when(:clicked)'
            ].forEach(s => {
                convertAndExpectToEqualRubyStatement(converter, target, s, s);
            });

            [
                'self.when(:clicked, 1) { bounce_if_on_edge }',
                'self.when(:click) { bounce_if_on_edge }'
            ].forEach(s => {
                expect(converter.targetCodeToBlocks(target, s)).toBeTruthy();
                const blockId = Object.keys(converter.blocks).filter(id => converter.blocks[id].topLevel)[0];
                expect(converter.blocks[blockId].opcode).toEqual('ruby_statement_with_block');
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
                convertAndExpectToEqualRubyStatement(converter, target, c, c);
            });

            [
                'self.when(:backdrop_switches) { bounce_if_on_edge }',
                'self.when(:backdrop_switches, "backdrop1", 1) { bounce_if_on_edge }'
            ].forEach(c => {
                expect(converter.targetCodeToBlocks(target, c)).toBeTruthy();
                const blockId = Object.keys(converter.blocks).filter(id => converter.blocks[id].topLevel)[0];
                expect(converter.blocks[blockId].opcode).toEqual('ruby_statement_with_block');
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
});
