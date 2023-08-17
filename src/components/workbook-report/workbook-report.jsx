import React from "react";
import classNames from "classnames";
import PropTypes from 'prop-types';
import { injectIntl } from "react-intl";

import styles from "./workbook-report.css";

const WorkbookReport = function (props) {
    const {
        className,
        ...componentProps
    } = props;

    return (
        <div className={classNames(styles.workbookReport, className)}>
            <div className={classNames(styles.title)}>
                {props.title}
            </div>
            <div className={classNames(styles.items)}>
                {props.items.map((item, index) => (
                    <div key={index} className={classNames(styles.item)}>
                        ・{item}
                    </div>
                ))}
            </div>
        </div>
    );
};

WorkbookReport.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string),
}

export default injectIntl(WorkbookReport);
