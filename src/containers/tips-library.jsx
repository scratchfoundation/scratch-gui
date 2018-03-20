import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';

import tipLibraryContent from '../lib/libraries/tips/index';

import analytics from '../lib/analytics';
import LibraryComponent from '../components/library/library.jsx';
import tipIcon from '../components/action-menu/icon--sprite.svg';

import {connect} from 'react-redux';

import {
    closeTipsLibrary
} from '../reducers/modals';

class TipsLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect'
        ]);
    }
    handleItemSelect (item) {
        if (item.externalURL) {
            window.open(item.externalURL);
        }
    }
    render () {
        const tipLibraryThumbnailData = tipLibraryContent.map(tip => ({
            rawURL: tip.iconURL || tipIcon,
            ...tip
        }));
        if (!this.props.visible) return null;
        return (
            <LibraryComponent
                data={tipLibraryThumbnailData}
                title="Tips Library"
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
    onRequestClose: () => dispatch(closeTipsLibrary())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TipsLibrary);
