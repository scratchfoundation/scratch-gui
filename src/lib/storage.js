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
    }
    setProjectHost (projectHost) {
        if (this.projectHost) return;
        this.addWebSource(
            [this.AssetType.Project],
            projectAsset => {
                const [projectId, revision] = projectAsset.assetId.split('.');
                return revision ?
                    `${projectHost}/internalapi/project/${projectId}/get/${revision}` :
                    `${projectHost}/internalapi/project/${projectId}/get/`;
            }
        );
        this.projectHost = projectHost;
    }
    setAssetHost (assetHost) {
        if (this.assetHost) return;
        this.addWebSource(
            [this.AssetType.ImageVector, this.AssetType.ImageBitmap, this.AssetType.Sound],
            asset => `${assetHost}/internalapi/asset/${asset.assetId}.${asset.dataFormat}/get/`
        );
        this.addWebSource(
            [this.AssetType.Sound],
            asset => `static/extension-assets/scratch3_music/${asset.assetId}.${asset.dataFormat}`
        );
        this.assetHost = assetHost;
    }
}

const storage = new Storage();

export default storage;
