import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './spinner.css';

const SpinnerComponent = function (props) {
    const {
        className,
        small
    } = props;
    return (
        <div
            className={classNames(
                className,
                styles.spinner,
                {[styles.small]: small}
            )}
        />
    );
};
SpinnerComponent.propTypes = {
    className: PropTypes.string,
    small: PropTypes.bool
};
SpinnerComponent.defaultProps = {
    className: ''
};
export default SpinnerComponent;
