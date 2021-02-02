import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';

import styles from './artie-exercises-popup.css';
import {injectIntl} from 'react-intl';



class ArtieExercisesPopupComponent extends React.Component {

    constructor(props){
        super(props);
    }

    render(){

        return(
            <Modal
                className={styles.modalContentCongrats}
                onRequestClose={this.props.onCancel}
                id="ArtieExercisePopup"
                contentLabel={this.props.intl.formatMessage(this.props.messages.popupModalTitle)}
            >
                <Box
                    className={styles.labelCongrats}
                >
                    {this.props.intl.formatMessage(this.props.messages.message)}
                </Box>
            </Modal>
        );
    }
}

ArtieExercisesPopupComponent.propTypes = {
    onCancel: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
};

export default injectIntl(ArtieExercisesPopupComponent);
