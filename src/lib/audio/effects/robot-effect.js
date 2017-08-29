class RobotEffect {
    constructor (audioContext) {
        this.audioContext = audioContext;

        this.input = this.audioContext.createGain();
        this.output = this.audioContext.createGain();

        // Ring modulator inspired by BBC Dalek voice
        // http://recherche.ircam.fr/pub/dafx11/Papers/66_e.pdf
        // https://github.com/bbc/webaudio.prototyping.bbc.co.uk

        // > There are four parallel signal paths, two which process the
        // > combination Vc + Vin / 2 and two which process Vc - Vin/2.
        // > Each branch consists of a non-linearity [diode]...
        const createDiodeNode = () => {
            const node = this.audioContext.createWaveShaper();

            // Piecewise function given by (2) in Parker paper
            const transform = (v, vb = 0.2, vl = 0.4, h = 0.65) => {
                if (v <= vb) return 0;
                if (v <= vl) return h * (Math.pow(v - vb, 2) / ((2 * vl) - (2 * vb)));
                return (h * v) - (h * vl) + (h * (Math.pow(v - vb, 2) / ((2 * vl) - (2 * vb))));
            };

            // Create the waveshaper curve with the voltage transform above
            const bufferLength = 1024;
            const curve = new Float32Array(bufferLength);
            for (let i = 0; i < bufferLength; i++) {
                const voltage = (2 * (i / bufferLength)) - 1;
                curve[i] = transform(voltage);
            }
            node.curve = curve;
            return node;
        };

        const oscillator = this.audioContext.createOscillator();
        oscillator.frequency.value = 50;
        oscillator.start(0);

        const vInGain = this.audioContext.createGain();
        vInGain.gain.value = 0.5;

        const vInInverter1 = this.audioContext.createGain();
        vInInverter1.gain.value = -1;

        const vInInverter2 = this.audioContext.createGain();
        vInInverter2.gain.value = -1;

        const vInDiode1 = createDiodeNode(this.audioContext);
        const vInDiode2 = createDiodeNode(this.audioContext);

        const vInInverter3 = this.audioContext.createGain();
        vInInverter3.gain.value = -1;

        const vcInverter1 = this.audioContext.createGain();
        vcInverter1.gain.value = -1;

        const vcDiode3 = createDiodeNode(this.audioContext);
        const vcDiode4 = createDiodeNode(this.audioContext);

        const compressor = this.audioContext.createDynamicsCompressor();
        compressor.threshold.value = -5;
        compressor.knee.value = 15;
        compressor.ratio.value = 12;
        compressor.attack.value = 0;
        compressor.release.value = 0.25;

        const biquadFilter = this.audioContext.createBiquadFilter();
        biquadFilter.type = 'highpass';
        biquadFilter.frequency.value = 1000;
        biquadFilter.gain.value = 1.25;

        this.input.connect(vcInverter1);
        this.input.connect(vcDiode4);

        vcInverter1.connect(vcDiode3);

        oscillator.connect(vInGain);
        vInGain.connect(vInInverter1);
        vInGain.connect(vcInverter1);
        vInGain.connect(vcDiode4);

        vInInverter1.connect(vInInverter2);
        vInInverter1.connect(vInDiode2);
        vInInverter2.connect(vInDiode1);

        vInDiode1.connect(vInInverter3);
        vInDiode2.connect(vInInverter3);

        vInInverter3.connect(compressor);
        vcDiode3.connect(compressor);
        vcDiode4.connect(compressor);

        this.input.connect(biquadFilter);
        biquadFilter.connect(compressor);

        compressor.connect(this.output);
    }
}

export default RobotEffect;
