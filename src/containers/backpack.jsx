import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import BackpackComponent from '../components/backpack/backpack.jsx';
import {getBackpackContents} from '../lib/backpack-api';
import {connect} from 'react-redux';
import storage from '../lib/storage';

class Backpack extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleToggle',
            'refreshContents'
        ]);
        this.state = {
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
    handleToggle () {
        const newState = !this.state.expanded;
        this.setState({expanded: newState, offset: 0});
        if (newState) {
            this.refreshContents();
        }
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
            <BackpackComponent
                contents={this.state.contents}
                error={this.state.error}
                expanded={this.state.expanded}
                loading={this.state.loading}
                onToggle={this.props.host ? this.handleToggle : null}
            />
        );
    }
}

Backpack.propTypes = {
    host: PropTypes.string,
    token: PropTypes.string,
    username: PropTypes.string
};

const mapStateToProps = state => {
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

export default connect(mapStateToProps)(Backpack);
