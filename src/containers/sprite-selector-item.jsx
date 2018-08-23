import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {setHoveredSprite} from '../reducers/hovered-target';
import {updateAssetDrag} from '../reducers/asset-drag';
import {getEventXY} from '../lib/touch-utils';
import VM from 'scratch-vm';
import {SVGRenderer} from 'scratch-svg-renderer';

import SpriteSelectorItemComponent from '../components/sprite-selector-item/sprite-selector-item.jsx';

const dragThreshold = 3; // Same as the block drag threshold
// Contains 'font-family', but doesn't only contain 'font-family="none"'
const HAS_FONT_REGEXP = 'font-family(?!="none")';

class SpriteSelectorItem extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'getCostumeUrl',
            'handleClick',
            'handleDelete',
            'handleDuplicate',
            'handleExport',
            'handleMouseEnter',
            'handleMouseLeave',
            'handleMouseDown',
            'handleMouseMove',
            'handleMouseUp'
        ]);
        this.svgRenderer = new SVGRenderer();
        // Asset ID of the SVG currently in SVGRenderer
        this.svgRendererAssetId = null;
    }
    getCostumeUrl () {
        if (this.props.costumeURL) return this.props.costumeURL;
        if (!this.props.assetId) return null;

        const storage = this.props.vm.runtime.storage;
        const asset = storage.get(this.props.assetId);
        // If the SVG refers to fonts, they must be inlined in order to display correctly in the img tag.
        // Avoid parsing the SVG when possible, since it's expensive.
        if (asset.assetType === storage.AssetType.ImageVector) {
            // If the asset ID has not changed, no need to re-parse
            if (this.svgRendererAssetId === this.props.assetId) {
                return this.cachedUrl;
            }

            const svgString = this.props.vm.runtime.storage.get(this.props.assetId).decodeText();
            if (svgString.match(HAS_FONT_REGEXP)) {
                this.svgRendererAssetId = this.props.assetId;
                this.svgRenderer.loadString(svgString);
                const svgText = this.svgRenderer.toString(true /* shouldInjectFonts */);
                this.cachedUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgText)}`;
                return this.cachedUrl;
            }
        }
        return this.props.vm.runtime.storage.get(this.props.assetId).encodeDataURI();
    }
    handleMouseUp () {
        this.initialOffset = null;
        window.removeEventListener('mouseup', this.handleMouseUp);
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('touchend', this.handleMouseUp);
        window.removeEventListener('touchmove', this.handleMouseMove);
        this.props.onDrag({
            img: null,
            currentOffset: null,
            dragging: false,
            dragType: null,
            index: null
        });
        setTimeout(() => {
            this.noClick = false;
        });
    }
    handleMouseMove (e) {
        const currentOffset = getEventXY(e);
        const dx = currentOffset.x - this.initialOffset.x;
        const dy = currentOffset.y - this.initialOffset.y;
        if (Math.sqrt((dx * dx) + (dy * dy)) > dragThreshold) {
            this.props.onDrag({
                img: this.getCostumeUrl(),
                currentOffset: currentOffset,
                dragging: true,
                dragType: this.props.dragType,
                index: this.props.index,
                payload: this.props.dragPayload
            });
            this.noClick = true;
        }
        e.preventDefault();
    }
    handleMouseDown (e) {
        this.initialOffset = getEventXY(e);
        window.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('touchend', this.handleMouseUp);
        window.addEventListener('touchmove', this.handleMouseMove);
    }
    handleClick (e) {
        e.preventDefault();
        if (!this.noClick) {
            this.props.onClick(this.props.id);
        }
    }
    handleDelete (e) {
        e.stopPropagation(); // To prevent from bubbling back to handleClick
        this.props.onDeleteButtonClick(this.props.id);
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
    render () {
        const {
            /* eslint-disable no-unused-vars */
            assetId,
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
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        return (
            <SpriteSelectorItemComponent
                costumeURL={this.getCostumeUrl()}
                onClick={this.handleClick}
                onDeleteButtonClick={onDeleteButtonClick ? this.handleDelete : null}
                onDuplicateButtonClick={onDuplicateButtonClick ? this.handleDuplicate : null}
                onExportButtonClick={onExportButtonClick ? this.handleExport : null}
                onMouseDown={this.handleMouseDown}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                {...props}
            />
        );
    }
}

SpriteSelectorItem.propTypes = {
    assetId: PropTypes.string,
    costumeURL: PropTypes.string,
    dispatchSetHoveredSprite: PropTypes.func.isRequired,
    dragPayload: PropTypes.shape({
        name: PropTypes.string,
        body: PropTypes.string
    }),
    dragType: PropTypes.string,
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

export {
    ConnectedComponent as default,
    HAS_FONT_REGEXP // Exposed for testing
};
