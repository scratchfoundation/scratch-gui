import PropTypes from 'prop-types';
import React from 'react';
import ArtiePopupComponent from '../components/artie-exercises/artie-exercises-popup.jsx';
import {updateStudentCompetence, getArtieExercises} from '../lib/artie-api';
import {defineMessages, injectIntl} from 'react-intl';
import bindAll from 'lodash.bindall';
import {compose} from "redux";
import {connect} from "react-redux";
import {
    artieClearHelp, artieEvaluationStop, artiePopupEvaluation,
    artiePopupExercise,
    artiePopupSolution,
    artieSetCurrentExercise, artieSetExercises
} from "../reducers/artie-exercises";
import {artieSetCurrentStudent} from "../reducers/artie-login";

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

const congratulationsMessages = defineMessages({
    popupModalTitle: {
        defaultMessage: 'Congratulations',
        description: 'Congratulations',
        id: 'gui.artie.evaluation.congratulations'
    },
    message: {
        defaultMessage: "Congratulations! You have completed the exercise!",
        description: "Congratulations! you have completed the exercise!",
        id: 'gui.menuBar.artie.help.congrats'
    }
});

const padawanEvaluationMessages = defineMessages({
    popupModalTitle: {
        defaultMessage: 'Welcome to Padawan level',
        description: 'Welcome to Padawan level',
        id: 'gui.artie.evaluation.welcome.padawan'
    },
    message: {
        defaultMessage: "Welcome to Padawan level, this is the next task to complete:",
        description: "Welcome to Padawan level, this is the next task to complete:",
        id: 'gui.artie.evaluation.message.padawan'
    }
});

const jediEvaluationMessages = defineMessages({
    popupModalTitle: {
        defaultMessage: 'Welcome to Jedi level',
        description: 'Welcome to Jedi level',
        id: 'gui.artie.evaluation.welcome.jedi'
    },
    message: {
        defaultMessage: "Welcome to Jedi level, this is the next task to complete:",
        description: "Welcome to Jedi level, this is the next task to complete:",
        id: 'gui.artie.evaluation.message.jedi'
    }
});

const masterJediEvaluationMessages = defineMessages({
    popupModalTitle: {
        defaultMessage: 'Welcome to Master Jedi level',
        description: 'Welcome to Master Jedi level',
        id: 'gui.artie.evaluation.welcome.masterjedi'
    },
    message: {
        defaultMessage: "Welcome to Master Jedi level, this is the next task to complete:",
        description: "Welcome to Master Jedi level, this is the next task to complete:",
        id: 'gui.artie.evaluation.message.masterjedi'
    }
});

