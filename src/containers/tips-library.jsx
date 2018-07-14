import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {injectIntl, intlShape, defineMessages} from 'react-intl';

import decksLibraryContent from '../lib/libraries/decks/index.jsx';

import analytics from '../lib/analytics';
import LibraryComponent from '../components/library/library.jsx';

import {connect} from 'react-redux';

import {
    closeTipsLibrary
} from '../reducers/modals';

import {
    activateDeck
} from '../reducers/cards';

const messages = defineMessages({
    tipsLibraryTitle: {
        defaultMessage: 'Choose a Tutorial',
        description: 'Heading for the help/tutorials library',
        id: 'gui.tipsLibrary.tutorials'
    }
});

class TipsLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect'
        ]);
    }
    handleItemSelect (item) {
        this.props.onActivateDeck(item.id);
        analytics.event({
            category: 'library',
            action: 'Select How-to',
            label: item.id
        });
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
                title={this.props.intl.formatMessage(messages.tipsLibraryTitle)}
                visible={this.props.visible}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

TipsLibrary.propTypes = {
    intl: intlShape.isRequired,
    onActivateDeck: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool
};

const mapStateToProps = state => ({
    visible: state.scratchGui.modals.tipsLibrary
});

const mapDispatchToProps = dispatch => ({
    onActivateDeck: id => dispatch(activateDeck(id)),
    onRequestClose: () => dispatch(closeTipsLibrary())
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(TipsLibrary));
