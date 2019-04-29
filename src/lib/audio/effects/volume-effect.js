class VolumeEffect {
    constructor (audioContext, volume, startSeconds, endSeconds) {
        this.audioContext = audioContext;

        this.input = this.audioContext.createGain();
        this.output = this.audioContext.createGain();

        this.gain = this.audioContext.createGain();

        this.rampLength = 0.01;
        if ((endSeconds - startSeconds) > this.rampLength * 2) {
            // Smoothly ramp the gain up after the start time, and down before the end time.
            this.gain.gain.setValueAtTime(1.0, startSeconds);
            this.gain.gain.exponentialRampToValueAtTime(volume, startSeconds + this.rampLength);
            this.gain.gain.setValueAtTime(volume, endSeconds - this.rampLength);
            this.gain.gain.exponentialRampToValueAtTime(1.0, endSeconds);
        } else {
            // If the selection is shorter than twice the ramp length, set the gain at the
            // start and end times without a smooth ramp.
            this.gain.gain.setValueAtTime(volume, startSeconds);
            this.gain.gain.setValueAtTime(1.0, endSeconds);
        }


        this.input.connect(this.gain);
        this.gain.connect(this.output);
    }
}

export default VolumeEffect;
