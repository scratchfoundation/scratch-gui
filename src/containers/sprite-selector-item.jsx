import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {setHoveredSprite} from '../reducers/hovered-target';
import {updateAssetDrag} from '../reducers/asset-drag';
import storage from '../lib/storage';
import VM from 'scratch-vm';
import getCostumeUrl from '../lib/get-costume-url';
import DragRecognizer from '../lib/drag-recognizer';
import {getEventXY} from '../lib/touch-utils';
import DeleteConfirmationPrompt from '../components/delete-confirmation-prompt/delete-confirmation-prompt.jsx';

import SpriteSelectorItemComponent from '../components/sprite-selector-item/sprite-selector-item.jsx';

class SpriteSelectorItem extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'getCostumeData',
            'setRef',
            'setState',
            'handleClick',
            'handleDuplicate',
            'handleExport',
            'handleMouseEnter',
            'handleMouseLeave',
            'handleMouseDown',
            'handleDragEnd',
            'handleDrag',
            'handleTouchEnd',
            'handleDeleteButtonClick',
            'handleDeleteSpriteModalClose',
            'handleDeleteSpriteModalConfirm'
        ]);

        this.dragRecognizer = new DragRecognizer({
            onDrag: this.handleDrag,
            onDragEnd: this.handleDragEnd
        });

        this.state = {isDeletePromptOpen: false};
    }
    componentDidMount () {
        document.addEventListener('touchend', this.handleTouchEnd);
    }
    componentWillUnmount () {
        document.removeEventListener('touchend', this.handleTouchEnd);
        this.dragRecognizer.reset();
    }
    getCostumeData () {
        if (this.props.costumeURL) return this.props.costumeURL;
        if (!this.props.asset) return null;

        return getCostumeUrl(this.props.asset);
    }
    handleDragEnd () {
        if (this.props.dragging) {
            this.props.onDrag({
                img: null,
                currentOffset: null,
                dragging: false,
                dragType: null,
                index: null
            });
        }
        setTimeout(() => {
            this.noClick = false;
        });
    }
    handleDrag (currentOffset) {
        this.props.onDrag({
            img: this.getCostumeData(),
            currentOffset: currentOffset,
            dragging: true,
            dragType: this.props.dragType,
            index: this.props.index,
            payload: this.props.dragPayload
        });
        this.noClick = true;
    }
    handleTouchEnd (e) {
        const {x, y} = getEventXY(e);
        const {top, left, bottom, right} = this.ref.getBoundingClientRect();
        if (x >= left && x <= right && y >= top && y <= bottom) {
            this.handleMouseEnter();
        }
    }
    handleMouseDown (e) {
        this.dragRecognizer.start(e);
    }
    handleClick (e) {
        e.preventDefault();
        if (!this.noClick) {
            this.props.onClick(this.props.id);
        }
    }
    handleDuplicate (e) {
        e.stopPropagation(); // To prevent from bubbling back to handleClick
        this.props.onDuplicateButtonClick(this.props.id);
    }
    handleExport (e) {
        e.stopPropagation();
        this.props.onExportButtonClick(this.props.id);
    }
    handleMouseLeave () {
        this.props.dispatchSetHoveredSprite(null);
    }
    handleMouseEnter () {
        this.props.dispatchSetHoveredSprite(this.props.id);
    }
    handleDeleteButtonClick (e) {
        e.stopPropagation(); // To prevent from bubbling back to handleClick

        if (this.props.withDeleteConfirmation) {
            this.setState({isDeletePromptOpen: true});
        } else {
            this.props.onDeleteButtonClick(this.props.id);
        }
    }
    handleDeleteSpriteModalClose () {
        this.setState({isDeletePromptOpen: false});
    }
    handleDeleteSpriteModalConfirm () {
        this.props.onDeleteButtonClick(this.props.id);
        this.setState({isDeletePromptOpen: false});
    }
    setRef (component) {
        // Access the DOM node using .elem because it is going through ContextMenuTrigger
        this.ref = component && component.elem;
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            asset,
            id,
            index,
            onClick,
            onDeleteButtonClick,
            onDuplicateButtonClick,
            onExportButtonClick,
            dragPayload,
            receivedBlocks,
            costumeURL,
            vm,
            deleteConfirmationModalPosition,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        return (<>
            {this.state.isDeletePromptOpen ? <DeleteConfirmationPrompt
                onOk={this.handleDeleteSpriteModalConfirm}
                onCancel={this.handleDeleteSpriteModalClose}
                relativeElemRef={this.ref}
                entityType={this.props.dragType}
                modalPosition={deleteConfirmationModalPosition}
            /> : null}
            <SpriteSelectorItemComponent
                componentRef={this.setRef}
                costumeURL={this.getCostumeData()}
                preventContextMenu={this.dragRecognizer.gestureInProgress()}
                onClick={this.handleClick}
                onDeleteButtonClick={onDeleteButtonClick ? this.handleDeleteButtonClick : null}
                onDuplicateButtonClick={onDuplicateButtonClick ? this.handleDuplicate : null}
                onExportButtonClick={onExportButtonClick ? this.handleExport : null}
                onMouseDown={this.handleMouseDown}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                isDeleteConfirmationModalOpened={this.state.isDeletePromptOpen}
                {...props}
            />
        </>
        );
    }
}
SpriteSelectorItem.propTypes = {
    asset: PropTypes.instanceOf(storage.Asset),
    costumeURL: PropTypes.string,
    dispatchSetHoveredSprite: PropTypes.func.isRequired,
    dragPayload: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dragType: PropTypes.string,
    dragging: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    index: PropTypes.number,
    name: PropTypes.string,
    onClick: PropTypes.func,
    onDeleteButtonClick: PropTypes.func,
    onDrag: PropTypes.func.isRequired,
    onDuplicateButtonClick: PropTypes.func,
    onExportButtonClick: PropTypes.func,
    receivedBlocks: PropTypes.bool.isRequired,
    selected: PropTypes.bool,
    withDeleteConfirmation: PropTypes.bool,
    deleteConfirmationModalPosition: PropTypes.string,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = (state, {id}) => ({
    dragging: state.scratchGui.assetDrag.dragging,
    receivedBlocks: state.scratchGui.hoveredTarget.receivedBlocks &&
            state.scratchGui.hoveredTarget.sprite === id,
    vm: state.scratchGui.vm
});
const mapDispatchToProps = dispatch => ({
    dispatchSetHoveredSprite: spriteId => {
        dispatch(setHoveredSprite(spriteId));
    },
    onDrag: data => dispatch(updateAssetDrag(data))
});

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(SpriteSelectorItem);

export default ConnectedComponent;
