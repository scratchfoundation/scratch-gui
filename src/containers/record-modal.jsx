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
        this.setState({samples, sampleRate, levels, trimStart, trimEnd, recording: false});
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
                const md5 = String(Math.floor(100000 * Math.random()));
                const vmSound = {
                    format: '',
                    md5: `${md5}.wav`,
                    name: `recording ${this.props.vm.editingTarget.sprite.sounds.length}`
                };

                // Load the encoded .wav into the storage cache
                const storage = this.props.vm.runtime.storage;
                storage.builtinHelper.cache(
                    storage.AssetType.Sound,
                    storage.DataFormat.WAV,
                    new Uint8Array(wavBuffer),
                    md5
                );

                this.props.vm.addSound(vmSound);
                this.handleCancel();
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
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    visible: state.modals.soundRecorder,
    vm: state.vm
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
