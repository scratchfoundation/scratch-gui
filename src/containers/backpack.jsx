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
            'refreshContents'
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
                this.getBackpackAssetURL
            );
            storage._hasAddedBackpackSource = true;
        }
    }
    getBackpackAssetURL (asset) {
        return `${this.props.host}/${asset.assetId}.${asset.dataFormat}`;
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
    render () {
        return (
            <DroppableBackpack
                contents={this.state.contents}
                error={this.state.error}
                expanded={this.state.expanded}
                loading={this.state.loading}
                onDelete={this.handleDelete}
                onDrop={this.handleDrop}
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
    if (state.session && state.session.session) {
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
        vm: state.scratchGui.vm
    },
    getTokenAndUsername(state)
);

export default connect(mapStateToProps)(Backpack);
