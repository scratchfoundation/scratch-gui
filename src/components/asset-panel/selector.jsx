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
                        className={styles.listItem}
                        costumeURL={item.image}
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
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
        image: React.PropTypes.string,
        name: React.PropTypes.string
    })),
    newText: React.PropTypes.string,
    onDeleteClick: React.PropTypes.func,
    onItemClick: React.PropTypes.func,
    onNewClick: React.PropTypes.func,
    selectedItemIndex: React.PropTypes.number
};

module.exports = Selector;
