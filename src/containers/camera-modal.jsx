import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import CameraModalComponent from '../components/camera-modal/camera-modal.jsx';
import ModalVideoManager from '../lib/video/modal-video-manager.js';

import {
    closeCameraCapture
} from '../reducers/modals';

class CameraModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleAccess',
            'handleBack',
            'handleCancel',
            'handleCapture',
            'handleLoaded',
            'handleSubmit',
            'setCanvas'
        ]);

        this.video = null;
        this.videoDevice = null;

        this.state = {
            capture: null,
            access: false,
            loaded: false
        };
    }
    componentWillUnmount () {
        if (this.videoDevice) {
            this.videoDevice.disableVideo();
        }
    }
    handleAccess () {
        this.setState({access: true});
    }
    handleLoaded () {
        this.setState({loaded: true});
    }
    handleBack () {
        this.setState({capture: null});
        this.videoDevice.clearSnapshot();
    }
    handleCapture () {
        if (this.state.loaded) {
            const capture = this.videoDevice.takeSnapshot();
            this.setState({capture: capture});
        }
    }
    setCanvas (canvas) {
        this.canvas = canvas;
        if (this.canvas) {
            this.videoDevice = new ModalVideoManager(this.canvas);
            this.videoDevice.enableVideo(this.handleAccess, this.handleLoaded);
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
                access={this.state.access}
                canvasRef={this.setCanvas}
                capture={this.state.capture}
                loaded={this.state.loaded}
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
