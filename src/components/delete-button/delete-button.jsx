import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import styles from './delete-button.css';
import deleteIcon from './icon--delete.svg';

const DeleteButton = props => (
    <div
        aria-label="Delete"
        className={classNames(
            styles.deleteButton,
            props.className
        )}
        role="button"
        tabIndex={props.tabIndex}
        onClick={props.onClick}
    >
        <div className={styles.deleteButtonVisible}>
            <img
                className={styles.deleteIcon}
                src={deleteIcon}
            />
        </div>
    </div>

);

DeleteButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    tabIndex: PropTypes.number
};

DeleteButton.defaultProps = {
    tabIndex: 0
};

export default DeleteButton;
