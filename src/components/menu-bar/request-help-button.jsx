import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button/button.jsx';

import styles from './request-help-button.css';


const RequestHelpButton = ({
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
            defaultMessage="Request help"
            description="Menu bar item for requesting help"
            id="gui.menuBar.artie.requestHelp"
        />
    </Button>
);

RequestHelpButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
};

RequestHelpButton.defaultProps = {
    onClick: () => {}
};

export default RequestHelpButton;
