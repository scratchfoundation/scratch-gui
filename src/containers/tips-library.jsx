import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';

import decksLibraryContent from '../lib/libraries/decks/index';
import tipsLibraryContent from '../lib/libraries/tips/index';

import analytics from '../lib/analytics';
import LibraryComponent from '../components/library/library.jsx';
import tipIcon from '../components/action-menu/icon--sprite.svg';

import {connect} from 'react-redux';

import {
    closeTipsLibrary
} from '../reducers/modals';

import {
    activateDeck
} from '../reducers/cards';

class TipsLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect'
        ]);
    }
    handleItemSelect (item) {
        if (!item.videoURL) {
            this.props.onActivateDeck(item.index);
        }
    }
    render () {
        const decksLibraryThumbnailData = decksLibraryContent.map((deck, i) => ({
            rawURL: deck.libraryImg,
            index: i,
            featured: true,
            ...deck
        })).concat(tipsLibraryContent);

        if (!this.props.visible) return null;
        return (
            <LibraryComponent
                data={decksLibraryThumbnailData}
                title="Tips"
                visible={this.props.visible}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

TipsLibrary.propTypes = {
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool
};

const mapStateToProps = state => ({
    visible: state.modals.tipsLibrary
});

const mapDispatchToProps = dispatch => ({
    onRequestClose: () => dispatch(closeTipsLibrary()),
    onActivateDeck: (name) => dispatch(activateDeck(name))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TipsLibrary);
