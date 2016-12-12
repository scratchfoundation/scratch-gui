const React = require('react');

const SpriteSelectorItem = require('../../containers/sprite-selector-item.jsx');

const styles = require('./sprite-selector.css');

const SpriteSelectorComponent = function (props) {
    const {
        onSelectSprite,
        selectedId,
        sprites,
        ...componentProps
    } = props;
    return (
        <div
            className={styles.spriteSelector}
            {...componentProps}
        >
            {Object.keys(sprites)
                // Re-order by list order
                .sort((id1, id2) => sprites[id1].order - sprites[id2].order)
                .map(id => (
                    <SpriteSelectorItem
                        costumeURL={sprites[id].costume.skin}
                        id={id}
                        key={id}
                        name={sprites[id].name}
                        selected={id === selectedId}
                        onClick={onSelectSprite}
                    />
                ))
            }
        </div>
    );
};

SpriteSelectorComponent.propTypes = {
    onSelectSprite: React.PropTypes.func,
    selectedId: React.PropTypes.string,
    sprites: React.PropTypes.shape({
        id: React.PropTypes.shape({
            costume: React.PropTypes.shape({
                skin: React.PropTypes.string,
                name: React.PropTypes.string,
                bitmapResolution: React.PropTypes.number,
                rotationCenterX: React.PropTypes.number,
                rotationCenterY: React.PropTypes.number
            }),
            name: React.PropTypes.string,
            order: React.PropTypes.number
        })
    })
};

module.exports = SpriteSelectorComponent;
