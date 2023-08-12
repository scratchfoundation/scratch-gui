import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Button from '../button/button.jsx';

import styles from './workbook-answer.css';

const WorkbookAnswer = function(props) {
    const {
        description,
        className,
        ...componentProps
    } = props;

    return (
        <div
            className={classNames(styles.workbookAnswerContainer, className)}
        >
            <div className={classNames(styles.buttonsContainer)}>
                <Button className={classNames(styles.runButton)}>
                    じっこう
                </Button>
                <Button className={classNames(styles.surrenderButton)}>
                    こうさん
                </Button>
                <Button className={classNames(styles.nextButton)}>
                    つぎ
                </Button>
            </div>
            <div>
                <div className={classNames(styles.title)}>
                    かいせつ：
                </div>
                <div className={classNames(styles.description)}>
                    {description}
                </div>
            </div>
        </div>
    );
}

WorkbookAnswer.propTypes = {
    description: PropTypes.string,
    className: PropTypes.string,
};

export default injectIntl(WorkbookAnswer);
