class ReverbEffect {
    constructor (audioContext, impulseResponseBuffer, startSeconds, endSeconds) {
        this.audioContext = audioContext;

        this.input = this.audioContext.createGain();
        this.output = this.audioContext.createGain();

        this.effect = this.audioContext.createConvolver();
        this.effect.buffer = impulseResponseBuffer;

        this.input.connect(this.effect);
        this.effect.connect(this.output);

        this.input.connect(this.output);
    }
}

export default ReverbEffect;
