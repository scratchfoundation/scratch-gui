import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import styles from './artie-exercises.css';
import {FormattedMessage} from 'react-intl';
import Select from '../forms/select.jsx';


class ArtieExercisesComponent extends React.Component {

    constructor (props) {
        super(props);
    }

    exerciseMapper(exercises){
        var tmpExercises = [{id: "", value: ""}]
        exercises.exercises.forEach(exercise => tmpExercises.push({id: exercise.id, value: exercise.name}));
        return tmpExercises;
    }

    cancelManager(currentExercise, role){
        if(currentExercise === null && role === 0){
            return this.props.onLogout;
        }else{
            return this.props.onDeactivate;
        }
    }

    render(){
        if((this.props.artieLogin !== undefined && this.props.artieLogin.user !== null && this.props.artieLogin.user.role === 0 &&
            this.props.artieLogin.currentStudent !== null && this.props.artieExercises !== undefined && this.props.artieExercises.currentExercise === null &&
            this.props.artieLogin.currentStudent !== null && this.props.artieLogin.currentStudent.competence !== undefined && this.props.artieLogin.currentStudent.competence > 0) ||
            this.props.artieExercises.active){

            var exercises = this.exerciseMapper(this.props.artieExercises);
            var onCancel = this.cancelManager(this.props.artieExercises.currentExercise, this.props.artieLogin.user.role);

            return(
                <Modal
                    onRequestClose={onCancel}
                    className={styles.modalContent}
                    contentLabel={this.props.title}
                    id="ArtieExercises"
                >
                    <Box className={styles.body}>
                        <Box>
                            <label>
                                <FormattedMessage
                                    defaultMessage="Exercises"
                                    description="exercises"
                                    id="gui.menuBar.artie.exercises.exercises"
                                />
                                <Select
                                    autofocus={true}
                                    data={exercises}
                                    onChange={this.props.onExerciseChange}
                                />
                            </label>
                        </Box>

                        <Box className={styles.buttonRow}>
                            <button className={styles.cancelButton} onClick={onCancel}>
                                <FormattedMessage
                                        defaultMessage="Cancel"
                                        description="Button in prompt for cancelling the dialog"
                                        id="gui.menuBar.artie.exercises.cancel"
                                    />
                            </button>
                            <button className={styles.okButton} onClick={this.props.onOk}>
                                <FormattedMessage
                                        defaultMessage="OK"
                                        description="Button in prompt for confirming the dialog"
                                        id="gui.menuBar.artie.exercises.ok"
                                    />
                            </button>
                        </Box>
                    </Box>
                </Modal>
            );

        }else{
            return null;
        }
    }
}

ArtieExercisesComponent.propTypes = {
    onExerciseChange: PropTypes.func,
    onLogout: PropTypes.func,
    onDeactivate: PropTypes.func,
    title: PropTypes.string.isRequired,
    artieExercises: PropTypes.object
};
export default ArtieExercisesComponent;
