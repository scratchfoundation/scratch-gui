import SharedAudioContext from './shared-audio-context.js';

class AudioBufferPlayer {
    constructor (samples) {
        this.audioContext = new SharedAudioContext();
        this.buffer = this.audioContext.createBuffer(1, samples.length, this.audioContext.sampleRate);
        this.buffer.getChannelData(0).set(samples);
        this.source = null;
        this.stopped = true;
    }

    play (trimStart, trimEnd, onUpdate, onEnded) {
        this.stopped = false;
        this.updateCallback = onUpdate;
        this.trimStart = trimStart;
        this.trimEnd = trimEnd;
        this.startTime = Date.now();

        const trimStartTime = this.buffer.duration * trimStart / 100;
        const trimmedDuration = this.buffer.duration * trimEnd / 100 - trimStartTime;

        this.source = this.audioContext.createBufferSource();
        this.source.onended = onEnded;
        this.source.buffer = this.buffer;
        this.source.connect(this.audioContext.destination);
        this.source.start(0, trimStartTime, trimmedDuration);

        this.update();
    }

    update () {
        const timeSinceStart = (Date.now() - this.startTime) / 1000;
        const percentage = 100 * timeSinceStart / this.buffer.duration;
        if (percentage + this.trimStart < this.trimEnd && this.source.onended) {
            requestAnimationFrame(this.update.bind(this));
            this.updateCallback(percentage + this.trimStart);
        }
    }

    stop () {
        if (this.source) {
            this.source.onended = null; // Do not call onEnded callback if manually stopped
            this.source.stop();
        }
    }
}

module.exports = AudioBufferPlayer;
