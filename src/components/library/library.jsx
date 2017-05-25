const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');

const LibraryItem = require('../library-item/library-item.jsx');
const ModalComponent = require('../modal/modal.jsx');

const styles = require('./library.css');

class LibraryComponent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSelect',
            'handleFilterChange'
        ]);
        this.state = {
            selectedItem: null,
            filterQuery: ''
        };
    }
    handleSelect (id) {
        if (this.state.selectedItem === id) {
            // Double select: select as the library's value.
            this.props.onRequestClose();
            this.props.onItemSelected(this.props.data[id]);
        } else {
            if (this.props.onItemChosen) {
                this.props.onItemChosen(this.props.data[id]);
            }
        }
        this.setState({selectedItem: id});
    }
    handleFilterChange (event) {
        this.setState({
            filterQuery: event.target.value
        });
    }
    render () {
        if (!this.props.visible) return null;
        return (
            <ModalComponent
                contentLabel={this.props.title}
                filterQuery={this.state.filterQuery}
                visible={this.props.visible}
                onFilterChange={this.handleFilterChange}
                onRequestClose={this.props.onRequestClose}
            >
                <div className={styles.libraryScrollGrid}>
                    {this.props.data.filter(dataItem =>
                        dataItem.name.toLowerCase().indexOf(this.state.filterQuery.toLowerCase()) !== -1
                    ).map((dataItem, itemId) => {
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
    data: PropTypes.arrayOf(
        /* eslint-disable react/no-unused-prop-types, lines-around-comment */
        // An item in the library
        PropTypes.shape({
            // @todo remove md5/rawURL prop from library, refactor to use storage
            md5: PropTypes.string,
            name: PropTypes.string.isRequired,
            rawURL: PropTypes.string
        })
        /* eslint-enable react/no-unused-prop-types, lines-around-comment */
    ),
    onItemChosen: PropTypes.func,
    onItemSelected: PropTypes.func,
    onRequestClose: PropTypes.func,
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired
};

module.exports = LibraryComponent;
