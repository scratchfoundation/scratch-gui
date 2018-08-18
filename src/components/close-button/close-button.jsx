import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import styles from './close-button.css';
import closeIcon from './icon--close.svg';
import backIcon from '../../lib/assets/icon--back.svg';

const CloseButton = props => (
    <div
        aria-label="Close"
        className={classNames(
            styles.closeButton,
            props.className,
            {
                [styles.small]: props.size === CloseButton.SIZE_SMALL,
                [styles.large]: props.size === CloseButton.SIZE_LARGE
            }
        )}
        role="button"
        tabIndex="0"
        onClick={props.onClick}
    >
        {props.buttonType === 'back' ?
            <img
                className={styles.backIcon}
                src={backIcon}
            /> :
            <img
                className={styles.closeIcon}
                src={closeIcon}
            />
        }
    </div>
);

CloseButton.SIZE_SMALL = 'small';
CloseButton.SIZE_LARGE = 'large';

CloseButton.propTypes = {
    buttonType: PropTypes.oneOf(['back', 'close']),
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    size: PropTypes.oneOf([CloseButton.SIZE_SMALL, CloseButton.SIZE_LARGE])
};

CloseButton.defaultProps = {
    size: CloseButton.SIZE_LARGE,
    buttonType: 'close'
};

export default CloseButton;
