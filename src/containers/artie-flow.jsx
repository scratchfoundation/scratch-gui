import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';

import ArtieLogin from "../components/artie-login/artie-login.jsx";
import ArtieStudentData from "./artie-student-data-popup.jsx";
import ArtieExercises from "../components/artie-exercises/artie-exercises.jsx";
import ArtieHelp from "./artie-help.jsx";
import ArtieExercisePopup from "./artie-exercises-popup.jsx";
import {
    artieError,
    artieLogged,
    artieLogout,
    artieSetCurrentStudent,
    artieSetStudents,
    deactivateArtieLogin
} from "../reducers/artie-login";
import {getAllArtieExercises, getArtieExercises, getArtieStudents, loginArtie} from "../lib/artie-api";
import {
    artieSetExercises,
    deactivateArtieExercises,
    artieSetCurrentExercise,
    artieClearHelp,
    artieHelpReceived,
    artiePopupStatement
} from "../reducers/artie-exercises";
import {compose} from "redux";
import {injectIntl} from "react-intl";


//--- Login Component variables
let userLogin = null;
let passwordLogin = null;
let studentLogin = null;
let exerciseId = null;

class ArtieFlow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            artieLoginComponent: false,
            artieStudentDataComponent: false,
            artieExercisesComponent: false,
            artieHelpComponent: false,
            artiePopupComponent: false
        };
        bindAll(this, [
            'flow',
            'getCurrentStudent',
            'getCurrentExercise',
            'getPopupActivation',
            'handleArtieUserChange',
            'handleArtiePasswordChange',
            'handleArtieStudentChange',
            'handleClickArtieLoginOk',
            'handleArtieLogged',
            'handleArtieExerciseChange',
            'handleClickArtieExercisesOk'
        ]);
    }

    componentWillMount() {
        this.flow(this.props, this.state);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        this.flow(nextProps, nextState);
        return true;
    }

    flow(nextProps, nextState){

        let artieLoginComponent = nextState.artieLoginComponent;
        let artieStudentDataComponent = nextState.artieStudentDataComponent;
        let artieExercisesComponent = nextState.artieExercisesComponent;
        let artieHelpComponent = nextState.artieHelpComponent;
        let artiePopupComponent = nextState.artiePopupComponent;
        let changes = false;

        const currentExercise = this.getCurrentExercise(nextProps.artieExercises);
        const currentStudent = this.getCurrentStudent(nextProps.artieLogin);
        const popupActivation = this.getPopupActivation(nextProps.artieExercises);


        //1- Checks if we must show the login component or not
        if(!nextState.artieLoginComponent){
            if(nextProps.artieLogin !== undefined &&
                (nextProps.artieLogin.user === undefined || nextProps.artieLogin.user === null ||
                    (nextProps.artieLogin.user.role === 0 && nextProps.artieLogin.students ===[])))
            {
                artieLoginComponent = true;
                artieStudentDataComponent = false;
                artieExercisesComponent = false;
                artieHelpComponent = false;
                artiePopupComponent = false;
                changes = true;
            }
        }else{
            if(nextState.artieLoginComponent &&
                (nextProps.artieLogin.user !== undefined &&
                    nextProps.artieLogin.user !== null &&
                    (nextProps.artieLogin.user.role === 1 || nextProps.artieLogin.currentStudent !== null)))
            {
                artieLoginComponent = false;
                changes = true;
            }
        }

        //2- Checks if we must show the student data component or not
        if(!nextState.artieStudentDataComponent && !nextState.artieLoginComponent){
            if(currentStudent !== null && currentStudent !== undefined &&
                (currentStudent.gender === undefined || currentStudent.gender===0 || currentStudent.motherTongue===0 ||
                 currentStudent.age === undefined || currentStudent.age ===0)){
                artieLoginComponent = false;
                artieStudentDataComponent = true;
                artieExercisesComponent = false;
                artieHelpComponent = false;
                artiePopupComponent = false;
                changes = true;
            }
        }else if(nextState.artieStudentDataComponent){
            if(currentStudent !== null && currentStudent !== undefined && currentStudent.gender !== undefined && currentStudent.gender > 0 &&
               currentStudent.motherTongue !== undefined && currentStudent.motherTongue > 0 && currentStudent.age !== undefined && currentStudent.age > 0){
                artieStudentDataComponent = false;
                changes = true;
            }
        }

        //3- Checks if we must show the exercises component or not
        if(!nextState.artieExercisesComponent && !nextState.artieHelpComponent && !nextState.artieStudentDataComponent){
            if(((currentStudent !== null && currentStudent.competence > 0) || nextProps.artieExercises.active) && !popupActivation){

                artieLoginComponent = false;
                artieStudentDataComponent = false;
                artieExercisesComponent = true;
                artieHelpComponent = false;
                artiePopupComponent = false;
                changes = true;
            }
        }else if(nextState.artieExercisesComponent){
            if(((currentStudent === null || currentStudent.competence === 0) && !nextProps.artieExercises.active) || popupActivation) {
                artieExercisesComponent = false;
                changes = true;
            }
        }

        //4- Checks if we must show the help component or not
        if(!nextState.artieHelpComponent){
            if(currentStudent !== null && currentExercise !== null && nextProps.artieExercises.help !== undefined && nextProps.artieExercises.help !== null &&
                nextProps.artieExercises.help.nextSteps !== null && nextProps.artieExercises.help.totalDistance > 0){

                artieLoginComponent = false;
                artieStudentDataComponent = false;
                artieExercisesComponent = false;
                artieHelpComponent = true;
                artiePopupComponent = false;
                changes = true;
            }
        }else if(nextState.artieHelpComponent){
            if(currentStudent === null || currentExercise === null || nextProps.artieExercises.help === undefined || nextProps.artieExercises.help === null ||
                nextProps.artieExercises.help.nextSteps === null){

                artieHelpComponent = false;
                changes = true;
            }
        }

        //5- Checks if we must show the popup component or not
        if(!nextState.artiePopupComponent && !nextState.artieExercisesComponent && !nextState.artieHelpComponent && !nextState.artieStudentDataComponent){
            if((currentStudent !== null && (currentStudent.competence===undefined || currentStudent.competence === 0)) || popupActivation)
            {
                artieLoginComponent = false;
                artieStudentDataComponent = false;
                artieExercisesComponent = false;
                artieHelpComponent = false;
                artiePopupComponent = true;
                changes = true;

            }else if(nextState.artiePopupComponent){
                if((currentStudent === null || (currentStudent.competence!==undefined && currentStudent.competence !== 0)) && !popupActivation)
                {
                    artiePopupComponent = false;
                }
            }
        }

        //Checks if we must do changes
        if(changes){
            this.setState({artieLoginComponent: artieLoginComponent,
                                artieStudentDataComponent: artieStudentDataComponent,
                                artieExercisesComponent: artieExercisesComponent,
                                artieHelpComponent: artieHelpComponent,
                                artiePopupComponent: artiePopupComponent
                            });
        }
    }

    /**
     * Function to get the current student
     */
    getCurrentStudent(artieLogin){
        if(artieLogin !== undefined && artieLogin !== null){
            return artieLogin.currentStudent;
        }
        else{
            return null;
        }
    }

    /**
     * Function to get the current exercise
     * @returns {null|*|null}
     */
    getCurrentExercise(artieExercises){
        if(artieExercises !== undefined && artieExercises !== null){
            return artieExercises.currentExercise;
        }else{
            return null;
        }
    }

    /**
     * Function to get if there must be the popup activated or not
     * @param artieExercises
     */
    getPopupActivation(artieExercises){
        return (artieExercises !== undefined && artieExercises !== null &&
                    (
                        artieExercises.evaluationStop ||
                        artieExercises.popupEvaluation || artieExercises.popupExercise ||
                        artieExercises.popupSolution || (artieExercises.help !== null && artieExercises.help.totalDistance === 0) ||
                        artieExercises.popupStatement
                    )
                );
    }

    //-----1- Login Component Handlers---------
    handleArtieUserChange(e){
        userLogin = e.target.value;
    }

    handleArtiePasswordChange(e){
        passwordLogin = e.target.value;
    }

    handleArtieStudentChange(e){
        studentLogin = e.target.value;
    }

    handleClickArtieLoginOk(){

        //If the user is not yet logged
        if(this.props.artieLogin.user===null || (this.props.artieLogin.user.role===0 && this.props.artieLogin.students===[])){
            loginArtie(userLogin, passwordLogin, this.handleArtieLogged, this.props.onArtieError);
        }else{
            if(studentLogin !== ""){
                var tempStudent = this.props.artieLogin.students.filter(s => s.id==studentLogin)[0];
                this.props.onArtieSetCurrentStudent(tempStudent);

                //If the current user is not null and the competence is already set, we show the exercises
                if(tempStudent.competence !== undefined && tempStudent.competence!==null && tempStudent.competence > 0){
                    //Get the exercises
                    getArtieExercises(userLogin, passwordLogin, false, this.props.onArtieSetExercises);
                }else{
                    //Get the evaluations
                    getArtieExercises(userLogin, passwordLogin, true, this.props.onArtieSetExercises);
                }
            }

            //And we close the login window
            this.props.onDeactivateArtieLogin();
        }
    }

    handleArtieLogged(user){

        //Gets the datetime
        const options = {year: 'numeric', month: '2-digit', day: '2-digit',
                         hour: '2-digit', minute:'2-digit', second: '2-digit',
                         timeZone: 'UTC', timeZoneName: 'short'};
        const date = new Date().toLocaleDateString('es-ES', options);
        this.props.onArtieLogged(user, date);

        //If the user role is admin, we load all the exercises (evaluations and normals)
        if(user.role !== null && user.role == 1){
            //Get all the exercises
            getAllArtieExercises(userLogin, passwordLogin, this.props.onArtieSetExercises);
        }

        //If the user is read only, we check for the students
        if(user !== null && user.role === 0){
            //We get the students
            getArtieStudents(userLogin, passwordLogin, this.props.onArtieSetStudents);
        } else if(user !== null && user.role == 1){
            //We close the login window
            this.props.onDeactivateArtieLogin();
        }
    }
    //------------------------------------

    //-----2- Exercises Component Handlers---------
    handleArtieExerciseChange(e){
        exerciseId = e.target.value;
    }

    handleClickArtieExercisesOk(){
        //Searches for the exercise object in base of the exerciseId selected
        const exercise  = this.props.artieExercises.exercises.filter(e => e.id ==exerciseId)[0];
        this.props.onArtieSetCurrentExercise(exercise);
        this.props.onDeactivateArtieExercises();

        //Shows the popup with the statement
        this.props.onArtiePopupStatement(true);
    }
    //------------------------------------


    render(){

        //1- Checks if the component must show the login component or not
        if(this.state.artieLoginComponent){
            return <ArtieLogin
                        onUserChange={this.handleArtieUserChange}
                        onPasswordChange={this.handleArtiePasswordChange}
                        onStudentChange={this.handleArtieStudentChange}
                        onCancel={this.props.onArtieLogout}
                        onOk={this.handleClickArtieLoginOk}
                        title="Login"
                        artieLogin={this.props.artieLogin}
                    />
        }

        //2- Checks if the component must show the student data component or not
        if(this.state.artieStudentDataComponent){
            return <ArtieStudentData student={this.props.artieLogin.currentStudent} />
        }

        //3- Checks if the component must show the exercise component or not
        if(this.state.artieExercisesComponent){
            return <ArtieExercises
                        title="Exercise Selector"
                        onExerciseChange={this.handleArtieExerciseChange}
                        onLogout={this.props.onArtieLogout}
                        onDeactivate={this.props.onDeactivateArtieExercises}
                        onOk={this.handleClickArtieExercisesOk}
                        artieExercises = {this.props.artieExercises}
                        artieLogin = {this.props.artieLogin}
                    />
        }

        //4- Checks if the component must show the help component or not
        if(this.state.artieHelpComponent){
            return <ArtieHelp
                        onRequestClose={this.props.onArtieClearHelp}
                        artieLogin={this.props.artieLogin}
                        artieExercises = {this.props.artieExercises}
                        help={this.props.artieExercises.help}
                    />
        }


        //5- Checks if the component must show the popup or not
        if(this.state.artiePopupComponent){
            return <ArtieExercisePopup
                        userLogin = {userLogin}
                        passwordLogin = {passwordLogin}
                    />
        }
        else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    return{
        artieLogin: state.scratchGui.artieLogin,
        artieExercises: state.scratchGui.artieExercises
    }
};

const mapDispatchToProps = dispatch => ({

    //1- Login Properties
    onArtieLogged: (user, date) => dispatch(artieLogged(user, date)),
    onArtieLogout: () => dispatch(artieLogout()),
    onArtieError: (error) => dispatch(artieError(error)),
    onDeactivateArtieLogin: () => dispatch(deactivateArtieLogin()),
    onArtieSetStudents: (students) => dispatch(artieSetStudents(students)),
    onArtieSetCurrentStudent: (currentStudent) => dispatch(artieSetCurrentStudent(currentStudent)),

    //2- Exercises properties
    onArtieSetExercises: (exercises) => dispatch(artieSetExercises(exercises)),
    onDeactivateArtieExercises: () => dispatch(deactivateArtieExercises()),
    onArtieSetCurrentExercise: (currentExercise) => dispatch(artieSetCurrentExercise(currentExercise)),
    onArtiePopupStatement: (active) => dispatch(artiePopupStatement(active)),

    //3- Help properties
    onArtieClearHelp: () => dispatch(artieClearHelp(new Date())),
    onArtieHelpReceived: (help) => dispatch(artieHelpReceived(help)),

});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(ArtieFlow);
