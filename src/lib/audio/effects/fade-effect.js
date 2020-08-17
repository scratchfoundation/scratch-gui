class FadeEffect {
    constructor (audioContext, fadeIn, startSeconds, endSeconds) {
        this.audioContext = audioContext;

        this.input = this.audioContext.createGain();
        this.output = this.audioContext.createGain();

        this.gain = this.audioContext.createGain();

        this.gain.gain.setValueAtTime(1, 0);

        if (fadeIn) {
            this.gain.gain.setValueAtTime(0, startSeconds);
            this.gain.gain.linearRampToValueAtTime(1, endSeconds);
        } else {
            this.gain.gain.setValueAtTime(1, startSeconds);
            this.gain.gain.linearRampToValueAtTime(0, endSeconds);
        }

        this.gain.gain.setValueAtTime(1, endSeconds);

        this.input.connect(this.gain);
        this.gain.connect(this.output);
    }
}

export default FadeEffect;
