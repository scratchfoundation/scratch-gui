const PropTypes = require('prop-types');
const React = require('react');
const classNames = require('classnames');
const Box = require('../box/box.jsx');
const styles = require('./audio-trimmer.css');
const handleIcon = require('./icon--handle.svg');

const AudioTrimmer = props => (
    <div
        className={styles.absolute}
        ref={props.containerRef}
    >
        <Box
            className={classNames(styles.absolute, styles.trimBackground, styles.startTrimBackground)}
            style={{
                width: `${100 * props.trimStart}%`
            }}
            onMouseDown={props.onTrimStartMouseDown}
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

        {props.playhead ? (
            <Box
                className={classNames(styles.trimLine, styles.playhead)}
                style={{
                    left: `${100 * props.playhead}%`
                }}
            />
        ) : null}

        <Box
            className={classNames(styles.absolute, styles.trimBackground, styles.endTrimBackground)}
            style={{
                left: `${100 * props.trimEnd}%`,
                width: `${100 - 100 * props.trimEnd}%`
            }}
            onMouseDown={props.onTrimEndMouseDown}
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
    </div>
);

AudioTrimmer.propTypes = {
    containerRef: PropTypes.func,
    onTrimEndMouseDown: PropTypes.func.isRequired,
    onTrimStartMouseDown: PropTypes.func.isRequired,
    playhead: PropTypes.number,
    trimEnd: PropTypes.number.isRequired,
    trimStart: PropTypes.number.isRequired
};

module.exports = AudioTrimmer;
