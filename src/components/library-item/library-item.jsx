const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');

const Box = require('../box/box.jsx');
const styles = require('./library-item.css');

class LibraryItem extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick',
            'handleMouseEnter',
            'handleMouseLeave'
        ]);
    }
    handleClick (e) {
        this.props.onSelect(this.props.id);
        e.preventDefault();
    }
    handleMouseEnter () {
        this.props.onMouseEnter(this.props.id);
    }
    handleMouseLeave () {
        this.props.onMouseLeave(this.props.id);
    }
    render () {
        return (
            <Box
                className={styles.libraryItem}
                onClick={this.handleClick}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                {/* Layers of wrapping is to prevent layout thrashing on animation */}
                <Box className={styles.libraryItemImageContainerWrapper}>
                    <Box className={styles.libraryItemImageContainer}>
                        <img
                            className={styles.libraryItemImage}
                            src={this.props.iconURL}
                        />
                    </Box>
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
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};

module.exports = LibraryItem;
