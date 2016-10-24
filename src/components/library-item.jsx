const bindAll = require('lodash.bindall');
const React = require('react');
const stylePropType = require('react-style-proptype');

const CostumeCanvas = require('./costume-canvas.jsx');

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
        const style = (this.props.selected) ?
            this.props.selectedGridTileStyle : this.props.gridTileStyle;
        return (
            <div
                style={style}
                onClick={this.handleClick}
            >
                <CostumeCanvas url={this.props.iconURL} />
                <p>{this.props.name}</p>
            </div>
        );
    }
}

LibraryItem.defaultProps = {
    gridTileStyle: {
        float: 'left',
        width: '140px',
        marginLeft: '5px',
        marginRight: '5px',
        textAlign: 'center',
        cursor: 'pointer'
    },
    selectedGridTileStyle: {
        float: 'left',
        width: '140px',
        marginLeft: '5px',
        marginRight: '5px',
        textAlign: 'center',
        cursor: 'pointer',
        background: '#aaa',
        borderRadius: '6px'
    }
};

LibraryItem.propTypes = {
    gridTileStyle: stylePropType,
    iconURL: React.PropTypes.string,
    id: React.PropTypes.number,
    name: React.PropTypes.string,
    onSelect: React.PropTypes.func,
    selected: React.PropTypes.bool,
    selectedGridTileStyle: stylePropType
};

module.exports = LibraryItem;
