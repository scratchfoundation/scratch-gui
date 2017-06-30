const SharedAudioContext = require('./shared-audio-context.js');

class AudioRecorder {
    constructor () {
        this.audioContext = new SharedAudioContext();
        this.bufferLength = 1024;

        this.userMediaStream = null;
        this.mediaStreamSource = null;
        this.sourceNode = null;
        this.scriptProcessorNode = null;

        this.recordedSamples = 0;
        this.recording = false;
        this.buffers = [];

        this.disposed = false;
    }

    startListening (onUpdate, onError) {
        try {
            navigator.getUserMedia({audio: true}, userMediaStream => {
                this.attachUserMediaStream(userMediaStream, onUpdate);
            }, e => {
                onError(e);
            });
        } catch (e) {
            onError(e);
        }
    }

    startRecording () {
        this.recording = true;
    }

    calculateRMS (samples) {
        // Calculate RMS, adapted from https://github.com/Tonejs/Tone.js/blob/master/Tone/component/Meter.js#L88
        const sum = samples.reduce((acc, v) => acc + Math.pow(v, 2), 0);
        const rms = Math.sqrt(sum / samples.length);
        // Scale it
        const unity = 0.35;
        const val = rms / unity;
        // Scale the output curve
        return Math.sqrt(val);
    }

    attachUserMediaStream (userMediaStream, onUpdate) {
        this.userMediaStream = userMediaStream;
        this.mediaStreamSource = this.audioContext.createMediaStreamSource(userMediaStream);
        this.sourceNode = this.audioContext.createGain();
        this.scriptProcessorNode = this.audioContext.createScriptProcessor(this.bufferLength, 2, 2);


        this.scriptProcessorNode.onaudioprocess = processEvent => {
            if (this.recording) {
                this.buffers.push(new Float32Array(processEvent.inputBuffer.getChannelData(0)));
            }
        };

        this.analyserNode = this.audioContext.createAnalyser();

        this.analyserNode.fftSize = 2048;

        const bufferLength = this.analyserNode.frequencyBinCount;
        const dataArray = new Float32Array(bufferLength);

        const update = () => {
            if (this.disposed) return;
            requestAnimationFrame(update);
            this.analyserNode.getFloatTimeDomainData(dataArray);
            onUpdate(this.calculateRMS(dataArray));
        };

        requestAnimationFrame(update);

        // Wire everything together, ending in the destination
        this.mediaStreamSource.connect(this.sourceNode);
        this.sourceNode.connect(this.analyserNode);
        this.analyserNode.connect(this.scriptProcessorNode);
        this.scriptProcessorNode.connect(this.audioContext.destination);
    }

    stop () {
        const chunkLevels = this.buffers.map(buffer => this.calculateRMS(buffer));
        const maxRMS = Math.max.apply(null, chunkLevels);
        const threshold = maxRMS / 8;

        let firstChunkAboveThreshold = null;
        let lastChunkAboveThreshold = null;
        for (let i = 0; i < chunkLevels.length; i++) {
            if (chunkLevels[i] > threshold) {
                if (firstChunkAboveThreshold === null) firstChunkAboveThreshold = i;
                lastChunkAboveThreshold = i;
            }
        }

        const usedSamples = lastChunkAboveThreshold - firstChunkAboveThreshold + 2;
        const buffer = new Float32Array(usedSamples * this.bufferLength);

        const usedChunkLevels = [];

        let offset = 0;
        for (let i = 0; i < this.buffers.length; i++) {
            const bufferChunk = this.buffers[i];
            if (i > firstChunkAboveThreshold - 2 && i < lastChunkAboveThreshold + 1) {
                usedChunkLevels.push(chunkLevels[i]);
                buffer.set(bufferChunk, offset);
                offset += bufferChunk.length;
            }
        }

        return {
            levels: usedChunkLevels,
            samples: buffer,
            sampleRate: this.audioContext.sampleRate
        };
    }

    dispose () {
        this.scriptProcessorNode.onaudioprocess = null;
        this.scriptProcessorNode.disconnect();
        this.analyserNode.disconnect();
        this.sourceNode.disconnect();
        this.mediaStreamSource.disconnect();
        this.userMediaStream.getAudioTracks()[0].stop();
        this.disposed = true;
    }
}

module.exports = AudioRecorder;
