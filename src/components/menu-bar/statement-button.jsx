import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button/button.jsx';

import styles from './request-help-button.css';


const StatementButton = ({
    className,
    onClick
}) => (
    <Button
        className={classNames(
            className,
            styles.selectExerciseButton
        )}
        onClick={onClick}
    >
        <FormattedMessage
            defaultMessage="Show Statement"
            description="Show Statement"
            id="gui.menuBar.artie.showStatement"
        />
    </Button>
);

StatementButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
};

StatementButton.defaultProps = {
    onClick: () => {}
};

export default StatementButton;
