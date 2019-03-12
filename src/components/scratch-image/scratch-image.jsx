import PropTypes from 'prop-types';
import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import storage from '../../lib/storage';

class ScratchImage extends React.PureComponent {
    static get pendingImages () {
        return this._pendingImages || (this._pendingImages = new Set());
    }
    static get maxParallelism () {
        return this._maxParallelism > 0 ? this._maxParallelism : (this._maxParallelism = 6);
    }

    static loadPendingImages () {
        if (this._currentJobs >= this.maxParallelism) {
            // already busy
            return;
        }

        // Find the first visible image. If there aren't any, find the first non-visible image.
        let nextImage;
        for (const image of this.pendingImages) {
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
            this.pendingImages.delete(nextImage);
            const imageSource = nextImage.props.imageSource;
            ++this._currentJobs;
            storage
                .load(imageSource.assetType, imageSource.assetId)
                .then(asset => {
                    const dataURI = asset.encodeDataURI();
                    nextImage.setState({
                        imageURI: dataURI
                    });
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
                ScratchImage.pendingImages.delete(this);
                return {
                    imageURI: imageSource.uri,
                    lastRequestedAsset: null
                };
            }
            if (this.state.lastRequestedAsset !== imageSource.assetId) {
                ScratchImage.pendingImages.add(this);
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
            src: _src,
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
                        if (isVisible) {
                            ScratchImage.loadPendingImages();
                        }
                        return (
                            <img
                                src={this.state.imageURI}
                                // the element must have non-zero size for VisibilitySensor to work before image load
                                style={{minWidth: '1px', minHeight: '1px'}}
                                {...imgProps}
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

export default ScratchImage;
