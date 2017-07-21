import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import CostumeCanvas from '../costume-canvas/costume-canvas.jsx';
import CloseButton from '../close-button/close-button.jsx';
import styles from './sprite-selector-item.css';

const SpriteSelectorItem = props => (
    <Box
        className={classNames(
            props.className,
            styles.spriteSelectorItem,
            {
                [styles.isSelected]: props.selected
            }
        )}
        onClick={props.onClick}
    >
        {props.selected ? (
            <CloseButton
                className={styles.deleteButton}
                size={CloseButton.SIZE_SMALL}
                onClick={props.onDeleteButtonClick}
            />
        ) : null }
        {props.costumeURL ? (
            <CostumeCanvas
                className={styles.spriteImage}
                height={32}
                url={props.costumeURL}
                width={32}
            />
        ) : null}
        <div className={styles.spriteName}>{props.name}</div>
    </Box>
);

SpriteSelectorItem.propTypes = {
    className: PropTypes.string,
    costumeURL: PropTypes.string,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onDeleteButtonClick: PropTypes.func,
    selected: PropTypes.bool.isRequired
};

export default SpriteSelectorItem;
