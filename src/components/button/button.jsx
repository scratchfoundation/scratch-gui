import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './button.css';

const ButtonComponent = ({
    className,
    onClick,
    children,
    ...props
}) => (
    <span
        className={classNames(
            styles.button,
            className
        )}
        role="button"
        onClick={onClick}
        {...props}
    >
        {children}
    </span>
);

ButtonComponent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired
};
module.exports = ButtonComponent;
