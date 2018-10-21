import VM from 'scratch-vm';
import VMScratchBlocks from '../../../src/lib/blocks';
import RubyGenerator from '../../../src/lib/ruby-generator';

describe('RubyGenerator', () => {
    let vm;
    let Blockly;

    beforeEach(() => {
        vm = new VM();
        Blockly = VMScratchBlocks(vm);
        Blockly = RubyGenerator(Blockly);
    });

    test('defined Ruby', () => {
        expect(Blockly.Ruby).toBeInstanceOf(Blockly.Generator);
    });

    describe('quote_', () => {
        test('escape only " to \\"', () => {
            const arg = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'; // eslint-disable-line
            const actual = '"!\\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~"'; // eslint-disable-line
            expect(Blockly.Ruby.quote_(arg)).toEqual(actual);
        });
    });
});
