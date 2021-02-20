import React from 'react';
import PropTypes from 'prop-types';

import WebGlModalComponent from '../components/webgl-modal/webgl-modal.jsx';

class WebGlModal extends React.Component {
    render () {
        return (
            <WebGlModalComponent
                isRtl={this.props.isRtl}
            />
        );
    }
}

WebGlModal.propTypes = {
    isRtl: PropTypes.bool
};

export default WebGlModal;
