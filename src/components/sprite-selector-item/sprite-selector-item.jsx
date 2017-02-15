const classNames = require('classnames');
const React = require('react');

const Box = require('../box/box.jsx');
const CostumeCanvas = require('../costume-canvas/costume-canvas.jsx');
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
        {props.costumeURL ? (
            <CostumeCanvas
                height={50}
                url={props.costumeURL}
                width={50}
            />
        ) : null}
        <div className={styles.spriteName}>{props.name}</div>
        <div className={styles.infoButton}>i</div>
    </Box>
);

SpriteSelectorItem.propTypes = {
    className: React.PropTypes.string,
    costumeURL: React.PropTypes.string,
    name: React.PropTypes.string,
    onClick: React.PropTypes.func,
    selected: React.PropTypes.bool
};

module.exports = SpriteSelectorItem;
