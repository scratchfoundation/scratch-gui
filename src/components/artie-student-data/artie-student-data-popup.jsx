import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import styles from './artie-student-data-popup.css';
import {FormattedMessage, injectIntl} from 'react-intl';
import Select from '../forms/select.jsx';



const genderComponent = (onGenderChange, genderResponses) => {

    return(
        <Box>
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
        </Box>
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
                {this.props.showGender ?
                    genderComponent(this.props.onGenderChange, this.props.genderResponses)
                : null}
            </Modal>
        );
    }
};

ArtieStudentDataPopupComponent.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func,
    title: PropTypes.string.isRequired,
    showGender: PropTypes.bool.isRequired,
    genderResponses: PropTypes.object,
    onGenderChange: PropTypes.func
};
export default ArtieStudentDataPopupComponent;
