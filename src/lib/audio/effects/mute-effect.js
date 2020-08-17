class MuteEffect {
    constructor (audioContext, startSeconds, endSeconds) {
        this.audioContext = audioContext;

        this.input = this.audioContext.createGain();
        this.output = this.audioContext.createGain();

        this.gain = this.audioContext.createGain();

        // Smoothly ramp the gain down before the start time, and up after the end time.
        this.rampLength = 0.001;
        this.gain.gain.setValueAtTime(1.0, Math.max(0, startSeconds - this.rampLength));
        this.gain.gain.linearRampToValueAtTime(0, startSeconds);
        this.gain.gain.setValueAtTime(0, endSeconds);
        this.gain.gain.linearRampToValueAtTime(1.0, endSeconds + this.rampLength);

        this.input.connect(this.gain);
        this.gain.connect(this.output);
    }
}

export default MuteEffect;
