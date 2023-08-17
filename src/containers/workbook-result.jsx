import React from "react";
import PropTypes from "prop-types";
import VM from "scratch-vm";

import WorkbookResultComponent from "../components/workbook-result/workbook-result.jsx";

class WorkbookResult extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <WorkbookResultComponent />
        );
    }
}

export default WorkbookResult;
