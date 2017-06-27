const PropTypes = require('prop-types');
const React = require('react');
const bindAll = require('lodash.bindall');

const VM = require('scratch-vm');

const AssetPanel = require('../components/asset-panel/asset-panel.jsx');
const soundIcon = require('../components/asset-panel/icon--sound.svg');
const addSoundFromLibraryIcon = require('../components/asset-panel/icon--add-sound-lib.svg');
const addSoundFromRecordingIcon = require('../components/asset-panel/icon--add-sound-record.svg');

const RecordModal = require('./record-modal.jsx');

const {connect} = require('react-redux');

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

        return (
            <AssetPanel
                buttons={[{
                    text: 'Record Sound',
                    img: addSoundFromRecordingIcon,
                    onClick: onNewSoundFromRecordingClick
                }, {
                    text: 'Add Sound',
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
