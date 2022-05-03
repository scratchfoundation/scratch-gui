import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import VM from 'scratch-vm';

import Modal from '../../containers/modal.jsx';
import Box from '../box/box.jsx';

import Spinner from '../spinner/spinner.jsx';
import Controls from '../../containers/controls.jsx';


import styles from './preview.css';


class Preview extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClose',
        ]);
        this.state = {
            loaded: false
        };


    }
    componentDidMount () {
        // Allow the spinner to display before loading the content
        setTimeout(() => {
            this.setState({loaded: true});
        });
        // if (this.props.setStopHandler) this.props.setStopHandler(this.handlePlayingEnd);
    }

    handleClose () {
        this.props.onRequestClose();
    }

    render () {
        return (
            <Modal
                fullScreen
                contentLabel={this.props.title}
                id={this.props.id}
                onRequestClose={this.handleClose}
            >
                <Box style={{position: 'fixed', bottom: "10px", right: "10px"}}>
                    <Controls vm={this.props.vm}></Controls>
                </Box>
            </Modal>
        );
    }
}

Preview.propTypes = {
    id: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    onRequestClose: PropTypes.func,
    title: PropTypes.string.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default injectIntl(Preview);
