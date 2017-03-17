const bindAll = require('lodash.bindall');
const React = require('react');
const VM = require('scratch-vm');
const AudioEngine = require('scratch-audio');

const LibaryComponent = require('../components/library/library.jsx');
const soundIcon = require('../components/target-pane/icon--sound-dark.svg');

const soundLibraryContent = require('../lib/libraries/sounds.json');

const md5ToUrl = md5 => (`https://cdn.assets.scratch.mit.edu/internalapi/asset/${md5}/get/`);

class SoundLibrary extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelected',
            'handleItemChosen'
        ]);
    }
    componentDidMount () {
        // @todo lots of architectural questions here
        // - Should the sound library component own an audio player, or use the VM?
        // - Should the sound library load up all the sounds or only on demand?
        // - How can we get a callback for knowing when the sound has been loaded?
        this.audioEngine = new AudioEngine();
        this.player = this.audioEngine.createPlayer();
        this.audioEngine.loadSounds(soundLibraryContent.map(sound => (
            {
                fileUrl: md5ToUrl(sound.md5),
                ...sound
            }
        )));
    }
    handleItemChosen (item) {
        this.player.playSound(item._md5);
    }
    handleItemSelected (item) {
        // @todo these two props should be handled by a VM.addSound function
        const nextSoundId = this.props.vm.editingTarget.sprite.sounds.length;
        const fileUrl = md5ToUrl(item._md5);
        const vmSound = {
            fileUrl,
            format: item.format,
            md5: item._md5,
            rate: item.rate,
            sampleCount: item.sampleCount,
            soundID: nextSoundId,
            name: item.name
        };
        // @todo awaiting an official VM.addSound function
        // it will need to both add to sprite and load the sound
        this.props.vm.editingTarget.sprite.sounds.push(vmSound);
        this.props.vm.runtime.audioEngine.loadSounds([vmSound]);
    }
    render () {
        // @todo need to use this hack to avoid library using md5 for image
        const soundLibraryThumbnailData = soundLibraryContent.map(sound => {
            const {
                md5,
                ...otherData
            } = sound;
            return {
                _md5: md5,
                rawURL: soundIcon,
                ...otherData
            };
        });

        return (
            <LibaryComponent
                data={soundLibraryThumbnailData}
                title="Sound Library"
                visible={this.props.visible}
                onItemChosen={this.handleItemChosen}
                onItemSelected={this.handleItemSelected}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

SoundLibrary.propTypes = {
    onRequestClose: React.PropTypes.func,
    visible: React.PropTypes.bool,
    vm: React.PropTypes.instanceOf(VM).isRequired
};

module.exports = SoundLibrary;
