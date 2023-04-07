import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import styles from './prehistoric-mode.css';
import {connect} from 'react-redux';
import {isTimeTravel220022BC} from '../../reducers/time-travel';
import torch from './torch.gif';

class PrehistoricMode extends React.Component {
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
        document.addEventListener('pointermove', this.handleMouseMove);
    }

    componentWillUnmount () {
        document.removeEventListener('pointermove', this.handleMouseMove);
    }

    handleMouseMove (event) {
        this.setState({x: event.clientX, y: event.clientY});
    }

    render () {
        if (!this.props.show) return null;
        return (
            <div
                className={styles.prehistoricMode}
            >
                <div
                    className={styles.prehistoricBackground}
                    style={{
                        backgroundPosition: `${this.state.x + 2000}px ${this.state.y + 2000}px`
                    }}
                /><img
                    className={styles.torch}
                    style={{
                        left: `${this.state.x - 35}px`,
                        top: `${this.state.y - 220}px`
                    }}
                    src={torch}
                />
            </div>
        );
    }
}

PrehistoricMode.propTypes = {
    show: PropTypes.bool
};

const mapStateToProps = state => ({
    // This is the button's mode, as opposed to the actual current state
    show: isTimeTravel220022BC(state)
});

export default connect(
    mapStateToProps
)(PrehistoricMode);
