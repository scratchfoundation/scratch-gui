const React = require('react');

const Box = require('../box/box.jsx');
const SpriteSelectorItem = require('../../containers/sprite-selector-item.jsx');

const SpriteSelectorComponent = function (props) {
    const {
        onSelectSprite,
        selectedId,
        sprites,
        ...componentProps
    } = props;
    return (
        <Box
            alignContent="flex-start"
            alignItems="flex-start"
            justifyContent="flex-start"
            wrap="wrap"
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
        </Box>
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
