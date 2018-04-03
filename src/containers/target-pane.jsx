import bindAll from 'lodash.bindall';
import React from 'react';

import {connect} from 'react-redux';

import {
    openSpriteLibrary,
    closeSpriteLibrary
} from '../reducers/modals';

import {activateTab, COSTUMES_TAB_INDEX} from '../reducers/editor-tab';
import {setReceivedBlocks} from '../reducers/hovered-target';

import TargetPaneComponent from '../components/target-pane/target-pane.jsx';
import spriteLibraryContent from '../lib/libraries/sprites.json';

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
            'handleDuplicateSprite',
            'handleSelectSprite',
            'handleSurpriseSpriteClick',
            'handlePaintSpriteClick'
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
    handleSelectSprite (id) {
        this.props.vm.setEditingTarget(id);
    }
    handleSurpriseSpriteClick () {
        const item = spriteLibraryContent[Math.floor(Math.random() * spriteLibraryContent.length)];
        this.props.vm.addSprite2(JSON.stringify(item.json));
    }
    handlePaintSpriteClick () {
        // @todo this is brittle, will need to be refactored for localized libraries
        const emptyItem = spriteLibraryContent.find(item => item.name === 'Empty');
        if (emptyItem) {
            this.props.vm.addSprite2(JSON.stringify(emptyItem.json)).then(() => {
                setTimeout(() => { // Wait for targets update to propagate before tab switching
                    this.props.onActivateTab(COSTUMES_TAB_INDEX);
                });
            });
        }
    }
    handleBlockDragEnd (blocks) {
        if (this.props.hoveredTarget.sprite && this.props.hoveredTarget.sprite !== this.props.editingTarget) {
            this.props.vm.shareBlocksToTarget(blocks, this.props.hoveredTarget.sprite);
            this.props.onReceivedBlocks(true);
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
                onChangeSpriteDirection={this.handleChangeSpriteDirection}
                onChangeSpriteName={this.handleChangeSpriteName}
                onChangeSpriteSize={this.handleChangeSpriteSize}
                onChangeSpriteVisibility={this.handleChangeSpriteVisibility}
                onChangeSpriteX={this.handleChangeSpriteX}
                onChangeSpriteY={this.handleChangeSpriteY}
                onDeleteSprite={this.handleDeleteSprite}
                onDuplicateSprite={this.handleDuplicateSprite}
                onPaintSpriteClick={this.handlePaintSpriteClick}
                onSelectSprite={this.handleSelectSprite}
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
    editingTarget: state.targets.editingTarget,
    hoveredTarget: state.hoveredTarget,
    sprites: Object.keys(state.targets.sprites).reduce((sprites, k) => {
        let {direction, size, x, y, ...sprite} = state.targets.sprites[k];
        if (typeof direction !== 'undefined') direction = Math.round(direction);
        if (typeof x !== 'undefined') x = Math.round(x);
        if (typeof y !== 'undefined') y = Math.round(y);
        if (typeof size !== 'undefined') size = Math.round(size);
        sprites[k] = {...sprite, direction, size, x, y};
        return sprites;
    }, {}),
    stage: state.targets.stage,
    raiseSprites: state.blockDrag,
    spriteLibraryVisible: state.modals.spriteLibrary
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
