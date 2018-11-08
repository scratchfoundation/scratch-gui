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
        this.state = Object.assign(this.state || {}, {
            iconURI: props.iconURL // may be undefined if we're using iconMD5 instead
        });
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.iconURL) {
            this.setState({iconURI: nextProps.iconURL});
        } else if ((!this.state.iconURI) || nextProps.iconMD5 !== this.props.iconMD5) {
            // TODO: adjust libraries to be more storage-friendly; don't use split() here.
            const [md5, ext] = nextProps.iconMD5.split('.');
            const assetType = getAssetTypeForExtension(ext);
            storage.load(assetType, md5)
                .then(asset => {
                    this.setState({iconURI: asset.encodeDataURI()});
                });
        }
    }
    render () {
        const {iconMD5: _iconMD5, iconURL: _iconURL, ...childProps} = this.props;
        return (<LibraryItemComponent
            iconURI={this.state.iconURI}
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
        // copy all props EXCEPT iconURI from LibraryItemComponent
        const {iconURI: _iconURI, ...otherProps} = LibraryItemComponent.propTypes;
        return otherProps;
    })(),
    {
        iconMD5: LibraryItem.requireUrlOrMD5,
        iconURL: LibraryItem.requireUrlOrMD5
    }
);

export default LibraryItem;
