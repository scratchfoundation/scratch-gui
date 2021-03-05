import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import styles from './mystery-mode.css';
import {connect} from 'react-redux';

class MysteryMode extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleMouseMove'
        ]);
        this.state = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };
    }

    componentDidMount () {
        document.addEventListener('mousemove', this.handleMouseMove);
    }

    componentWillUnmount () {
        document.removeEventListener('mousemove', this.handleMouseMove);
    }
    
    handleMouseMove (event) {
        this.setState({x: event.clientX, y: event.clientY});
    }

    render () {
        if (!this.props.show) return null;
        return (
            <div
                className={styles.mysteryMode}
                style={{
                    backgroundPosition: `${this.state.x + 2000}px ${this.state.y + 2000}px`
                }}
            />
        );
    }
}

MysteryMode.propTypes = {
    show: PropTypes.bool
};

const mapStateToProps = state => ({
    // This is the button's mode, as opposed to the actual current state
    show: state.scratchGui.mysteryMode
});

export default connect(
    mapStateToProps
)(MysteryMode);
