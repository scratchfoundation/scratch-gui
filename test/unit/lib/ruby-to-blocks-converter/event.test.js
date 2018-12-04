import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';
import {
    convertAndExpectToEqualBlocks,
    expectToEqualRubyStatement
} from '../../../helpers/expect-to-equal-blocks';

describe('RubyToBlocksConverter/Event', () => {
    let converter;
    let target;

    beforeEach(() => {
        converter = new RubyToBlocksConverter(null);
        target = null;
    });

    test('event_whenflagclicked', () => {
        const code = 'self.when(:flag_clicked) { bounce_if_on_edge }';
        const expected = [
            {
                opcode: 'event_whenflagclicked',
                next: {
                    opcode: 'motion_ifonedgebounce'
                }
            }
        ];
        convertAndExpectToEqualBlocks(converter, target, code, expected);

        ['self.when(:flag_clicked)'].forEach(s => {
            expect(converter.targetCodeToBlocks(target, s)).toBeTruthy();
            expectToEqualRubyStatement(converter, s);
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
});
