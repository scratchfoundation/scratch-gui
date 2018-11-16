import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import LibraryItem from '../../containers/library-item.jsx';
import Modal from '../../containers/modal.jsx';
import Divider from '../divider/divider.jsx';
import Filter from '../filter/filter.jsx';
import TagButton from '../../containers/tag-button.jsx';
import analytics from '../../lib/analytics';

import styles from './library.css';

import {
    AutoSizer,
    Grid
} from 'react-virtualized';

const messages = defineMessages({
    filterPlaceholder: {
        id: 'gui.library.filterPlaceholder',
        defaultMessage: 'Search',
        description: 'Placeholder text for library search field'
    },
    allTag: {
        id: 'gui.library.allTag',
        defaultMessage: 'All',
        description: 'Label for library tag to revert to all items after filtering by tag.'
    }
});

const ALL_TAG = {tag: 'all', intlLabel: messages.allTag};
const tagListPrefix = [ALL_TAG];

class LibraryComponent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleBlur',
            'handleClose',
            'handleFilterChange',
            'handleFilterClear',
            'handleFocus',
            'handleMouseEnter',
            'handleMouseLeave',
            'handleSelect',
            'handleTagClick',
            'setFilteredDataRef',
            'cellRenderer',
            'handleResize',
            'setMasonryRef',
            '_renderMasonry'
        ]);

        this.state = {
            selectedItem: null,
            filterQuery: '',
            selectedTag: ALL_TAG.tag
        };

        this._columnWidth = this.props.data[0].featured ? 300 : 160;
        this._columnHeight = this.props.data[0].featured ? 340 : 180;
        this._columnCount = 0;
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
        this.handleClose();
        this.props.onItemSelected(this.getFilteredData()[id]);
    }
    handleClose () {
        this.props.onRequestClose();
        analytics.pageview(`/${this.props.id}/search?q=${this.state.filterQuery}`);
    }
    handleTagClick (tag) {
        this.setState({
            filterQuery: '',
            selectedTag: tag.toLowerCase()
        });
    }
    handleMouseEnter (id) {
        if (this.props.onItemMouseEnter) this.props.onItemMouseEnter(this.getFilteredData()[id]);
    }
    handleMouseLeave (id) {
        if (this.props.onItemMouseLeave) this.props.onItemMouseLeave(this.getFilteredData()[id]);
    }
    handleFilterChange (event) {
        this.setState({
            filterQuery: event.target.value,
            selectedTag: ALL_TAG.tag
        });
    }
    handleFilterClear () {
        this.setState({filterQuery: ''});
    }
    getFilteredData () {
        if (this.state.selectedTag === 'all') {
            if (!this.state.filterQuery) return this.props.data;
            return this.props.data.filter(dataItem => (
                (dataItem.tags || [])
                    // Second argument to map sets `this`
                    .map(String.prototype.toLowerCase.call, String.prototype.toLowerCase)
                    .concat(dataItem.name ?
                        (typeof dataItem.name === 'string' ?
                        // Use the name if it is a string, else use formatMessage to get the translated name
                            dataItem.name : this.props.intl.formatMessage(dataItem.name.props)
                        ).toLowerCase() :
                        null)
                    .join('\n') // unlikely to partially match newlines
                    .indexOf(this.state.filterQuery.toLowerCase()) !== -1
            ));
        }
        return this.props.data.filter(dataItem => (
            dataItem.tags &&
            dataItem.tags
                .map(String.prototype.toLowerCase.call, String.prototype.toLowerCase)
                .indexOf(this.state.selectedTag) !== -1
        ));
    }
    scrollToTop () {
        this.filteredDataRef.scrollTop = 0;
    }
    setFilteredDataRef (ref) {
        this.filteredDataRef = ref;
    }
    cellRenderer ({rowIndex, columnIndex, key, style}) {
        const index = (this._columnCount * rowIndex) + columnIndex;
        const dataItem = this.getFilteredData()[index];
        if (!dataItem) return null;

        return (
            <div
                key={key}
                style={{...style, width: this._columnWidth, height: this._columnWidth}}
            >
                <LibraryItem
                    bluetoothRequired={dataItem.bluetoothRequired}
                    collaborator={dataItem.collaborator}
                    description={dataItem.description}
                    disabled={dataItem.disabled}
                    extensionId={dataItem.extensionId}
                    featured={dataItem.featured}
                    hidden={dataItem.hidden}
                    iconMD5={dataItem.md5} // either this or iconURL must be defined
                    iconURL={dataItem.rawURL} // either this or iconMD5 must be defined
                    id={index}
                    insetIconURL={dataItem.insetIconURL}
                    internetConnectionRequired={dataItem.internetConnectionRequired}
                    key={`item_${index}`}
                    name={dataItem.name}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    onSelect={this.handleSelect}
                />
            </div>
        );
    }

    handleResize ({width}) {
        this._width = width;
        this._calculateColumnCount();
    }

    setMasonryRef (ref) {
        this._masonry = ref;
    }


    _calculateColumnCount () {
        this._columnCount = Math.floor(this._width / this._columnWidth);
    }

    _renderMasonry ({width, height}) {
        this._width = width;

        this._calculateColumnCount();

        return (
            <Grid
                cellRenderer={this.cellRenderer}
                columnCount={this._columnCount}
                columnWidth={this._columnWidth}
                data={this.getFilteredData()}
                height={height}
                ref={this.setMasonryRef}
                rowCount={Math.floor(this.getFilteredData().length / this._columnCount)}
                rowHeight={this._columnHeight}
                width={width}
            />
        );
    }

    render () {
        return (
            <Modal
                fullScreen
                contentLabel={this.props.title}
                id={this.props.id}
                onRequestClose={this.handleClose}
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
                                        active={this.state.selectedTag === tagProps.tag.toLowerCase()}
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
                    className={classNames(styles.libraryScrollGrid, {
                        [styles.withFilterBar]: this.props.filterable || this.props.tags
                    })}
                    ref={this.setFilteredDataRef}
                >
                    <AutoSizer
                        data={this.getFilteredData()}
                        onResize={this.handleResize}
                    >
                        {this._renderMasonry}
                    </AutoSizer>
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
            ]),
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
