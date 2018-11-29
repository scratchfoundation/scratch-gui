import RubyToBlocksConverter from '../../../../src/lib/ruby-to-blocks-converter';

describe('RubyToBlocksConverter', () => {
    let converter;

    beforeEach(() => {
        converter = new RubyToBlocksConverter(null);
    });

    describe('targetCodeToBlocks', () => {
        test('can call', () => {
            expect(converter.targetCodeToBlocks(null, 'move(10)')).toBeTruthy();
        });
    });
});
