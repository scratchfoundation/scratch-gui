import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import AudioTrimmerComponent from '../components/audio-trimmer/audio-trimmer.jsx';

class AudioTrimmer extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleTrimStartMouseDown',
            'handleTrimEndMouseDown',
            'handleTrimStartMouseMove',
            'handleTrimEndMouseMove',
            'handleTrimStartMouseUp',
            'handleTrimEndMouseUp'
        ]);
    }
    handleTrimStartMouseMove (e) {
        const containerSize = this.containerElement.getBoundingClientRect().width;
        const dx = (e.clientX - this.initialX) / containerSize;
        const newTrim = Math.max(0, Math.min(this.props.trimEnd, this.initialTrim + dx));
        this.props.onSetTrimStart(newTrim);
    }
    handleTrimEndMouseMove (e) {
        const containerSize = this.containerElement.getBoundingClientRect().width;
        const dx = (e.clientX - this.initialX) / containerSize;
        const newTrim = Math.min(1, Math.max(this.props.trimStart, this.initialTrim + dx));
        this.props.onSetTrimEnd(newTrim);
    }
    handleTrimStartMouseUp () {
        window.removeEventListener('mousemove', this.handleTrimStartMouseMove);
        window.removeEventListener('mouseup', this.handleTrimStartMouseUp);
    }
    handleTrimEndMouseUp () {
        window.removeEventListener('mousemove', this.handleTrimEndMouseMove);
        window.removeEventListener('mouseup', this.handleTrimEndMouseUp);
    }
    handleTrimStartMouseDown (e) {
        this.initialX = e.clientX;
        this.initialTrim = this.props.trimStart;
        window.addEventListener('mousemove', this.handleTrimStartMouseMove);
        window.addEventListener('mouseup', this.handleTrimStartMouseUp);
    }
    handleTrimEndMouseDown (e) {
        this.initialX = e.clientX;
        this.initialTrim = this.props.trimEnd;
        window.addEventListener('mousemove', this.handleTrimEndMouseMove);
        window.addEventListener('mouseup', this.handleTrimEndMouseUp);
    }
    render () {
        return (
            <AudioTrimmerComponent
                containerRef={el => (this.containerElement = el)}
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
