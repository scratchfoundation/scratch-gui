const React = require('react');
const PropTypes = require('prop-types');
const bindAll = require('lodash.bindall');
const AudioTrimmerComponent = require('../components/audio-trimmer/audio-trimmer.jsx');

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
        const dx = 100 * (e.clientX - this.initialX) / 480;
        const newTrim = Math.max(1, Math.min(this.props.trimEnd, this.initialTrim + dx));
        this.props.onSetTrimStart(newTrim);
    }
    handleTrimEndMouseMove (e) {
        const dx = 100 * (e.clientX - this.initialX) / 480;
        const newTrim = Math.min(99, Math.max(this.props.trimStart, this.initialTrim + dx));
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

module.exports = AudioTrimmer;
