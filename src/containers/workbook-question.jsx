import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import { connect } from 'react-redux';

import WorkbookQuestionComponent from '../components/workbook-question/workbook-question.jsx';

class WorkbookQuestion extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        const {
            question,
            ...props
        } = this.props;

        return (
            <WorkbookQuestionComponent
                {...props}
                question={question}
            />
        );
    }
}

WorkbookQuestion.propTypes = {
    question: PropTypes.string,
    vm: PropTypes.instanceOf(VM)
}

export default WorkbookQuestion;
