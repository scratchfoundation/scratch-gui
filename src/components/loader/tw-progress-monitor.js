// This file implements some extremely terrible tricks to monitor project loading progress.
// Please don't use this as a reference for "good JS code"

let total = 0;
let complete = 0;

// 0 - none
// 1 - load json
// 2 - load assets
let state = 0;

let currentProgress = 0;

let progressHandler = (state, progress, complete, total) => {};

export const setProgressHandler = newHandler => {
    progressHandler = newHandler;
    progressHandler(state, currentProgress, complete, total);
};

const setProgress = progress => {
    if (progress < 0) {
        progress = 0;
    }
    if (progress > 1) {
        progress = 1;
    }
    currentProgress = progress;
    progressHandler(state, progress, complete, total);
};

const setState = newState => {
    if (state === newState) {
        return;
    }
    state = newState;
    complete = 0;
    total = 0;
    setProgress(0);
};

// Scratch uses fetch() to download the project JSON, so we override it to monitor when the project is being downloaded.
const originalFetch = window.fetch;
window.fetch = (url, opts) => {
    if (typeof url === 'string' && /^https:\/\/projects\.scratch\.mit\.edu\/\d+$/.test(url) && opts && opts.method === 'GET') {
        setState(1);
        setProgress(0);

        return new Promise((resolve, reject) => {
            // fetch() does not support progress, so we use XMLHttpRequest
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = () => {
                resolve(new Response(xhr.response, {
                    status: xhr.status,
                    statusText: xhr.statusText
                }));
            };
            xhr.onloadend = () => setProgress(1);
            xhr.onerror = () => reject(new Error('(tw-hacky-progress-bar) xhr failed'));
            xhr.onprogress = e => {
                if (e.lengthComputable) {
                    setProgress(e.loaded / e.total);
                }
            };
            xhr.open('GET', url);
            xhr.send();
        });
    }
    return originalFetch(url, opts);
};


const handleWorkerMessage = e => {
    const data = e.data;
    if (Array.isArray(data)) {
        complete += data.length;
        setProgress(complete / total);
    }
};

let downloadWorker = null;
const originalPostMessage = window.Worker.prototype.postMessage;
window.Worker.prototype.postMessage = function (message) {
    if (downloadWorker === null) {
        if (message && message.url && message.id && message.options) {
            downloadWorker = this;
            downloadWorker.addEventListener('message', handleWorkerMessage);
        }
    }
    if (downloadWorker === this) {
        setState(2);
        total++;
    }
    originalPostMessage.call(this, message);
};
