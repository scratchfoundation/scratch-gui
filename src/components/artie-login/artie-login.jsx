import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import styles from './artie-login.css';
import {FormattedMessage} from 'react-intl';


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
                        name="password"
                        type="password"
                        value="global"
                    />
                </label>
            </Box>
            <Box className={styles.buttonRow}>
                <button className={styles.cancelButton}>
                    <FormattedMessage
                            defaultMessage="Cancel"
                            description="Button in prompt for cancelling the dialog"
                            id="gui.menuBar.artie.login.cancel"
                        />
                </button>
                <button className={styles.okButton}>
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
    title: PropTypes.string.isRequired
};
export default ArtieLoginComponent;
