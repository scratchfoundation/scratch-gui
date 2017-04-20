const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

const Box = require('../box/box.jsx');
const CostumeCanvas = require('../costume-canvas/costume-canvas.jsx');
const CloseButton = require('../close-button/close-button.jsx');
const styles = require('./sprite-selector-item.css');

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

module.exports = SpriteSelectorItem;
