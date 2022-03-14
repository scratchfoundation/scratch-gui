import PropTypes from 'prop-types';
import React from 'react';
import styles from './oldtimey-mode.css';
import oldtimeySound from './projector.wav';
import {connect} from 'react-redux';
import {isTimeTravel1920} from '../../reducers/time-travel';

const OldTimeyMode = props => {
    if (!props.show) return null;
    return (
        <div className={styles.oldtimeyMode}>
            <audio
                src={oldtimeySound}
                autoPlay
                loop
            />
        </div>
    );
};

OldTimeyMode.propTypes = {
    show: PropTypes.bool
};

const mapStateToProps = state => ({
    // This is the button's mode, as opposed to the actual current state
    show: isTimeTravel1920(state)
});

export default connect(
    mapStateToProps
)(OldTimeyMode);
