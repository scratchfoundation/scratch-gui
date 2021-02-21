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
            students: [],
            error: null
        };
    }
    componentWillReceiveProps (newProps) {
        if (this.state.user !== newProps.artieLogin.user) {
            this.setState({
                user: newProps.artieLogin.user
            });
        }

        if(this.state.students !== newProps.artieLogin.students){

            var students = [{id: "", value: ""}]
            newProps.artieLogin.students.forEach(student => {

                if(student.studentNumber !== undefined && student.studentNumber !== null && student.studentNumber !== "" ){
                    students.push({id: student.id, value: student.studentNumber})
                }else{
                    students.push({id: student.id, value: student.name.concat(" ", student.lastName)})
                }
            });

            this.setState({
                students: students
            });
        }

        if (this.state.error !== newProps.artieLogin.error) {
            this.setState({
                error: newProps.artieLogin.error
            });
        }
    }

    render(){

        if(this.props.artieLogin === null || this.props.artieLogin === undefined || this.props.artieLogin.user===null || 
            (this.props.artieLogin.user.role === 0 && this.props.artieLogin.currentStudent === null) || this.props.artieLogin.active){
            return(
                <Modal
                    onRequestClose={this.props.onCancel}
                    className={styles.modalContent}
                    contentLabel={this.props.title}
                    id="ArtieLogin"
                >
                    <Box className={styles.body}>
                        <Box>
                            {this.state.error !== "" ?
                                <div className={styles.statusMessage}>
                                    {this.state.error}
                                </div>
                            :
                                <div></div>
                            }
                        </Box>
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
        }else{
            return null;
        }
    }
}

ArtieLoginComponent.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onUserChange: PropTypes.func,
    onPasswordChange: PropTypes.func,
    onStudentChange: PropTypes.func,
    title: PropTypes.string.isRequired,
    students: PropTypes.array,
    artieLogin: PropTypes.object,
    error: PropTypes.string
};
export default ArtieLoginComponent;
