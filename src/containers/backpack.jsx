import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import BackpackComponent from '../components/backpack/backpack.jsx';
import {
    getBackpackContents,
    saveBackpackObject,
    deleteBackpackObject,
    soundPayload,
    costumePayload,
    spritePayload,
    codePayload
} from '../lib/backpack-api';
import DragConstants from '../lib/drag-constants';
import DropAreaHOC from '../lib/drop-area-hoc.jsx';

import {connect} from 'react-redux';
import storage from '../lib/storage';
import VM from 'scratch-vm';

const dragTypes = [DragConstants.COSTUME, DragConstants.SOUND, DragConstants.SPRITE];
const DroppableBackpack = DropAreaHOC(dragTypes)(BackpackComponent);

class Backpack extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleDrop',
            'handleToggle',
            'handleDelete',
            'getBackpackAssetURL',
            'refreshContents',
            'handleMouseEnter',
            'handleMouseLeave',
            'handleBlockDragEnd',
            'handleBlockDragUpdate'
        ]);
        this.state = {
            // While the DroppableHOC manages drop interactions for asset tiles,
            // we still need to micromanage drops coming from the block workspace.
            // TODO this may be refactorable with the share-the-love logic in SpriteSelectorItem
            blockDragOutsideWorkspace: false,
            blockDragOverBackpack: false,
            error: false,
            offset: 0,
            itemsPerPage: 20,
            loading: false,
            expanded: false,
            contents: []
        };

        // If a host is given, add it as a web source to the storage module
        // TODO remove the hacky flag that prevents double adding
        if (props.host && !storage._hasAddedBackpackSource) {
            storage.addWebSource(
                [storage.AssetType.ImageVector, storage.AssetType.ImageBitmap, storage.AssetType.Sound],
                this.getBackpackAssetURL
            );
            storage._hasAddedBackpackSource = true;
        }
    }
    componentDidMount () {
        this.props.vm.addListener('BLOCK_DRAG_END', this.handleBlockDragEnd);
        this.props.vm.addListener('BLOCK_DRAG_UPDATE', this.handleBlockDragUpdate);
    }
    componentWillUnmount () {
        this.props.vm.removeListener('BLOCK_DRAG_END', this.handleBlockDragEnd);
        this.props.vm.removeListener('BLOCK_DRAG_UPDATE', this.handleBlockDragUpdate);
    }
    getBackpackAssetURL (asset) {
        return `${this.props.host}/${asset.assetId}.${asset.dataFormat}`;
    }
    handleToggle () {
        const newState = !this.state.expanded;
        this.setState({expanded: newState, offset: 0}, () => {
            // Emit resize on window to get blocks to resize
            window.dispatchEvent(new Event('resize'));
        });
        if (newState) {
            this.refreshContents();
        }
    }
    handleDrop (dragInfo) {
        let payloader = null;
        switch (dragInfo.dragType) {
        case DragConstants.COSTUME:
            payloader = costumePayload;
            break;
        case DragConstants.SOUND:
            payloader = soundPayload;
            break;
        case DragConstants.SPRITE:
            payloader = spritePayload;
            break;
        case DragConstants.CODE:
            payloader = codePayload;
            break;
        }
        if (!payloader) return;

        payloader(dragInfo.payload, this.props.vm)
            .then(payload => saveBackpackObject({
                host: this.props.host,
                token: this.props.token,
                username: this.props.username,
                ...payload
            }))
            .then(this.refreshContents);
    }
    handleDelete (id) {
        deleteBackpackObject({
            host: this.props.host,
            token: this.props.token,
            username: this.props.username,
            id: id
        }).then(this.refreshContents);
    }
    refreshContents () {
        if (this.props.token && this.props.username) {
            this.setState({loading: true, error: false});
            getBackpackContents({
                host: this.props.host,
                token: this.props.token,
                username: this.props.username,
                offset: this.state.offset,
                limit: this.state.itemsPerPage
            })
                .then(contents => {
                    this.setState({contents, loading: false});
                })
                .catch(() => {
                    this.setState({error: true, loading: false});
                });
        }
    }
    handleBlockDragUpdate (isOutsideWorkspace) {
        this.setState({
            blockDragOutsideWorkspace: isOutsideWorkspace
        });
    }
    handleMouseEnter () {
        if (this.state.blockDragOutsideWorkspace) {
            this.setState({
                blockDragOverBackpack: true
            });
        }
    }
    handleMouseLeave () {
        this.setState({
            blockDragOverBackpack: false
        });
    }
    handleBlockDragEnd (blocks) {
        if (this.state.blockDragOverBackpack) {
            this.handleDrop({
                dragType: DragConstants.CODE,
                payload: blocks
            });
        }
        this.setState({
            blockDragOverBackpack: false,
            blockDragOutsideWorkspace: false
        });
    }
    render () {
        return (
            <DroppableBackpack
                blockDragOver={this.state.blockDragOverBackpack}
                contents={this.state.contents}
                error={this.state.error}
                expanded={this.state.expanded}
                loading={this.state.loading}
                onDelete={this.handleDelete}
                onDrop={this.handleDrop}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onToggle={this.props.host ? this.handleToggle : null}
            />
        );
    }
}

Backpack.propTypes = {
    host: PropTypes.string,
    token: PropTypes.string,
    username: PropTypes.string,
    vm: PropTypes.instanceOf(VM)
};

const getTokenAndUsername = state => {
    // Look for the session state provided by scratch-www
    if (state.session && state.session.session && state.session.session.user) {
        return {
            token: state.session.session.user.token,
            username: state.session.session.user.username
        };
    }
    // Otherwise try to pull testing params out of the URL, or return nulls
    // TODO a hack for testing the backpack
    const tokenMatches = window.location.href.match(/[?&]token=([^&]*)&?/);
    const usernameMatches = window.location.href.match(/[?&]username=([^&]*)&?/);
    return {
        token: tokenMatches ? tokenMatches[1] : null,
        username: usernameMatches ? usernameMatches[1] : null
    };
};

const mapStateToProps = state => Object.assign(
    {
        dragInfo: state.scratchGui.assetDrag,
        vm: state.scratchGui.vm,
        blockDrag: state.scratchGui.blockDrag
    },
    getTokenAndUsername(state)
);

const mapDispatchToProps = dispatch => ({
    dispatchSetHoveredSprite: spriteId => {
        dispatch(setHoveredSprite(spriteId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Backpack);
