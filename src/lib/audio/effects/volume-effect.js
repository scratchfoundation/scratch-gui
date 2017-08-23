class VolumeEffect {
    constructor (audioContext, volume) {
        this.audioContext = audioContext;

        this.input = this.audioContext.createGain();
        this.output = this.audioContext.createGain();

        this.gain = this.audioContext.createGain();
        this.gain.gain.value = volume;

        this.input.connect(this.gain);
        this.gain.connect(this.output);
    }
}

export default VolumeEffect;
