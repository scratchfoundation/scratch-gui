const React = require('react');

const Box = require('../box/box.jsx');
const SpriteSelectorItem = require('../../containers/sprite-selector-item.jsx');
const SpriteInfo = require('../sprite-info/sprite-info.jsx');
const styles = require('./sprite-selector.css');

const SpriteSelectorComponent = function (props) {
    const {
        onSelectSprite,
        selectedId,
        sprites,
        ...componentProps
    } = props;
    return (
        <Box
            className={styles.spriteSelector}
            {...componentProps}
        >
            <SpriteInfo name="Sprite" />

            <Box className={styles.scrollWrapper}>
                <Box className={styles.itemsWrapper}>
                    {Object.keys(sprites)
                        // Re-order by list order
                        .sort((id1, id2) => sprites[id1].order - sprites[id2].order)
                        .map(id => (
                            <SpriteSelectorItem
                                className={styles.spriteItemSelectorSpriteItem}
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
            </Box>
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
