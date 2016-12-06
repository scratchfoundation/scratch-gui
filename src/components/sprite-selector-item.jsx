const React = require('react');

const CostumeCanvas = require('./costume-canvas.jsx');

const style = {
    base: {
        position: 'absolute',
        left: 0,
        top: 0,
        border: '1px solid',
        borderColor: 'transparent',
        display: 'inline-block',
        height: 72,
        width: 72
    },
    selected: {
        borderColor: 'black'
    }
};


const SpriteSelectorItem = props => (
    <div
        className="scratch-sprite-selector-item"
        style={Object.assign({},
            style.base,
            props.selected ? style.selected : {}
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
