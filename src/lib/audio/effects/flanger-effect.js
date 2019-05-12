class FlangerEffect {
    constructor (audioContext, startSeconds, endSeconds) {
        this.audioContext = audioContext;

        this.input = this.audioContext.createGain();
        this.output = this.audioContext.createGain();

        this.effectInput = this.audioContext.createGain();
        this.input.connect(this.effectInput);

        this.effectOutput = this.audioContext.createGain();

        this.bypass = this.audioContext.createGain();
        this.bypass.connect(this.output);
        this.input.connect(this.bypass);

        this.effectInput.gain.value = 0;
        this.effectInput.gain.setValueAtTime(1, startSeconds);
        this.effectInput.gain.setValueAtTime(0, endSeconds);
        this.bypass.gain.value = 1;
        this.bypass.gain.setValueAtTime(0, startSeconds);
        this.bypass.gain.setValueAtTime(1, endSeconds);

        this.inputFeedbackNode = this.audioContext.createGain();
        this.delayNode = this.audioContext.createDelay();
        this.oscillatorNode = this.audioContext.createOscillator();
        this.delayTimeMultiplierNode = this.audioContext.createGain();
        this.feedbackNode = this.audioContext.createGain();
        this.oscillatorNode.type = 'sine';

        this.effectInput.connect(this.inputFeedbackNode);

        this.inputFeedbackNode.connect(this.delayNode);
        this.inputFeedbackNode.connect(this.effectOutput);

        this.delayNode.connect(this.feedbackNode);
        this.feedbackNode.connect(this.inputFeedbackNode);

        this.oscillatorNode.connect(this.delayTimeMultiplierNode);
        this.delayTimeMultiplierNode.connect(this.delayNode.delayTime);

        this.effectOutput.connect(this.output);

        this.delayNode.delayTime.value = 0.005;
        this.oscillatorNode.frequency.value = 4;
        this.delayTimeMultiplierNode.gain.value = 0.001;
        this.feedbackNode.gain.value = 0.8;
        this.effectOutput.gain.value = 0.5;

        this.oscillatorNode.start(0);
    }
}

export default FlangerEffect;
