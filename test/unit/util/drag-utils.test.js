import {indexForPositionOnList} from '../../../src/lib/drag-utils';

const box = (top, right, bottom, left) => ({top, right, bottom, left});

describe('indexForPositionOnList', () => {
    test('returns null when not given any boxes', () => {
        expect(indexForPositionOnList({x: 0, y: 0}, [])).toEqual(null);
    });

    test('wrapped list with incomplete last row', () => {
        const boxes = [
            box(0, 100, 100, 0), // index: 0
            box(0, 200, 100, 100), // index: 1
            box(0, 300, 100, 200), // index: 2
            box(100, 100, 200, 0), // index: 3 (second row)
            box(100, 200, 200, 100) // index: 4 (second row, left incomplete intentionally)
        ];

        // Inside the second box.
        expect(indexForPositionOnList({x: 150, y: 50}, boxes)).toEqual(1);

        // On the border edge of the first and second box. Given to the first box.
        expect(indexForPositionOnList({x: 100, y: 50}, boxes)).toEqual(0);

        // Off the top/left edge.
        expect(indexForPositionOnList({x: -100, y: -100}, boxes)).toEqual(0);

        // Off the left edge, in the second row.
        expect(indexForPositionOnList({x: -100, y: 175}, boxes)).toEqual(3);

        // Off the right edge, in the first row.
        expect(indexForPositionOnList({x: 400, y: 75}, boxes)).toEqual(2);

        // Off the top edge, middle of second item.
        expect(indexForPositionOnList({x: 150, y: -75}, boxes)).toEqual(1);

        // Within the right edge bounds, but on the second (incomplete) row.
        // This tests that wrapped lists with incomplete final rows work correctly.
        expect(indexForPositionOnList({x: 375, y: 175}, boxes)).toEqual(4);
    });
});
