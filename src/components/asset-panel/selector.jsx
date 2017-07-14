import PropTypes from 'prop-types';
import React from 'react';

import SpriteSelectorItem from '../../containers/sprite-selector-item.jsx';

import Box from '../box/box.jsx';
import styles from './selector.css';

const Selector = props => {
    const {
        buttons,
        items,
        selectedItemIndex,
        onDeleteClick,
        onItemClick
    } = props;

    return (
        <Box className={styles.wrapper}>
            <Box className={styles.listArea}>
                {items.map((item, index) => (
                    <SpriteSelectorItem
                        assetId={item.assetId}
                        className={styles.listItem}
                        costumeURL={item.url}
                        id={index}
                        key={`asset-${index}`}
                        name={item.name}
                        selected={index === selectedItemIndex}
                        onClick={onItemClick}
                        onDeleteButtonClick={onDeleteClick}
                    />
                ))}
            </Box>
            <Box className={styles.newButtons}>
                {buttons.map(({message, img, onClick}, index) => (
                    <Box
                        className={styles.newButton}
                        key={index}
                        onClick={onClick}
                    >
                        <img
                            className={styles.newButtonIcon}
                            src={img}
                        />
                        <Box className={styles.newButtonLabel}>
                            {message}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

Selector.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
        message: PropTypes.node.isRequired,
        img: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    })),
    items: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string.isRequired
    })),
    onDeleteClick: PropTypes.func.isRequired,
    onItemClick: PropTypes.func.isRequired,
    selectedItemIndex: PropTypes.number.isRequired
};

module.exports = Selector;
