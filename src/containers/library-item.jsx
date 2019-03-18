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
            'rotateIcon',
            'startRotatingIcons',
            'stopRotatingIcons'
        ]);
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
        this.handleMouseEnter(id);
    }
    handleKeyPress (e) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            this.props.onSelect(this.props.id);
        }
    }
    handleMouseEnter () {
        this.props.onMouseEnter(this.props.id);
        if (this.props.icons && this.props.icons.length) {
            this.stopRotatingIcons();
            this.setState({
                isRotatingIcon: true
            }, this.startRotatingIcons);
        }
    }
    handleMouseLeave () {
        this.props.onMouseLeave(this.props.id);
        if (this.props.icons && this.props.icons.length) {
            this.setState({
                isRotatingIcon: false
            }, this.stopRotatingIcons);
        }
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
        if (this.props.icons &&
            this.state.isRotatingIcon &&
            this.state.iconIndex < this.props.icons.length &&
            this.props.icons[this.state.iconIndex]) {
            return this.props.icons[this.state.iconIndex];
        }
        return this.props.iconSource;
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
                name={this.props.name}
                onBlur={this.handleBlur}
                onClick={this.handleClick}
                onFocus={this.handleFocus}
                onKeyPress={this.handleKeyPress}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
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
    iconSource: LibraryItemComponent.propTypes.iconSource, // single icon
    icons: PropTypes.arrayOf(LibraryItemComponent.propTypes.iconSource), // rotating icons
    id: PropTypes.number.isRequired,
    insetIconURL: PropTypes.string,
    internetConnectionRequired: PropTypes.bool,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default injectIntl(LibraryItem);
