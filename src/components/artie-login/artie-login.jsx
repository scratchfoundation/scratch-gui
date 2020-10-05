import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import styles from './artie-login.css';
import {FormattedMessage} from 'react-intl';
import Select from '../forms/select.jsx';


class ArtieLoginComponent extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            user: null,
            students: []
        };
    }
    componentWillReceiveProps (newProps) {
        if (this.state.user !== newProps.artieLogin.user) {
            this.setState({
                user: newProps.artieLogin.user
            });
        }

        if(this.state.students !== newProps.artieLogin.students){

            var students = []
            newProps.artieLogin.students.forEach(student => students.push({id: student.id, value: student.name.concat(" ", student.lastName)}));

            this.setState({
                students: students
            });
        }
    }

    render(){
        return(
            <Modal
                onRequestClose={this.props.onCancel}
                className={styles.modalContent}
                contentLabel={this.props.title}
                id="ArtieLogin"
            >
                <Box className={styles.body}>
                    <Box>
                        <label>
                            <FormattedMessage
                                defaultMessage="Username"
                                description="Username"
                                id="gui.menuBar.artie.login.username"
                            />
                            <input
                                autoFocus
                                className={styles.variableNameTextInput}
                                onChange={this.props.onUserChange}
                                name="userName"
                                type="text"
                            />
                        </label>
                    </Box>
                    <Box>
                        <label>
                            <FormattedMessage
                                defaultMessage="Password"
                                description="Password"
                                id="gui.menuBar.artie.login.password"
                            />
                            <input
                                className={styles.variableNameTextInput}
                                onChange={this.props.onPasswordChange}
                                name="password"
                                type="password"
                            />
                        </label>
                    </Box>
                    {this.state.user !== undefined && this.state.user !== null ?
                        <Box>
                            <label>
                                <FormattedMessage
                                    defaultMessage="Student"
                                    description="student"
                                    id="gui.menuBar.artie.login.student"
                                />
                                <Select
                                    autofocus={true}
                                    data={this.state.students}
                                    onChange={this.props.onStudentChange}
                                />
                            </label>
                        </Box>
                    :
                        <div></div>
                    }
                    <Box className={styles.buttonRow}>
                        <button className={styles.cancelButton} onClick={this.props.onCancel}>
                            <FormattedMessage
                                    defaultMessage="Cancel"
                                    description="Button in prompt for cancelling the dialog"
                                    id="gui.menuBar.artie.login.cancel"
                                />
                        </button>
                        <button className={styles.okButton} onClick={this.props.onOk}>
                            <FormattedMessage
                                    defaultMessage="OK"
                                    description="Button in prompt for confirming the dialog"
                                    id="gui.menuBar.artie.login.ok"
                                />
                        </button>
                    </Box>
                </Box>
            </Modal>
        );
    }
}

ArtieLoginComponent.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onUserChange: PropTypes.func,
    onPasswordChange: PropTypes.func,
    onStudentChange: PropTypes.func,
    title: PropTypes.string.isRequired,
    students: PropTypes.array,
    user: PropTypes.object
};
export default ArtieLoginComponent;
