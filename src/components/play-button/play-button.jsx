import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import {defineMessages, injectIntl, intlShape} from 'react-intl';

import styles from './play-button.css';

import playIcon from './icon--play.svg';
import stopIcon from './icon--stop.svg';

const messages = defineMessages({
    play: {
        id: 'gui.playButton.play',
        description: 'Title of the button to start playing the sound',
        defaultMessage: 'Play'
    },
    stop: {
        id: 'gui.playButton.stop',
        description: 'Title of the button to stop the sound',
        defaultMessage: 'Stop'
    }
});

const PlayButtonComponent = ({
    className,
    intl,
    isPlaying,
    onClick,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    setButtonRef,
    ...props
}) => {
    const label = isPlaying ?
        intl.formatMessage(messages.stop) :
        intl.formatMessage(messages.play);

    return (
        <div
            aria-label={label}
            className={classNames(styles.playButton, className, {
                [styles.playing]: isPlaying
            })}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            ref={setButtonRef}
            {...props}
        >
            <img
                className={styles.playIcon}
                draggable={false}
                src={isPlaying ? stopIcon : playIcon}
            />
        </div>
    );
};

PlayButtonComponent.propTypes = {
    className: PropTypes.string,
    intl: intlShape,
    isPlaying: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    setButtonRef: PropTypes.func.isRequired
};

export default injectIntl(PlayButtonComponent);
