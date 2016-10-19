const React = require('react');

class SpriteSelectorComponent extends React.Component {
    render () {
        const {
            onChange,
            sprites,
            value,
            ...props
        } = this.props;
        return (
            <div
                style={{
                    position: 'absolute',
                    top: 380,
                    right: 10,
                }}
                {...props}
            >
                <select
                    multiple
                    value={value}
                    onChange={onChange}
                >
                    {sprites.map(sprite => (
                        <option value={sprite.id} key={sprite.id}>
                            {sprite.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

SpriteSelectorComponent.propTypes = {
    onChange: React.PropTypes.func,
    sprites: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            id: React.PropTypes.string,
            name: React.PropTypes.string
        })
    ),
    value: React.PropTypes.arrayOf(React.PropTypes.string)
};

module.exports = SpriteSelectorComponent;
