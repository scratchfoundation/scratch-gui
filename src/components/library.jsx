const bindAll = require('lodash.bindall');
const React = require('react');

const LibraryItem = require('./library-item.jsx');
const ModalComponent = require('./modal.jsx');

class LibraryComponent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ['handleSelect']);
        this.state = {selectedItem: null};
    }
    handleSelect (id) {
        if (this.state.selectedItem === id) {
            // Double select: select as the library's value.
            this.props.onRequestClose();
            this.props.onItemSelected(this.props.data[id]);
        }
        this.setState({selectedItem: id});
    }
    render () {
        const scrollGridStyle = {
            overflow: 'scroll',
            position: 'absolute',
            top: '70px',
            bottom: '20px',
            left: '30px',
            right: '30px'
        };
        return (
            <ModalComponent
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}
            >
                <h1>{this.props.title}</h1>
                <div style={scrollGridStyle}>
                    {this.props.data.map((dataItem, itemId) => {
                        const scratchURL = dataItem.md5 ?
                            `https://cdn.assets.scratch.mit.edu/internalapi/asset/${dataItem.md5}/get/` :
                            dataItem.rawURL;
                        return (
                            <LibraryItem
                                iconURL={scratchURL}
                                id={itemId}
                                key={`item_${itemId}`}
                                name={dataItem.name}
                                selected={this.state.selectedItem === itemId}
                                onSelect={this.handleSelect}
                            />
                        );
                    })}
                </div>
            </ModalComponent>
        );
    }
}

LibraryComponent.propTypes = {
    data: React.PropTypes.arrayOf(
        /* eslint-disable react/no-unused-prop-types, lines-around-comment */
        React.PropTypes.shape({
            md5: React.PropTypes.string,
            name: React.PropTypes.string,
            rawURL: React.PropTypes.string
        })
        /* eslint-enable react/no-unused-prop-types, lines-around-comment */
    ),
    onItemSelected: React.PropTypes.func,
    onRequestClose: React.PropTypes.func,
    title: React.PropTypes.string,
    visible: React.PropTypes.bool
};

module.exports = LibraryComponent;
