const ScratchStorage = require('scratch-storage');
const AssetType = ScratchStorage.AssetType;

const PROJECT_SERVER = 'https://cdn.projects.scratch.mit.edu';
const ASSET_SERVER = 'https://cdn.assets.scratch.mit.edu';

/**
 * Wrapper for ScratchStorage which adds default web sources.
 * @todo make this more configurable
 */
class Storage extends ScratchStorage {
    constructor () {
        super();
        this.addWebSource(
            [AssetType.Project],
            projectAsset => {
                const [projectId, revision] = projectAsset.assetId.split('.');
                return revision ?
                    `${PROJECT_SERVER}/internalapi/project/${projectId}/get/${revision}` :
                    `${PROJECT_SERVER}/internalapi/project/${projectId}/get/`;
            }
        );
        this.addWebSource(
            [AssetType.ImageVector, AssetType.ImageBitmap, AssetType.Sound],
            asset => `${ASSET_SERVER}/internalapi/asset/${asset.assetId}.${asset.assetType.runtimeFormat}/get/`
        );
    }
}

module.exports = Storage;
