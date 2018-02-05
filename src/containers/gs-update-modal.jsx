import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import GsUpdateModalComponent from '../components/gs-update-modal/gs-update-modal.jsx';

import {
    closeUpdate
} from '../reducers/modals';

class GsUpdateModal extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleCancel',
            'handleUpdate',
            'handleCheckLatestVersion',
        ]);
        this.state = {
            currentVersion: SEP.ele.remote.app.getVersion(),
            latestVersion: '',
            percent: 0,
            updateButtonDisable: false,
            updateNotAvailable: false
        };
    }

    componentDidMount () {
        const that = this;
        SEP.ele.ipcRenderer.on('check-update-reply', function(event, data) {
            if (data && data.key === 'updateAvailable') {
                that.setState({
                    latestVersion: data.info.version,
                });
            }
            if (data && data.key === 'downloadProgress') {
                that.setState({
                    percent: parseInt(data.info.percent, 10)
                });
            }
            if (data && data.key === 'updateNotAvailable') {
                that.setState({
                    updateNotAvailable: true
                });
            }
        });
    }

    handleCancel (e) {
        e.stopPropagation();
        this.props.onClose();
    }

    handleUpdate () {
        if (SEP.ele.isDev) {
            console.log("Can't run in development");
        } else {
            this.setState({
                updateButtonDisable: true,
            });
            SEP.ele.ipcRenderer.send('check-update', 'update');
        }

    }

    handleCheckLatestVersion () {
        if (SEP.ele.isDev) {
            console.log("Can't run in development");
        } else {
            SEP.ele.ipcRenderer.send('check-update', 'check');
        }
    }

    render() {
        return (
            <GsUpdateModalComponent
                updateButtonDisable={this.state.updateButtonDisable}
                updateNotAvailable={this.state.updateNotAvailable}
                currentVersion={this.state.currentVersion}
                latestVersion={this.state.latestVersion}
                percent={this.state.percent}
                onUpdate={this.handleUpdate}
                onCheckLatestVersion={this.handleCheckLatestVersion}
                onCancel={this.handleCancel}
            />
        )
    }
}

GsUpdateModal.propTypes = {
    onClose: PropTypes.func
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    onClose: () => {
        dispatch(closeUpdate());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GsUpdateModal);
