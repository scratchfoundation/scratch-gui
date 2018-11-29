import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import expectToEqualBlocks, {
    expectToEqualRubyStatement
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Event', () => {
    let converter;

    beforeEach(() => {
        converter = new RubyToBlocksConverter(null);
    });

    test('event_whenflagclicked', () => {
        expect(converter.targetCodeToBlocks(null, 'self.when(:flag_clicked) { bounce_if_on_edge }')).toBeTruthy();
        expect(converter.errors.length).toEqual(0);

        const expected = [
            {
                opcode: 'event_whenflagclicked',
                next: {
                    opcode: 'motion_ifonedgebounce'
                }
            }
        ];
        expectToEqualBlocks(converter.blocks, expected);

        ['self.when(:flag_clicked)'].forEach(s => {
            expect(converter.targetCodeToBlocks(null, s)).toBeTruthy();
            expectToEqualRubyStatement(converter.blocks, s);
        });

        [
            'self.when(:flag_clicked, 1) { bounce_if_on_edge }',
            'self.when(:flag_click) { bounce_if_on_edge }'
        ].forEach(s => {
            expect(converter.targetCodeToBlocks(null, s)).toBeTruthy();
            const blockId = Object.keys(converter.blocks).filter(id => converter.blocks[id].topLevel)[0];
            expect(converter.blocks[blockId].opcode).toEqual('ruby_statement_with_block');
        });
    });
});
