const React = require('react');

class SpriteSelectorComponent extends React.Component {
    render () {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: 380,
                    right: 10,
                }}
            >
                <select
                    multiple
                    value={this.props.value}
                    onChange={this.props.onChange}
                >
                    {this.props.sprites.map(sprite => (
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
    value: React.PropTypes.string
};

module.exports = SpriteSelectorComponent;
