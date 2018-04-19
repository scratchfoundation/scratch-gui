import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';

import LibraryItem from '../library-item/library-item.jsx';
import ModalComponent from '../modal/modal.jsx';
import Divider from '../divider/divider.jsx';
import Filter from '../filter/filter.jsx';
import TagButton from '../tag-button/tag-button.jsx';

import placeholderSvg from '../../lib/assets/placeholder.svg';

import styles from './library.css';

const tagListPrefix = [{
    active: true,
    title: 'All',
    iconSrc: placeholderSvg
}];

const defaultTagProps = {
    active: false,
    iconSrc: placeholderSvg
};

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
            'handleSelect'
        ]);
        this.state = {
            selectedItem: null,
            filterQuery: ''
        };
    }
    handleBlur (id) {
        this.handleMouseLeave(id);
    }
    handleFocus (id) {
        this.handleMouseEnter(id);
    }
    handleSelect (id) {
        this.props.onRequestClose();
        this.props.onItemSelected(this.getFilteredData()[id]);
    }
    handleMouseEnter (id) {
        if (this.props.onItemMouseEnter) this.props.onItemMouseEnter(this.getFilteredData()[id]);
    }
    handleMouseLeave (id) {
        if (this.props.onItemMouseLeave) this.props.onItemMouseLeave(this.getFilteredData()[id]);
    }
    handleFilterChange (event) {
        this.setState({filterQuery: event.target.value});
    }
    handleFilterClear () {
        this.setState({filterQuery: ''});
    }
    getFilteredData () {
        return this.props.data.filter(dataItem =>
            dataItem.name.toLowerCase().indexOf(this.state.filterQuery.toLowerCase()) !== -1);
    }
    render () {
        return (
            <ModalComponent
                fullScreen
                contentLabel={this.props.title}
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
                                onChange={this.handleFilterChange}
                                onClear={this.handleFilterClear}
                            />
                        )}
                        {this.props.filterable && this.props.tags && (
                            <Divider className={classNames(styles.filterBarItem, styles.divider)} />
                        )}
                        {this.props.tags &&
                            (tagListPrefix.concat(this.props.tags)).map((tagProps, id) => (
                                <TagButton
                                    {...{...defaultTagProps, ...tagProps}}
                                    className={classNames(
                                        styles.filterBarItem,
                                        styles.tagButton,
                                        tagProps.className
                                    )}
                                    key={`tag-button-${id}`}
                                />
                            ))
                        }
                    </div>
                )}
                <div className={styles.libraryScrollGrid}>
                    {this.getFilteredData().map((dataItem, index) => {
                        const scratchURL = dataItem.md5 ?
                            `https://cdn.assets.scratch.mit.edu/internalapi/asset/${dataItem.md5}/get/` :
                            dataItem.rawURL;
                        return (
                            <LibraryItem
                                description={dataItem.description}
                                disabled={dataItem.disabled}
                                featured={dataItem.featured}
                                iconURL={scratchURL}
                                id={index}
                                key={`item_${index}`}
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
    filterable: PropTypes.bool,
    onItemMouseEnter: PropTypes.func,
    onItemMouseLeave: PropTypes.func,
    onItemSelected: PropTypes.func,
    onRequestClose: PropTypes.func,
    tags: PropTypes.arrayOf(TagButton.propTypes),
    title: PropTypes.string.isRequired
};

LibraryComponent.defaultProps = {
    filterable: true
};

export default LibraryComponent;
