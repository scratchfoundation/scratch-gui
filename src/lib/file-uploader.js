import {BitmapAdapter} from 'scratch-svg-renderer';
import log from './log.js';

/**
 * Extract the file name given a string of the form fileName + ext
 * @param {string} nameExt File name + extension (e.g. 'my_image.png')
 * @return {string} The name without the extension, or the full name if
 * there was no '.' in the string (e.g. 'my_image')
 */
const extractFileName = function (nameExt) {
    // There could be multiple dots, but get the stuff before the first .
    const nameParts = nameExt.split('.', 1); // we only care about the first .
    return nameParts[0];
};

/**
 * Handle a file upload given the input element that contains the file,
 * and a function to handle loading the file.
 * @param {Input} fileInput The <input/> element that contains the file being loaded
 * @param {Function} onload The function that handles loading the file
 */
const handleFileUpload = function (fileInput, onload) {
    let thisFile = null;
    const reader = new FileReader();
    reader.onload = () => {
        // Reset the file input value now that we have everything we need
        // so that the user can upload the same sound multiple times if
        // they choose
        fileInput.value = null;
        const fileType = thisFile.type;
        const fileName = extractFileName(thisFile.name);

        onload(reader.result, fileType, fileName);
    };
    if (fileInput.files) {
        thisFile = fileInput.files[0];
        reader.readAsArrayBuffer(thisFile);
    }
};

/**
 * @typedef VMAsset
 * @property {string} name The user-readable name of this asset - This will
 * automatically get translated to a fresh name if this one already exists in the
 * scope of this vm asset (e.g. if a sound already exists with the same name for
 * the same target)
 * @property {string} dataFormat The data format of this asset, typically
 * the extension to be used for that particular asset, e.g. 'svg' for vector images
 * @property {string} md5 The md5 hash of the asset data, followed by '.'' and dataFormat
 * @property {string} The md5 hash of the asset data // TODO remove duplication....
 */

/**
 * Create an asset (costume, sound) with storage and return an object representation
 * of the asset to track in the VM.
 * @param {ScratchStorage} storage The storage to cache the asset in
 * @param {string} fileName The name of the asset
 * @param {AssetType} assetType A ScratchStorage AssetType indicating what kind of
 * asset this is.
 * @param {string} dataFormat The format of this data (typically the file extension)
 * @param {UInt8Array} data The asset data buffer
 * @return {VMAsset} An object representing this asset and relevant information
 * which can be used to look up the data in storage
 */
const createVMAsset = function (storage, fileName, assetType, dataFormat, data) {
    const asset = storage.createAsset(
        assetType,
        dataFormat,
        data,
        null,
        true // generate md5
    );

    return {
        name: fileName,
        dataFormat: dataFormat,
        asset: asset,
        md5: `${asset.assetId}.${dataFormat}`,
        assetId: asset.assetId
    };
};

/**
 * Handles loading a costume or a backdrop using the provided, context-relevant information.
 * @param {ArrayBuffer | string} fileData The costume data to load (this can be a base64 string
 * iff the image is a bitmap)
 * @param {string} fileType The MIME type of this file
 * @param {string} costumeName The user-readable name to use for the costume.
 * @param {ScratchStorage} storage The ScratchStorage instance to cache the costume data
 * @param {Function} handleCostume The function to execute on the costume object returned after
 * caching this costume in storage - This function should be responsible for
 * adding the costume to the VM and handling other UI flow that should come after adding the costume
 */
const costumeUpload = function (fileData, fileType, costumeName, storage, handleCostume) {
    let costumeFormat = null;
    let assetType = null;
    switch (fileType) {
    case 'image/svg+xml': {
        costumeFormat = storage.DataFormat.SVG;
        assetType = storage.AssetType.ImageVector;
        break;
    }
    case 'image/jpeg': {
        costumeFormat = storage.DataFormat.JPG;
        assetType = storage.AssetType.ImageBitmap;
        break;
    }
    case 'image/png': {
        costumeFormat = storage.DataFormat.PNG;
        assetType = storage.AssetType.ImageBitmap;
        break;
    }
    default:
        log.warn(`Encountered unexpected file type: ${fileType}`);
        return;
    }

    const bitmapAdapter = new BitmapAdapter();
    const addCostumeFromBuffer = function (dataBuffer) {
        const vmCostume = createVMAsset(
            storage,
            costumeName,
            assetType,
            costumeFormat,
            dataBuffer
        );
        handleCostume(vmCostume);
    };

    if (costumeFormat === storage.DataFormat.SVG) {
        // Must pass in file data as a Uint8Array,
        // passing in an array buffer causes the sprite/costume
        // thumbnails to not display because the data URI for the costume
        // is invalid
        addCostumeFromBuffer(new Uint8Array(fileData));
    } else {
        // otherwise it's a bitmap
        bitmapAdapter.importBitmap(fileData, fileType).then(addCostumeFromBuffer)
            .catch(e => {
                log.error(e);
            });
    }
};

/**
 * Handles loading a sound using the provided, context-relevant information.
 * @param {ArrayBuffer} fileData The sound data to load
 * @param {string} fileType The MIME type of this file; This function will exit
 * early if the fileType is unexpected.
 * @param {string} soundName The user-readable name to use for the sound.
  * @param {ScratchStorage} storage The ScratchStorage instance to cache the sound data
 * @param {Function} handleSound The function to execute on the sound object of type VMAsset
 * This function should be responsible for adding the sound to the VM
 * as well as handling other UI flow that should come after adding the sound
 */
const soundUpload = function (fileData, fileType, soundName, storage, handleSound) {
    let soundFormat;
    switch (fileType) {
    case 'audio/mp3':
    case 'audio/mpeg': {
        soundFormat = storage.DataFormat.MP3;
        break;
    }
    case 'audio/wav':
    case 'audio/wave':
    case 'audio/x-wav':
    case 'audio/x-pn-wav': {
        soundFormat = storage.DataFormat.WAV;
        break;
    }
    default:
        log.warn(`Encountered unexpected file type: ${fileType}`);
        return;
    }

    const vmSound = createVMAsset(
        storage,
        soundName,
        storage.AssetType.Sound,
        soundFormat,
        new Uint8Array(fileData));

    handleSound(vmSound);
};

const spriteUpload = function (fileData, fileType, spriteName, storage, handleSprite, costumeSuffix) {
    const costumeName = costumeSuffix || 'costume1';
    switch (fileType) {
    case '':
    case 'application/zip': { // We think this is a .sprite2 or .sprite3 file
        handleSprite(new Uint8Array(fileData));
        return;
    }
    case 'image/svg+xml':
    case 'image/png':
    case 'image/jpeg': {
        // Make a sprite from an image by making it a costume first
        costumeUpload(fileData, fileType, `${spriteName}-${costumeName}`, storage, (vmCostume => {
            const newSprite = {
                name: spriteName,
                isStage: false,
                x: 0,
                y: 0,
                visible: true,
                size: 100,
                rotationStyle: 'all around',
                direction: 90,
                draggable: true,
                currentCostume: 0,
                blocks: {},
                variables: {},
                costumes: [vmCostume],
                sounds: [] // TODO are all of these necessary?
            };
            // TODO probably just want sprite upload to handle this object directly
            handleSprite(JSON.stringify(newSprite));
        }));
        return;
    }
    default: {
        log.warn(`Encountered unexpected file type: ${fileType}`);
        return;
    }
    }
};

export {
    handleFileUpload,
    costumeUpload,
    soundUpload,
    spriteUpload
};
