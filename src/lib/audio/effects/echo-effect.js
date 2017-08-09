class EchoEffect {
    constructor (audioContext, delayTime) {
        this.audioContext = audioContext;
        this.delayTime = delayTime;
        this.input = this.audioContext.createGain();
        this.output = this.audioContext.createGain();

        this.effectInput = this.audioContext.createGain();
        this.effectInput.gain.value = 0.75;

        this.delay = this.audioContext.createDelay(1);
        this.delay.delayTime.value = delayTime;
        this.decay = this.audioContext.createGain();
        this.decay.gain.value = 0.3;

        this.compressor = this.audioContext.createDynamicsCompressor();
        this.compressor.threshold.value = -5;
        this.compressor.knee.value = 15;
        this.compressor.ratio.value = 12;
        this.compressor.attack.value = 0;
        this.compressor.release.value = 0.25;

        this.input.connect(this.effectInput);
        this.effectInput.connect(this.delay);
        this.delay.connect(this.compressor);
        this.input.connect(this.compressor);
        this.delay.connect(this.decay);
        this.decay.connect(this.delay);
        this.compressor.connect(this.output);
    }
}

export default EchoEffect;
