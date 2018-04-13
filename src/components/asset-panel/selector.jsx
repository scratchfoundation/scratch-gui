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

    let newButtonSection = null;

    if (buttons.length > 0) {
        const {img, title, onClick} = buttons[0];
        const moreButtons = buttons.slice(1);
        newButtonSection = (
            <Box className={styles.newButtons}>
                <ActionMenu
                    img={img}
                    moreButtons={moreButtons}
                    title={title}
                    onClick={onClick}
                />
            </Box>
        );
    }

    return (
        <Box className={styles.wrapper}>
            <Box className={styles.listArea}>
                {items.map((item, index) => (
                    <SpriteSelectorItem
                        assetId={item.assetId}
                        className={styles.listItem}
                        costumeURL={item.url}
                        details={item.details}
                        id={index}
                        key={`asset-${index}`}
                        name={item.name}
                        number={index + 1 /* 1-indexed */}
                        selected={index === selectedItemIndex}
                        onClick={onItemClick}
                        onDeleteButtonClick={onDeleteClick}
                        onDuplicateButtonClick={onDuplicateClick}
                    />
                ))}
            </Box>
            {newButtonSection}
        </Box>
    );
};

Selector.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        onClick: PropTypes.func
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
