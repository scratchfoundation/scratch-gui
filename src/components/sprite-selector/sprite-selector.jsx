const PropTypes = require('prop-types');
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
    onChangeSpriteDraggability: PropTypes.func,
    onChangeSpriteName: PropTypes.func,
    onChangeSpriteRotationStyle: PropTypes.func,
    onChangeSpriteVisibility: PropTypes.func,
    onChangeSpriteX: PropTypes.func,
    onChangeSpriteY: PropTypes.func,
    onDeleteSprite: PropTypes.func,
    onSelectSprite: PropTypes.func,
    selectedId: PropTypes.string,
    sprites: PropTypes.shape({
        id: PropTypes.shape({
            costume: PropTypes.shape({
                url: PropTypes.string,
                name: PropTypes.string.isRequired,
                bitmapResolution: PropTypes.number.isRequired,
                rotationCenterX: PropTypes.number.isRequired,
                rotationCenterY: PropTypes.number.isRequired
            }),
            name: PropTypes.string.isRequired,
            order: PropTypes.number.isRequired
        })
    })
};

module.exports = SpriteSelectorComponent;
