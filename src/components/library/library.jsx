import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import LibraryItem from '../library-item/library-item.jsx';
import Modal from '../../containers/modal.jsx';
import Divider from '../divider/divider.jsx';
import Filter from '../filter/filter.jsx';
import TagButton from '../../containers/tag-button.jsx';

import styles from './library.css';

const ALL_TAG_TITLE = 'All';
const tagListPrefix = [{title: ALL_TAG_TITLE}];

const messages = defineMessages({
    filterPlaceholder: {
        id: 'gui.library.filterPlaceholder',
        defaultMessage: 'Search',
        description: 'Placeholder text for library search field'
    }
});

class LibraryComponent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleBlur',
            'handleFilterChange',
            'handleFilterClear',
            'handleFocus',
            'handleMouseEnter',
            'handleMouseLeave',
            'handleSelect',
            'handleTagClick',
            'setFilteredDataRef'
        ]);
        this.state = {
            selectedItem: null,
            filterQuery: '',
            selectedTag: ALL_TAG_TITLE.toLowerCase()
        };
    }
    componentDidUpdate (prevProps, prevState) {
        if (prevState.filterQuery !== this.state.filterQuery ||
            prevState.selectedTag !== this.state.selectedTag) {
            this.scrollToTop();
        }
    }
    handleBlur (id) {
        this.handleMouseLeave(id);
    }
    handleFocus (id) {
        this.handleMouseEnter(id);
    }
    handleSelect (id) {
        this.props.onRequestClose();
        this.props.onItemSelected(this.props.data[id]);
    }
    handleTagClick (tag) {
        this.setState({
            filterQuery: '',
            selectedTag: tag.toLowerCase()
        });
    }
    handleMouseEnter (id) {
        if (this.props.onItemMouseEnter) this.props.onItemMouseEnter(this.props.data[id]);
    }
    handleMouseLeave (id) {
        if (this.props.onItemMouseLeave) this.props.onItemMouseLeave(this.props.data[id]);
    }
    handleFilterChange (event) {
        this.setState({
            filterQuery: event.target.value,
            selectedTag: ALL_TAG_TITLE.toLowerCase()
        });
    }
    handleFilterClear () {
        this.setState({filterQuery: ''});
    }
    getFilteredData () {
        // Filters and splits the data based on the `featured` flag
        return this.props.data.reduce((acc, dataItem, dataId) => {
            const inSet = this.state.selectedTag === 'all' ? (
                // Filter based on query
                (dataItem.tags || [])
                    // Lowercase all tags. Second argument is to define `this`
                    .map(String.prototype.toLowerCase.call, String.prototype.toLowerCase)
                    // Make a list containing all the tags and the item's name
                    .concat(dataItem.name.toLowerCase())
                    // The \n delimiter is to not match against regular user input
                    .join('\n')
                    // Find within a string representing the title and all the tags for the item
                    .indexOf(this.state.filterQuery.toLowerCase()) !== -1
            ) : (
                // A tag is selected, so just filter based on that tag
                dataItem.tags &&
                dataItem.tags
                    .map(String.prototype.toLowerCase.call, String.prototype.toLowerCase)
                    .indexOf(this.state.selectedTag) !== -1
            );
            if (inSet) {
                // splt by the featured property
                if (!acc[dataItem.featured]) acc[dataItem.featured] = [];
                acc[dataItem.featured].push(Object.assign({}, dataItem, {dataId}));
            }
            return acc;
        }, {});
    }
    scrollToTop () {
        this.filteredDataRef.scrollTop = 0;
    }
    setFilteredDataRef (ref) {
        this.filteredDataRef = ref;
    }
    render () {
        const filteredData = this.getFilteredData();
        return (
            <Modal
                fullScreen
                contentLabel={this.props.title}
                id={this.props.id}
                onRequestClose={this.props.onRequestClose}
            >
                {(this.props.filterable || this.props.tags) && (
                    <div className={styles.filterBar}>
                        {this.props.filterable && (
                            <Filter
                                className={classNames(
                                    styles.filterBarItem,
                                    styles.filter
                                )}
                                filterQuery={this.state.filterQuery}
                                inputClassName={styles.filterInput}
                                placeholderText={this.props.intl.formatMessage(messages.filterPlaceholder)}
                                onChange={this.handleFilterChange}
                                onClear={this.handleFilterClear}
                            />
                        )}
                        {this.props.filterable && this.props.tags && (
                            <Divider className={classNames(styles.filterBarItem, styles.divider)} />
                        )}
                        {this.props.tags &&
                            <div className={styles.tagWrapper}>
                                {tagListPrefix.concat(this.props.tags).map((tagProps, id) => (
                                    <TagButton
                                        active={this.state.selectedTag === tagProps.title.toLowerCase()}
                                        className={classNames(
                                            styles.filterBarItem,
                                            styles.tagButton,
                                            tagProps.className
                                        )}
                                        key={`tag-button-${id}`}
                                        onClick={this.handleTagClick}
                                        {...tagProps}
                                    />
                                ))}
                            </div>
                        }
                    </div>
                )}
                <div
                    className={classNames(styles.libraryScrollArea, {
                        [styles.withFilterBar]: this.props.filterable || this.props.tags
                    })}
                    ref={this.setFilteredDataRef}
                >
                    {Object.keys(filteredData).map(featured => (
                        filteredData[featured].length > 0 && (
                            <div
                                className={classNames(styles.libraryGrid, {
                                    [styles.featured]: featured === 'true'
                                })}
                                key={`grid-featured-${featured}`}
                            >
                                {filteredData[featured].map(dataItem => {
                                    const scratchURL = dataItem.md5 ?
                                        `https://cdn.assets.scratch.mit.edu/internalapi/asset/${dataItem.md5}/get/` :
                                        dataItem.rawURL;
                                    return (
                                        <LibraryItem
                                            description={dataItem.description}
                                            disabled={dataItem.disabled}
                                            featured={dataItem.featured}
                                            iconURL={scratchURL}
                                            id={dataItem.dataId}
                                            key={`item_${dataItem.dataId}`}
                                            name={dataItem.name}
                                            onBlur={this.handleBlur}
                                            onFocus={this.handleFocus}
                                            onMouseEnter={this.handleMouseEnter}
                                            onMouseLeave={this.handleMouseLeave}
                                            onSelect={this.handleSelect}
                                        />
                                    );
                                })}
                            </div>
                        )
                    ))}
                </div>
            </Modal>
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
            name: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.node
            ]).isRequired,
            rawURL: PropTypes.string
        })
        /* eslint-enable react/no-unused-prop-types, lines-around-comment */
    ),
    filterable: PropTypes.bool,
    id: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    onItemMouseEnter: PropTypes.func,
    onItemMouseLeave: PropTypes.func,
    onItemSelected: PropTypes.func,
    onRequestClose: PropTypes.func,
    tags: PropTypes.arrayOf(PropTypes.shape(TagButton.propTypes)),
    title: PropTypes.string.isRequired
};

LibraryComponent.defaultProps = {
    filterable: true
};

export default injectIntl(LibraryComponent);
