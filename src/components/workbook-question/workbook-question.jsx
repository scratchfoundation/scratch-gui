import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import { connect } from 'react-redux';

import styles from "./workbook-question.css";

const WorkbookQuestion = function(props) {
    const {
        question,
        className,
        ...componentProps
    } = props;

    return (
        <div
            className={classNames(styles.workbookQuestionContainer, className)}
        >
            <div className={classNames(styles.title)}>
                もんだい
            </div>
            <div className={classNames(styles.question)}>
                {question}
            </div>
        </div>
    );
};

WorkbookQuestion.propTypes = {
    question: PropTypes.string,
    className: PropTypes.string,
};

const mapStateToProps = state => ({
    question: state.scratchGui.workbook.question.question,
});

export default injectIntl(connect(
    mapStateToProps,
)(WorkbookQuestion));
