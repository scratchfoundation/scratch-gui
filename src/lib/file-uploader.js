import { BitmapAdapter, sanitizeSvg } from "scratch-svg-renderer";
import randomizeSpritePosition from "./randomize-sprite-position.js";
import bmpConverter from "./bmp-converter";
import gifDecoder from "./gif-decoder";

/**
 * Extract the file name given a string of the form fileName + ext
 * @param {string} nameExt File name + extension (e.g. 'my_image.png')
 * @return {string} The name without the extension, or the full name if
 * there was no '.' in the string (e.g. 'my_image')
 */
const extractFileName = function (nameExt) {
    // There could be multiple dots, but get the stuff before the first .
    const nameParts = nameExt.split(".", 1); // we only care about the first .
    return nameParts[0];
};

/**
 * Handle a file upload given the input element that contains the file,
 * and a function to handle loading the file.
 * @param {Input} fileInput The <input/> element that contains the file being loaded
 * @param {Function} onload The function that handles loading the file
 * @param {Function} onerror The function that handles any error loading the file
 */
const handleFileUpload = function (fileInput, onload, onerror) {
    const readFile = (i, files) => {
        if (i === files.length) {
            // Reset the file input value now that we have everything we need
            // so that the user can upload the same sound multiple times if
            // they choose
            fileInput.value = null;
            return;
        }
        const file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
            const fileType = file.type;
            const fileName = extractFileName(file.name);
            onload(reader.result, fileType, fileName, i, files.length);
            readFile(i + 1, files);
        };
        reader.onerror = onerror;
        reader.readAsArrayBuffer(file);
    };
    readFile(0, fileInput.files);
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
 * @param {AssetType} assetType A ScratchStorage AssetType indicating what kind of
 * asset this is.
 * @param {string} dataFormat The format of this data (typically the file extension)
 * @param {UInt8Array} data The asset data buffer
 * @return {VMAsset} An object representing this asset and relevant information
 * which can be used to look up the data in storage
 */
const createVMAsset = function (storage, assetType, dataFormat, data) {
    const asset = storage.createAsset(
        assetType,
        dataFormat,
        data,
        null,
        true // generate md5
    );

    return {
        name: null, // Needs to be set by caller
        dataFormat: dataFormat,
        asset: asset,
        md5: `${asset.assetId}.${dataFormat}`,
        assetId: asset.assetId,
    };
};

/**
 * Handles loading a costume or a backdrop using the provided, context-relevant information.
 * @param {ArrayBuffer | string} fileData The costume data to load (this can be a base64 string
 * iff the image is a bitmap)
 * @param {string} fileType The MIME type of this file
 * @param {ScratchStorage} storage The ScratchStorage instance to cache the costume data
 * @param {Function} handleCostume The function to execute on the costume object returned after
 * caching this costume in storage - This function should be responsible for
 * adding the costume to the VM and handling other UI flow that should come after adding the costume
 * @param {Function} handleError The function to execute if there is an error parsing the costume
 */
