import PropTypes from 'prop-types';
import React from 'react';

import SpriteSelectorItem from '../../containers/sprite-selector-item.jsx';

import Box from '../box/box.jsx';
import ActionMenu from '../action-menu/action-menu.jsx';
import styles from './selector.css';

const Selector = props => {
    const {
        buttons,
        items,
        selectedItemIndex,
        onDeleteClick,
        onDuplicateClick,
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
                        onDuplicateButtonClick={onDuplicateClick}
                    />
                ))}
            </Box>
            <Box className={styles.newButtons}>
                <ActionMenu
                    img={buttons[0].img}
                    moreButtons={buttons.slice(1)}
                    title={buttons[0].title}
                    onClick={buttons[0].onClick}
                />
            </Box>
        </Box>
    );
};

Selector.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
        message: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    })),
    items: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string.isRequired
    })),
    onDeleteClick: PropTypes.func,
    onDuplicateClick: PropTypes.func,
    onItemClick: PropTypes.func.isRequired,
    selectedItemIndex: PropTypes.number.isRequired
};

export default Selector;
