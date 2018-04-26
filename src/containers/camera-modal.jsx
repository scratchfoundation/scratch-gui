import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import CameraModalComponent from '../components/camera-modal/camera-modal.jsx';
import {ModalVideoManager} from '../lib/camera.js';

import {
    closeCameraCapture
} from '../reducers/modals';

class CameraModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleBack',
            'handleCancel',
            'handleCapture',
            'handleSubmit',
            'setCanvas'
            // 'enableVideo'
        ]);

        this.video = null;
        this.videoDevice = null;

        this.state = {
            capture: null
        };
    }
    componentWillUnmount () {
        // const videoDevice = this.props.vm.runtime.ioDevices.video;
        // videoDevice.disableVideo();
        this.videoDevice.disableVideo();
        // this.video = null;
    }
    handleBack () {
        this.setState({capture: null});
        this.videoDevice.clearSnapshot();
    }
    handleCapture () {
        const capture = this.videoDevice.takeSnapshot();
        this.setState({capture: capture});
    }
    setCanvas (canvas) {
        this.canvas = canvas;
        if (this.canvas) {
            this.videoDevice = new ModalVideoManager(this.canvas);
            this.videoDevice.enableVideo();
        }
    }
    handleSubmit () {
        if (!this.state.capture) return;
        this.props.onNewCostume(this.state.capture);
        this.props.onClose();
    }
    handleCancel () {
        this.props.onClose();
    }
    render () {
        return (
            <CameraModalComponent
                // vm={this.props.vm}
                canvasRef={this.setCanvas}
                capture={this.state.capture}
                // videoRef={this.setVideoInput}
                onBack={this.handleBack}
                onCancel={this.handleCancel}
                onCapture={this.handleCapture}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

CameraModal.propTypes = {
    onClose: PropTypes.func,
    onNewCostume: PropTypes.func
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    onClose: () => {
        dispatch(closeCameraCapture());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CameraModal);
