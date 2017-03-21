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
            'getSoundIndexByName',
            'handleSelectSound',
            'handleDeleteSound'
        ]);
        this.state = {selectedSoundIndex: 0};
    }

    getSoundIndexByName (name) {
        // @todo should be in VM
        let i = -1;
        this.props.vm.editingTarget.sprite.sounds.forEach((sound, soundIndex) => {
            if (sound.name === name) {
                i = soundIndex;
            }
        });
        return i;
    }

    handleSelectSound (item) {
        const selectedSoundIndex = this.getSoundIndexByName(item.name);
        const sound = this.props.vm.editingTarget.sprite.sounds[selectedSoundIndex];
        this.props.vm.editingTarget.audioPlayer.playSound(sound.md5);
        this.setState({selectedSoundIndex});
    }

    handleDeleteSound (item) {
        // @todo the VM should handle all of this logic
        const {editingTarget} = this.props.vm;
        const i = this.getSoundIndexByName(item.name);
        editingTarget.sprite.sounds = editingTarget.sprite.sounds
            .slice(0, i)
            .concat(editingTarget.sprite.sounds.slice(i + 1));
        this.props.vm.emitTargetsUpdate();
        this.props.vm.runtime.requestRedraw();

        this.setState({
            selectedSoundIndex: this.state.selectedSoundIndex % editingTarget.sprite.sounds.length
        });
    }

    render () {
        const {
            vm,
            onNewSoundClick
        } = this.props;

        const sounds = vm.editingTarget ? vm.editingTarget.sprite.sounds.map(sound => (
            {
                image: soundIcon,
                name: sound.name
            }
        )) : [];


        return (
            <AssetPanel
                items={sounds}
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
    ...AssetPanel.propTypes,
    vm: React.PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    editingTarget: state.targets.editingTarget,
    sprites: state.targets.sprites,
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
