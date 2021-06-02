/* eslint-disable no-extend-native */

if (!Blob.prototype.text) {
    Blob.prototype.text = function () {
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result);
            fr.onerror = () => reject(new Error('Cannot read blob as text'));
            fr.readAsText(this);
        });
    };
}

if (!Array.prototype.flat) {
    Array.prototype.flat = function (depth = 1) {
        const result = [];
        for (const i of this) {
            if (Array.isArray(i)) {
                if (depth < 1) {
                    result.push(i);
                } else {
                    for (const j of i.flat(depth - 1)) {
                        result.push(j);
                    }
                }
            } else {
                result.push(i);
            }
        }
        return result;
    };
}

if (typeof queueMicrotask !== 'function') {
    window.queueMicrotask = callback => {
        Promise.resolve().then(callback);
    };
}
