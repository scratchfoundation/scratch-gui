import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from './audio-trimmer.css';

const Playhead = props => (
    <div className={styles.playheadContainer}>
        <div
            className={classNames(styles.playhead)}
            style={{
                transform: `translateX(${100 * props.playbackPosition}%)`
            }}
        />
    </div>
);

Playhead.propTypes = {
    playbackPosition: PropTypes.number
};

export default Playhead;
