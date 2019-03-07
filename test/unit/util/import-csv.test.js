import {parse} from '../../../src/lib/import-csv';

describe('parse', () => {
    test('returns single-column data unmodified', () => {
        const lines = [
            'a',
            'b',
            'c'
        ];

        const result = lines;

        const onChooseColumn = jest.fn();

        return (
            expect(parse(lines, onChooseColumn)).resolves.toMatchObject(result)
        ).then(() => {
            expect(onChooseColumn).not.toHaveBeenCalled();
        });
    });

    test('calls onChooseColumn once to determine column with multi-column data', () => {
        const lines = [
            'a,x',
            'b,y',
            'c,z'
        ];

        const resultColumn1 = [
            'a',
            'b',
            'c'
        ];

        const resultColumn2 = [
            'x',
            'y',
            'z'
        ];

        const onChooseColumn1 = jest.fn().mockReturnValue(1);
        const onChooseColumn2 = jest.fn().mockReturnValue(2);

        return Promise.all([
            expect(parse(lines, onChooseColumn1)).resolves.toMatchObject(resultColumn1),
            expect(parse(lines, onChooseColumn2)).resolves.toMatchObject(resultColumn2)
        ]).then(() => {
            expect(onChooseColumn1.mock.calls.length).toBe(1);
            expect(onChooseColumn2.mock.calls.length).toBe(1);
        });
    });

    test('does not do anything with quotation marks', () => {
        const lines = [
            '"',
            'a',
            '"',
            'b'
        ];

        const result = lines;

        const onChooseColumn = jest.fn();

        return (
            expect(parse(lines, onChooseColumn)).resolves.toMatchObject(result)
        ).then(() => {
            expect(onChooseColumn).not.toHaveBeenCalled();
        });
    });

    test('accepts \\t as delimiter', () => {
        const lines = [
            'a\tx',
            'b\ty',
            'c\tz'
        ];

        const result = [
            'x',
            'y',
            'z'
        ];

        const onChooseColumn = jest.fn().mockReturnValue(2);

        return (
            expect(parse(lines, onChooseColumn)).resolves.toMatchObject(result)
        ).then(() => {
            expect(onChooseColumn).toHaveBeenCalled();
        });
    });

    test('does not do anything with commas if determined to be single-column data', () => {
        const lines = [
            'a',
            'b,anana',
            'c',
            ','
        ];

        const result = lines;

        const onChooseColumn = jest.fn();

        return (
            expect(parse(lines, onChooseColumn)).resolves.toMatchObject(result)
        ).then(() => {
            expect(onChooseColumn).not.toHaveBeenCalled();
        });
    });

    test('treats data as single-column if a consistent delimiter cannot be found', () => {
        const lines = [
            'a,1',
            'b\t2'
        ];

        const result = lines;

        const onChooseColumn = jest.fn();

        return (
            expect(parse(lines, onChooseColumn)).resolves.toMatchObject(result)
        ).then(() => {
            expect(onChooseColumn).not.toHaveBeenCalled();
        });
    });

    test('treats data as single-column if a consistent column count cannot be found', () => {
        const lines = [
            'a,1',
            'b,c,d,e,f,g,h'
        ];

        const result = lines;

        const onChooseColumn = jest.fn();

        return (
            expect(parse(lines, onChooseColumn)).resolves.toMatchObject(result)
        ).then(() => {
            expect(onChooseColumn).not.toHaveBeenCalled();
        });
    });

    test('checks first, middle (rounded down), and last line in guessing delimiter', () => {
        // Length of the list is 5; 5/2 = 2.5, round down to check index 2 (so the third line).

        const lines = [
            '1,a',
            '2\tb',
            '3,c',
            '4\td',
            '5,e'
        ];

        const result = [
            '1',
            '2\tb',
            '3',
            '4\td',
            '5'
        ];

        const onChooseColumn = jest.fn().mockReturnValue(1);

        return (
            expect(parse(lines, onChooseColumn)).resolves.toMatchObject(result)
        ).then(() => {
            expect(onChooseColumn).toHaveBeenCalled();
        });
    });

    test('passes onChooseColumn 1-indexed number of columns', () => {
        const lines = [
            'a,b,c,d',
            'w,x,y,z'
        ];

        // We don't care about parse's returned value in this test.

        const onChooseColumn = jest.fn().mockReturnValue(0);

        return (
            parse(lines, onChooseColumn)
        ).then(() => {
            expect(onChooseColumn).toHaveBeenCalledWith(4);
        });
    });

    test('calls parseInt on return value of onChooseColumn', () => {
        const lines = [
            'a,1',
            'b,2'
        ];

        const result = [
            'a',
            'b'
        ];

        const onChooseColumn = jest.fn().mockReturnValue('1.8');

        return expect(parse(lines, onChooseColumn)).resolves.toMatchObject(result);
    });

    test('returns data unmodified when onChooseColumn returns out-of-bounds or NaN', () => {
        const lines = [
            'a,1',
            'b,2'
        ];

        const result = [
            'a,1',
            'b,2'
        ];

        const onChooseColumn0 = jest.fn().mockReturnValue(0);
        const onChooseColumn3 = jest.fn().mockReturnValue(3);
        const onChooseColumnNaN = jest.fn().mockReturnValue('unicorn');

        return Promise.all([
            expect(parse(lines, onChooseColumn0)).resolves.toMatchObject(result),
            expect(parse(lines, onChooseColumn3)).resolves.toMatchObject(result),
            expect(parse(lines, onChooseColumnNaN)).resolves.toMatchObject(result)
        ]);
    });

    test('reads first/middle/last line to determine number of columns', () => {
        // Note: The code checks the first line, which is guaranteed to have
        // the same number of columns as the middle and last.

        const lines = [
            'a,b',
            '1,2,3,4',
            'c,d',
            'e,f'
        ];

        const result = [
            'b',
            '2',
            'd',
            'f'
        ];

        const onChooseColumn = jest.fn().mockReturnValue(2);

        return (
            expect(parse(lines, onChooseColumn)).resolves.toMatchObject(result)
        ).then(() => {
            expect(onChooseColumn).toHaveBeenCalledWith(2);
        });
    });

    test('uses empty string in place of missing columns', () => {
        const lines = [
            'a,b',
            'x',
            'c,d',
            'e,f'
        ];

        const result = [
            'b',
            '',
            'd',
            'f'
        ];

        const onChooseColumn = jest.fn().mockReturnValue(2);

        return expect(parse(lines, onChooseColumn)).resolves.toMatchObject(result);
    });
});
