class EchoEffect {
    static get DELAY_TIME () {
        return 0.25;
    }
    static get TAIL_SECONDS () {
        return 0.75;
    }
    constructor (audioContext, startTime, endTime) {
        this.audioContext = audioContext;
        this.input = this.audioContext.createGain();
        this.output = this.audioContext.createGain();

        this.effectInput = this.audioContext.createGain();
        this.effectInput.gain.value = 0;

        this.effectInput.gain.setValueAtTime(0.75, startTime);
        this.effectInput.gain.setValueAtTime(0, endTime);

        this.delay = this.audioContext.createDelay(1);
        this.delay.delayTime.value = EchoEffect.DELAY_TIME;
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
