const PropTypes = require('prop-types');
const React = require('react');

const SpriteSelectorItem = require('../../containers/sprite-selector-item.jsx');

const Box = require('../box/box.jsx');
const styles = require('./selector.css');

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
                {buttons.map(({text, img, onClick}, index) => (
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
                            {text}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

Selector.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
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
