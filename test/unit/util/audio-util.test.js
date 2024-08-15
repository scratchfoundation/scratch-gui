import {
    computeRMS,
    computeChunkedRMS,
    downsampleIfNeeded,
    dropEveryOtherSample
} from '../../../src/lib/audio/audio-util';

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

describe('downsampleIfNeeded', () => {
    const samples = {length: 1};
    const sampleRate = 44100;
    test('returns given data when no downsampling needed', async () => {
        samples.length = 1;
        const res = await downsampleIfNeeded({samples, sampleRate}, null);
        expect(res.samples).toEqual(samples);
        expect(res.sampleRate).toEqual(sampleRate);
    });
    test('downsamples to 22050 if that puts it under the limit', async () => {
        samples.length = 44100 * 3 * 60;
        const resampler = jest.fn(() => 'TEST');
        const res = await downsampleIfNeeded({samples, sampleRate}, resampler);
        expect(resampler).toHaveBeenCalledWith({samples, sampleRate}, 22050);
        expect(res).toEqual('TEST');
    });
    test('fails if resampling would not put it under the limit', async () => {
        samples.length = 44100 * 4 * 60;
        try {
            await downsampleIfNeeded({samples, sampleRate}, null);
        } catch (e) {
            expect(e.message).toEqual('Sound too large to save, refusing to edit');
        }
    });
});

describe('dropEveryOtherSample', () => {
    const buffer = {
        samples: [1, 0, 2, 0, 3, 0],
        sampleRate: 2
    };
    test('result is half the length', () => {
        const {samples} = dropEveryOtherSample(buffer);
        expect(samples.length).toEqual(Math.floor(buffer.samples.length / 2));
    });
    test('result contains only even-index items', () => {
        const {samples} = dropEveryOtherSample(buffer);
        expect(samples).toEqual(new Float32Array([1, 2, 3]));
    });
    test('result sampleRate is given sampleRate / 2', () => {
        const {sampleRate} = dropEveryOtherSample(buffer);
        expect(sampleRate).toEqual(buffer.sampleRate / 2);
    });
});
