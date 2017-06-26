const SharedAudioContext = require('./shared-audio-context.js');

class AudioBufferPlayer {
    constructor (samples) {
        this.audioContext = new SharedAudioContext();
        this.buffer = this.audioContext.createBuffer(1, samples.length, this.audioContext.sampleRate);
        this.buffer.getChannelData(0).set(samples);
        this.source = null;
    }

    play (onEnded) {
        // Buffer source nodes are one time use only. Must do this every play.
        this.source = this.audioContext.createBufferSource();
        this.source.onended = onEnded;
        this.source.buffer = this.buffer;
        this.source.connect(this.audioContext.destination);
        this.source.start();
    }

    stop () {
        if (this.source) {
            this.source.onended = null; // Do not call onEnded callback if manually stopped
            this.source.stop();
        }
    }
}

module.exports = AudioBufferPlayer;
