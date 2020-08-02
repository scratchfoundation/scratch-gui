import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from './icon-button.css';

const IconButton = ({
    img,
    disabled,
    className,
    title,
    onClick
}) => (
    <div
        className={classNames(
            styles.container,
            className,
            disabled ? styles.disabled : null
        )}
        role="button"
        onClick={disabled ? null : onClick}
    >
        <img
            className={styles.icon}
            draggable={false}
            src={img}
        />
        <div className={styles.title}>
            {title}
        </div>
    </div>
);

IconButton.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    img: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.node.isRequired
};

export default IconButton;
