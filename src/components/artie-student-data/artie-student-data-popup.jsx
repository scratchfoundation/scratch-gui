import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import styles from './artie-student-data-popup.css';
import {FormattedMessage, injectIntl} from 'react-intl';
import Select from '../forms/select.jsx';



const genderComponent = (onGenderChange, responses) => {

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
                    data={responses}
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
        return null;
    }
}

ArtieStudentDataPopupComponent.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func,
    title: PropTypes.string.isRequired,
    student: PropTypes.object,
    genderResponses: PropTypes.object
};
export default ArtieStudentDataPopupComponent;
