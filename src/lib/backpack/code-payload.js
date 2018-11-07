import blockToImage from './block-to-image';
import jpegThumbnail from './jpeg-thumbnail';

const codePayload = ({blockObjects, topBlockId}) => {
    const payload = {
        type: 'script', // Needs to match backpack-server type name
        name: 'code', // All code currently gets the same name
        mime: 'application/json',
        body: btoa(JSON.stringify(blockObjects)) // Base64 encode the json
    };

    return blockToImage(topBlockId)
        .then(jpegThumbnail)
        .then(thumbnail => {
            payload.thumbnail = thumbnail.replace('data:image/jpeg;base64,', '');
            return payload;
        });
};

export default codePayload;
