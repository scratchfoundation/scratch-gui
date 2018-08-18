import ScratchStorage from 'scratch-storage';

import defaultProjectAssets from './default-project';

/**
 * Wrapper for ScratchStorage which adds default web sources.
 * @todo make this more configurable
 */
class Storage extends ScratchStorage {
    constructor () {
        super();
        defaultProjectAssets.forEach(asset => this.cache(
            this.AssetType[asset.assetType],
            this.DataFormat[asset.dataFormat],
            asset.data,
            asset.id
        ));
        this.addWebSource(
            [this.AssetType.Project],
            this.getProjectURL.bind(this)
        );
        this.addWebSource(
            [this.AssetType.ImageVector, this.AssetType.ImageBitmap, this.AssetType.Sound],
            this.getAssetURL.bind(this)
        );
        this.addWebSource(
            [this.AssetType.Sound],
            asset => `static/extension-assets/scratch3_music/${asset.assetId}.${asset.dataFormat}`
        );
    }
    setProjectHost (projectHost) {
        this.projectHost = projectHost;
    }
    getProjectURL (projectAsset) {
        return `${this.projectHost}/internalapi/project/${projectAsset.assetId}/get/`;
    }
    setAssetHost (assetHost) {
        this.assetHost = assetHost;
    }
    getAssetURL (asset) {
        return `${this.assetHost}/internalapi/asset/${asset.assetId}.${asset.dataFormat}/get/`;
    }
}

const storage = new Storage();

export default storage;
