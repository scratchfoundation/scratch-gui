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

const motherTongue = defineMessages({
    yes: {
        defaultMessage: 'Yes',
        description: 'Yes',
        id: 'gui.artie.yes'
    },
    no: {
        defaultMessage: 'No',
        description: 'No',
        id: 'gui.artie.no'
    }
});



class ArtieStudentDataPopup extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            gender: 1,
            motherTongue: 2
        };
        bindAll(this, [
            'handleOnGenderChange',
            'handleOnMotherTongueChange',
            'handleOnOkClick',
            'handleStudentUpdated',
            'handleOnCancelClick'
        ]);

        this.responsesGender = [{id: 1,  value: this.props.intl.formatMessage(gender.boy)}, {id: 2, value: this.props.intl.formatMessage(gender.girl)}];
        this.responsesMotherTongue = [{id: 2, value: this.props.intl.formatMessage(motherTongue.yes)}, {id: 1, value: this.props.intl.formatMessage(motherTongue.no)}];
    }

    //Handler when the gender has been changed
    handleOnGenderChange(e){
        this.state.gender = e.target.value;
    }

    //Handler when the mother tongue has been changed
    handleOnMotherTongueChange(e){
        this.state.motherTongue = e.target.value;
    }

    handleOnOkClick(){
        if(this.state.gender !== null || this.state.motherTongue !== null) {
            updateStudentData(this.props.student.id, this.state.gender, this.state.motherTongue, this.handleStudentUpdated);
        }
    }
    handleStudentUpdated(){
        this.props.student.gender = this.state.gender;
        this.props.student.motherTongue = this.state.motherTongue;
        this.props.onArtieSetCurrentStudent(this.props.student);
    }

    handleOnCancelClick(){}

    render () {

        let showGender = (this.props.student.gender === undefined || this.props.student.gender === 0);
        let showMotherTongue = (this.props.student.motherTongue === undefined  || this.props.student.motherTongue === 0);

        if(showGender || showMotherTongue) {
            return (
                <ArtieStudentDataPopupComponent
                    onOk={this.handleOnOkClick}
                    onCancel={this.handleOnCancelClick}
                    genderResponses={this.responsesGender}
                    onGenderChange={this.handleOnGenderChange}
                    showGender={showGender}
                    showMotherTongue={showMotherTongue}
                    motherTongueResponses={this.responsesMotherTongue}
                    onMotherTongueChange={this.handleOnMotherTongueChange}
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
