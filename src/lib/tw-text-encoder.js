const _TextEncoder = typeof TextEncoder === 'function' ? TextEncoder : class TextEncoder {
    constructor (encoding) {
        if (typeof encoding !== 'undefined' && encoding !== null && encoding !== 'utf-8' && encoding !== 'utf8') {
            throw new Error('Encoding is not supported');
        }
        this.encoding = 'utf-8';
    }
    encode (str) {
        if (typeof str !== 'string') {
            throw new TypeError('Argument is not a string');
        }
        const arr = new Uint8Array(str.length);
        for (let i = 0; i < str.length; i++) {
            arr[i] = str.charCodeAt(i);
        }
        return arr;
    }
};

export default _TextEncoder;
