import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import AudioEngine from 'scratch-audio';

import analytics from '../lib/analytics';
import LibraryComponent from '../components/library/library.jsx';

import soundIcon from '../components/asset-panel/icon--sound.svg';

import soundLibraryContent from '../lib/libraries/sounds.json';

class SoundLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelected',
            'handleItemMouseEnter',
            'handleItemMouseLeave'
        ]);
    }
    componentDidMount () {
        this.audioEngine = new AudioEngine();
        this.player = this.audioEngine.createPlayer();
    }
    componentWillUnmount () {
        this.player.stopAllSounds();
    }
    handleItemMouseEnter (soundItem) {
        const md5ext = soundItem._md5;
        const idParts = md5ext.split('.');
        const md5 = idParts[0];
        const vm = this.props.vm;
        vm.runtime.storage.load(vm.runtime.storage.AssetType.Sound, md5)
            .then(soundAsset => {
                const sound = {
                    md5: md5ext,
                    name: soundItem.name,
                    format: soundItem.format,
                    data: soundAsset.data
                };
                return this.audioEngine.decodeSound(sound);
            })
            .then(soundId => {
                this.player.playSound(soundId);
            });
    }
    handleItemMouseLeave () {
        this.player.stopAllSounds();
    }
    handleItemSelected (soundItem) {
        const vmSound = {
            format: soundItem.format,
            md5: soundItem._md5,
            rate: soundItem.rate,
            sampleCount: soundItem.sampleCount,
            name: soundItem.name
        };
        this.props.vm.addSound(vmSound).then(() => {
            this.props.onNewSound();
        });
        analytics.event({
            category: 'library',
            action: 'Select Sound',
            label: soundItem.name
        });
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
            <LibraryComponent
                data={soundLibraryThumbnailData}
                title="Choose a Sound"
                onItemMouseEnter={this.handleItemMouseEnter}
                onItemMouseLeave={this.handleItemMouseLeave}
                onItemSelected={this.handleItemSelected}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

SoundLibrary.propTypes = {
    onNewSound: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default SoundLibrary;
