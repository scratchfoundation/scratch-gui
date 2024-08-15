import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Box from '../box/box.jsx';
import styles from './audio-trimmer.css';
import SelectionHandle from './selection-handle.jsx';
import Playhead from './playhead.jsx';

const AudioSelector = props => (
    <div
        className={classNames(styles.absolute, styles.selector)}
        ref={props.containerRef}
        onMouseDown={props.onNewSelectionMouseDown}
        onTouchStart={props.onNewSelectionMouseDown}
    >
        {props.trimStart === null ? null : (
            <Box
                className={classNames(styles.absolute)}
                style={{
                    left: `${props.trimStart * 100}%`,
                    width: `${100 * (props.trimEnd - props.trimStart)}%`
                }}
            >
                <Box className={classNames(styles.absolute, styles.selectionBackground)} />
                <SelectionHandle
                    handleStyle={styles.leftHandle}
                    onMouseDown={props.onTrimStartMouseDown}
                />
                <SelectionHandle
                    handleStyle={styles.rightHandle}
                    onMouseDown={props.onTrimEndMouseDown}
                />
            </Box>
        )}
        {props.playhead ? (
            <Playhead
                playbackPosition={props.playhead}
            />
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
