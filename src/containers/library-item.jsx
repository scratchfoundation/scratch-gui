import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';

import LibraryItemComponent from '../components/library-item/library-item.jsx';
import storage from '../lib/storage';

/**
 * @param {string} extension - the extension to look up.
 * @returns {AssetType} - the AssetType corresponding to the extension, if any.
 */
const getAssetTypeForExtension = function (extension) {
    const compareOptions = {
        sensitivity: 'accent',
        usage: 'search'
    };
    for (const assetTypeId of Object.keys(storage.AssetType)) {
        const assetType = storage.AssetType[assetTypeId];
        if (extension.localeCompare(assetType.runtimeFormat, compareOptions) === 0) {
            return assetType;
        }
    }
};

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
        this.state = {};
        Object.assign(this.state, this._loadIconFromProps(props));
    }
    componentWillReceiveProps (nextProps) {
        const newState = this._loadIconFromProps(nextProps);
        this.setState(newState);
    }
    /**
     * Calculate the state changes necessary to load the icon specified in the provided properties. If the component is
     * mounted, call setState() with the return value of this function. If the component has not yet mounted, use the
     * return value of this function as initial state for the component.
     *
     * @param {object} props - the new properties for this component, including either iconMD5 or iconURL
     * @returns {object} - the new state values, if any.
     */
    _loadIconFromProps (props) {
        if (props.iconURL) {
            return {
                iconURI: props.iconURL,
                lastRequestedMD5: null
            };
        }
        if (this.state.lastRequestedMD5 !== props.iconMD5) {
            // TODO: adjust libraries to be more storage-friendly; don't use split() here.
            const [md5, ext] = props.iconMD5.split('.');
            const assetType = getAssetTypeForExtension(ext);
            storage.load(assetType, md5)
                .then(asset => {
                    this.setState({
                        iconURI: asset.encodeDataURI()
                    });
                });
            return {
                lastRequestedMD5: props.iconMD5
            };
        }
        // Nothing to do - don't change any state.
        return {};
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
            iconMD5: _iconMD5,
            iconURL: _iconURL,
            id: _id,
            onBlur: _onBlur,
            onFocus: _onFocus,
            onMouseEnter: _onMouseEnter,
            onMouseLeave: _onMouseLeave,
            onSelect: _onSelect,
            ...childProps
        } = this.props;
        return (<LibraryItemComponent
            iconURI={this.state.iconURI}
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

LibraryItem.requireUrlOrMD5 = function (props) {
    if (typeof props.iconMD5 === 'string' && typeof props.iconURL === 'undefined') {
        return;
    }
    if (typeof props.iconMD5 === 'undefined' && typeof props.iconURL === 'string') {
        return;
    }
    return new Error('Exactly one of iconURL or iconMD5 must be set and the value must be a string.');
};

LibraryItem.propTypes = Object.assign({},
    (() => {
        // copy all prop types EXCEPT these from LibraryItemComponent
        const {
            iconURI: _iconURI,
            onClick: _onClick,
            onKeyPress: _onKeyPress,
            ...otherPropTypes
        } = LibraryItemComponent.propTypes;
        return otherPropTypes;
    })(),
    {
        id: PropTypes.number.isRequired,
        iconMD5: LibraryItem.requireUrlOrMD5,
        iconURL: LibraryItem.requireUrlOrMD5,
        onSelect: PropTypes.func.isRequired
    }
);

export default LibraryItem;
