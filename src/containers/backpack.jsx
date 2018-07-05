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
    spritePayload
} from '../lib/backpack-api';
import DragConstants from '../lib/drag-constants';

import {connect} from 'react-redux';
import storage from '../lib/storage';
import VM from 'scratch-vm';

class Backpack extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleDrop',
            'handleToggle',
            'handleDelete',
            'refreshContents',
            'setRef'
        ]);
        this.state = {
            dragOver: false,
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
                asset => `${props.host}/${asset.assetId}.${asset.dataFormat}`
            );
            storage._hasAddedBackpackSource = true;
        }
    }
    componentWillReceiveProps (newProps) {
        const dragTypes = [DragConstants.COSTUME, DragConstants.SOUND, DragConstants.SPRITE];
        // If `dragging` becomes true, record the drop area rectangle
        if (newProps.dragInfo.dragging && !this.props.dragInfo.dragging) {
            this.dropAreaRect = this.ref && this.ref.getBoundingClientRect();
        // If `dragging` becomes false, call the drop handler
        } else if (!newProps.dragInfo.dragging && this.props.dragInfo.dragging && this.state.dragOver) {
            this.handleDrop(this.props.dragInfo);
            this.setState({dragOver: false});
        }

        // If a drag is in progress (currentOffset) and it matches the relevant drag types,
        // test if the drag is within the drop area rect and set the state accordingly.
        if (this.dropAreaRect && newProps.dragInfo.currentOffset && dragTypes.includes(newProps.dragInfo.dragType)) {
            const {x, y} = newProps.dragInfo.currentOffset;
            const {top, right, bottom, left} = this.dropAreaRect;
            if (x > left && x < right && y > top && y < bottom) {
                this.setState({dragOver: true});
            } else {
                this.setState({dragOver: false});
            }
        }
    }
    handleToggle () {
        const newState = !this.state.expanded;
        this.setState({expanded: newState, offset: 0});
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
    setRef (ref) {
        this.ref = ref;
    }
    render () {
        return (
            <BackpackComponent
                contents={this.state.contents}
                dragOver={this.state.dragOver}
                dropAreaRef={this.setRef}
                error={this.state.error}
                expanded={this.state.expanded}
                loading={this.state.loading}
                onDelete={this.handleDelete}
                onToggle={this.props.host ? this.handleToggle : null}
            />
        );
    }
}

Backpack.propTypes = {
    dragInfo: PropTypes.shape({
        currentOffset: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        }),
        dragType: PropTypes.string,
        dragging: PropTypes.bool,
        index: PropTypes.number
    }),
    host: PropTypes.string,
    token: PropTypes.string,
    username: PropTypes.string,
    vm: PropTypes.instanceOf(VM)
};

const getTokenAndUsername = state => {
    // Look for the session state provided by scratch-www
    if (state.session && state.session.session) {
        return {
            token: state.session.session.token,
            username: state.session.session.username
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
        vm: state.scratchGui.vm
    },
    getTokenAndUsername(state)
);

export default connect(mapStateToProps)(Backpack);
