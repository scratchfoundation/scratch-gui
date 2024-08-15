import jpegThumbnail from './jpeg-thumbnail';
import getCostumeUrl from '../get-costume-url';

const costumePayload = costume => {
    // TODO is it ok to base64 encode SVGs? What about unicode text inside them?
    const assetDataUrl = costume.asset.encodeDataURI();
    const assetDataFormat = costume.dataFormat;
    const payload = {
        type: 'costume',
        name: costume.name,
        // Params to be filled in below
        mime: '',
        body: '',
        thumbnail: ''
    };

    switch (assetDataFormat) {
    case 'svg':
        payload.mime = 'image/svg+xml';
        payload.body = assetDataUrl.replace('data:image/svg+xml;base64,', '');
        break;
    case 'png':
        payload.mime = 'image/png';
        payload.body = assetDataUrl.replace('data:image/png;base64,', '');
        break;
    default:
        alert(`Cannot serialize for format: ${assetDataFormat}`); // eslint-disable-line
    }

    // Do not generate the thumbnail from the raw asset. Instead use the getCostumeUrl
    // utility which inlines the fonts to make the thumbnail show the right fonts.
    const inlinedFontDataUrl = getCostumeUrl(costume.asset);
    return jpegThumbnail(inlinedFontDataUrl).then(thumbnail => {
        payload.thumbnail = thumbnail.replace('data:image/jpeg;base64,', '');
        return payload;
    });
};

export default costumePayload;
