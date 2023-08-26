import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Button from '../button/button.jsx';

import styles from './workbook-answer.css';

const WorkbookAnswer = function(props) {
    const {
        isAnswering,
        description,
        className,
        onAnswerClick,
        onSurrenderClick,
        onNextClick,
        ...componentProps
    } = props;

    return (
        <div
            className={classNames(styles.workbookAnswerContainer, className)}
        >
            { isAnswering ? (
                <div className={classNames(styles.answeringContainer)}>
                    <Button 
                        className={classNames(styles.button, styles.surrenderButton)}
                        onClick={onSurrenderClick}
                    >
                        こうさん
                    </Button>
                    <Button
                        className={classNames(styles.button, styles.runButton)}
                        onClick={onAnswerClick}
                    >
                        じっこう
                    </Button>
                </div>
            ) : (
                <div className={classNames(styles.answeredContainer)}>
                    <div className={classNames(styles.explanationContainer)}>
                        <div className={classNames(styles.title)}>
                            かいせつ
                        </div>
                        <div className={classNames(styles.description)}>
                            {description}
                        </div>
                    </div>
                    <div className={classNames(styles.nextButtonContainer)}>
                        <Button
                            className={classNames(styles.button, styles.nextButton)}
                            onClick={onNextClick}
                        >
                            つぎ
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

WorkbookAnswer.propTypes = {
    isAnswering: PropTypes.bool.isRequired,
    description: PropTypes.string,
    className: PropTypes.string,
    onAnswerClick: PropTypes.func.isRequired,
    onSurrenderClick: PropTypes.func.isRequired,
    onNextClick: PropTypes.func.isRequired
};

export default injectIntl(WorkbookAnswer);
