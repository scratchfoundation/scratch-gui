class FlangerEffect {
    constructor (audioContext, volume, startSeconds, endSeconds) {
        this.audioContext = audioContext;

        this.input = this.audioContext.createGain();
        this.output = this.audioContext.createGain();
        this.inputFeedbackNode = this.audioContext.createGain();
        this.wetGainNode = this.audioContext.createGain();
        this.dryGainNode = this.audioContext.createGain();
        this.delayNode = this.audioContext.createDelay();
        this.oscillatorNode = this.audioContext.createOscillator();
        this.delayTimeMultiplierNode = this.audioContext.createGain();
        this.feedbackNode = this.audioContext.createGain();
        this.oscillatorNode.type = 'sine';

        this.input.connect(this.inputFeedbackNode);
        this.input.connect(this.dryGainNode);

        this.inputFeedbackNode.connect(this.delayNode);
        this.inputFeedbackNode.connect(this.wetGainNode);

        this.delayNode.connect(this.feedbackNode);
        this.feedbackNode.connect(this.inputFeedbackNode);

        this.oscillatorNode.connect(this.delayTimeMultiplierNode);
        this.delayTimeMultiplierNode.connect(this.delayNode.delayTime);

        this.dryGainNode.connect(this.output);
        this.wetGainNode.connect(this.output);

        this.delayNode.delayTime.value = 0.01;
        this.oscillatorNode.frequency.value = 8;
        this.delayTimeMultiplierNode.gain.value = 0.001;
        this.feedbackNode.gain.value = 0.8;
        this.dryGainNode.gain.value = 0.0;
        this.wetGainNode.gain.value = 0.4;

        this.input.gain.value = 0;
        this.input.gain.setValueAtTime(1, startSeconds);
        this.input.gain.setValueAtTime(0, endSeconds);

        this.oscillatorNode.start(0);
    }
}

export default FlangerEffect;
