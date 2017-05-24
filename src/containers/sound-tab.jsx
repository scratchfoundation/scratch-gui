const PropTypes = require('prop-types');
const React = require('react');
const bindAll = require('lodash.bindall');

const VM = require('scratch-vm');

const AssetPanel = require('../components/asset-panel/asset-panel.jsx');
const soundIcon = require('../components/asset-panel/icon--sound.svg');

const {connect} = require('react-redux');

const {
    openSoundLibrary
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
            onNewSoundClick
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
                items={sounds.map(sound => ({
                    url: soundIcon,
                    ...sound
                }))}
                newText={'Add Sound'}
                selectedItemIndex={this.state.selectedSoundIndex}
                onDeleteClick={this.handleDeleteSound}
                onItemClick={this.handleSelectSound}
                onNewClick={onNewSoundClick}
            />
        );
    }
}

SoundTab.propTypes = {
    editingTarget: PropTypes.string,
    onNewSoundClick: PropTypes.func.isRequired,
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
    soundLibraryVisible: state.modals.soundLibrary
});

const mapDispatchToProps = dispatch => ({
    onNewSoundClick: e => {
        e.preventDefault();
        dispatch(openSoundLibrary());
    }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(SoundTab);
