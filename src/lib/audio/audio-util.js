class AudioUtil {
    static computeRMS (samples) {
        // Calculate RMS, adapted from https://github.com/Tonejs/Tone.js/blob/master/Tone/component/Meter.js#L88
        let sum = 0;
        for (let i = 0; i < samples.length; i++) {
            const sample = samples[i];
            sum += Math.pow(sample, 2);
        }
        const rms = Math.sqrt(sum / samples.length);
        // Scale it
        const unity = 0.55;
        const val = rms / unity;
        // Scale the output curve
        return Math.sqrt(val);
    }
}

module.exports = AudioUtil;
