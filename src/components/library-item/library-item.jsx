const classNames = require('classnames');
const bindAll = require('lodash.bindall');
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
                alignContent="center"
                alignItems="center"
                className={classNames({
                    [styles.libraryItem]: true,
                    [styles.isSelected]: this.props.selected
                })}
                direction="column"
                onClick={this.handleClick}
            >
                <Box className={styles.libraryItemImageContainer}>
                    <img
                        className={styles.libraryItemImage}
                        src={this.props.iconURL}
                    />
                </Box>
                <p>{this.props.name}</p>
            </Box>
        );
    }
}

LibraryItem.propTypes = {
    iconURL: React.PropTypes.string,
    id: React.PropTypes.number,
    name: React.PropTypes.string,
    onSelect: React.PropTypes.func,
    selected: React.PropTypes.bool
};

module.exports = LibraryItem;
