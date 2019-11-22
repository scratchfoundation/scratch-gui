import PropTypes from 'prop-types';
import React from 'react';

import VM from 'scratch-vm';

import SpriteLibrary from '../../containers/sprite-library.jsx';
import FileLibrary from '../../containers/file-library.jsx';
import SpriteSelectorComponent from '../sprite-selector/sprite-selector.jsx';
import StageSelector from '../../containers/stage-selector.jsx';
import {STAGE_DISPLAY_SIZES} from '../../lib/layout-constants';

import styles from './target-pane.css';

/*
 * Pane that contains the sprite selector, sprite info, stage selector,
 * and the new sprite, costume and backdrop buttons
 * @param {object} props Props for the component
 * @returns {React.Component} rendered component
 */
const TargetPane = ({
    editingTarget,
    fileInputRef,
    dataFileInputRef,
    hoveredTarget,
    spriteLibraryVisible,
    fileLibraryVisible,
    onActivateBlocksTab,
    onChangeSpriteDirection,
    onChangeSpriteName,
    onChangeSpriteRotationStyle,
    onChangeSpriteSize,
    onChangeSpriteVisibility,
    onChangeSpriteX,
    onChangeSpriteY,
    onDeleteSprite,
    onDrop,
    onDuplicateSprite,
    onExportSprite,
    onFileUploadClick,
    onDataFileUploadClick,
    onNewSpriteClick,
    onViewFilesClick,
    onPaintSpriteClick,
    onRequestCloseSpriteLibrary,
    onRequestCloseFileLibrary,
    onSelectSprite,
    onSpriteUpload,
    onDataFileUpload,
    onDataFileRemove,
    onWebFileUpload,
    onSurpriseSpriteClick,
    raiseSprites,
    stage,
    stageSize,
    sprites,
    vm,
    ...componentProps
}) => (
    <div
        className={styles.targetPane}
        {...componentProps}
    >

        <SpriteSelectorComponent
            editingTarget={editingTarget}
            hoveredTarget={hoveredTarget}
            raised={raiseSprites}
            selectedId={editingTarget}
            spriteFileInput={fileInputRef}
            dataFileInput={dataFileInputRef}
            sprites={sprites}
            stageSize={stageSize}
            onChangeSpriteDirection={onChangeSpriteDirection}
            onChangeSpriteName={onChangeSpriteName}
            onChangeSpriteRotationStyle={onChangeSpriteRotationStyle}
            onChangeSpriteSize={onChangeSpriteSize}
            onChangeSpriteVisibility={onChangeSpriteVisibility}
            onChangeSpriteX={onChangeSpriteX}
            onChangeSpriteY={onChangeSpriteY}
            onDeleteSprite={onDeleteSprite}
            onDrop={onDrop}
            onDuplicateSprite={onDuplicateSprite}
            onExportSprite={onExportSprite}
            onFileUploadClick={onFileUploadClick}
            onDataFileUploadClick={onDataFileUploadClick}
            onNewSpriteClick={onNewSpriteClick}
            onViewFilesClick={onViewFilesClick}
            onPaintSpriteClick={onPaintSpriteClick}
            onSelectSprite={onSelectSprite}
            onSpriteUpload={onSpriteUpload}
            onDataFileUpload={onDataFileUpload}
            onDataFileRemove={onDataFileRemove}
            onWebFileUpload={onWebFileUpload}
            onSurpriseSpriteClick={onSurpriseSpriteClick}
        />
        <div className={styles.stageSelectorWrapper}>
            {stage.id && <StageSelector
                asset={
                    stage.costume &&
                    stage.costume.asset
                }
                backdropCount={stage.costumeCount}
                id={stage.id}
                selected={stage.id === editingTarget}
                onSelect={onSelectSprite}
            />}
            <div>
                {spriteLibraryVisible ? (
                    <SpriteLibrary
                        vm={vm}
                        onActivateBlocksTab={onActivateBlocksTab}
                        onRequestClose={onRequestCloseSpriteLibrary}
                    />
                ) : null}
            </div>
            <div>
                {fileLibraryVisible ? (
                    <FileLibrary
                        vm={vm}
                        onActivateBlocksTab={onActivateBlocksTab}
                        onRequestClose={onRequestCloseFileLibrary}
                    />
                ) : null}
            </div>
        </div>
    </div>
);

const spriteShape = PropTypes.shape({
    costume: PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string.isRequired,
        // The following are optional because costumes uploaded from disk
        // will not have these properties available
        bitmapResolution: PropTypes.number,
        rotationCenterX: PropTypes.number,
        rotationCenterY: PropTypes.number
    }),
    direction: PropTypes.number,
    id: PropTypes.string,
    name: PropTypes.string,
    order: PropTypes.number,
    size: PropTypes.number,
    visibility: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number
});

TargetPane.propTypes = {
    editingTarget: PropTypes.string,
    extensionLibraryVisible: PropTypes.bool,
    fileInputRef: PropTypes.func,
    dataFileInputRef: PropTypes.func,
    hoveredTarget: PropTypes.shape({
        hoveredSprite: PropTypes.string,
        receivedBlocks: PropTypes.bool
    }),
    onActivateBlocksTab: PropTypes.func.isRequired,
    onChangeSpriteDirection: PropTypes.func,
    onChangeSpriteName: PropTypes.func,
    onChangeSpriteRotationStyle: PropTypes.func,
    onChangeSpriteSize: PropTypes.func,
    onChangeSpriteVisibility: PropTypes.func,
    onChangeSpriteX: PropTypes.func,
    onChangeSpriteY: PropTypes.func,
    onDeleteSprite: PropTypes.func,
    onDrop: PropTypes.func,
    onDuplicateSprite: PropTypes.func,
    onExportSprite: PropTypes.func,
    onFileUploadClick: PropTypes.func,
    onNewSpriteClick: PropTypes.func,
    onViewFilesClick: PropTypes.func,
    onPaintSpriteClick: PropTypes.func,
    onRequestCloseExtensionLibrary: PropTypes.func,
    onRequestCloseSpriteLibrary: PropTypes.func,
    onRequestCloseFileLibrary: PropTypes.func,
    onSelectSprite: PropTypes.func,
    onSpriteUpload: PropTypes.func,
    onDataFileUpload: PropTypes.func,
    onDataFileUploadClick: PropTypes.func,
    onDataFileRemove: PropTypes.func,
    onWebFileUpload: PropTypes.func,
    onSurpriseSpriteClick: PropTypes.func,
    raiseSprites: PropTypes.bool,
    spriteLibraryVisible: PropTypes.bool,
    fileLibraryVisible: PropTypes.bool,
    sprites: PropTypes.objectOf(spriteShape),
    stage: spriteShape,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    vm: PropTypes.instanceOf(VM)
};

export default TargetPane;
