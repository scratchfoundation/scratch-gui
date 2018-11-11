import PropTypes from 'prop-types';
import React from 'react';
import styles from './question.css';
import Input from '../forms/input.jsx';
import enterIcon from './icon--enter.svg';

const QuestionComponent = props => {
    const {
        answer,
        className,
        question,
        onChange,
        onClick,
        onKeyPress
    } = props;
    return (
        <div className={className}>
            <div className={styles.questionContainer}>
                {question ? (
                    <div className={styles.questionLabel}>{question}</div>
                ) : null}
                <div className={styles.questionInput}>
                    <Input
                        autoFocus
                        value={answer}
                        onChange={onChange}
                        onKeyPress={onKeyPress}
                    />
                    <button
                        className={styles.questionSubmitButton}
                        onClick={onClick}
                    >
                        <img
                            className={styles.questionSubmitButtonIcon}
                            draggable={false}
                            src={enterIcon}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

QuestionComponent.propTypes = {
    answer: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    question: PropTypes.string
};

export default QuestionComponent;
