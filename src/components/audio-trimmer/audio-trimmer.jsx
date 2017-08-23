import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Box from '../box/box.jsx';
import styles from './audio-trimmer.css';
import handleIcon from './icon--handle.svg';

const AudioTrimmer = props => (
    <div
        className={styles.absolute}
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
                <Box className={classNames(styles.trimLine, styles.startTrimLine)}>
                    <Box className={classNames(styles.trimHandle, styles.topTrimHandle, styles.startTrimHandle)}>
                        <img src={handleIcon} />
                    </Box>
                    <Box className={classNames(styles.trimHandle, styles.bottomTrimHandle, styles.startTrimHandle)}>
                        <img src={handleIcon} />
                    </Box>
                </Box>
            </Box>
        )}

        {props.playhead ? (
            <Box
                className={classNames(styles.trimLine, styles.playhead)}
                style={{
                    left: `${100 * props.playhead}%`
                }}
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
                <Box className={classNames(styles.trimLine, styles.endTrimLine)}>
                    <Box className={classNames(styles.trimHandle, styles.topTrimHandle, styles.endTrimHandle)}>
                        <img src={handleIcon} />
                    </Box>
                    <Box className={classNames(styles.trimHandle, styles.bottomTrimHandle, styles.endTrimHandle)}>
                        <img src={handleIcon} />
                    </Box>
                </Box>
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
