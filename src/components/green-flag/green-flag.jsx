import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import greenFlagIcon from './icon--green-flag.svg';
import styles from './green-flag.css';

const GreenFlagComponent = function (props) {
    const {
        active,
        onClick,
        title,
        ...componentProps
    } = props;
    return (
        <img
            className={classNames({
                [styles.greenFlag]: true,
                [styles.isActive]: active
            })}
            src={greenFlagIcon}
            title={title}
            onClick={onClick}
            {...componentProps}
        />
    );
};
GreenFlagComponent.propTypes = {
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string
};
GreenFlagComponent.defaultProps = {
    active: false,
    title: 'Go'
};
export default GreenFlagComponent;
