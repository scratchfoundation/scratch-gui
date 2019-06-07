import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './spinner.css';

const SpinnerComponent = function (props) {
    const {
        className,
        level,
        small,
        large
    } = props;
    return (
        <div
            className={classNames(
                className,
                styles.spinner,
                styles[level],
                {
                    [styles.small]: small,
                    [styles.large]: large
                }
            )}
        />
    );
};
SpinnerComponent.propTypes = {
    className: PropTypes.string,
    level: PropTypes.string,
    small: PropTypes.bool,
    large: PropTypes.bool
};
SpinnerComponent.defaultProps = {
    className: '',
    level: 'info',
    small: false,
    large: false
};
export default SpinnerComponent;
