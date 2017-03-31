const bindAll = require('lodash.bindall');
const React = require('react');
const VM = require('scratch-vm');
const AudioEngine = require('scratch-audio');
const AssetType = require('scratch-storage').AssetType;
const LibaryComponent = require('../components/library/library.jsx');

const soundIcon = require('../components/asset-panel/icon--sound.svg');

const soundLibraryContent = require('../lib/libraries/sounds.json');

class SoundLibrary extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelected',
            'handleItemChosen'
        ]);
    }
    componentDidMount () {
        this.audioEngine = new AudioEngine();
        this.player = this.audioEngine.createPlayer();
    }
    handleItemChosen (soundItem) {
        const md5ext = soundItem._md5;
        const idParts = md5ext.split('.');
        const md5 = idParts[0];
        const vm = this.props.vm;
        vm.runtime.storage.load(AssetType.Sound, md5).then(soundAsset => {
            const sound = {
                md5: md5ext,
                name: soundItem.name,
                format: soundItem.format,
                data: soundAsset.data
            };
            return this.audioEngine.decodeSound(sound);
        })
        .then(() => {
            this.player.playSound(soundItem._md5);
        });
    }
    handleItemSelected (soundItem) {
        const vmSound = {
            format: soundItem.format,
            md5: soundItem._md5,
            rate: soundItem.rate,
            sampleCount: soundItem.sampleCount,
            name: soundItem.name
        };
        this.props.vm.addSound(vmSound);
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
