import bindAll from 'lodash.bindall';
import React from 'react';

import {connect} from 'react-redux';

import {
    openSpriteLibrary,
    closeSpriteLibrary
} from '../reducers/modals';

import {activateTab, COSTUMES_TAB_INDEX} from '../reducers/editor-tab';
import {setReceivedBlocks} from '../reducers/hovered-target';
import DragConstants from '../lib/drag-constants';
import TargetPaneComponent from '../components/target-pane/target-pane.jsx';
import spriteLibraryContent from '../lib/libraries/sprites.json';
import {handleFileUpload, spriteUpload} from '../lib/file-uploader.js';

class TargetPane extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleBlockDragEnd',
            'handleChangeSpriteDirection',
            'handleChangeSpriteName',
            'handleChangeSpriteSize',
            'handleChangeSpriteVisibility',
            'handleChangeSpriteX',
            'handleChangeSpriteY',
            'handleDeleteSprite',
            'handleDrop',
            'handleDuplicateSprite',
            'handleExportSprite',
            'handleNewSprite',
            'handleSelectSprite',
            'handleSurpriseSpriteClick',
            'handlePaintSpriteClick',
            'handleFileUploadClick',
            'handleSpriteUpload',
            'setFileInput'
        ]);
    }
    componentDidMount () {
        this.props.vm.addListener('BLOCK_DRAG_END', this.handleBlockDragEnd);
    }
    componentWillUnmount () {
        this.props.vm.removeListener('BLOCK_DRAG_END', this.handleBlockDragEnd);
    }
    handleChangeSpriteDirection (direction) {
        this.props.vm.postSpriteInfo({direction});
    }
    handleChangeSpriteName (name) {
        this.props.vm.renameSprite(this.props.editingTarget, name);
    }
    handleChangeSpriteSize (size) {
        this.props.vm.postSpriteInfo({size});
    }
    handleChangeSpriteVisibility (visible) {
        this.props.vm.postSpriteInfo({visible});
    }
    handleChangeSpriteX (x) {
        this.props.vm.postSpriteInfo({x});
    }
    handleChangeSpriteY (y) {
        this.props.vm.postSpriteInfo({y});
    }
    handleDeleteSprite (id) {
        this.props.vm.deleteSprite(id);
    }
    handleDuplicateSprite (id) {
        this.props.vm.duplicateSprite(id);
    }
    handleExportSprite (id) {
        const spriteName = this.props.vm.runtime.getTargetById(id).getName();
        const saveLink = document.createElement('a');
        document.body.appendChild(saveLink);

        this.props.vm.exportSprite(id).then(content => {
            const filename = `${spriteName}.sprite3`;

            // Use special ms version if available to get it working on Edge.
            if (navigator.msSaveOrOpenBlob) {
                navigator.msSaveOrOpenBlob(content, filename);
                return;
            }

            const url = window.URL.createObjectURL(content);
            saveLink.href = url;
            saveLink.download = filename;
            saveLink.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(saveLink);
        });
    }
    handleSelectSprite (id) {
        this.props.vm.setEditingTarget(id);
    }
    handleSurpriseSpriteClick () {
        const item = spriteLibraryContent[Math.floor(Math.random() * spriteLibraryContent.length)];
        this.props.vm.addSprite(JSON.stringify(item.json));
    }
    handlePaintSpriteClick () {
        // @todo this is brittle, will need to be refactored for localized libraries
        const emptyItem = spriteLibraryContent.find(item => item.name === 'Empty');
        if (emptyItem) {
            this.props.vm.addSprite(JSON.stringify(emptyItem.json)).then(() => {
                setTimeout(() => { // Wait for targets update to propagate before tab switching
                    this.props.onActivateTab(COSTUMES_TAB_INDEX);
                });
            });
        }
    }
    handleNewSprite (spriteJSONString) {
        this.props.vm.addSprite(spriteJSONString);
    }
    handleFileUploadClick () {
        this.fileInput.click();
    }
    handleSpriteUpload (e) {
        const storage = this.props.vm.runtime.storage;
        handleFileUpload(e.target, (buffer, fileType, fileName) => {
            spriteUpload(buffer, fileType, fileName, storage, this.handleNewSprite);
        });
    }
    setFileInput (input) {
        this.fileInput = input;
    }
    handleBlockDragEnd (blocks) {
        if (this.props.hoveredTarget.sprite && this.props.hoveredTarget.sprite !== this.props.editingTarget) {
            this.props.vm.shareBlocksToTarget(blocks, this.props.hoveredTarget.sprite);
            this.props.onReceivedBlocks(true);
        }
    }
    handleDrop (dragInfo) {
        const {sprite: targetId} = this.props.hoveredTarget;
        if (dragInfo.dragType === DragConstants.SPRITE) {
            // Add one to both new and target index because we are not counting/moving the stage
            this.props.vm.reorderTarget(dragInfo.index + 1, dragInfo.newIndex + 1);
        } else if (targetId) {
            // Something is being dragged over one of the sprite tiles or the backdrop.
            // Dropping assets like sounds and costumes duplicate the asset on the
            // hovered target. Shared costumes also become the current costume on that target.
            // However, dropping does not switch the editing target or activate that editor tab.
            // This is based on 2.0 behavior, but seems like it keeps confusing switching to a minimum.
            // it allows the user to share multiple things without switching back and forth.
            if (dragInfo.dragType === DragConstants.COSTUME) {
                this.props.vm.shareCostumeToTarget(dragInfo.index, targetId);
            } else if (targetId && dragInfo.dragType === DragConstants.SOUND) {
                this.props.vm.shareSoundToTarget(dragInfo.index, targetId);
            }
        }
    }
    render () {
        const {
            onActivateTab, // eslint-disable-line no-unused-vars
            onReceivedBlocks, // eslint-disable-line no-unused-vars
            ...componentProps
        } = this.props;
        return (
            <TargetPaneComponent
                {...componentProps}
                fileInputRef={this.setFileInput}
                onChangeSpriteDirection={this.handleChangeSpriteDirection}
                onChangeSpriteName={this.handleChangeSpriteName}
                onChangeSpriteSize={this.handleChangeSpriteSize}
                onChangeSpriteVisibility={this.handleChangeSpriteVisibility}
                onChangeSpriteX={this.handleChangeSpriteX}
                onChangeSpriteY={this.handleChangeSpriteY}
                onDeleteSprite={this.handleDeleteSprite}
                onDrop={this.handleDrop}
                onDuplicateSprite={this.handleDuplicateSprite}
                onExportSprite={this.handleExportSprite}
                onFileUploadClick={this.handleFileUploadClick}
                onPaintSpriteClick={this.handlePaintSpriteClick}
                onSelectSprite={this.handleSelectSprite}
                onSpriteUpload={this.handleSpriteUpload}
                onSurpriseSpriteClick={this.handleSurpriseSpriteClick}
            />
        );
    }
}

