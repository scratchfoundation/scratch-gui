import React from 'react';

import WebGlModalComponent from '../components/webgl-modal/webgl-modal.jsx';

class WebGlModal extends React.Component {
    handleCancel () {
        window.history.back();
    }
    render () {
        return (
            <WebGlModalComponent
                onBack={this.handleCancel}
            />
        );
    }
}

export default WebGlModal;
