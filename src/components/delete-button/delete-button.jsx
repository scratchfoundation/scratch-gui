import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import styles from './delete-button.css';
import deleteIcon from './icon--delete.svg';

const messages = defineMessages({
    delete: {
        id: 'gui.deleteButton.delete',
        description: 'Title of the button to delete a sprite, costume or sound',
        defaultMessage: 'Delete'
    }
});

const DeleteButtonComponent = ({
    className,
    intl,
    onClick,
    setRef,
    tabIndex,
    ...props
}) => (
    <div
        aria-label={intl.formatMessage(messages.delete)}
        className={classNames(
            styles.deleteButton,
            className
        )}
        ref={setRef}
        role="button"
        tabIndex={tabIndex}
        onClick={onClick}
        {...props}
    >
        <div className={styles.deleteButtonVisible}>
            <img
                className={styles.deleteIcon}
                draggable={false}
                src={deleteIcon}
            />
        </div>
    </div>
);


DeleteButtonComponent.propTypes = {
    className: PropTypes.string,
    intl: intlShape,
    onClick: PropTypes.func.isRequired,
    setRef: PropTypes.func.isRequired,
    tabIndex: PropTypes.number
};

DeleteButtonComponent.defaultProps = {
    tabIndex: 0
};

export default injectIntl(DeleteButtonComponent);
