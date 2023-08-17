import React from "react";
import classNames from "classnames";
import PropTypes from 'prop-types';
import { injectIntl } from "react-intl";

import styles from "./workbook-score.css";
import scoreBar from "./score-bar.svg";

const WorkbookScore = function(props) {
    const {
        className,
        ...componentProps
    } = props;

    return (
        <div className={classNames(styles.workbookScore, className)}>
            <div className={classNames(styles.title)}>
                スコア
            </div>
            <div className={classNames(styles.score)}>
                <img 
                    className={classNames(styles.scoreBar)}
                    src={scoreBar}
                />
                <div
                    className={classNames(styles.scoreText)}
                >
                    <span>（</span>
                    <span className={classNames(styles.scoreTextBlue)}>３</span>
                    <span>＋</span>
                    <span className={classNames(styles.scoreTextRed)}>２</span>
                    <span>）</span>
                </div>
            </div>
        </div>
    );
};

WorkbookScore.propTypes = {
    className: PropTypes.string,
}

export default injectIntl(WorkbookScore);
