class ReverbEffect {
    constructor (audioContext, impulseResponseBuffer, startSeconds, endSeconds) {
        this.audioContext = audioContext;

        this.input = this.audioContext.createGain();
        this.effectInput = this.audioContext.createGain();
        this.effect = this.audioContext.createConvolver();
        this.effect.buffer = impulseResponseBuffer;
        this.output = this.audioContext.createGain();

        this.effectInput.gain.value = 0;
        this.effectInput.gain.setValueAtTime(1, startSeconds);
        this.effectInput.gain.setValueAtTime(0, endSeconds);

        this.input.connect(this.effectInput);
        this.effectInput.connect(this.effect);
        this.effect.connect(this.output);

        this.input.connect(this.output);
    }
}

export default ReverbEffect;
