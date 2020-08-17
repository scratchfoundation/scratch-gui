import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';

import PlayButtonComponent from '../components/play-button/play-button.jsx';

class PlayButton extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick',
            'handleMouseDown',
            'handleMouseEnter',
            'handleMouseLeave',
            'handleTouchStart',
            'setButtonRef'
        ]);
        this.state = {
            touchStarted: false
        };
    }
    getDerivedStateFromProps (props, state) {
        // if touchStarted is true and it's not playing, the sound must have ended.
        // reset the touchStarted state to allow the sound to be replayed
        if (state.touchStarted && !props.isPlaying) {
            return {
                touchStarted: false
            };
        }
        return null; // nothing changed
    }
    componentDidMount () {
        // Touch start
        this.buttonRef.addEventListener('touchstart', this.handleTouchStart);
    }
    componentWillUnmount () {
        this.buttonRef.removeEventListener('touchstart', this.handleTouchStart);
    }
    handleClick (e) {
        //  stop the click from propagating out of the button
        e.stopPropagation();
    }
    handleMouseDown (e) {
        // prevent default (focus) on mouseDown
        e.preventDefault();
        if (this.props.isPlaying) {
            // stop sound and reset touch state
            this.props.onStop();
            if (this.state.touchstarted) this.setState({touchStarted: false});
        } else {
            this.props.onPlay();
            if (this.state.touchstarted) {
                // started on touch, but now clicked mouse
                this.setState({touchStarted: false});
            }
        }
    }
    handleTouchStart (e) {
        if (this.props.isPlaying) {
            // If playing, stop sound, and reset touch state
            e.preventDefault();
            this.setState({touchStarted: false});
            this.props.onStop();
        } else {
            // otherwise start playing, and set touch state
            e.preventDefault();
            this.setState({touchStarted: true});
            this.props.onPlay();
        }
    }
    handleMouseEnter (e) {
        // start the sound if it's not already playing
        e.preventDefault();
        if (!this.props.isPlaying) {
            this.props.onPlay();
        }
    }
    handleMouseLeave () {
        // stop the sound unless it was started by touch
        if (this.props.isPlaying && !this.state.touchstarted) {
            this.props.onStop();
        }
    }
    setButtonRef (ref) {
        this.buttonRef = ref;
    }
    render () {
        const {
            className,
            isPlaying,
            onPlay, // eslint-disable-line no-unused-vars
            onStop // eslint-disable-line no-unused-vars
        } = this.props;
        return (
            <PlayButtonComponent
                className={className}
                isPlaying={isPlaying}
                onClick={this.handleClick}
                onMouseDown={this.handleMouseDown}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                setButtonRef={this.setButtonRef}
            />
        );
    }
}

PlayButton.propTypes = {
    className: PropTypes.string,
    isPlaying: PropTypes.bool.isRequired,
    onPlay: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired
};

export default PlayButton;
