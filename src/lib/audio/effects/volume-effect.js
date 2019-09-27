class VolumeEffect {
    constructor (audioContext, volume, startSeconds, endSeconds) {
        this.audioContext = audioContext;

        this.input = this.audioContext.createGain();
        this.output = this.audioContext.createGain();

        this.gain = this.audioContext.createGain();

        // Smoothly ramp the gain up before the start time, and down after the end time.
        this.rampLength = 0.01;
        this.gain.gain.setValueAtTime(1.0, Math.max(0, startSeconds - this.rampLength));
        this.gain.gain.exponentialRampToValueAtTime(volume, startSeconds);
        this.gain.gain.setValueAtTime(volume, endSeconds);
        this.gain.gain.exponentialRampToValueAtTime(1.0, endSeconds + this.rampLength);

        // Use a waveshaper node to prevent sample values from exceeding -1 or 1.
        // Without this, gain can cause samples to exceed this range, then they
        // are clipped on save, and the sound is distorted on load.
        this.waveShaper = this.audioContext.createWaveShaper();
        this.waveShaper.curve = new Float32Array([-1, 1]);
        this.waveShaper.oversample = 'none';

        this.input.connect(this.gain);
        this.gain.connect(this.waveShaper);
        this.waveShaper.connect(this.output);
    }
}

export default VolumeEffect;
