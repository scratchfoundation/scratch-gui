import PropTypes from 'prop-types';
import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import storage from '../../lib/storage';

class ScratchImage extends React.PureComponent {
    static init () {
        this._maxParallelism = 6;
        this._currentJobs = 0;
        this._pendingImages = new Set();
    }

    static loadPendingImages () {
        if (this._currentJobs >= this._maxParallelism) {
            // already busy
            return;
        }

        // Find the first visible image. If there aren't any, find the first non-visible image.
        let nextImage;
        for (const image of this._pendingImages) {
            if (image.isVisible) {
                nextImage = image;
                break;
            } else {
                nextImage = nextImage || image;
            }
        }

        // If we found an image to load:
        // 1) Remove it from the queue
        // 2) Load the image
        // 3) Pump the queue again
        if (nextImage) {
            this._pendingImages.delete(nextImage);
            const imageSource = nextImage.props.imageSource;
            ++this._currentJobs;
            storage
                .load(imageSource.assetType, imageSource.assetId)
                .then(asset => {
                    if (!nextImage.wasUnmounted) {
                        const dataURI = asset.encodeDataURI();

                        nextImage.setState({
                            imageURI: dataURI
                        });
                    }
                    --this._currentJobs;
                    this.loadPendingImages();
                });
        }
    }

    constructor (props) {
        super(props);
        this.state = {};
        Object.assign(this.state, this._loadImageSource(props.imageSource));
    }
    componentWillReceiveProps (nextProps) {
        const newState = this._loadImageSource(nextProps.imageSource);
        this.setState(newState);
    }
    componentWillUnmount () {
        this.wasUnmounted = true;
        ScratchImage._pendingImages.delete(this);
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
        if (imageSource) {
            if (imageSource.uri) {
                ScratchImage._pendingImages.delete(this);
                return {
                    imageURI: imageSource.uri,
                    lastRequestedAsset: null
                };
            }
            if (this.state.lastRequestedAsset !== imageSource.assetId) {
                ScratchImage._pendingImages.add(this);
                return {
                    lastRequestedAsset: imageSource.assetId
                };
            }
        }
        // Nothing to do - don't change any state.
        return {};
    }
    render () {
        const {
            imageSource: _imageSource,
            ...imgProps
        } = this.props;
        return (
            <VisibilitySensor
                intervalCheck
                scrollCheck
            >
                {
                    ({isVisible}) => {
                        this.isVisible = isVisible;
                        ScratchImage.loadPendingImages();
                        return (
                            <img
                                {...imgProps} // do this first in case it contains `src`
                                src={this.state.imageURI} // overrides imgProps.src if present
                            />
                        );
                    }
                }
            </VisibilitySensor>
        );
    }
}

ScratchImage.ImageSourcePropType = PropTypes.oneOfType([
    PropTypes.shape({
        assetId: PropTypes.string.isRequired,
        assetType: PropTypes.oneOf(Object.values(storage.AssetType)).isRequired
    }),
    PropTypes.shape({
        uri: PropTypes.string.isRequired
    })
]);

ScratchImage.propTypes = {
    imageSource: ScratchImage.ImageSourcePropType.isRequired
};

ScratchImage.init();

export default ScratchImage;
