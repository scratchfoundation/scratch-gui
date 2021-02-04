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

const initialEvaluationMessages = defineMessages({
    popupModalTitle: {
        defaultMessage: 'Welcome',
        description: 'Welcome',
        id: 'gui.artie.evaluation.welcome'
    },
    message: {
        defaultMessage: "Welcome!In first place we will check your knowledge about Scratch! Let's see if you are a Padawan, Jedi or Master Jedi in Scratch.",
        description: "Welcome!In first place we will check your knowledge about Scratch! Let's see if you are a Padawan, Jedi or Master Jedi in Scratch.",
        id: 'gui.artie.evaluation.intro'
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
                    okButton = {false}
                    cancelButton = {false}
                />
            );
        }else if(this.props.type == 'solution'){
            return(
                <ArtiePopupComponent
                    onCancel={this.props.onCancel}
                    type = {this.props.type}
                    messages = {solutionMessages}
                    okButton = {false}
                    cancelButton = {false}
                />
            );
        }else if(this.props.type == 'initialEvaluation'){
            if(this.props.artieExercises === undefined || this.props.artieExercises === null || this.props.artieExercises.currentExercise === null){
                var image = require('../../static/ThreeJedi.jpg');
                return(
                    <ArtiePopupComponent
                        onCancel={this.props.onCancel}
                        type = {this.props.type}
                        messages = {initialEvaluationMessages}
                        okButton = {true}
                        cancelButton = {false}
                        type = {this.props.type}
                        image={image}
                    />
                );
            }else{
                return(
                    <ArtiePopupComponent
                        onCancel={this.props.onCancel}
                        type = {this.props.type}
                        messages = {initialEvaluationMessages}
                        okButton = {true}
                        cancelButton = {false}
                    />
                );
            }
        }
    }
}

ArtieExercisePopup.propTypes = {
    onCancel: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    artieExercises: PropTypes.object
}

export default injectIntl(ArtieExercisePopup);