const {
    onSelectSprite, // eslint-disable-line no-unused-vars
    ...targetPaneProps
} = TargetPaneComponent.propTypes;

TargetPane.propTypes = {
    ...targetPaneProps
};

const mapStateToProps = state => ({
    editingTarget: state.scratchGui.targets.editingTarget,
    hoveredTarget: state.scratchGui.hoveredTarget,
    sprites: Object.keys(state.scratchGui.targets.sprites).reduce((sprites, k) => {
        let {direction, size, x, y, ...sprite} = state.scratchGui.targets.sprites[k];
        if (typeof direction !== 'undefined') direction = Math.round(direction);
        if (typeof x !== 'undefined') x = Math.round(x);
        if (typeof y !== 'undefined') y = Math.round(y);
        if (typeof size !== 'undefined') size = Math.round(size);
        sprites[k] = {...sprite, direction, size, x, y};
        return sprites;
    }, {}),
    stage: state.scratchGui.targets.stage,
    raiseSprites: state.scratchGui.blockDrag,
    spriteLibraryVisible: state.scratchGui.modals.spriteLibrary
});
const mapDispatchToProps = dispatch => ({
    onNewSpriteClick: e => {
        e.preventDefault();
        dispatch(openSpriteLibrary());
    },
    onRequestCloseSpriteLibrary: () => {
        dispatch(closeSpriteLibrary());
    },
    onActivateTab: tabIndex => {
        dispatch(activateTab(tabIndex));
    },
    onReceivedBlocks: receivedBlocks => {
        dispatch(setReceivedBlocks(receivedBlocks));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TargetPane);
