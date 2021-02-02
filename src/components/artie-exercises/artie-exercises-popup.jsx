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

                { (this.props.okButton || this.props.cancelButton) ?
                    <Box className={styles.buttonRow}>

                        {this.props.okButton ?
                            <button className={styles.cancelButton} onClick={this.props.onCancel}>
                                <FormattedMessage
                                        defaultMessage="Cancel"
                                        description="Button in prompt for cancelling the dialog"
                                        id="gui.menuBar.artie.exercises.cancel"
                                    />
                            </button>
                        :  null }

                        {this.props.cancelButton ?
                            <button className={styles.okButton} onClick={this.props.onOk}>
                                <FormattedMessage
                                        defaultMessage="OK"
                                        description="Button in prompt for confirming the dialog"
                                        id="gui.menuBar.artie.exercises.ok"
                                    />
                            </button>
                        : null }

                    </Box>
                : null}
            </Modal>
        );
    }
}

ArtieExercisesPopupComponent.propTypes = {
    onCancel: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
    okButton: PropTypes.bool.isRequired,
    cancelButton: PropTypes.bool.isRequired
};

export default injectIntl(ArtieExercisesPopupComponent);
