import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './spinner.css';

const SpinnerComponent = function (props) {
    const {
        className
    } = props;
    return (
        <div
            className={classNames(
                styles.spinner,
                className
            )}
        />
    );
};
SpinnerComponent.propTypes = {
    className: PropTypes.string
};
SpinnerComponent.defaultProps = {
    className: ''
};
export default SpinnerComponent;
