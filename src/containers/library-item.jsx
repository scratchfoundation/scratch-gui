import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {injectIntl} from 'react-intl';

import LibraryItemComponent from '../components/library-item/library-item.jsx';

class LibraryItem extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleBlur',
            'handleClick',
            'handleFocus',
            'handleKeyPress',
            'handleMouseEnter',
            'handleMouseLeave',
            'handlePlay',
            'handleStop',
            'rotateIcon',
            'startRotatingIcons',
            'stopRotatingIcons'
        ]);
        this.hasIconsArray = Array.isArray(props.icons);
        this.state = {
            iconIndex: 0,
            isRotatingIcon: false
        };
    }
    componentWillUnmount () {
        clearInterval(this.intervalId);
    }
    handleBlur (id) {
        this.handleMouseLeave(id);
    }
    handleClick (e) {
        if (!this.props.disabled) {
            this.props.onSelect(this.props.id);
        }
        e.preventDefault();
    }
    handleFocus (id) {
        if (!this.props.showPlayButton) {
            this.handleMouseEnter(id);
        }
    }
    handleKeyPress (e) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            this.props.onSelect(this.props.id);
        }
    }
    handleMouseEnter () {
        // only show hover effects on the item if not showing a play button
        if (!this.props.showPlayButton) {
            this.props.onMouseEnter(this.props.id);
            if (this.hasIconsArray) {
                this.stopRotatingIcons();
                this.setState({
                    isRotatingIcon: true
                }, this.startRotatingIcons);
            }
        }
    }
    handleMouseLeave () {
        // only show hover effects on the item if not showing a play button
        if (!this.props.showPlayButton) {
            this.props.onMouseLeave(this.props.id);
            if (this.hasIconsArray) {
                this.setState({
                    isRotatingIcon: false
                }, this.stopRotatingIcons);
            }
        }
    }
    handlePlay () {
        this.props.onMouseEnter(this.props.id);
    }
    handleStop () {
        this.props.onMouseLeave(this.props.id);
    }
    startRotatingIcons () {
        this.rotateIcon();
        this.intervalId = setInterval(this.rotateIcon, 300);
    }
    stopRotatingIcons () {
        if (this.intervalId) {
            this.intervalId = clearInterval(this.intervalId);
        }
    }
    rotateIcon () {
        const nextIconIndex = (this.state.iconIndex + 1) % this.props.icons.length;
        this.setState({iconIndex: nextIconIndex});
    }
    curIconSource () {
        if (this.hasIconsArray) {
            if (this.state.isRotatingIcon &&
                this.state.iconIndex < this.props.icons.length &&
                this.props.icons[this.state.iconIndex]) {
                // multiple icons, currently animating: show current frame
                return this.props.icons[this.state.iconIndex];
            }
            // multiple icons, not currently animating: show first frame
            return this.props.icons[0];
        }
        // single icon
        return this.props.icons;
    }
    render () {
        const iconSource = this.curIconSource();
        return (
            <LibraryItemComponent
                bluetoothRequired={this.props.bluetoothRequired}
                collaborator={this.props.collaborator}
                description={this.props.description}
                disabled={this.props.disabled}
                extensionId={this.props.extensionId}
                featured={this.props.featured}
                hidden={this.props.hidden}
                iconSource={iconSource}
                id={this.props.id}
                insetIconURL={this.props.insetIconURL}
                internetConnectionRequired={this.props.internetConnectionRequired}
                isPlaying={this.props.isPlaying}
                name={this.props.name}
                showPlayButton={this.props.showPlayButton}
                onBlur={this.handleBlur}
                onClick={this.handleClick}
                onFocus={this.handleFocus}
                onKeyPress={this.handleKeyPress}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onPlay={this.handlePlay}
                onStop={this.handleStop}
            />
        );
    }
}

LibraryItem.propTypes = {
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
    icons: PropTypes.oneOfType([
        LibraryItemComponent.propTypes.iconSource, // single icon
        PropTypes.arrayOf(LibraryItemComponent.propTypes.iconSource) // rotating icons
    ]),
    id: PropTypes.number.isRequired,
    insetIconURL: PropTypes.string,
    internetConnectionRequired: PropTypes.bool,
    isPlaying: PropTypes.bool,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    showPlayButton: PropTypes.bool
};

export default injectIntl(LibraryItem);
