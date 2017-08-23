import {computeRMS, computeChunkedRMS} from '../../../src/lib/audio/audio-util';

describe('computeRMS', () => {
    test('returns 0 when given no samples', () => {
        expect(computeRMS([])).toEqual(0);
    });
    test('returns the RMS scaled by the given unity value and square rooted', () => {
        const unity = 0.5;
        const samples = [3, 2, 1];
        expect(computeRMS(samples, unity)).toEqual(
            Math.sqrt(Math.sqrt(((3 * 3) + (2 * 2) + (1 * 1)) / 3) / 0.5)
        );
    });
    test('uses a default unity value of 0.55', () => {
        const samples = [1, 1, 1];
        // raw rms is 1, scaled to (1 / 0.55) and square rooted
        expect(computeRMS(samples)).toEqual(Math.sqrt(1 / 0.55));
    });
});


describe('computeChunkedRMS', () => {
    test('computes the rms for each chunk based on chunk size', () => {
        const samples = [2, 1, 3, 2, 5];
        const chunkedLevels = computeChunkedRMS(samples, 2);
        // chunked to [2, 0], [3, 0], [5]
        // rms scaled with default unity of 0.55
        expect(chunkedLevels.length).toEqual(3);
        expect(chunkedLevels).toEqual([
            Math.sqrt(Math.sqrt(((2 * 2) + (1 * 1)) / 2) / 0.55),
            Math.sqrt(Math.sqrt(((3 * 3) + (2 * 2)) / 2) / 0.55),
            Math.sqrt(Math.sqrt((5 * 5) / 1) / 0.55)
        ]);
    });
    test('chunk size larger than sample size creates single chunk', () => {
        const samples = [1, 1, 1];
        const chunkedLevels = computeChunkedRMS(samples, 7);
        // chunked to [1, 1, 1]
        // rms scaled with default unity of 0.55
        expect(chunkedLevels.length).toEqual(1);
        expect(chunkedLevels).toEqual([Math.sqrt(1 / 0.55)]);
    });
    test('chunk size as multiple is handled correctly', () => {
        const samples = [1, 1, 1, 1, 1, 1];
        const chunkedLevels = computeChunkedRMS(samples, 3);
        // chunked to [1, 1, 1], [1, 1, 1]
        // rms scaled with default unity of 0.55
        expect(chunkedLevels.length).toEqual(2);
        expect(chunkedLevels).toEqual([Math.sqrt(1 / 0.55), Math.sqrt(1 / 0.55)]);
    });
});
