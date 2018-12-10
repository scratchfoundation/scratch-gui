import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';

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
        const {
            id: _id,
            onBlur: _onBlur,
            onFocus: _onFocus,
            onMouseEnter: _onMouseEnter,
            onMouseLeave: _onMouseLeave,
            onSelect: _onSelect,
            ...childProps
        } = this.props;
        return (<LibraryItemComponent
            imageSource={this.props.imageSource}
            onBlur={this.props.onBlur && this.handleBlur}
            onClick={this.handleClick}
            onFocus={this.props.onFocus && this.handleFocus}
            onKeyPress={this.handleKeyPress}
            onMouseEnter={this.props.onMouseEnter && this.handleMouseEnter}
            onMouseLeave={this.props.onMouseLeave && this.handleMouseLeave}
            {...childProps}
        />);
    }
}

LibraryItem.propTypes = Object.assign({},
    (() => {
        // copy all prop types EXCEPT these from LibraryItemComponent
        const {
            onClick: _onClick,
            onKeyPress: _onKeyPress,
            ...otherPropTypes
        } = LibraryItemComponent.propTypes;
        return otherPropTypes;
    })(),
    {
        id: PropTypes.number.isRequired,
        onSelect: PropTypes.func.isRequired
    }
);

export default LibraryItem;
