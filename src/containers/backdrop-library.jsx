import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import {connect} from 'react-redux';
import VM from 'scratch-vm';

import {
    activateTab,
    COSTUMES_TAB_INDEX
} from '../reducers/editor-tab';

import analytics from '../lib/analytics';
import backdropLibraryContent from '../lib/libraries/backdrops.json';
import backdropTags from '../lib/libraries/backdrop-tags';
import LibraryComponent from '../components/library/library.jsx';

const messages = defineMessages({
    libraryTitle: {
        defaultMessage: 'Choose a Backdrop',
        description: 'Heading for the backdrop library',
        id: 'gui.costumeLibrary.chooseABackdrop'
    }
});


class BackdropLibrary extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect'
        ]);
    }
    handleItemSelect (item) {
        const vmBackdrop = {
            name: item.name,
            rotationCenterX: item.info[0] && item.info[0] / 2,
            rotationCenterY: item.info[1] && item.info[1] / 2,
            bitmapResolution: item.info.length > 2 ? item.info[2] : 1,
            skinId: null
        };
        this.props.vm.setEditingTarget(this.props.stageID);
        this.props.onActivateTab(COSTUMES_TAB_INDEX);
        this.props.vm.addBackdrop(item.md5, vmBackdrop);
        analytics.event({
            category: 'library',
            action: 'Select Backdrop',
            label: item.name
        });
    }
    render () {
        return (
            <LibraryComponent
                data={backdropLibraryContent}
                id="backdropLibrary"
                tags={backdropTags}
                title={this.props.intl.formatMessage(messages.libraryTitle)}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

BackdropLibrary.propTypes = {
    intl: intlShape.isRequired,
    onActivateTab: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func,
    stageID: PropTypes.string.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    stageID: state.scratchGui.targets.stage.id
});

const mapDispatchToProps = dispatch => ({
    onActivateTab: tab => dispatch(activateTab(tab))
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(BackdropLibrary));
