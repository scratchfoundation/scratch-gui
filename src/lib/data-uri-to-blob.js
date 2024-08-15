/**
 * Utility to convert data URIs to blobs
 * Adapted from https://stackoverflow.com/questions/12168909/blob-from-dataurl
 * @param {string} dataURI the data uri to blobify
 * @return {Blob} a blob representing the data uri
 */
export default function dataURItoBlob (dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], {type: mimeString});
    return blob;
}
