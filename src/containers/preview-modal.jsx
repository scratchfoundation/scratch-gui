import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import PreviewModalComponent from '../components/preview-modal/preview-modal.jsx';

import {
    closePreviewInfo
} from '../reducers/modals';

class PreviewModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleTryIt',
            'handleCancel'
        ]);

        this.state = {
            previewing: false
        };
    }
    handleTryIt () {
        this.setState({previewing: true});
        this.props.onTryIt();
    }
    handleCancel () {
        window.history.back();
    }
    render () {
        return (
            <PreviewModalComponent
                previewing={this.state.previewing}
                onCancel={this.handleCancel}
                onTryIt={this.handleTryIt}
            />
        );
    }
}

PreviewModal.propTypes = {
    onTryIt: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
    onTryIt: () => {
        dispatch(closePreViewInfo());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PreviewModal);
