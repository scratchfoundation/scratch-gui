import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './button.css';

const ButtonComponent = ({
    className,
    onClick,
    children,
    ...props
}) => {
    if (props.disabled === true) {
        onClick = function () {};
    }

    return (
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
};

ButtonComponent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

export default ButtonComponent;
