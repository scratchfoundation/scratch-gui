import WavEncoder from 'wav-encoder';

const SOUND_BYTE_LIMIT = 10 * 1000 * 1000; // 10mb

const computeRMS = function (samples, scaling = 0.55) {
    if (samples.length === 0) return 0;
    // Calculate RMS, adapted from https://github.com/Tonejs/Tone.js/blob/master/Tone/component/Meter.js#L88
    let sum = 0;
    for (let i = 0; i < samples.length; i++) {
        const sample = samples[i];
        sum += Math.pow(sample, 2);
    }
    const rms = Math.sqrt(sum / samples.length);
    const val = rms / scaling;
    return Math.sqrt(val);
};

const computeChunkedRMS = function (samples, chunkSize = 1024) {
    const sampleCount = samples.length;
    const chunkLevels = [];
    for (let i = 0; i < sampleCount; i += chunkSize) {
        const maxIndex = Math.min(sampleCount, i + chunkSize);
        chunkLevels.push(computeRMS(samples.slice(i, maxIndex)));
    }
    return chunkLevels;
};

const encodeAndAddSoundToVM = function (vm, samples, sampleRate, name, callback) {
    WavEncoder.encode({
        sampleRate: sampleRate,
        channelData: [samples]
    }).then(wavBuffer => {
        const vmSound = {
            format: '',
            dataFormat: 'wav',
            rate: sampleRate,
            sampleCount: samples.length
        };

        // Create an asset from the encoded .wav and get resulting md5
        const storage = vm.runtime.storage;
        vmSound.asset = storage.createAsset(
            storage.AssetType.Sound,
            storage.DataFormat.WAV,
            new Uint8Array(wavBuffer),
            null,
            true // generate md5
        );
        vmSound.assetId = vmSound.asset.assetId;

        // update vmSound object with md5 property
        vmSound.md5 = `${vmSound.assetId}.${vmSound.dataFormat}`;
        // The VM will update the sound name to a fresh name
        vmSound.name = name;

        vm.addSound(vmSound).then(() => {
            if (callback) callback();
        });
    });
};

export {
    computeRMS,
    computeChunkedRMS,
    encodeAndAddSoundToVM,
    SOUND_BYTE_LIMIT
};
