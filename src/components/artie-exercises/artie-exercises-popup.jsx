import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';

import styles from './artie-exercises-popup.css';
import {injectIntl, FormattedMessage} from 'react-intl';



class ArtieExercisesPopupComponent extends React.Component {

    constructor(props){
        super(props);
    }

    classNameChooser(){

        switch(this.props.type){
            case 'normal':
                return styles.modalContentCongrats;
            case 'initialEvaluation':
                return styles.modalContentEvaluation;
            case 'evaluation':
                return styles.modalContentEvaluation;
            case 'evaluationStop':
                return styles.modalContentEvaluation;
            default:
                return styles.modalContentCongrats;
        }
    }

    render(){

        return(
            <Modal
                className={this.classNameChooser()}
                onRequestClose={this.props.onCancel}
                id="ArtieExercisePopup"
                contentLabel={this.props.intl.formatMessage(this.props.messages.popupModalTitle)}
            >
                <Box className={styles.body}>
                    <Box className={styles.textBody}>
                        {this.props.image !== undefined && this.props.image !== null ?
                            <div>
                                <img src={this.props.image} className={styles.image} />
                            </div>
                        : null}
                        <div>
                            <div className={styles.mainText}>
                                {this.props.intl.formatMessage(this.props.messages.message)}
                            </div>
                            {this.props.customBodyMessage !== undefined ?
                                <div className={styles.customTextBody}>
                                    {this.props.customBodyMessage}
                                </div>
                            : null}
                        </div>
                    </Box>

                    { (this.props.okButton || this.props.cancelButton) ?
                        <Box className={styles.buttonRow}>

                            {this.props.cancelButton ?
                                <button className={styles.cancelButton} onClick={this.props.onCancel}>
                                    <FormattedMessage
                                            defaultMessage="Cancel"
                                            description="Button in prompt for cancelling the dialog"
                                            id="gui.menuBar.artie.exercises.cancel"
                                        />
                                </button>
                            :  null }

                            {this.props.okButton ?
                                <button className={styles.okButton} onClick={this.props.onOK}>
                                    <FormattedMessage
                                            defaultMessage="OK"
                                            description="Button in prompt for confirming the dialog"
                                            id="gui.menuBar.artie.exercises.ok"
                                        />
                                </button>
                            : null }

                        </Box>
                    : null}

                </Box>
            </Modal>
        );
    }
}

ArtieExercisesPopupComponent.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onOK: PropTypes.func,
    type: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
    customBodyMessage: PropTypes.string,
    okButton: PropTypes.bool.isRequired,
    cancelButton: PropTypes.bool.isRequired,
    image: PropTypes.string
};

export default injectIntl(ArtieExercisesPopupComponent);
