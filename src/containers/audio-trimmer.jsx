import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import AudioTrimmerComponent from '../components/audio-trimmer/audio-trimmer.jsx';
import DragRecognizer from '../lib/drag-recognizer';

const MIN_LENGTH = 0.01; // Used to stop sounds being trimmed smaller than 1%

class AudioTrimmer extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleTrimStartMouseDown',
            'handleTrimEndMouseDown',
            'handleTrimStartMouseMove',
            'handleTrimEndMouseMove',
            'storeRef'
        ]);
        this.trimStartDragRecognizer = new DragRecognizer({
            onDrag: this.handleTrimStartMouseMove,
            touchDragAngle: 90,
            distanceThreshold: 0
        });
        this.trimEndDragRecognizer = new DragRecognizer({
            onDrag: this.handleTrimEndMouseMove,
            touchDragAngle: 90,
            distanceThreshold: 0
        });

    }
    handleTrimStartMouseMove (currentOffset, initialOffset) {
        const dx = (currentOffset.x - initialOffset.x) / this.containerSize;
        const newTrim = Math.max(0, Math.min(this.props.trimEnd - MIN_LENGTH, this.initialTrim + dx));
        this.props.onSetTrimStart(newTrim);
    }
    handleTrimEndMouseMove (currentOffset, initialOffset) {
        const dx = (currentOffset.x - initialOffset.x) / this.containerSize;
        const newTrim = Math.min(1, Math.max(this.props.trimStart + MIN_LENGTH, this.initialTrim + dx));
        this.props.onSetTrimEnd(newTrim);
    }
    handleTrimStartMouseDown (e) {
        this.containerSize = this.containerElement.getBoundingClientRect().width;
        this.trimStartDragRecognizer.start(e);
        this.initialTrim = this.props.trimStart;
    }
    handleTrimEndMouseDown (e) {
        this.containerSize = this.containerElement.getBoundingClientRect().width;
        this.trimEndDragRecognizer.start(e);
        this.initialTrim = this.props.trimEnd;
    }
    storeRef (el) {
        this.containerElement = el;
    }
    render () {
        return (
            <AudioTrimmerComponent
                containerRef={this.storeRef}
                playhead={this.props.playhead}
                trimEnd={this.props.trimEnd}
                trimStart={this.props.trimStart}
                onTrimEndMouseDown={this.handleTrimEndMouseDown}
                onTrimStartMouseDown={this.handleTrimStartMouseDown}
            />
        );
    }
}

AudioTrimmer.propTypes = {
    onSetTrimEnd: PropTypes.func,
    onSetTrimStart: PropTypes.func,
    playhead: PropTypes.number,
    trimEnd: PropTypes.number,
    trimStart: PropTypes.number
};

export default AudioTrimmer;
