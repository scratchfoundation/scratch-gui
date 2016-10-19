const React = require('react');

const CostumeCanvas = require('./costume-canvas');

class LibraryItem extends React.Component {
    render () {
        let style = (this.props.selected) ?
            this.props.selectedGridTileStyle : this.props.gridTileStyle;
        return (
            <div style={style} onClick={() => this.props.onSelect(this.props.id)}>
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
    name: React.PropTypes.string,
    iconURL: React.PropTypes.string,
    gridTileStyle: React.PropTypes.object,
    selectedGridTileStyle: React.PropTypes.object,
    selected: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    id: React.PropTypes.number
};

module.exports = LibraryItem;
