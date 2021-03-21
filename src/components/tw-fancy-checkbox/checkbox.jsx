import React from 'react';
import PropTypes from 'prop-types';
import styles from './checkbox.css';
import classNames from 'classnames';

const FancyCheckbox = props => (
    <input
        {...props}
        className={classNames(props.className, styles.checkbox)}
    />
);

FancyCheckbox.propTypes = {
    className: PropTypes.string
};

export default FancyCheckbox;
