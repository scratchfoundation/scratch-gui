import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    convertAndExpectToEqualRubyStatement
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Sensing', () => {
    let converter;
    let target;

    beforeEach(() => {
        converter = new RubyToBlocksConverter(null);
        target = null;
    });

    test('sensing_touchingobject', () => {
        const code = 'touching?("_edge_")';
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
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        [
            'touching?()',
            'touching?(1)',
            'touching?("_edge_", 1)'
        ].forEach(s => {
            convertAndExpectToEqualRubyStatement(converter, target, s, s);
        });
    });
});
