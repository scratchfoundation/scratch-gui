import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import expectToEqualBlocks, {
    expectToEqualRubyStatement
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Control', () => {
    let converter;

    beforeEach(() => {
        converter = new RubyToBlocksConverter(null);
    });

    test('control_forever', () => {
        expect(converter.targetCodeToBlocks(null, 'loop { bounce_if_on_edge; wait }')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

        const expected = [
            {
                opcode: 'control_forever',
                branches: [
                    {
                        opcode: 'motion_ifonedgebounce'
                    }
                ]
            }
        ];
        expectToEqualBlocks(converter.blocks, expected);

        ['loop()', 'loop(1)'].forEach(s => {
            expect(converter.targetCodeToBlocks(null, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });

        ['loop { bounce_if_on_edge }'].forEach(s => {
            expect(converter.targetCodeToBlocks(null, s)).toBeTruthy();
            const blockId = Object.keys(converter.blocks).filter(id => converter.blocks[id].topLevel)[0];
            expect(converter.blocks[blockId].opcode).toEqual('ruby_statement_with_block');
        });
    });
});
