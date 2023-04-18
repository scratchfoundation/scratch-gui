import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './toggle-buttons.css';

const ToggleButtons = ({buttons, className, disabled}) => (
    <div
        className={classNames(
            className,
            styles.row,
            {
                [styles.disabled]: disabled
            }
        )}
    >
        {buttons.map((button, index) => (
            <button
                key={`toggle-${index}`}
                className={styles.button}
                title={button.title}
                aria-label={button.title}
                aria-pressed={button.isSelected}
                onClick={button.handleClick}
                disabled={disabled}
            >
                <img
                    src={button.icon}
                    aria-hidden="true"
                    className={button.iconClassName}
                />
            </button>
        ))}
    </div>
);

ToggleButtons.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        handleClick: PropTypes.func.isRequired,
        icon: PropTypes.string.isRequired,
        iconClassName: PropTypes.string,
        isSelected: PropTypes.bool
    })),
    className: PropTypes.string,
    disabled: PropTypes.bool
};

ToggleButtons.defaultProps = {
    disabled: false
};

export default ToggleButtons;
