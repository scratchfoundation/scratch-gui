import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';

describe('RubyToBlocksConverter', () => {
    let converter;
    let target;

    beforeEach(() => {
        converter = new RubyToBlocksConverter(null);
        target = null;
    });

    describe('targetCodeToBlocks', () => {
        test('can call', () => {
            expect(converter.targetCodeToBlocks(target, 'move(10)')).toBeTruthy();
            expect(Object.keys(converter.blocks)).toHaveLength(2);
            expect(converter.errors).toHaveLength(0);
            expect(Object.keys(converter.variables)).toHaveLength(0);
            expect(Object.keys(converter.lists)).toHaveLength(0);
        });
    });
});
