import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button/button.jsx';

import styles from './select-exercise-button.css';


const SelectExerciseButton = ({
    className,
    onClick,
    isExerciseSelected,
    isEvaluation
}) => (
    <Button
        className={classNames(
            className,
            styles.selectExerciseButton
        )}
        onClick={onClick}
    >
        {isEvaluation ?
            <FormattedMessage
                defaultMessage="Exit from the test"
                description="Exit from the test"
                id="gui.menuBar.artie.exitEvaluation"
            />
        :
            isExerciseSelected ?
                <FormattedMessage
                    defaultMessage="Change exercise"
                    description="Menu bar item for select an exercise"
                    id="gui.menuBar.artie.changeExercise"
                />
            :
                <FormattedMessage
                    defaultMessage="Select exercise"
                    description="Menu bar item for select an exercise"
                    id="gui.menuBar.artie.selectExercise"
                />
    }
    </Button>
);

SelectExerciseButton.propTypes = {
    className: PropTypes.string,
    isExerciseSelected: PropTypes.bool,
    onClick: PropTypes.func
};

SelectExerciseButton.defaultProps = {
    onClick: () => {}
};

export default SelectExerciseButton;
