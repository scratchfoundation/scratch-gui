const React = require('react');

const Box = require('../box/box.jsx');
const SpriteInfo = require('../../containers/sprite-info.jsx');
const SpriteSelectorItem = require('../../containers/sprite-selector-item.jsx');
const styles = require('./sprite-selector.css');

const SpriteSelectorComponent = function (props) {
    const {
        onChangeSpriteDraggability,
        onChangeSpriteName,
        onChangeSpriteRotationStyle,
        onChangeSpriteVisibility,
        onChangeSpriteX,
        onChangeSpriteY,
        onDeleteSprite,
        onSelectSprite,
        selectedId,
        sprites,
        ...componentProps
    } = props;
    let selectedSprite = sprites[selectedId];
    let spriteInfoDisabled = false;
    if (typeof selectedSprite === 'undefined') {
        selectedSprite = {};
        spriteInfoDisabled = true;
    }
    return (
        <Box
            className={styles.spriteSelector}
            {...componentProps}
        >
            <SpriteInfo
                disabled={spriteInfoDisabled}
                draggable={selectedSprite.draggable}
                name={selectedSprite.name}
                rotationStyle={selectedSprite.rotationStyle}
                visible={selectedSprite.visible}
                x={selectedSprite.x}
                y={selectedSprite.y}
                onChangeDraggability={onChangeSpriteDraggability}
                onChangeName={onChangeSpriteName}
                onChangeRotationStyle={onChangeSpriteRotationStyle}
                onChangeVisibility={onChangeSpriteVisibility}
                onChangeX={onChangeSpriteX}
                onChangeY={onChangeSpriteY}
            />

            <Box className={styles.scrollWrapper}>
                <Box className={styles.itemsWrapper}>
                    {Object.keys(sprites)
                        // Re-order by list order
                        .sort((id1, id2) => sprites[id1].order - sprites[id2].order)
                        .map(id => (
                            <SpriteSelectorItem
                                className={styles.sprite}
                                costumeURL={
                                    sprites[id].costume &&
                                    sprites[id].costume.url
                                }
                                id={id}
                                key={id}
                                name={sprites[id].name}
                                selected={id === selectedId}
                                onClick={onSelectSprite}
                                onDeleteButtonClick={onDeleteSprite}
                            />
                        ))
                    }
                </Box>
            </Box>
        </Box>
    );
};

SpriteSelectorComponent.propTypes = {
    onChangeSpriteDraggability: React.PropTypes.func,
    onChangeSpriteName: React.PropTypes.func,
    onChangeSpriteRotationStyle: React.PropTypes.func,
    onChangeSpriteVisibility: React.PropTypes.func,
    onChangeSpriteX: React.PropTypes.func,
    onChangeSpriteY: React.PropTypes.func,
    onDeleteSprite: React.PropTypes.func,
    onSelectSprite: React.PropTypes.func,
    selectedId: React.PropTypes.string,
    sprites: React.PropTypes.shape({
        id: React.PropTypes.shape({
            costume: React.PropTypes.shape({
                url: React.PropTypes.string,
                name: React.PropTypes.string.isRequired,
                bitmapResolution: React.PropTypes.number.isRequired,
                rotationCenterX: React.PropTypes.number.isRequired,
                rotationCenterY: React.PropTypes.number.isRequired
            }),
            name: React.PropTypes.string.isRequired,
            order: React.PropTypes.number.isRequired
        })
    })
};

module.exports = SpriteSelectorComponent;
