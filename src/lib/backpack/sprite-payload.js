import jpegThumbnail from './jpeg-thumbnail';
import storage from '../storage';

const spritePayload = (sprite, vm) => vm.exportSprite(
    sprite.id,
    'base64'
).then(zippedSprite => {
    const payload = {
        type: 'sprite',
        name: sprite.name,
        mime: 'application/zip',
        body: zippedSprite,
        // Filled in below
        thumbnail: ''
    };

    const costumeDataUrl = storage.get(sprite.costume.assetId).encodeDataURI();
    return jpegThumbnail(costumeDataUrl).then(thumbnail => {
        payload.thumbnail = thumbnail.replace('data:image/jpeg;base64,', '');
        return payload;
    });
});

export default spritePayload;
