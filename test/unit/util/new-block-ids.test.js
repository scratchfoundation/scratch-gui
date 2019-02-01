import newBlockIds from '../../../src/lib/new-block-ids';
import fixtures from '../../fixtures/blocks';

describe('newBlockIds', () => {
    let originals;
    let newBlocks;

    beforeEach(() => {
        originals = fixtures.simpleStack;
        newBlocks = JSON.parse(JSON.stringify(fixtures.simpleStack));
        newBlockIds(newBlocks);
    });

    /**
     * The structure of the simple stack is:
     *      moveTo (looks_size) -> stopAllSounds
     * The list of blocks is
     *      0: moveTo (TO input block: 1, shadow: 2)
     *      1: looks_size (parent: 0)
     *      2: obscured shadow for moveTo input (parent: 0)
     *      3: stopAllSounds (parent: 0)
     * Inspect fixtures/blocks for the full object.
     */

    test('top-level block IDs have all changed', () => {
        newBlocks.forEach((block, i) => {
            expect(block.id).not.toEqual(originals[i].id);
        });
    });

    test('input reference is maintained on parent for attached block', () => {
        expect(newBlocks[0].inputs.TO.block).toEqual(newBlocks[1].id);
    });

    test('input reference is maintained on parent for obscured shadow', () => {
        expect(newBlocks[0].inputs.TO.shadow).toEqual(newBlocks[2].id);
    });

    test('parent reference is maintained for attached input', () => {
        expect(newBlocks[1].parent).toEqual(newBlocks[0].id);
    });

    test('parent reference is maintained for obscured shadow', () => {
        expect(newBlocks[2].parent).toEqual(newBlocks[0].id);
    });

    test('parent reference is maintained for next block', () => {
        expect(newBlocks[3].parent).toEqual(newBlocks[0].id);
    });

    test('next reference is maintained for previous block', () => {
        expect(newBlocks[0].next).toEqual(newBlocks[3].id);
    });

    test('general smoke test: old IDs should not be in new blocks', () => {
        const newBlocksStr = JSON.stringify(newBlocks);

        originals.forEach(block => {
            expect(newBlocksStr.indexOf(block.id)).toEqual(-1);
        });
    });
});
