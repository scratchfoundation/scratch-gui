import PropTypes from 'prop-types';
import React from 'react';
import ArtiePopupComponent from '../components/artie-exercises/artie-exercises-popup.jsx';
import {defineMessages, injectIntl} from 'react-intl';

const exercisesMessages = defineMessages({
    popupModalTitle: {
        defaultMessage: 'ARTIE',
        description: 'ARTIE',
        id: 'gui.menuBar.artie.exercises.popup.modalTitle'
    },
    message: {
        defaultMessage: 'The exercise has been sent successfully!',
        description: 'The exercise has been sent successfully!',
        id: 'gui.artie.exercise.sent'
    }
});

const solutionMessages = defineMessages({
    popupModalTitle: {
        defaultMessage: 'ARTIE',
        description: 'ARTIE',
        id: 'gui.menuBar.artie.exercises.popup.modalTitle'
    },
    message: {
        defaultMessage: 'The solution has been sent successfully!',
        description: 'The solution has been sent successfully!',
        id: 'gui.artie.solution.sent'
    }
});

class ArtieExercisePopup extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        if(this.props.type == 'exercise'){
            return(
                <ArtiePopupComponent
                    onCancel={this.props.onCancel}
                    type = {this.props.type}
                    messages = {exercisesMessages}
                />
            );
        }else{
            return(
                <ArtiePopupComponent
                    onCancel={this.props.onCancel}
                    type = {this.props.type}
                    messages = {solutionMessages}
                />
            );
        }
    }
}

ArtieExercisePopup.propTypes = {
    onCancel: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
}

export default injectIntl(ArtieExercisePopup);
