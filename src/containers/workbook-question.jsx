import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';

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
            />
        );
    }
}

WorkbookQuestion.propTypes = {
    vm: PropTypes.instanceOf(VM)
}

export default WorkbookQuestion;
