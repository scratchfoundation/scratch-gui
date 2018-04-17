import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {defineMessages, intlShape, injectIntl} from 'react-intl';
import VM from 'scratch-vm';

import AssetPanel from '../components/asset-panel/asset-panel.jsx';
import soundIcon from '../components/asset-panel/icon--sound.svg';
import addSoundFromLibraryIcon from '../components/asset-panel/icon--add-sound-lib.svg';
import addSoundFromRecordingIcon from '../components/asset-panel/icon--add-sound-record.svg';
import fileUploadIcon from '../components/action-menu/icon--file-upload.svg';
import surpriseIcon from '../components/action-menu/icon--surprise.svg';

import RecordModal from './record-modal.jsx';
import SoundEditor from './sound-editor.jsx';
import SoundLibrary from './sound-library.jsx';

import soundLibraryContent from '../lib/libraries/sounds.json';

import {connect} from 'react-redux';

import {
    closeSoundLibrary,
    openSoundLibrary,
    openSoundRecorder
} from '../reducers/modals';

class SoundTab extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSelectSound',
            'handleDeleteSound',
            'handleDuplicateSound',
            'handleNewSound',
            'handleSurpriseSound',
            'handleFileUploadClick',
            'handleSoundUpload',
            'setFileInput'
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
        if (!target || !target.sounds) {
            return;
        }

        // If switching editing targets, reset the sound index
        if (this.props.editingTarget !== editingTarget) {
            this.setState({selectedSoundIndex: 0});
        } else if (this.state.selectedSoundIndex > target.sounds.length - 1) {
            this.setState({selectedSoundIndex: Math.max(target.sounds.length - 1, 0)});
        }
    }

    handleSelectSound (soundIndex) {
        this.setState({selectedSoundIndex: soundIndex});
    }

    handleDeleteSound (soundIndex) {
        this.props.vm.deleteSound(soundIndex);
        if (soundIndex >= this.state.selectedSoundIndex) {
            this.setState({selectedSoundIndex: Math.max(0, soundIndex - 1)});
        }
    }

    handleDuplicateSound (soundIndex) {
        this.props.vm.duplicateSound(soundIndex).then(() => {
            this.setState({selectedSoundIndex: soundIndex + 1});
        });
    }

    handleNewSound () {
        if (!this.props.vm.editingTarget) {
            return null;
        }
        const sprite = this.props.vm.editingTarget.sprite;
        const sounds = sprite.sounds ? sprite.sounds : [];
        this.setState({selectedSoundIndex: Math.max(sounds.length - 1, 0)});
    }

    handleSurpriseSound () {
        const soundItem = soundLibraryContent[Math.floor(Math.random() * soundLibraryContent.length)];
        const vmSound = {
            format: soundItem.format,
            md5: soundItem.md5,
            rate: soundItem.rate,
            sampleCount: soundItem.sampleCount,
            name: soundItem.name
        };
        this.props.vm.addSound(vmSound).then(() => {
            this.handleNewSound();
        });
    }

    handleFileUploadClick () {
        this.fileInput.click();
    }

    handleSoundUpload (e) {
        const thisFileInput = e.target;
        let thisFile = null;
        const reader = new FileReader();
        reader.onload = () => {
            // Reset the file input value now that we have everything we need
            // so that the user can upload the same sound multiple times if
            // they choose
            thisFileInput.value = null;
            // Cache the sound in storage
            const soundBuffer = reader.result;
            const storage = this.props.vm.runtime.storage;

            const fileType = thisFile.type; // what file type does the browser think this is
            const soundFormat = fileType === 'audio/mp3' ? storage.DataFormat.MP3 : storage.DataFormat.WAV;
            const md5 = storage.builtinHelper.cache(
                storage.AssetType.Sound,
                soundFormat,
                new Uint8Array(soundBuffer),
            );
            // Add the sound to vm
            const newSound = {
                format: '',
                name: 'sound1',
                dataFormat: soundFormat,
                md5: `${md5}.${soundFormat}`
            };

            this.props.vm.addSound(newSound).then(() => {
                this.handleNewSound();
            });
        };
        if (thisFileInput.files) {
            thisFile = thisFileInput.files[0];
            reader.readAsArrayBuffer(thisFile);
        }
    }

    setFileInput (input) {
        this.fileInput = input;
    }

    render () {
        const {
            intl,
            vm,
            onNewSoundFromLibraryClick,
            onNewSoundFromRecordingClick
        } = this.props;

        if (!vm.editingTarget) {
            return null;
        }

        const sprite = vm.editingTarget.sprite;

        const sounds = sprite.sounds ? sprite.sounds.map(sound => (
            {
                url: soundIcon,
                name: sound.name,
                details: (sound.sampleCount / sound.rate).toFixed(2)
            }
        )) : [];

        const messages = defineMessages({
            fileUploadSound: {
                defaultMessage: 'Upload Sound',
                description: 'Button to upload sound from file in the editor tab',
                id: 'gui.soundTab.fileUploadSound'
            },
            surpriseSound: {
                defaultMessage: 'Surprise',
                description: 'Button to get a random sound in the editor tab',
                id: 'gui.soundTab.surpriseSound'
            },
            recordSound: {
                defaultMessage: 'Record',
                description: 'Button to record a sound in the editor tab',
                id: 'gui.soundTab.recordSound'
            },
            addSound: {
                defaultMessage: 'Choose a Sound',
                description: 'Button to add a sound in the editor tab',
                id: 'gui.soundTab.addSoundFromLibrary'
            }
        });

        return (
            <AssetPanel
                buttons={[{
                    title: intl.formatMessage(messages.addSound),
                    img: addSoundFromLibraryIcon,
                    onClick: onNewSoundFromLibraryClick
                }, {
                    title: intl.formatMessage(messages.fileUploadSound),
                    img: fileUploadIcon,
                    onClick: this.handleFileUploadClick,
                    fileAccept: '.wav, .mp3',
                    fileChange: this.handleSoundUpload,
                    fileInput: this.setFileInput
                }, {
                    title: intl.formatMessage(messages.surpriseSound),
                    img: surpriseIcon,
                    onClick: this.handleSurpriseSound
                }, {
                    title: intl.formatMessage(messages.recordSound),
                    img: addSoundFromRecordingIcon,
                    onClick: onNewSoundFromRecordingClick
                }]}
                items={sounds.map(sound => ({
                    url: soundIcon,
                    ...sound
                }))}
                selectedItemIndex={this.state.selectedSoundIndex}
                onDeleteClick={this.handleDeleteSound}
                onDuplicateClick={this.handleDuplicateSound}
                onItemClick={this.handleSelectSound}
            >
                {sprite.sounds && sprite.sounds[this.state.selectedSoundIndex] ? (
                    <SoundEditor soundIndex={this.state.selectedSoundIndex} />
                ) : null}
                {this.props.soundRecorderVisible ? (
                    <RecordModal
                        onNewSound={this.handleNewSound}
                    />
                ) : null}
                {this.props.soundLibraryVisible ? (
                    <SoundLibrary
                        vm={this.props.vm}
                        onNewSound={this.handleNewSound}
                        onRequestClose={this.props.onRequestCloseSoundLibrary}
                    />
                ) : null}
            </AssetPanel>
        );
    }
}

SoundTab.propTypes = {
    editingTarget: PropTypes.string,
    intl: intlShape,
    onNewSoundFromLibraryClick: PropTypes.func.isRequired,
    onNewSoundFromRecordingClick: PropTypes.func.isRequired,
    onRequestCloseSoundLibrary: PropTypes.func.isRequired,
    soundLibraryVisible: PropTypes.bool,
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
    soundLibraryVisible: state.modals.soundLibrary,
    soundRecorderVisible: state.modals.soundRecorder
});

const mapDispatchToProps = dispatch => ({
    onNewSoundFromLibraryClick: e => {
        e.preventDefault();
        dispatch(openSoundLibrary());
    },
    onNewSoundFromRecordingClick: () => {
        dispatch(openSoundRecorder());
    },
    onRequestCloseSoundLibrary: () => {
        dispatch(closeSoundLibrary());
    }
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(SoundTab));
