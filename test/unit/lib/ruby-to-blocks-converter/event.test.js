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
    });
});
