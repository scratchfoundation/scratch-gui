import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    convertAndExpectToEqualRubyStatement,
    rubyToExpected,
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
                convertAndExpectToEqualRubyStatement(converter, target, c, c);
            });
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
                convertAndExpectToEqualRubyStatement(converter, target, c, c);
            });
        });
    });

    expectNoArgsMethod('sensing_answer', 'answer', 'value');
    expectNoArgsMethod('sensing_mousedown', 'Mouse.down?', 'value_boolean');
    expectNoArgsMethod('sensing_mousex', 'Mouse.x', 'value');
    expectNoArgsMethod('sensing_mousey', 'Mouse.y', 'value');
    expectNoArgsMethod('sensing_loudness', 'loudness', 'value');
    expectNoArgsMethod('sensing_timer', 'Timer.value', 'value');
    expectNoArgsMethod('sensing_resettimer', 'Timer.reset');
    expectNoArgsMethod('sensing_dayssince2000', 'days_since_2000', 'value');
    expectNoArgsMethod('sensing_username', 'user_name', 'value');
});
