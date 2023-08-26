import React from "react";
import PropTypes from "prop-types";

import WorkbookResultComponent from "../components/workbook-result/workbook-result.jsx";
import { connect } from "react-redux";

class WorkbookResult extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        const {
            isAnswered,
        } = this.props;

        return ( isAnswered ? (
            <WorkbookResultComponent />
        ) : null);
    }
}

WorkbookResult.propTypes = {
    isAnswered: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAnswered: !state.scratchGui.workbook.answering,
});

export default connect(mapStateToProps)(WorkbookResult);
