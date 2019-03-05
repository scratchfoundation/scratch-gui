import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import WavEncoder from 'wav-encoder';
import {connect} from 'react-redux';

import RecordModalComponent from '../components/record-modal/record-modal.jsx';

import {
    closeSoundRecorder
} from '../reducers/modals';

class RecordModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleRecord',
            'handleStopRecording',
            'handlePlay',
            'handleStopPlaying',
            'handleBack',
            'handleSubmit',
            'handleCancel',
            'handleSetPlayhead',
            'handleSetTrimStart',
            'handleSetTrimEnd'
        ]);

        this.state = {
            samples: null,
            encoding: false,
            levels: null,
            playhead: null,
            playing: false,
            recording: false,
            sampleRate: null,
            trimStart: 0,
            trimEnd: 1
        };
    }
    handleRecord () {
        this.setState({recording: true});
    }
    handleStopRecording (samples, sampleRate, levels, trimStart, trimEnd) {
        if (samples.length > 0) {
            this.setState({samples, sampleRate, levels, trimStart, trimEnd, recording: false});
        }
    }
    handlePlay () {
        this.setState({playing: true});
    }
    handleStopPlaying () {
        this.setState({playing: false, playhead: null});
    }
    handleBack () {
        this.setState({playing: false, samples: null});
    }
    handleSetTrimEnd (trimEnd) {
        this.setState({trimEnd});
    }
    handleSetTrimStart (trimStart) {
        this.setState({trimStart});
    }
    handleSetPlayhead (playhead) {
        this.setState({playhead});
    }
    handleSubmit () {
        this.setState({encoding: true}, () => {
            const sampleCount = this.state.samples.length;
            const startIndex = Math.floor(this.state.trimStart * sampleCount);
            const endIndex = Math.floor(this.state.trimEnd * sampleCount);
            const clippedSamples = this.state.samples.slice(startIndex, endIndex);
            WavEncoder.encode({
                sampleRate: this.state.sampleRate,
                channelData: [clippedSamples]
            }).then(wavBuffer => {
                const vmSound = {
                    format: '',
                    dataFormat: 'wav',
                    rate: this.state.sampleRate,
                    sampleCount: clippedSamples.length
                };

                // Create an asset from the encoded .wav and get resulting md5
                const storage = this.props.vm.runtime.storage;
                vmSound.asset = storage.createAsset(
                    storage.AssetType.Sound,
                    storage.DataFormat.WAV,
                    new Uint8Array(wavBuffer),
                    null,
                    true // generate md5
                );
                vmSound.assetId = vmSound.asset.assetId;

                // update vmSound object with md5 property
                vmSound.md5 = `${vmSound.assetId}.${vmSound.dataFormat}`;
                // The VM will update the sound name to a fresh name
                // if the following is already taken
                vmSound.name = 'recording1';

                this.props.vm.addSound(vmSound).then(() => {
                    this.props.onClose();
                    this.props.onNewSound();
                });
            });
        });
    }
    handleCancel () {
        this.props.onClose();
    }
    render () {
        return (
            <RecordModalComponent
                encoding={this.state.encoding}
                levels={this.state.levels}
                playhead={this.state.playhead}
                playing={this.state.playing}
                recording={this.state.recording}
                sampleRate={this.state.sampleRate}
                samples={this.state.samples}
                trimEnd={this.state.trimEnd}
                trimStart={this.state.trimStart}
                onBack={this.handleBack}
                onCancel={this.handleCancel}
                onPlay={this.handlePlay}
                onRecord={this.handleRecord}
                onSetPlayhead={this.handleSetPlayhead}
                onSetTrimEnd={this.handleSetTrimEnd}
                onSetTrimStart={this.handleSetTrimStart}
                onStopPlaying={this.handleStopPlaying}
                onStopRecording={this.handleStopRecording}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

RecordModal.propTypes = {
    onClose: PropTypes.func,
    onNewSound: PropTypes.func,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm
});

const mapDispatchToProps = dispatch => ({
    onClose: () => {
        dispatch(closeSoundRecorder());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecordModal);
