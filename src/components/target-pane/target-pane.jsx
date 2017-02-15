const isEqual = require('lodash.isequal');
const omit = require('lodash.omit');
const classNames = require('classnames');
const React = require('react');

const VM = require('scratch-vm');

const Box = require('../box/box.jsx');
const BackdropLibrary = require('../../containers/backdrop-library.jsx');
const CostumeLibrary = require('../../containers/costume-library.jsx');
const SpriteLibrary = require('../../containers/sprite-library.jsx');
const SpriteSelectorComponent = require('../sprite-selector/sprite-selector.jsx');
const StageSelector = require('../../containers/stage-selector.jsx');

const styles = require('./target-pane.css');
const addIcon = require('./icon--add.svg');

/*
 * Pane that contains the sprite selector, sprite info, stage selector,
 * and the new sprite, costume and backdrop buttons
 * @param {object} props Props for the component
 * @returns {React.Component} rendered component
 */
class TargetPane extends React.Component {
    shouldComponentUpdate (nextProps) {
        return (
            // Do a normal shallow compare on all props except sprites
            Object.keys(omit(nextProps, ['sprites']))
                .reduce((all, k) => all || nextProps[k] !== this.props[k], false) ||
            // Deep compare on sprites object
            !isEqual(this.props.sprites, nextProps.sprites)
        );
    }
    render () {
        const {
            editingTarget,
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
        } = this.props;
        return (
            <Box
                className={styles.targetPane}
                {...componentProps}
            >
               
                <SpriteSelectorComponent
                    selectedId={editingTarget}
                    sprites={sprites}
                    onSelectSprite={onSelectSprite}
                />
                <Box className={styles.stageSelectorWrapper}>
                    {stage.id && <StageSelector
                        backdropCount={stage.costumeCount}
                        id={stage.id}
                        selected={stage.id === editingTarget}
                        url={stage.costume.skin}
                        onSelect={onSelectSprite}
                    />}
                    <Box>

                        <button
                            className={classNames(styles.addButtonWrapper, styles.addButtonWrapperSprite)}
                            onClick={onNewSpriteClick}
                        >
                            <img
                                className={styles.addButton}
                                src={addIcon}
                            />
                        </button>

                        {editingTarget === stage.id ? (
                            <button
                                className={classNames(styles.addButtonWrapper, styles.addButtonWrapperStage)}
                                onClick={onNewBackdropClick}
                            >
                                <img
                                    className={styles.addButton}
                                    src={addIcon}
                                />
                            </button>
                        ) : (
                            <button
                                className={classNames(styles.addButtonWrapper, styles.addButtonWrapperCostume)}
                                onClick={onNewCostumeClick}
                            >
                                <img
                                    className={styles.addButton}
                                    src={addIcon}
                                />
                            </button>
                        )}
                        <SpriteLibrary
                            visible={spriteLibraryVisible}
                            vm={vm}
                            onRequestClose={onRequestCloseSpriteLibrary}
                        />
                        <CostumeLibrary
                            visible={costumeLibraryVisible}
                            vm={vm}
                            onRequestClose={onRequestCloseCostumeLibrary}
                        />
                        <BackdropLibrary
                            visible={backdropLibraryVisible}
                            vm={vm}
                            onRequestClose={onRequestCloseBackdropLibrary}
                        />
                    </Box>
                </Box>
            </Box>
        );
    }
}
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
