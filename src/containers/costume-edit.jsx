import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import VM from 'scratch-vm';

import costumeLibraryContent from '../lib/libraries/costumes.json';
import spriteTags from '../lib/libraries/sprite-tags';
import CostumeEditComponent from '../components/costume-edit/costumeEdit.jsx';
import errorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import {connect} from 'react-redux';


const messages = defineMessages({
    editTitle: {
        defaultMessage: 'Edit Costume',
        description: 'Heading for the Costume Edit Section',
        id: 'gui.costumeEdit.editCostume'
    }
});


class CostumeEdit extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelected'
        ]);
    }
    handleItemSelected (item) {
        const vmCostume = {
            name: item.name,
            rotationCenterX: item.rotationCenterX,
            rotationCenterY: item.rotationCenterY,
            bitmapResolution: item.bitmapResolution,
            skinId: null
        };
        this.props.vm.addCostumeFromLibrary(item.md5ext, vmCostume);
    }
    render () {
        return (
            <CostumeEditComponent
                data={costumeLibraryContent}
                id="costumeEdit"
                tags={spriteTags}
                title={this.props.intl.formatMessage(messages.editTitle)}
                onItemSelected={this.handleItemSelected}
                onRequestClose={this.props.onRequestClose}
                selectedCostumeIndex={this.props.selectedCostumeIndex}
            />
        );
    }
}

CostumeEdit.propTypes = {
    intl: intlShape.isRequired,
    onRequestClose: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    selectedCostumeIndex: state.scratchGui.modals.data? (state.scratchGui.modals.data.costumeIndex || 0) : 0,
});

export default errorBoundaryHOC('Costume Edit')(
    injectIntl(connect(
        mapStateToProps
    )(CostumeEdit))
);
