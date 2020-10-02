import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import styles from './artie-login.css';
import {FormattedMessage} from 'react-intl';
import Select from '../forms/select.jsx';


const ArtieLoginComponent = props =>(
    <Modal
        onRequestClose={props.onCancel}
        className={styles.modalContent}
        contentLabel={props.title}
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
                        onChange={props.onUserChange}
                        name="userName"
                        type="text"
                        value="global"
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
                        autoFocus
                        className={styles.variableNameTextInput}
                        onChange={props.onPasswordChange}
                        name="password"
                        type="password"
                        value="global"
                    />
                </label>
            </Box>
            <Box>
                <label>
                    <FormattedMessage
                        defaultMessage="Student"
                        description="student"
                        id="gui.menuBar.artie.login.student"
                    />
                    <Select
                      autofocus={true}
                      data={props.students}
                    />
                </label>
            </Box>
            <Box className={styles.buttonRow}>
                <button className={styles.cancelButton} onClick={props.onCancel}>
                    <FormattedMessage
                            defaultMessage="Cancel"
                            description="Button in prompt for cancelling the dialog"
                            id="gui.menuBar.artie.login.cancel"
                        />
                </button>
                <button className={styles.okButton} onClick={props.onOk}>
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

ArtieLoginComponent.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onUserChange: PropTypes.func,
    onPasswordChange: PropTypes.func,
    title: PropTypes.string.isRequired,
    students: PropTypes.array.isRequired
};
export default ArtieLoginComponent;
