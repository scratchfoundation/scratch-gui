/* eslint-disable require-jsdoc */
// polyfill for array buffer on iOS
(function () {
    // eslint-disable-next-line func-style
    function myArrayBuffer () {
        // this: File or Blob
        return new Promise(resolve => {
            const fr = new FileReader();
            fr.onload = () => {
                resolve(fr.result);
            };
            // eslint-disable-next-line no-invalid-this
            fr.readAsArrayBuffer(this);
        });
    }

    File.prototype.arrayBuffer = File.prototype.arrayBuffer || myArrayBuffer;
    Blob.prototype.arrayBuffer = Blob.prototype.arrayBuffer || myArrayBuffer;
}());

// convert from a base64 data user - e.g. data://.... to a blob
export const blobToBase64 = blob =>
    new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            resolve(reader.result);
        };
    });
