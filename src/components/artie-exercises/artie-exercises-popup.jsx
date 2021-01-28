import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';

import styles from './artie-exercises-popup.css';
import {defineMessages, FormattedMessage, injectIntl} from 'react-intl';

const messages = defineMessages({
    artieExercisesPopupModalTitle: {
        defaultMessage: 'ARTIE',
        description: 'ARTIE',
        id: 'gui.menuBar.artie.exercises.popup.modalTitle'
    }
});

class ArtieExercisesPopupComponent extends React.Component {

    constructor(props){
        super(props);
    }

    render(){

        const exerciseMessage = <FormattedMessage
                                    defaultMessage='The exercise has been sent successfully!'
                                    description='The exercise has been sent successfully!'
                                    id='gui.artie.exercise.sent'
                                />

        const solutionMessage = <FormattedMessage
                                    defaultMessage='The solution has been sent successfully!'
                                    description='The solution has been sent successfully!'
                                    id='gui.artie.solution.sent'
                                />

        return(
            <Modal
                className={styles.modalContentCongrats}
                onRequestClose={this.props.onCancel}
                id="ArtieExercisePopup"
                contentLabel={this.props.intl.formatMessage(messages.artieExercisesPopupModalTitle)}
            >
                <Box
                    className={styles.labelCongrats}
                >
                    {this.props.type == 'exercise' ? exerciseMessage : solutionMessage }
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
