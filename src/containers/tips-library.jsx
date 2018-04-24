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
        this.props.onActivateDeck(item.id);
    }
    render () {
        const decksLibraryThumbnailData = Object.keys(decksLibraryContent).map(id => ({
            rawURL: decksLibraryContent[id].img,
            id: id,
            name: decksLibraryContent[id].name,
            featured: true
        }));

        if (!this.props.visible) return null;
        return (
            <LibraryComponent
                data={decksLibraryThumbnailData}
                filterable={false}
                title="How-Tos"
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
    onActivateDeck: id => dispatch(activateDeck(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TipsLibrary);
