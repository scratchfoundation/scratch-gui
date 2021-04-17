import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import ArtieStudentDataPopupComponent from '../components/artie-student-data/artie-student-data-popup.jsx';
import {defineMessages, injectIntl} from "react-intl";

const gender = defineMessages({
    boy: {
        defaultMessage: 'Boy',
        description: 'Boy',
        id: 'gui.artie.data.gender.boy'
    },
    girl: {
        defaultMessage: 'Girl',
        description: 'Girl',
        id: 'gui.artie.data.gender.girl'
    }
});

const responsesGender = [
    this.props.intl.formatMessage(gender.boy),
    this.props.intl.formatMessage(gender.girl)
];

class ArtieStudentDataPopup extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return(
            <ArtieStudentDataPopupComponent
                onOk={this.props.onOk}
                onCancel={this.props.onCancel}
                student={this.props.student}
                genderResponses={responsesGender}
            />
        );
    }
}

ArtieStudentDataPopup.propTypes = {
    student: PropTypes.object.isRequired
}

export default injectIntl(ArtieStudentDataPopup);
