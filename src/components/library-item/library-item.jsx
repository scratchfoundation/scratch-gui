const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');

const Box = require('../box/box.jsx');
const styles = require('./library-item.css');

class LibraryItem extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ['handleClick']);
    }
    handleClick (e) {
        this.props.onSelect(this.props.id);
        e.preventDefault();
    }
    render () {
        return (
            <Box
                className={styles.libraryItem}
                onClick={this.handleClick}
            >
                <Box className={styles.libraryItemImageContainer}>
                    <img
                        className={styles.libraryItemImage}
                        src={this.props.iconURL}
                    />
                </Box>
                <span className={styles.libraryItemName}>{this.props.name}</span>
            </Box>
        );
    }
}

LibraryItem.propTypes = {
    iconURL: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};

module.exports = LibraryItem;
