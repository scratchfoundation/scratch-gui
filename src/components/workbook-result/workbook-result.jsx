import React from "react";
import classNames from "classnames";
import PropTypes from 'prop-types';
import { injectIntl } from "react-intl";

import styles from "./workbook-result.css";
import WorkbookScore from "../workbook-score/workbook-score.jsx";
import WorkbookReport from "../workbook-report/workbook-report.jsx";

const WorkbookResult = function(props) {
    const {
        className,
        ...componentProps
    } = props;

    return (
        <div className={classNames(styles.workbookResult, className)}>
            <WorkbookScore className={classNames(styles.score)} />
            <div className={classNames(styles.reportContainer)}>
                <WorkbookReport
                    className={classNames(styles.report)}
                    title="できた！"
                    items={["ものをせってい", "ものをうごかす"]}
                />
                <WorkbookReport
                    className={classNames(styles.report)}
                    title="にがて？"
                    items={["ほうこうのせってい", "きょりのせってい"]}
                />
            </div>
        </div>
    );
};

WorkbookResult.propTypes = {
    className: PropTypes.string,
}

export default injectIntl(WorkbookResult);
