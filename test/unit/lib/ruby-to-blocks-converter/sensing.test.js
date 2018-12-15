import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    convertAndExpectToEqualRubyStatement,
    rubyToExpected
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

        test('statement', () => {
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
});
