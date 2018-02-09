import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from './asset-button.css';

const AssetButton = ({
    img,
    className,
    title,
    onClick
}) => (
    <button
        className={classNames(styles.container, className)}
        title={title}
        onClick={onClick}
    >
        <img
            className={styles.icon}
            draggable={false}
            src={img}
        />
    </button>
);

AssetButton.propTypes = {
    className: PropTypes.string,
    img: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.node.isRequired
};

export default AssetButton;
