import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import styles from './close-button.css';
import closeIcon from './icon--close.svg';

const CloseButton = props => (
    <div
        className={classNames(
            styles.closeButton,
            props.className,
            {
                [styles.small]: props.size === CloseButton.SIZE_SMALL,
                [styles.large]: props.size === CloseButton.SIZE_LARGE
            }
        )}
        onClick={props.onClick}
    >
        <img
            className={styles.closeIcon}
            src={closeIcon}
        />
    </div>
);

CloseButton.SIZE_SMALL = 'small';
CloseButton.SIZE_LARGE = 'large';

CloseButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    size: PropTypes.oneOf([CloseButton.SIZE_SMALL, CloseButton.SIZE_LARGE])
};

CloseButton.defaultProps = {
    size: CloseButton.SIZE_LARGE
};

export default CloseButton;
