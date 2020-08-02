import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './button.css';

const ButtonComponent = ({
    className,
    disabled,
    iconClassName,
    iconSrc,
    onClick,
    children,
    ...props
}) => {

    if (disabled) {
        onClick = function () {};
    }

    const icon = iconSrc && (
        <img
            className={classNames(iconClassName, styles.icon)}
            draggable={false}
            src={iconSrc}
        />
    );

    return (
        <span
            className={classNames(
                styles.outlinedButton,
                className
            )}
            role="button"
            onClick={onClick}
            {...props}
        >
            {icon}
            <div className={styles.content}>{children}</div>
        </span>
    );
};

ButtonComponent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    iconClassName: PropTypes.string,
    iconSrc: PropTypes.string,
    onClick: PropTypes.func
};

export default ButtonComponent;
