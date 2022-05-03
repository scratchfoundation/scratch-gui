import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import Modal from './modal.jsx';

import SoundEditor from './sound-editor.jsx';

const messages = defineMessages({
    editTitle: {
        defaultMessage: 'Edit Sound',
        description: 'Heading for the Sound Edit Section',
        id: 'gui.SoundEdit.editSound'
    }
});

class SoundEditWrapper extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClose'
        ]);
    }

    handleClose () {
        this.props.onRequestClose();
    }

    render () {
        return (
            <Modal
                fullScreen
                contentLabel={this.props.intl.formatMessage(messages.editTitle)}
                id="soundEdit"
                onRequestClose={this.handleClose}
            >
                    <SoundEditor
                        soundIndex={this.props.selectedSoundIndex}
                    />
            </Modal>
        );
    }
}

SoundEditWrapper.propTypes = {
    intl: intlShape.isRequired,
    onRequestClose: PropTypes.func,
    selectedSoundIndex: PropTypes.number
};

export default injectIntl(SoundEditWrapper);
