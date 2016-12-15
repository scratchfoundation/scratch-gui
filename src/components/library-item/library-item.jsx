const classNames = require('classnames');
const bindAll = require('lodash.bindall');
const React = require('react');

const Box = require('../box/box.jsx');
const CostumeCanvas = require('../costume-canvas/costume-canvas.jsx');
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
                width={140}
                onClick={this.handleClick}
            >
                <CostumeCanvas url={this.props.iconURL} />
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
