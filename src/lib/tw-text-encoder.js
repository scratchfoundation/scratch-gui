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
        str = unescape(encodeURIComponent(str));
        const arr = new Uint8Array(str.length);
        for (let i = 0; i < str.length; i++) {
            arr[i] = str.charCodeAt(i);
        }
        return arr;
    }
};

const _TextDecoder = typeof TextDecoder === 'function' ? TextDecoder : class TextDecoder {
    constructor (encoding) {
        if (typeof encoding !== 'undefined' && encoding !== null && encoding !== 'utf-8' && encoding !== 'utf8') {
            throw new Error('Encoding is not supported');
        }
        this.encoding = 'utf-8';
    }
    decode (view) {
        const array = new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
        let result = '';
        for (let i = 0; i < array.length; i++) {
            result += String.fromCharCode(array[i]);
        }
        return decodeURIComponent(escape(result));
    }
};

export {
    _TextEncoder as TextEncoder,
    _TextDecoder as TextDecoder
};
