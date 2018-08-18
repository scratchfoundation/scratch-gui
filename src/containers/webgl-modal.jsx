import React from 'react';
import PropTypes from 'prop-types';

import WebGlModalComponent from '../components/webgl-modal/webgl-modal.jsx';

class WebGlModal extends React.Component {
    handleCancel () {
        window.history.back();
    }
    render () {
        return (
            <WebGlModalComponent
                isRtl={this.props.isRtl}
                onBack={this.handleCancel}
            />
        );
    }
}

WebGlModal.propTypes = {
    isRtl: PropTypes.bool
};

export default WebGlModal;
