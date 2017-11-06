import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import styles from './library-item.css';
import classNames from 'classnames';

class LibraryItem extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick',
            'handleMouseEnter',
            'handleMouseLeave'
        ]);
    }
    handleClick (e) {
        this.props.onSelect(this.props.id);
        e.preventDefault();
    }
    handleMouseEnter () {
        this.props.onMouseEnter(this.props.id);
    }
    handleMouseLeave () {
        this.props.onMouseLeave(this.props.id);
    }
    render () {
        return this.props.featured ? (
            <div
                className={classNames(styles.libraryItem, styles.featuredItem)}
                onClick={this.handleClick}
            >
                <div>
                    <img
                        className={styles.featuredImage}
                        src={this.props.iconURL}
                    />
                </div>
                <div
                    className={styles.featuredText}
                >
                    <span className={styles.libraryItemName}>{this.props.name}</span>
                    <br />
                    <span className={styles.featuredDescription}>{this.props.description}</span>
                </div>
            </div>
        ) : (
            <Box
                className={styles.libraryItem}
                onClick={this.handleClick}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                {/* Layers of wrapping is to prevent layout thrashing on animation */}
                <Box className={styles.libraryItemImageContainerWrapper}>
                    <Box className={styles.libraryItemImageContainer}>
                        <img
                            className={styles.libraryItemImage}
                            src={this.props.iconURL}
                        />
                    </Box>
                </Box>
                <span className={styles.libraryItemName}>{this.props.name}</span>
            </Box>
        );
    }
}

LibraryItem.propTypes = {
    description: PropTypes.string,
    featured: PropTypes.bool,
    iconURL: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default LibraryItem;
