// eslint-disable-next-line import/no-unresolved
import soundThumbnail from '!base64-loader!./sound-thumbnail.jpg';
import storage from '../storage';

const soundPayload = sound => {
    const assetDataUrl = storage.get(sound.assetId).encodeDataURI();
    const assetDataFormat = sound.dataFormat;
    const payload = {
        type: 'sound',
        name: sound.name,
        thumbnail: soundThumbnail,
        // Params to be filled in below
        mime: '',
        body: ''
    };

    switch (assetDataFormat) {
    case 'wav':
        payload.mime = 'audio/x-wav';
        payload.body = assetDataUrl.replace('data:audio/x-wav;base64,', '');
        break;
    default:
        alert(`Cannot serialize for format: ${assetDataFormat}`); // eslint-disable-line
    }

    // Return a promise to make it consistent with other payload constructors like costume-payload
    return new Promise(resolve => resolve(payload));
};

export default soundPayload;
