import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {defineMessages} from 'react-intl';
import VM from 'scratch-vm';

import AssetPanel from '../components/asset-panel/asset-panel.jsx';
import soundIcon from '../components/asset-panel/icon--sound.svg';
import addSoundFromLibraryIcon from '../components/asset-panel/icon--add-sound-lib.svg';
import addSoundFromRecordingIcon from '../components/asset-panel/icon--add-sound-record.svg';

import RecordModal from './record-modal.jsx';

import {connect} from 'react-redux';

const {
    openSoundLibrary,
    openSoundRecorder
} = require('../reducers/modals');

class SoundTab extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSelectSound',
            'handleDeleteSound'
        ]);
        this.state = {selectedSoundIndex: 0};
    }

    componentWillReceiveProps (nextProps) {
        const {
            editingTarget,
            sprites,
            stage
        } = nextProps;

        const target = editingTarget && sprites[editingTarget] ? sprites[editingTarget] : stage;

        if (target && target.sounds && this.state.selectedSoundIndex > target.sounds.length - 1) {
            this.setState({selectedSoundIndex: target.sounds.length - 1});
        }
    }

    handleSelectSound (soundIndex) {
        const sound = this.props.vm.editingTarget.sprite.sounds[soundIndex];
        this.props.vm.editingTarget.audioPlayer.playSound(sound.md5);
        this.setState({selectedSoundIndex: soundIndex});
    }

    handleDeleteSound (soundIndex) {
        this.props.vm.deleteSound(soundIndex);
    }

    render () {
        const {
            editingTarget,
            sprites,
            stage,
            onNewSoundFromLibraryClick,
            onNewSoundFromRecordingClick
        } = this.props;

        const target = editingTarget && sprites[editingTarget] ? sprites[editingTarget] : stage;

        if (!target) {
            return null;
        }

        const sounds = target.sounds ? target.sounds.map(sound => (
            {
                url: soundIcon,
                name: sound.name
            }
        )) : [];

        const messages = defineMessages({
            recordSound: {
                id: 'action.recordSound',
                defaultMessage: 'Record Sound',
                description: 'Button to record a sound in the editor tab'
            },
            addSound: {
                id: 'action.addSound',
                defaultMessage: 'Add Sound',
                description: 'Button to add a sound in the editor tab'
            }
        });

        return (
            <AssetPanel
                buttons={[{
                    message: messages.recordSound,
                    img: addSoundFromRecordingIcon,
                    onClick: onNewSoundFromRecordingClick
                }, {
                    message: messages.addSound,
                    img: addSoundFromLibraryIcon,
                    onClick: onNewSoundFromLibraryClick
                }]}
                items={sounds.map(sound => ({
                    url: soundIcon,
                    ...sound
                }))}
                selectedItemIndex={this.state.selectedSoundIndex}
                onDeleteClick={this.handleDeleteSound}
                onItemClick={this.handleSelectSound}
            >
                {this.props.soundRecorderVisible ? (
                    <RecordModal />
                ) : null}
            </AssetPanel>
        );
    }
}

SoundTab.propTypes = {
    editingTarget: PropTypes.string,
    onNewSoundFromLibraryClick: PropTypes.func.isRequired,
    onNewSoundFromRecordingClick: PropTypes.func.isRequired,
    soundRecorderVisible: PropTypes.bool,
    sprites: PropTypes.shape({
        id: PropTypes.shape({
            sounds: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string.isRequired
            }))
        })
    }),
    stage: PropTypes.shape({
        sounds: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired
        }))
    }),
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    editingTarget: state.targets.editingTarget,
    sprites: state.targets.sprites,
    stage: state.targets.stage,
    soundRecorderVisible: state.modals.soundRecorder
});

const mapDispatchToProps = dispatch => ({
    onNewSoundFromLibraryClick: e => {
        e.preventDefault();
        dispatch(openSoundLibrary());
    },
    onNewSoundFromRecordingClick: () => {
        dispatch(openSoundRecorder());
    }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(SoundTab);
