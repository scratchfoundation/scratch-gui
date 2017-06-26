import SharedAudioContext from './shared-audio-context.js';

class AudioBufferPlayer {
    constructor (samples) {
        this.audioContext = new SharedAudioContext();
        this.buffer = this.audioContext.createBuffer(1, samples.length, this.audioContext.sampleRate);
        this.buffer.getChannelData(0).set(samples);
        this.source = null;
    }

    play (trimStart, trimEnd, onEnded) {
        const trimStartTime = this.buffer.duration * trimStart / 100;
        const trimmedDuration = this.buffer.duration * trimEnd / 100 - trimStartTime;

        this.source = this.audioContext.createBufferSource();
        this.source.onended = onEnded;
        this.source.buffer = this.buffer;
        this.source.connect(this.audioContext.destination);
        this.source.start(0, trimStartTime, trimmedDuration);
    }

    stop () {
        if (this.source) {
            this.source.onended = null; // Do not call onEnded callback if manually stopped
            this.source.stop();
        }
    }
}

module.exports = AudioBufferPlayer;
