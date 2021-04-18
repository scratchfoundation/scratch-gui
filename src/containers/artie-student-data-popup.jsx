import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {defineMessages, injectIntl} from "react-intl";
import {compose} from "redux";
import {connect} from "react-redux";

import ArtieStudentDataPopupComponent from '../components/artie-student-data/artie-student-data-popup.jsx';
import {updateStudentData} from "../lib/artie-api";
import {artieSetCurrentStudent} from "../reducers/artie-login";

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



class ArtieStudentDataPopup extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            gender: 0
        };
        bindAll(this, [
            'handleOnGenderChange',
            'handleOnOkClick',
            'handleStudentUpdated',
            'handleOnCancelClick'
        ]);
    }

    //Handler when the gender has been changed
    handleOnGenderChange(e){
        this.state.gender = e;
    }

    handleOnOkClick(){
        updateStudentData(this.props.student.id, this.state.gender, this.handleStudentUpdated);
    }
    handleStudentUpdated(){
        this.props.student.gender = this.state.gender;
        this.props.onArtieSetCurrentStudent(this.props.student);
    }

    handleOnCancelClick(){}

    render () {
        let showGender = (!this.props.student.gender === undefined || this.props.student.gender === 0);

        //If we want the user fills the personal data
        if(showGender) {

            let responsesGender = [
                this.props.intl.formatMessage(gender.boy),
                this.props.intl.formatMessage(gender.girl)
            ];

            return (
                <ArtieStudentDataPopupComponent
                    onOk={this.handleOnOkClick}
                    onCancel={this.handleOnCancelClick}
                    genderResponses={responsesGender}
                    onGenderChange={this.handleOnGenderChange}
                    showGender={showGender}
                    title='Student Data'
                />
            );
        }else{
            return null;
        }
    }
}

const mapDispatchToProps = dispatch => ({
    onArtieSetCurrentStudent: (currentStudent) => dispatch(artieSetCurrentStudent(currentStudent))
});


ArtieStudentDataPopup.propTypes = {
    student: PropTypes.object.isRequired
}

export default compose(
    injectIntl,
    connect(
        null,
        mapDispatchToProps
    )
)(ArtieStudentDataPopup);
