const React = require('react');

const SpriteSelectorComponent = function (props) {
    const {
        onChange,
        sprites,
        value,
        openNewSprite,
        openNewCostume,
        openNewBackdrop,
        ...componentProps
    } = props;
    return (
        <div
            style={{
                position: 'absolute',
                top: 380,
                right: 10
            }}
            {...componentProps}
        >
            <select
                multiple
                value={value}
                onChange={onChange}
            >
                {sprites.map(sprite => (
                    <option
                        key={sprite.id}
                        value={sprite.id}
                    >
                        {sprite.name}
                    </option>
                ))}
            </select>
            <p>
                <button onClick={openNewSprite}>New sprite</button>
                <button onClick={openNewCostume}>New costume</button>
                <button onClick={openNewBackdrop}>New backdrop</button>
            </p>
        </div>
    );
};

SpriteSelectorComponent.propTypes = {
    onChange: React.PropTypes.func,
    openNewBackdrop: React.PropTypes.func,
    openNewCostume: React.PropTypes.func,
    openNewSprite: React.PropTypes.func,
    sprites: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            id: React.PropTypes.string,
            name: React.PropTypes.string
        })
    ),
    value: React.PropTypes.arrayOf(React.PropTypes.string)
};

module.exports = SpriteSelectorComponent;
