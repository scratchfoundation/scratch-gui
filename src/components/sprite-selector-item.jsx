const React = require('react');

const CostumeCanvas = require('./costume-canvas.jsx');

const SpriteSelectorItem = props => (
    <div
        className="scratch-sprite-selector-item"
        style={{
            border: '1px solid',
            borderColor: props.selected ? 'black' : 'transparent',
            display: 'inline-block',
            height: 75,
            width: 75
        }}
        onClick={props.onClick}
    >
        {props.costumeURL ? (
            <CostumeCanvas
                height={50}
                url={props.costumeURL}
                width={50}
            />
        ) : null}
        {props.name}
    </div>
);

SpriteSelectorItem.propTypes = {
    costumeURL: React.PropTypes.string,
    name: React.PropTypes.string,
    onClick: React.PropTypes.func,
    selected: React.PropTypes.bool
};

module.exports = SpriteSelectorItem;
