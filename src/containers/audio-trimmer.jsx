import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import AudioTrimmerComponent from '../components/audio-trimmer/audio-trimmer.jsx';
import {getEventXY} from '../lib/touch-utils';

const MIN_LENGTH = 0.01; // Used to stop sounds being trimmed smaller than 1%

class AudioTrimmer extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleTrimStartMouseDown',
            'handleTrimEndMouseDown',
            'handleTrimStartMouseMove',
            'handleTrimEndMouseMove',
            'handleTrimStartMouseUp',
            'handleTrimEndMouseUp',
            'storeRef'
        ]);
    }
    handleTrimStartMouseMove (e) {
        const containerSize = this.containerElement.getBoundingClientRect().width;
        const dx = (getEventXY(e).x - this.initialX) / containerSize;
        const newTrim = Math.max(0, Math.min(this.props.trimEnd - MIN_LENGTH, this.initialTrim + dx));
        this.props.onSetTrimStart(newTrim);
        e.preventDefault();
    }
    handleTrimEndMouseMove (e) {
        const containerSize = this.containerElement.getBoundingClientRect().width;
        const dx = (getEventXY(e).x - this.initialX) / containerSize;
        const newTrim = Math.min(1, Math.max(this.props.trimStart + MIN_LENGTH, this.initialTrim + dx));
        this.props.onSetTrimEnd(newTrim);
        e.preventDefault();
    }
    handleTrimStartMouseUp () {
        window.removeEventListener('mousemove', this.handleTrimStartMouseMove);
        window.removeEventListener('mouseup', this.handleTrimStartMouseUp);
        window.removeEventListener('touchmove', this.handleTrimStartMouseMove);
        window.removeEventListener('touchend', this.handleTrimStartMouseUp);
    }
    handleTrimEndMouseUp () {
        window.removeEventListener('mousemove', this.handleTrimEndMouseMove);
        window.removeEventListener('mouseup', this.handleTrimEndMouseUp);
        window.removeEventListener('touchmove', this.handleTrimEndMouseMove);
        window.removeEventListener('touchend', this.handleTrimEndMouseUp);
    }
    handleTrimStartMouseDown (e) {
        this.initialX = getEventXY(e).x;
        this.initialTrim = this.props.trimStart;
        window.addEventListener('mousemove', this.handleTrimStartMouseMove);
        window.addEventListener('mouseup', this.handleTrimStartMouseUp);
        window.addEventListener('touchmove', this.handleTrimStartMouseMove);
        window.addEventListener('touchend', this.handleTrimStartMouseUp);
    }
    handleTrimEndMouseDown (e) {
        this.initialX = getEventXY(e).x;
        this.initialTrim = this.props.trimEnd;
        window.addEventListener('mousemove', this.handleTrimEndMouseMove);
        window.addEventListener('mouseup', this.handleTrimEndMouseUp);
        window.addEventListener('touchmove', this.handleTrimEndMouseMove);
        window.addEventListener('touchend', this.handleTrimEndMouseUp);
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
