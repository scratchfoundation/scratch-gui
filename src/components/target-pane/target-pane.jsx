const React = require('react');

const MediaLibrary = require('../../lib/media-library');
const VM = require('scratch-vm');

const BackdropLibrary = require('../../containers/backdrop-library.jsx');
const CostumeLibrary = require('../../containers/costume-library.jsx');
const SpriteLibrary = require('../../containers/sprite-library.jsx');
const SpriteSelectorComponent = require('../sprite-selector/sprite-selector.jsx');
const StageSelector = require('../../containers/stage-selector.jsx');

const styles = require('./target-pane.css');

/*
 * Pane that contains the sprite selector, sprite info, stage selector,
 * and the new sprite, costume and backdrop buttons
 * @param {object} props Props for the component
 * @returns {React.Component} rendered component
 */
const TargetPane = function (props) {
    const {
        editingTarget,
        mediaLibrary,
        backdropLibraryVisible,
        costumeLibraryVisible,
        spriteLibraryVisible,
        onNewSpriteClick,
        onNewCostumeClick,
        onNewBackdropClick,
        onRequestCloseBackdropLibrary,
        onRequestCloseCostumeLibrary,
        onRequestCloseSpriteLibrary,
        onSelectSprite,
        stage,
        sprites,
        vm,
        ...componentProps
    } = props;
    return (
        <div
            className={styles.targetPane}
            {...componentProps}
        >
            <SpriteSelectorComponent
                selectedId={editingTarget}
                sprites={sprites}
                onSelectSprite={onSelectSprite}
            />
            <StageSelector
                backdropCount={stage.costumeCount}
                id={stage.id}
                selected={stage.id === editingTarget}
                url={stage.costume.skin}
                onSelect={onSelectSprite}
            />
            <p className={styles.targetPaneLibraryButtons}>
                <button onClick={onNewSpriteClick}>New Sprite</button>
                {editingTarget === stage.id ? (
                    <button onClick={onNewBackdropClick}>New Backdrop</button>
                ) : (
                    <button onClick={onNewCostumeClick}>New Costume</button>
                )}
                <SpriteLibrary
                    mediaLibrary={mediaLibrary}
                    visible={spriteLibraryVisible}
                    vm={vm}
                    onRequestClose={onRequestCloseSpriteLibrary}
                />
                <CostumeLibrary
                    mediaLibrary={mediaLibrary}
                    visible={costumeLibraryVisible}
                    vm={vm}
                    onRequestClose={onRequestCloseCostumeLibrary}
                />
                <BackdropLibrary
                    mediaLibrary={mediaLibrary}
                    visible={backdropLibraryVisible}
                    vm={vm}
                    onRequestClose={onRequestCloseBackdropLibrary}
                />
            </p>
        </div>
    );
};
const spriteShape = React.PropTypes.shape({
    costume: React.PropTypes.shape({
        skin: React.PropTypes.string,
        name: React.PropTypes.string,
        bitmapResolution: React.PropTypes.number,
        rotationCenterX: React.PropTypes.number,
        rotationCenterY: React.PropTypes.number
    }),
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    order: React.PropTypes.number
});

TargetPane.propTypes = {
    backdropLibraryVisible: React.PropTypes.bool,
    costumeLibraryVisible: React.PropTypes.bool,
    editingTarget: React.PropTypes.string,
    mediaLibrary: React.PropTypes.instanceOf(MediaLibrary),
    onNewBackdropClick: React.PropTypes.func,
    onNewCostumeClick: React.PropTypes.func,
    onNewSpriteClick: React.PropTypes.func,
    onRequestCloseBackdropLibrary: React.PropTypes.func,
    onRequestCloseCostumeLibrary: React.PropTypes.func,
    onRequestCloseSpriteLibrary: React.PropTypes.func,
    onSelectSprite: React.PropTypes.func,
    spriteLibraryVisible: React.PropTypes.bool,
    sprites: React.PropTypes.objectOf(spriteShape),
    stage: spriteShape,
    vm: React.PropTypes.instanceOf(VM)
};

module.exports = TargetPane;
