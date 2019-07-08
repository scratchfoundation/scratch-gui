import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Box from '../box/box.jsx';
import styles from './audio-selector.css';
import handleIcon from './icon--handle.svg';

const AudioSelector = props => (
    <div
        className={styles.absolute}
        ref={props.containerRef}
        onMouseDown={props.onNewSelectionMouseDown}
        onTouchStart={props.onNewSelectionMouseDown}
    >
        {props.trimStart === null ? null : (
            <Box
                className={classNames(styles.absolute, styles.trimBackground, styles.startTrimBackground)}
                style={{
                    left: `${props.trimStart * 100}%`,
                    width: `${100 * (props.trimEnd - props.trimStart)}%`
                }}
            >
                <Box className={classNames(styles.absolute, styles.trimBackgroundMask)} />
                <Box
                    className={classNames(styles.trimLine, styles.startTrimLine)}
                    onMouseDown={props.onTrimStartMouseDown}
                    onTouchStart={props.onTrimStartMouseDown}
                >
                    <Box className={classNames(styles.trimHandle, styles.topTrimHandle, styles.startTrimHandle)}>
                        <img src={handleIcon} />
                    </Box>
                    <Box className={classNames(styles.trimHandle, styles.bottomTrimHandle, styles.startTrimHandle)}>
                        <img src={handleIcon} />
                    </Box>
                </Box>
                <Box
                    className={classNames(styles.trimLine, styles.endTrimLine)}
                    onMouseDown={props.onTrimEndMouseDown}
                    onTouchStart={props.onTrimEndMouseDown}
                >
                    <Box className={classNames(styles.trimHandle, styles.topTrimHandle, styles.endTrimHandle)}>
                        <img src={handleIcon} />
                    </Box>
                    <Box className={classNames(styles.trimHandle, styles.bottomTrimHandle, styles.endTrimHandle)}>
                        <img src={handleIcon} />
                    </Box>
                </Box>
            </Box>
        )}
        {props.playhead ? (
            <div className={styles.playheadContainer}>
                <div
                    className={classNames(styles.trimLine, styles.playhead)}
                    style={{
                        transform: `translateX(${100 * props.playhead}%)`
                    }}
                />
            </div>
        ) : null}
    </div>
);

AudioSelector.propTypes = {
    containerRef: PropTypes.func,
    onNewSelectionMouseDown: PropTypes.func.isRequired,
    onTrimEndMouseDown: PropTypes.func.isRequired,
    onTrimStartMouseDown: PropTypes.func.isRequired,
    playhead: PropTypes.number,
    trimEnd: PropTypes.number,
    trimStart: PropTypes.number
};

export default AudioSelector;
