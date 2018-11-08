import bindAll from 'lodash.bindall';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import styles from './library-item.css';
import classNames from 'classnames';

import insetImageURL from '../../lib/libraries/extensions/peripheral-connection/ev3/ev3-small.svg';

class LibraryItem extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleBlur',
            'handleClick',
            'handleFocus',
            'handleKeyPress',
            'handleMouseEnter',
            'handleMouseLeave'
        ]);
    }
    handleBlur () {
        this.props.onBlur(this.props.id);
    }
    handleFocus () {
        this.props.onFocus(this.props.id);
    }
    handleClick (e) {
        if (!this.props.disabled) {
            this.props.onSelect(this.props.id);
        }
        e.preventDefault();
    }
    handleKeyPress (e) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            this.props.onSelect(this.props.id);
        }
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
                className={classNames(
                    styles.libraryItem,
                    styles.featuredItem,
                    {
                        [styles.disabled]: this.props.disabled
                    }
                )}
                onClick={this.handleClick}
            >
                <div className={styles.featuredImageContainer}>
                    {this.props.disabled ? (
                        <div className={styles.comingSoonText}>
                            <FormattedMessage
                                defaultMessage="Coming Soon"
                                description="Label for extensions that are not yet implemented"
                                id="gui.extensionLibrary.comingSoon"
                            />
                        </div>
                    ) : null}
                    <img
                        className={styles.featuredImage}
                        src={this.props.iconURL}
                    />
                </div>
                {true ? ( /* TODO: make extension-only */
                    <div className={styles.libraryItemInsetImageContainer}>
                        <img
                            className={styles.libraryItemInsetImage}
                            src={insetImageURL}
                        />
                    </div>
                ) : null}
                <div
                    className={true ? /* TODO: make extension-only */
                        classNames(styles.featuredExtensionText, styles.featuredText) : styles.featuredText
                    }
                >
                    <span className={styles.libraryItemName}>
                        {this.props.name}
                    </span>
                    <br />
                    <span className={styles.featuredDescription}>
                        {this.props.description}
                    </span>
                </div>
                {true ? ( /* TODO: make extension-only and requirements-only */
                    <div className={styles.featuredExtensionMetadata}>
                        <div className={styles.featuredExtensionRequirement}>
                            <div>
                                <FormattedMessage
                                    defaultMessage="Requires"
                                    description="Label for extension hardware requirements"
                                    id="gui.extensionLibrary.requires"
                                />
                            </div>
                            <div
                                className={styles.featuredExtensionMetadataDetail}
                            >
                                <img src={`#` /* TODO: add require icon prop */} /> 
                            </div>
                        </div>
                        <div className={styles.featuredExtensionCollaboration}>
                            <div>
                                <FormattedMessage
                                    defaultMessage="Collaboration with"
                                    description="Label for extension collaboration"
                                    id="gui.extensionLibrary.collaboration"
                                />
                            </div>
                            <div
                                className={styles.featuredExtensionMetadataDetail}
                            >
                                {`Amazon Web Services` /* TODO: add collab prop */}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        ) : (
            <Box
                className={styles.libraryItem}
                role="button"
                tabIndex="0"
                onBlur={this.handleBlur}
                onClick={this.handleClick}
                onFocus={this.handleFocus}
                onKeyPress={this.handleKeyPress}
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
    description: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    disabled: PropTypes.bool,
    featured: PropTypes.bool,
    iconURL: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    insetIconURL: PropTypes.string,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]).isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};

LibraryItem.defaultProps = {
    disabled: false
};

export default LibraryItem;
