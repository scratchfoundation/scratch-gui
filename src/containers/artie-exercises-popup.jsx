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

const exerciseComponent = (onCancel, type) => {
    return (
        <ArtiePopupComponent
            onCancel={onCancel}
            type = {type}
            messages = {exercisesMessages}
            okButton = {false}
            cancelButton = {false}
        />
    );
}

const solutionComponent = (onCancel, type) => {
    return(
        <ArtiePopupComponent
            onCancel={onCancel}
            type = {type}
            messages = {solutionMessages}
            okButton = {false}
            cancelButton = {false}
        />
    );
}

const evaluationComponent = (onCancel, onOK, type, image, messages) => {
    return(
        <ArtiePopupComponent
            onCancel={onCancel}
            onOK={onOK}
            type = {type}
            messages = {messages}
            okButton = {true}
            cancelButton = {false}
            image={image}
        />
    );
}

class ArtieExercisePopup extends React.Component {
    constructor (props) {
        super(props);
    }

    //Function to determine the type of popup to show
    popupType(login, exercises){
        if( exercises !== undefined && exercises !== null && exercises.popupExercise){
            return 'exercise';
        }else if(exercises !== undefined && exercises !== null && exercises.popupSolution){
            return 'solution';
        }else if(login !== undefined && login !== null && login.currentStudent !== undefined && login.currentStudent !==null &&
                (login.currentStudent.competence == undefined || login.currentStudent.competence === 0) &&
                (exercises === undefined || exercises === null || exercises.currentExercise === null)){
            return 'initialEvaluation';
        }else if(exercises !== undefined && exercises !== null && exercises.popupEvaluation){
            return 'evaluation';
        }else{
            return null;
        }
    }

    nextExercise(currentExercise, exercises){

        var nextExercise=null;

        //1- If the current exercise is null or undefined, we take the first exercise
        if((currentExercise === undefined || currentExercise === null) && exercises.length > 0){
            //Setting the current exercise
            nextExercise = exercise[0];
        }else{
            var index = exercises.findIndex(exercise => exercise.id === currentExercise.id);
            nextExercise = exercises[index + 1];
        }

        //Updating the store to set the current exercise
        this.props.setCurrentExercise(nextExercise);
        return nextExercise;
    }

    render () {

        var type = this.popupType(this.props.artieLogin, this.props.artieExercises);

        if( type === 'exercise'){
            return exerciseComponent(this.props.onCancel, type);
        }else if(type === 'solution'){
            return solutionComponent(this.props.onCancel, type)
        }else if(type === 'initialEvaluation'){

            if(this.props.artieExercises === undefined || this.props.artieExercises === null || this.props.artieExercises.currentExercise === null){
                var image = require('../../static/ThreeJedi.jpg');
                return evaluationComponent(this.props.onCancel, this.props.onCancel, type, image, initialEvaluationMessages);
            }else{
                var image = require('../../static/ThreeJedi.jpg');
                return evaluationComponent(this.props.onCancel, this.props.onCancel, type, image, initialEvaluationMessages);
            }
        }else{
            return null;
        }
    }
}

ArtieExercisePopup.propTypes = {
    onCancel: PropTypes.func.isRequired,
    artieExercises: PropTypes.object,
    setCurrentExercise: PropTypes.func,
    artieLogin: PropTypes.object
}

export default injectIntl(ArtieExercisePopup);
