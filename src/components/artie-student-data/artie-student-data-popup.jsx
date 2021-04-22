import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import styles from './artie-student-data-popup.css';
import {FormattedMessage} from 'react-intl';
import Select from '../forms/select.jsx';



const genderComponent = (onGenderChange, genderResponses) => {
    return(
        <label>
            <FormattedMessage
                defaultMessage="Are you a boy or a girl?"
                description="Are you a boy or a girl?"
                id="gui.artie.data.gender"
            />
            <Select
                autofocus={true}
                data={genderResponses}
                onChange={onGenderChange}
            />
        </label>
    );
}

const motherTongueComponent = (onMotherTongueChange, motherTongueResponses) => {
    return(
        <label>
            <FormattedMessage
                defaultMessage="Is Spanish your mother tongue?"
                description="Is Spanish your mother tongue?"
                id="gui.artie.data.motherTongue.spanish"
            />
            <Select
                autofocus={true}
                data={motherTongueResponses}
                onChange={onMotherTongueChange}
            />
        </label>
    );
}

class ArtieStudentDataPopupComponent extends React.Component {

    constructor (props) {
        super(props);
    }

    render(){
        return(
            <Modal
                onRequestClose={this.props.onCancel}
                className={styles.modalContent}
                contentLabel={this.props.title}
                id="ArtieStudentData"
            >
                <Box className={styles.body}>
                    {this.props.showGender ? genderComponent(this.props.onGenderChange, this.props.genderResponses) : null}
                    {this.props.showModerTongue ? motherTongueComponent(this.props.onMotherTongueChange, this.props.motherTongueResponses) : null}

                    <Box className={styles.buttonRow}>
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
};

ArtieStudentDataPopupComponent.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func,
    title: PropTypes.string.isRequired,
    showGender: PropTypes.bool.isRequired,
    genderResponses: PropTypes.array,
    onGenderChange: PropTypes.func,
    showMotherTongue: PropTypes.bool.isRequired,
    motherTongueResponses: PropTypes.array,
    onMotherTongueChange: PropTypes.func
};
export default ArtieStudentDataPopupComponent;
