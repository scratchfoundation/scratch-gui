import bindAll from "lodash.bindall";
import PropTypes from "prop-types"
import React from "react";
import VM from 'scratch-vm'
import { connect } from 'react-redux'

import WorkbookAnswerComponent from "../components/workbook-answer/workbook-answer.jsx"

class WorkbookAnswer extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        const {
            description,
            ...props
        } = this.props;

        return (
            <WorkbookAnswerComponent
                {...props}
                description={description}
            />
        );
    }
}

WorkbookAnswer.propTypes = {
    description: PropTypes.string,
    vm: PropTypes.instanceOf(VM)
}

export default WorkbookAnswer;
