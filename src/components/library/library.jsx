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
import storage from '../../lib/storage';

import styles from './library.css';

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

/**
 * Find the AssetType which corresponds to a particular file extension. For example, 'png' => AssetType.ImageBitmap.
 * @param {string} fileExtension - the file extension to look up.
 * @returns {AssetType} - the AssetType corresponding to the extension, if any.
 */
const getAssetTypeForFileExtension = function (fileExtension) {
    const compareOptions = {
        sensitivity: 'accent',
        usage: 'search'
    };
    for (const assetTypeId of Object.keys(storage.AssetType)) {
        const assetType = storage.AssetType[assetTypeId];
        if (fileExtension.localeCompare(assetType.runtimeFormat, compareOptions) === 0) {
            return assetType;
        }
    }
};

/**
 * Figure out an `imageSource` (URI or asset ID & type) for a library item's icon.
 * @param {object} item - either a library item or one of a library item's costumes.
 * @returns {object} - an `imageSource` ready to be passed to a `ScratchImage`.
 */
const getItemImageSource = function (item) {
    if (item.rawURL) {
        return {
            uri: item.rawURL
        };
    }

    // TODO: adjust libraries to be more storage-friendly; don't use split() here.
    const md5 = item.md5 || item.baseLayerMD5;
    if (md5) {
        const [assetId, fileExtension] = md5.split('.');
        return {
            assetId: assetId,
            assetType: getAssetTypeForFileExtension(fileExtension)
        };
    }
};

class LibraryComponent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClose',
            'handleFilterChange',
            'handleFilterClear',
            'handleMouseEnter',
            'handleMouseLeave',
            'handleSelect',
            'handleTagClick',
            'setFilteredDataRef'
        ]);
        this.state = {
            selectedItem: null,
            filterQuery: '',
            selectedTag: ALL_TAG.tag
        };
    }
    componentDidUpdate (prevProps, prevState) {
        if (prevState.filterQuery !== this.state.filterQuery ||
            prevState.selectedTag !== this.state.selectedTag) {
            this.scrollToTop();
        }
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
                    {this.getFilteredData().map((dataItem, index) => {
                        const iconSource = getItemImageSource(dataItem);
                        const icons = dataItem.json && dataItem.json.costumes.map(getItemImageSource);
                        return (<LibraryItem
                            bluetoothRequired={dataItem.bluetoothRequired}
                            collaborator={dataItem.collaborator}
                            description={dataItem.description}
                            disabled={dataItem.disabled}
                            extensionId={dataItem.extensionId}
                            featured={dataItem.featured}
                            hidden={dataItem.hidden}
                            iconSource={iconSource}
                            icons={icons}
                            id={index}
                            insetIconURL={dataItem.insetIconURL}
                            internetConnectionRequired={dataItem.internetConnectionRequired}
                            key={`item_${index}`}
                            name={dataItem.name}
                            onMouseEnter={this.handleMouseEnter}
                            onMouseLeave={this.handleMouseLeave}
                            onSelect={this.handleSelect}
                        />);
                    })}
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