const costumeUpload = async function (
    fileData,
    fileType,
    storage,
    handleCostume,
    handleError = () => {},
    handleSuccessCallback = () => {}
) {
    let costumeFormat = null;
    let assetType = null;

    const addCostumeFromBuffer = function (dataBuffer) {
        try {
            const vmCostume = createVMAsset(
                storage,
                assetType,
                costumeFormat,
                dataBuffer
            );
            handleCostume([vmCostume]);
        } catch (error) {
            handleError(`Costume creation failed: ${error.message}`);
        }
    };

    const compressViaAPI = async (data, mimeType) => {
        try {
            const blob = new Blob([data], { type: mimeType });
            const formData = new FormData();
            formData.append("file", blob);

            const response = await fetch(
                "https://api.test.myqubit.co/projects/compress-files",
                {
                    method: "POST",
                    body: formData,
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Compression API error: ${response.statusText}`
                );
            }

            const compressedBuffer = await response.arrayBuffer();
            return new Uint8Array(compressedBuffer);
        } catch (error) {
            handleError(
                `API compression failed for ${mimeType}: ${error.message}`
            );
            return data; // Fallback to original data if compression fails
        } finally {
            handleSuccessCallback();
        }
    };

    const sanitizeAndCompress = async (data, mimeType, handleError) => {
        try {
            const sanitizedData = sanitizeSvg.sanitizeByteStream(data);
            const compressedData = await compressViaAPI(
                sanitizedData,
                mimeType
            );
            if (!compressedData) {
                return null;
            }

            try {
                return sanitizeSvg.sanitizeByteStream(compressedData);
            } catch (sanitizeError) {
                handleError(
                    `Compressed SVG sanitization failed: ${sanitizeError.message}`
                );
                return null;
            }
        } catch (sanitizeError) {
            handleError(`SVG sanitization failed: ${sanitizeError.message}`);
            return null;
        }
    };

    switch (fileType) {
        case "image/svg+xml": {
            costumeFormat = storage.DataFormat.SVG;
            assetType = storage.AssetType.ImageVector;

            const processedData = await sanitizeAndCompress(
                fileData,
                fileType,
                handleError
            );
            if (processedData) {
                addCostumeFromBuffer(processedData);
            }
            return;
        }

        case "image/jpeg": {
            costumeFormat = storage.DataFormat.JPG;
            assetType = storage.AssetType.ImageBitmap;

            const compressedData = await compressViaAPI(fileData, fileType);
            if (compressedData) {
                addCostumeFromBuffer(compressedData);
            }
            return;
        }

        case "image/png": {
            costumeFormat = storage.DataFormat.PNG;
            assetType = storage.AssetType.ImageBitmap;

            const compressedData = await compressViaAPI(fileData, fileType);
            if (compressedData) {
                addCostumeFromBuffer(compressedData);
            }
            return;
        }

        case "image/bmp": {
            costumeFormat = storage.DataFormat.PNG;
            assetType = storage.AssetType.ImageBitmap;

            const dataUrl = await bmpConverter(fileData);
            const response = await fetch(dataUrl);
            const blob = await response.blob();
            const arrayBuffer = await blob.arrayBuffer();
            const convertedData = new Uint8Array(arrayBuffer);

            const compressedData = await compressViaAPI(
                convertedData,
                "image/bmp"
            );
            if (compressedData) {
                addCostumeFromBuffer(compressedData);
            }
            return;
        }

        case "image/gif": {
            let costumes = [];
            gifDecoder(fileData, async (frameNumber, dataUrl, numFrames) => {
                try {
                    const response = await fetch(dataUrl);
                    const blob = await response.blob();
                    const arrayBuffer = await blob.arrayBuffer();
                    const frameData = new Uint8Array(arrayBuffer);

                    const compressedData = await compressViaAPI(
                        frameData,
                        "image/gif"
                    );
                    if (compressedData) {
                        costumeFormat = storage.DataFormat.PNG;
                        assetType = storage.AssetType.ImageBitmap;
                        const vmCostume = createVMAsset(
                            storage,
                            assetType,
                            costumeFormat,
                            compressedData
                        );
                        costumes = costumes.concat([vmCostume]);
                        if (frameNumber === numFrames - 1) {
                            handleCostume(costumes);
                        }
                    }
                } catch (error) {
                    handleError(
                        `GIF frame processing failed: ${error.message}`
                    );
                }
            });
            return;
        }

        default:
            handleError(`Encountered unexpected file type: ${fileType}`);
            return;
    }
};
/**
 * Handles loading a sound using the provided, context-relevant information.
 * @param {ArrayBuffer} fileData The sound data to load
 * @param {string} fileType The MIME type of this file; This function will exit
 * early if the fileType is unexpected.
 * @param {ScratchStorage} storage The ScratchStorage instance to cache the sound data
 * @param {Function} handleSound The function to execute on the sound object of type VMAsset
 * This function should be responsible for adding the sound to the VM
 * as well as handling other UI flow that should come after adding the sound
 * @param {Function} handleError The function to execute if there is an error parsing the sound
 */
const soundUpload = async function (
    fileData,
    fileType,
    storage,
    handleSound,
    handleError,
    handleSuccessCallback = () => {}
) {
    let soundFormat;

    try {
        // Prepare and send API request
        const blob = new Blob([fileData], { type: fileType });
        const formData = new FormData();
        formData.append("file", blob);

        const response = await fetch(
            "https://api.test.myqubit.co/projects/compress-files",
            {
                method: "POST",
                body: formData,
                credentials: "include",
            }
        );

        if (!response.ok) {
            throw new Error(
                `Compression API error: ${response.status} - ${response.statusText}`
            );
        }

        const compressedData = await response.arrayBuffer();

        // Determine sound format
        switch (fileType) {
            case "audio/mp3":
            case "audio/mpeg": {
                soundFormat = storage.DataFormat.MP3;
                break;
            }
            case "audio/wav":
            case "audio/wave":
            case "audio/x-wav":
            case "audio/x-pn-wav": {
                soundFormat = storage.DataFormat.WAV;
                break;
            }
            default:
                throw new Error(
                    `Encountered unexpected file type: ${fileType}`
                );
        }

        // Create and store the sound asset
        const vmSound = createVMAsset(
            storage,
            storage.AssetType.Sound,
            soundFormat,
            new Uint8Array(compressedData)
        );

        // Call the handleSound function to process the sound
        handleSound(vmSound);

        // Call the success callback with the created sound
        handleSuccessCallback(vmSound);
    } catch (error) {
        handleError(`Sound upload failed: ${error.message}`);
    } finally {
        handleSuccessCallback();
    }
};

const spriteUpload = function (
    fileData,
    fileType,
    spriteName,
    storage,
    handleSprite,
    handleError = () => {},
    handleSuccessCallback = () => {}
) {
    switch (fileType) {
        case "":
        case "application/zip": {
            handleSprite(new Uint8Array(fileData));
            return;
        }
        case "image/svg+xml":
        case "image/png":
        case "image/bmp":
        case "image/jpeg":
        case "image/gif": {
            costumeUpload(
                fileData,
                fileType,
                storage,
                (vmCostumes) => {
                    vmCostumes.forEach((costume, i) => {
                        costume.name = `${spriteName}${i ? i + 1 : ""}`;
                    });
                    const newSprite = {
                        name: spriteName,
                        isStage: false,
                        x: 0, // x/y will be randomized below
                        y: 0,
                        visible: true,
                        size: 100,
                        rotationStyle: "all around",
                        direction: 90,
                        draggable: false,
                        currentCostume: 0,
                        blocks: {},
                        variables: {},
                        costumes: vmCostumes,
                        sounds: [],
                    };
                    randomizeSpritePosition(newSprite);
                    // TODO probably just want sprite upload to handle this object directly
                    handleSprite(JSON.stringify(newSprite));
                },
                handleError,
                handleSuccessCallback
            );
            return;
        }
        default: {
            handleError(`Encountered unexpected file type: ${fileType}`);
            return;
        }
    }
};

export { handleFileUpload, costumeUpload, soundUpload, spriteUpload };
