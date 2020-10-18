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

        var tmpExercises = [{id: "", value: ""}]
        props.artieExercises.exercises.forEach(exercise => tmpExercises.push({id: exercise.id, value: exercise.name}));

        this.state = {
            exercises: tmpExercises
        };
    }

    render(){
        return(
            <Modal
                onRequestClose={this.props.onCancel}
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
                                data={this.state.exercises}
                                onChange={this.props.onExerciseChange}
                            />
                        </label>
                    </Box>

                    <Box className={styles.buttonRow}>
                        <button className={styles.cancelButton} onClick={this.props.onCancel}>
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
    }
}

ArtieExercisesComponent.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onExerciseChange: PropTypes.func,
    title: PropTypes.string.isRequired,
    artieExercises: PropTypes.object
};
export default ArtieExercisesComponent;
