import PropTypes from 'prop-types';
import React from 'react';

import storage from '../../lib/storage';

class ScratchImage extends React.PureComponent {
    constructor (props) {
        super(props);

        this.state = {};
        Object.assign(this.state, this._loadImageSource(props.imageSource));
    }
    componentWillReceiveProps (nextProps) {
        const newState = this._loadImageSource(nextProps.imageSource);
        this.setState(newState);
    }
    /**
     * Calculate the state changes necessary to load the image specified in the provided source info. If the component
     * is mounted, call setState() with the return value of this function. If the component has not yet mounted, use
     * the return value of this function as initial state for the component.
     *
     * @param {object} imageSource - the new source for the image, including either assetId or URI
     * @returns {object} - the new state values, if any.
     */
    _loadImageSource (imageSource) {
        if (imageSource.uri) {
            return {
                imageURI: imageSource.uri,
                lastRequestedAsset: null
            };
        }
        if (this.state.lastRequestedAsset !== imageSource.assetId) {
            storage.load(imageSource.assetType, imageSource.assetId)
                .then(asset => {
                    this.setState({
                        imageURI: asset.encodeDataURI()
                    });
                });
            return {
                lastRequestedAsset: imageSource.assetId
            };
        }
        // Nothing to do - don't change any state.
        return {};
    }
    render () {
        const {
            src: _src,
            imageSource: _imageSource,
            ...imgProps
        } = this.props;
        return (<img
            src={this.state.imageURI}
            {...imgProps}
        />);
    }
}

ScratchImage.propTypes = {
    imageSource: PropTypes.oneOfType([
        PropTypes.shape({
            assetId: PropTypes.string.isRequired,
            assetType: PropTypes.oneOf(Object.values(storage.AssetType)).isRequired
        }),
        PropTypes.shape({
            uri: PropTypes.string.isRequired
        })
    ]).isRequired
};

export default ScratchImage;
