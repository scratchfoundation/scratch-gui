import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Box from '../box/box.jsx';
import styles from './audio-trimmer.css';
import SelectionHandle from './selection-handle.jsx';
import Playhead from './playhead.jsx';

const AudioTrimmer = props => (
    <div
        className={classNames(styles.absolute, styles.trimmer)}
        ref={props.containerRef}
    >
        {props.trimStart === null ? null : (
            <Box
                className={classNames(styles.absolute, styles.trimBackground, styles.startTrimBackground)}
                style={{
                    width: `${100 * props.trimStart}%`
                }}
                onMouseDown={props.onTrimStartMouseDown}
                onTouchStart={props.onTrimStartMouseDown}
            >
                <Box className={classNames(styles.absolute, styles.trimBackgroundMask)} />
                <SelectionHandle
                    handleStyle={styles.leftHandle}
                />
            </Box>
        )}
        {props.playhead ? (
            <Playhead
                playbackPosition={props.playhead}
            />
        ) : null}
        {props.trimEnd === null ? null : (
            <Box
                className={classNames(styles.absolute, styles.trimBackground, styles.endTrimBackground)}
                style={{
                    left: `${100 * props.trimEnd}%`,
                    width: `${100 - (100 * props.trimEnd)}%`
                }}
                onMouseDown={props.onTrimEndMouseDown}
                onTouchStart={props.onTrimEndMouseDown}
            >
                <Box className={classNames(styles.absolute, styles.trimBackgroundMask)} />
                <SelectionHandle
                    handleStyle={styles.rightHandle}
                />
            </Box>
        )}
    </div>
);

AudioTrimmer.propTypes = {
    containerRef: PropTypes.func,
    onTrimEndMouseDown: PropTypes.func.isRequired,
    onTrimStartMouseDown: PropTypes.func.isRequired,
    playhead: PropTypes.number,
    trimEnd: PropTypes.number,
    trimStart: PropTypes.number
};

export default AudioTrimmer;
