import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    expectToEqualBlocks,
    expectToEqualRubyStatement
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Sensing', () => {
    let converter;

    beforeEach(() => {
        converter = new RubyToBlocksConverter(null);
    });

    test('sensing_touchingobject', () => {
        expect(converter.targetCodeToBlocks(null, 'touching?("_edge_")')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

        const expected = [
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
        expectToEqualBlocks(converter.blocks, expected);

        [
            'touching?()',
            'touching?(1)',
            'touching?("_edge_", 1)'
        ].forEach(s => {
            expect(converter.targetCodeToBlocks(null, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });
    });
});
