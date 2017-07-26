import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Box from '../box/box.jsx';
import styles from './icon-button.css';

const IconButton = ({
    img,
    className,
    title,
    onClick
}) => (
    <Box
        className={classNames(styles.container, className)}
        onClick={onClick}
    >
        <img
            className={styles.icon}
            src={img}
        />
        <Box className={styles.title}>
            {title}
        </Box>
    </Box>
);

IconButton.propTypes = {
    className: PropTypes.string,
    img: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.node.isRequired
};

export default IconButton;