const exitFromEvaluation = defineMessages({
    popupModalTitle: {
        defaultMessage: 'Exit from the test',
        description: 'Exit from the test',
        id: 'gui.menuBar.artie.exitEvaluation'
    },
    message: {
        defaultMessage: "Are you sure to quit the test? Your current level is ",
        description: "Are you sure to quit the test? Your current level is ",
        id: 'gui.artie.evaluation.message.exitEvaluation'
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

const congratulationsComponent = (onCancel, type) => {
    return (
        <ArtiePopupComponent
            onCancel={onCancel}
            type = {type}
            messages = {congratulationsMessages}
            okButton = {false}
            cancelButton = {false}
        />
    );
}

const evaluationComponent = (onCancel, onOK, type, image, messages, customBodyMessage) => {
    return(
        <ArtiePopupComponent
            onCancel={onCancel}
            onOK={onOK}
            type = {type}
            messages = {messages}
            okButton = {true}
            cancelButton = {false}
            image={image}
            customBodyMessage={customBodyMessage}
        />
    );
}

const stopEvaluationComponent = (onCancel, onOK, type, image, messages, customBodyMessage) => {
    return(
        <ArtiePopupComponent
            onCancel={onCancel}
            onOK={onOK}
            type = {type}
            messages = {messages}
            okButton = {true}
            cancelButton = {true}
            image={image}
            customBodyMessage={customBodyMessage}
        />
    );
}

class ArtieExercisePopup extends React.Component {

    constructor (props) {
        super(props);
        bindAll(this, [
            'handleEvaluationOKClick',
            'nextExercise',
            'handleCloseEvaluationPopup',
            'handleEvaluationStopOKClick',
            'handleEvaluationStopCancelClick',
            'onStudentCompetenceIsUpdated',
            'onArtieExercisesLoaded',
            'handleCongratulationsCloseClick'
        ]);
    }

    getCurrentStudent(login){
        if(login !== undefined && login !== null && login.currentStudent !== undefined && login.currentStudent !== null){
            return login.currentStudent;
        }else{
            return null;
        }
    }

    //Function to determine the type of popup to show
    popupType(login, exercises){

        if(exercises !== undefined && exercises !== null && exercises.evaluationStop){
            return 'evaluationStop';
        }else if(login !== undefined && login !== null && login.currentStudent !== undefined && login.currentStudent !==null &&
            (login.currentStudent.competence === undefined || login.currentStudent.competence === 0) &&
            (exercises === undefined || exercises === null || exercises.currentExercise === null)) {
            return 'initialEvaluation';
        }else if(exercises !== undefined && exercises !== null && exercises.popupEvaluation){
            return 'evaluation';
        } else if( exercises !== undefined && exercises !== null && exercises.popupExercise){
            return 'exercise';
        }else if(exercises !== undefined && exercises !== null && exercises.popupSolution){
            return 'solution';
        }else if(exercises !== undefined && exercises.help !== null && exercises.help.totalDistance === 0){
            return 'congratulations';
        }else{
            return null;
        }
    }

    nextExercise(currentExercise, exercises){

        let nextExercise = null;

        //1- If the current exercise is null or undefined, we take the first exercise
        if((currentExercise === undefined || currentExercise === null) && exercises.length > 0){
            //Setting the current exercise
            nextExercise = exercises[0];
        }else{
            const index = exercises.findIndex(exercise => exercise.id === currentExercise.id);

            if(exercises.length > index+1){
                nextExercise = exercises[index + 1];
            }else{
                nextExercise = null;
            }
        }
        return nextExercise;
    }

    handleEvaluationOKClick(){
        const nextExercise = this.nextExercise(this.props.artieExercises.currentExercise, this.props.artieExercises.exercises);

        //Updating the store to set the current exercise
        this.props.onArtieSetCurrentExercise(nextExercise);

        //Closing this popup and showing the next one
        this.props.onArtiePopupEvaluation(true);
    }

    handleCloseEvaluationPopup(){
        //Closing this popup
        this.props.onArtiePopupEvaluation(false);
    }

    handleEvaluationStopOKClick(){

        let competence = (this.props.artieLogin.currentStudent.competence === 0 ? 1 : this.props.artieLogin.currentStudent.competence);

        //Updates the student competence
        updateStudentCompetence(this.props.artieLogin.currentStudent.id,
                                competence,
                                this.onStudentCompetenceIsUpdated);
    }

    onStudentCompetenceIsUpdated(response){
        //Updates the list of exercises, the current student and resets the current exercise
        getArtieExercises(this.props.userLogin, this.props.passwordLogin, false, this.onArtieExercisesLoaded);
        this.props.onArtieSetCurrentStudent(response);
    }

    onArtieExercisesLoaded(exercises){
        this.props.onArtieSetExercises(exercises);
        this.props.onArtieEvaluationStop(false);
        this.props.onArtieSetCurrentExercise(null);
    }

    handleEvaluationStopCancelClick(){
        this.props.onArtieEvaluationStop(false);
    }

    handleCongratulationsCloseClick(){

        //Checks if the exercise is an evaluation and if the distance is 0 we show the next exercise
        if(this.props.artieExercises !== undefined && this.props.artieExercises !== null &&
           this.props.artieExercises.currentExercise !== null && this.props.artieExercises.currentExercise.isEvaluation &&
           this.props.artieExercises.help !== null && this.props.artieExercises.help.totalDistance === 0){

            //Getting the current student to update the competence of the student
            const currentStudent = this.getCurrentStudent(this.props.artieLogin);
            if(currentStudent !== null) {

                //We update the competence with the evaluation level
                currentStudent.competence = this.props.artieExercises.currentExercise.level;
                this.props.onArtieSetCurrentStudent(currentStudent);

                const nextExercise = this.nextExercise(this.props.artieExercises.currentExercise, this.props.artieExercises.exercises);

                //Updating the store to set the current exercise
                this.props.onArtieSetCurrentExercise(nextExercise);

                //If we have a next evaluations
                if (nextExercise !== null) {
                    //Closing this popup and showing the next one
                    this.props.onArtiePopupEvaluation(true);
                }else{
                    //If we haven't next evaluations, we get all the exercises
                    getArtieExercises(this.props.userLogin, this.props.passwordLogin, false, this.props.onArtieSetExercises);
                }
            }
        }

        this.props.onArtieClearHelp();
    }

    render () {

        let image;
        let type = null;

        if(this.props.artieExercises !== null){
            type = this.popupType(this.props.artieLogin, this.props.artieExercises);
        }

        if( type === 'exercise'){
            return exerciseComponent(this.props.onCloseSentExercise, type);
        }
        else if(type === 'solution'){
            return solutionComponent(this.props.onCloseSentSolution, type)
        }
        else if(type === 'initialEvaluation'){
            image = require('../../static/ThreeJedi.jpg');
            return evaluationComponent(this.handleEvaluationOKClick, this.handleEvaluationOKClick, type, image, initialEvaluationMessages, null);
        }
        else if(type === 'evaluation'){

            //Checking if the current exercise is level 1, 2 or 3
            image = null;
            let messages = null;
            if(this.props.artieExercises.currentExercise.level === 1){
                image = require('../../static/Padawan.jpg');
                messages = padawanEvaluationMessages;
            }else if(this.props.artieExercises.currentExercise.level === 2){
                image = require('../../static/Jedi.jpg');
                messages = jediEvaluationMessages;
            }else if(this.props.artieExercises.currentExercise.level === 3){
                image = require('../../static/Master.jpg');
                messages = masterJediEvaluationMessages;
            }

            return evaluationComponent(this.handleCloseEvaluationPopup, this.handleCloseEvaluationPopup, type, image,
                                        messages, this.props.artieExercises.currentExercise.description);

        }
        else if(type === 'evaluationStop'){

            let level = "";

            //Checks the level of the student
            if(this.props.artieLogin !== null && this.props.artieLogin.currentStudent !== null && this.props.artieLogin.currentStudent.competence===0){
                level = "Padawan";
            }else if (this.props.artieLogin !== null && this.props.artieLogin.currentStudent !== null && this.props.artieLogin.currentStudent.competence===1){
                level = "Padawan";
            }else if (this.props.artieLogin !== null && this.props.artieLogin.currentStudent !== null && this.props.artieLogin.currentStudent.competence===2){
                level = "Jedi";
            }else if (this.props.artieLogin !== null && this.props.artieLogin.currentStudent !== null && this.props.artieLogin.currentStudent.competence===3){
                level = "Maestro Jedi";
            }


            image = require('../../static/ThreeJedi.jpg');
            return stopEvaluationComponent(this.handleEvaluationStopCancelClick, this.handleEvaluationStopOKClick, type,
                                            image, exitFromEvaluation, level);

        }
        else if(type === 'congratulations'){

            return congratulationsComponent(this.handleCongratulationsCloseClick, type);
        }
        else{
            return null;
        }
    }
}

ArtieExercisePopup.propTypes = {
    userLogin: PropTypes.string,
    passwordLogin: PropTypes.string
}

const mapStateToProps = (state) => {
    return{
        artieLogin: state.scratchGui.artieLogin,
        artieExercises: state.scratchGui.artieExercises
    }
};

const mapDispatchToProps = dispatch => ({
    onCloseSentSolution: () => dispatch(artiePopupSolution(false)),
    onCloseSentExercise: () => dispatch(artiePopupExercise(false)),
    onArtieSetCurrentExercise: (currentExercise) => dispatch(artieSetCurrentExercise(currentExercise)),
    onArtiePopupEvaluation: (active) => dispatch(artiePopupEvaluation(active)),
    onArtieEvaluationStop: (stop) => dispatch(artieEvaluationStop(stop)),
    onArtieSetCurrentStudent: (currentStudent) => dispatch(artieSetCurrentStudent(currentStudent)),
    onArtieSetExercises: (exercises) => dispatch(artieSetExercises(exercises)),
    onArtieClearHelp: () => dispatch(artieClearHelp())
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(ArtieExercisePopup);
