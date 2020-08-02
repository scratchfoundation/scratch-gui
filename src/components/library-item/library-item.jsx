import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import PlayButton from '../../containers/play-button.jsx';
import styles from './library-item.css';
import classNames from 'classnames';

import bluetoothIconURL from './bluetooth.svg';
import internetConnectionIconURL from './internet-connection.svg';

/* eslint-disable react/prefer-stateless-function */
class LibraryItemComponent extends React.PureComponent {
    render () {
        return this.props.featured ? (
            <div
                className={classNames(
                    styles.libraryItem,
                    styles.featuredItem,
                    {
                        [styles.disabled]: this.props.disabled
                    },
                    this.props.extensionId ? styles.libraryItemExtension : null,
                    this.props.hidden ? styles.hidden : null
                )}
                onClick={this.props.onClick}
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
                {this.props.insetIconURL ? (
                    <div className={styles.libraryItemInsetImageContainer}>
                        <img
                            className={styles.libraryItemInsetImage}
                            src={this.props.insetIconURL}
                        />
                    </div>
                ) : null}
                <div
                    className={this.props.extensionId ?
                        classNames(styles.featuredExtensionText, styles.featuredText) : styles.featuredText
                    }
                >
                    <span className={styles.libraryItemName}>{this.props.name}</span>
                    <br />
                    <span className={styles.featuredDescription}>{this.props.description}</span>
                </div>
                {this.props.bluetoothRequired || this.props.internetConnectionRequired || this.props.collaborator ? (
                    <div className={styles.featuredExtensionMetadata}>
                        <div className={styles.featuredExtensionRequirement}>
                            {this.props.bluetoothRequired || this.props.internetConnectionRequired ? (
                                <div>
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
                                        {this.props.bluetoothRequired ? (
                                            <img src={bluetoothIconURL} />
                                        ) : null}
                                        {this.props.internetConnectionRequired ? (
                                            <img src={internetConnectionIconURL} />
                                        ) : null}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        <div className={styles.featuredExtensionCollaboration}>
                            {this.props.collaborator ? (
                                <div>
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
                                        {this.props.collaborator}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                ) : null}
            </div>
        ) : (
            <Box
                className={classNames(
                    styles.libraryItem, {
                        [styles.hidden]: this.props.hidden
                    }
                )}
                role="button"
                tabIndex="0"
                onBlur={this.props.onBlur}
                onClick={this.props.onClick}
                onFocus={this.props.onFocus}
                onKeyPress={this.props.onKeyPress}
                onMouseEnter={this.props.showPlayButton ? null : this.props.onMouseEnter}
                onMouseLeave={this.props.showPlayButton ? null : this.props.onMouseLeave}
            >
                {/* Layers of wrapping is to prevent layout thrashing on animation */}
                <Box className={styles.libraryItemImageContainerWrapper}>
                    <Box
                        className={styles.libraryItemImageContainer}
                        onMouseEnter={this.props.showPlayButton ? this.props.onMouseEnter : null}
                        onMouseLeave={this.props.showPlayButton ? this.props.onMouseLeave : null}
                    >
                        <img
                            className={styles.libraryItemImage}
                            src={this.props.iconURL}
                        />
                    </Box>
                </Box>
                <span className={styles.libraryItemName}>{this.props.name}</span>
                {this.props.showPlayButton ? (
                    <PlayButton
                        isPlaying={this.props.isPlaying}
                        onPlay={this.props.onPlay}
                        onStop={this.props.onStop}
                    />
                ) : null}
            </Box>
        );
    }
}
/* eslint-enable react/prefer-stateless-function */


LibraryItemComponent.propTypes = {
    bluetoothRequired: PropTypes.bool,
    collaborator: PropTypes.string,
    description: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    disabled: PropTypes.bool,
    extensionId: PropTypes.string,
    featured: PropTypes.bool,
    hidden: PropTypes.bool,
    iconURL: PropTypes.string,
    insetIconURL: PropTypes.string,
    internetConnectionRequired: PropTypes.bool,
    isPlaying: PropTypes.bool,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    onBlur: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    showPlayButton: PropTypes.bool
};

LibraryItemComponent.defaultProps = {
    disabled: false,
    showPlayButton: false
};

export default LibraryItemComponent;
