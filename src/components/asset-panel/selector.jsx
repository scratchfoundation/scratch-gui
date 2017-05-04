const PropTypes = require('prop-types');
const React = require('react');

const SpriteSelectorItem = require('../../containers/sprite-selector-item.jsx');

const Box = require('../box/box.jsx');
const styles = require('./selector.css');

const Selector = props => {
    const {
        items,
        newText,
        selectedItemIndex,
        onDeleteClick,
        onItemClick,
        onNewClick
    } = props;

    return (
        <Box className={styles.wrapper}>
            <Box
                className={styles.newItem}
                onClick={onNewClick}
            >
                {newText}
            </Box>
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
        </Box>
    );
};

Selector.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string.isRequired
    })),
    newText: PropTypes.string.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onItemClick: PropTypes.func.isRequired,
    onNewClick: PropTypes.func,
    selectedItemIndex: PropTypes.number.isRequired
};

module.exports = Selector;
